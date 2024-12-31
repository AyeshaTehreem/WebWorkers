import React, { useState } from 'react';
import './styles.css';

export default function App() {
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
    };

    worker.postMessage(null);
  };

  return (
    <div className="App p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow p-6">
        <h1 className="text-2xl font-bold mb-6">User Data Fetcher</h1>
        
        <button 
          onClick={handleFetchUsers}
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded mb-6 w-full hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? 'Fetching Users...' : 'Fetch Users'}
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {users.map(user => (
            <div key={user.id} className="border rounded-lg p-4 hover:shadow-lg transition-shadow">
              <img 
                src={user.avatar} 
                alt={user.first_name}
                className="w-24 h-24 rounded-full mx-auto mb-4"
              />
              <h3 className="font-semibold text-center">
                {user.first_name} {user.last_name}
              </h3>
              <p className="text-gray-600 text-center">{user.email}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}