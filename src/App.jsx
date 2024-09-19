import './App.css'
import { useEffect, useState } from 'react';

function App() {
  const [url, setUrl] = useState('');
  const [params, setParams] = useState([]);

  useEffect(() => {
    // Get the full URL
    const currentUrl = window.location.href;
    setUrl(currentUrl);

    // Extract query parameters
    const searchParams = new URLSearchParams(window.location.search);
    const paramsArray = [];

    for (let [key, value] of searchParams.entries()) {
      paramsArray.push({ key, value });
    }

    setParams(paramsArray);
  }, []);

  return (
    <>
      <p className="read-the-docs">
        Current URL: {url}
      </p>
      <p className="read-the-docs">
        URL Parameters:
        <ul>
          {params.map((param, index) => (
            <li key={index}>{param.key}: {param.value}</li>
          ))}
        </ul>
      </p>
    </>
  )
}

export default App;
