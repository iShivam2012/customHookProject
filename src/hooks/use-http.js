import {useState, useEffect} from 'react';

const useHttp = (requestObj, onData) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [tasks, setTasks] = useState([]);
  
    const sendRequest = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(
          requestObj.url, {
              method: requestObj.method,
              headers: requestObj.headers,
              body: JSON.stringify(requestObj.body)
          }
        );
  
        if (!response.ok) {
          throw new Error("Request failed!");
        }
  
        const data = await response.json();
        onData(data);

        } catch (err) {
        setError(err.message || "Something went wrong!");
      }
      setIsLoading(false);
    };
    return {
        isLoading,
        error,
        sendRequest
    }
}

export default useHttp;