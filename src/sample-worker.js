export default () => {
    const subWorkerFunction = function() {
      self.onmessage = function({ data: count }) {
        setTimeout(() => {
          var xhttp = new XMLHttpRequest();
          xhttp.onreadystatechange = function() {
            if (this.readyState === 4 && this.status === 200) {
              self.postMessage(xhttp.responseText);
            }
          };
          xhttp.open("GET", `https://reqres.in/api/users?page=${count}`, true);
          xhttp.send();
        }, count * 1000);
      };
    };
  
    const subWorker = createWebWorker(subWorkerFunction);
    
    subWorker.onmessage = ({ data }) => {
      self.postMessage(data);
    };
  
    self.onmessage = ({ data: totalCount }) => {
      let count = 1;
      while (count <= totalCount) {
        subWorker.postMessage(count);
        count++;
      }
    };
  };