import {useState} from 'react';

const useHttp = (requestObj, onData) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
  
    const sendRequest = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(
          requestObj.url, {
              method: requestObj.method ? requestObj.method: 'GET' ,
              headers: requestObj.headers ? requestObj.headers : {},
              body: requestObj.body ? JSON.stringify(requestObj.body): null
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