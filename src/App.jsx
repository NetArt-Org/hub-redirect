import './App.css'
import { useEffect, useState } from 'react';

function App() {
  const [url, setUrl] = useState('');
  const [params, setParams] = useState([]);
  const [accessToken, setAccessToken] = useState('');

  useEffect(() => {
    // Get the full URL
    const currentUrl = window.location.href;
    setUrl(currentUrl);

    // Get the URL hash (everything after #)
    const hash = window.location.hash;
    
    // Remove the '#' from the beginning of the hash string
    const cleanedHash = hash.substring(1);

    // Convert the hash parameters into an object
    const params = new URLSearchParams(cleanedHash);

    // Get specific values like access_token, expires_in, etc.
    // const expires = params.get('expires_in');
    // const type = params.get('token_type');
    // const scopeValue = params.get('scope');
    const token = params.get('access_token');

    // Extract query parameters
    // const searchParams = new URLSearchParams(window.location.search);
    // const paramsArray = [];
    // let code = '';

    // for (let [key, value] of searchParams.entries()) {
    //   paramsArray.push({ key, value });
    //   if (key === 'code') {
    //     code = value; // Extract the authorization code
    //   }
    // }
    
    // Set the state with extracted values
    // setExpiresIn(expires);
    // setTokenType(type);
    // setScope(scopeValue);
    // setParams(paramsArray);
    setAccessToken(token);

  }, []);


  useEffect(() => {
    if (accessToken) {
      // Add a small delay before redirecting
      setTimeout(() => {
        window.location.href = `draftbit://HomepageScreen/${accessToken}`;
      }, 1000); // 1000 ms delay
    }
  }, [accessToken]);
  
  return (
    <>
      <h2>
        Logged in successfully!
      </h2>
      <p className="read-the-docs">
        Redirecting...
      </p>
    </>
  )
}

export default App;
