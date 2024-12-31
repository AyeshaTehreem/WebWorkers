import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import UserCard from './components/UserCard';
import './App.css';

const App = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const createWebWorker = (workerFile) => {
    let code = workerFile.toString();
    code = code.substring(code.indexOf("{") + 1, code.lastIndexOf("}"));
    const blob = new Blob([code], { type: "application/javascript" });
    return new Worker(URL.createObjectURL(blob), { type: "module" });
  };

  const handleFetchUsers = () => {
    setLoading(true);
    setUsers([]);
    
    const worker = createWebWorker(() => {
      /* eslint-disable-next-line no-restricted-globals */
      self.onmessage = async function() {
        try {
          const response = await fetch('https://reqres.in/api/users?page=1');
          const data = await response.json();
          /* eslint-disable-next-line no-restricted-globals */
          self.postMessage(data);
        } catch (error) {
          /* eslint-disable-next-line no-restricted-globals */
          self.postMessage({ error: error.message });
        }
      };
    });

    worker.onmessage = ({ data }) => {
      if (data.error) {
        console.error(data.error);
        setLoading(false);
        return;
      }
      setUsers(data.data);
      setLoading(false);
      worker.terminate();
    };

    worker.postMessage(null);
  };

  return (
    <div className="app-container">
      <Navbar />
      
      <main className="main-content">
        <div className="card-container">
          <h1 className="title">User Directory</h1>
          
          <button 
            onClick={handleFetchUsers}
            disabled={loading}
            className="fetch-button"
            aria-label={loading ? 'Loading users' : 'Fetch users'}
          >
            {loading ? 'Fetching Users...' : 'Fetch Users'}
          </button>

          <div className="users-container">
            {users.length > 0 && (
              <div className="users-grid">
                {users.map(user => (
                  <UserCard key={user.id} user={user} />
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default App;