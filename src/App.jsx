import './App.css'
import { useEffect, useState } from 'react';

function App() {
  const [url, setUrl] = useState('');
  const [refreshToken, setRefreshToken] = useState('');
  const [accessToken, setAccessToken] = useState('');
  const [code, setCode] = useState('');

  useEffect(() => {
    // Get the full URL
    const currentUrl = window.location.href;
    setUrl(currentUrl);

    // Get the URL hash (everything after #)
    // const hash = window.location.hash;
    
    // Remove the '#' from the beginning of the hash string
    // const cleanedHash = hash.substring(1);
    const cleanedParams = currentUrl.split("?")[1];
    // Convert the parameters into an object
    const params = new URLSearchParams(cleanedParams);

    // Get specific values like access_token, expires_in, etc.
    // const expires = params.get('expires_in');
    // const type = params.get('token_type');
    // const scopeValue = params.get('scope');
    // const token = params.get('access_token');
    const token = params.get('code');
    
    // Set the state with extracted values
    // setExpiresIn(expires);
    // setTokenType(type);
    // setScope(scopeValue);
    // setParams(paramsArray);
    setCode(token);

  }, []);

  useEffect(() => {
    if (code) {
      const urlencoded = new URLSearchParams();
      urlencoded.append("grant_type", "authorization_code");
      urlencoded.append("code", code);
      urlencoded.append("client_id", "i0a0h7jp79");
      urlencoded.append("redirect_uri", "https://hub-redirect.netlify.app");

      const requestOptions = {
        method: "POST",
        body: urlencoded,
      };
      console.log(requestOptions);
      
      fetch("https://hub.netart.io/api/method/frappe.integrations.oauth2.get_token", requestOptions)
        .then(res => res.json())
        .then(result => {
          setRefreshToken(result.refresh_token)
          setAccessToken(result.access_token)
          console.log(result);
          
        })

      
    }
  }, [code]);
  
  useEffect(() => {
    if (accessToken && refreshToken) {
      // Add a small delay before redirecting
      setTimeout(() => {
        window.location.href = `draftbit://LoginSuccessfulScreen/${accessToken}/${refreshToken}`;
      }, 1000); // 1000 ms delay
    }
  }, [accessToken, refreshToken]);
  
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
