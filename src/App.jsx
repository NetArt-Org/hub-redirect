import './App.css'
import { useEffect, useState } from 'react';

function App() {
  const [url, setUrl] = useState('');
  const [params, setParams] = useState([]);
  const [authCode, setAuthCode] = useState();

  const get_token = (authCode) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    
    const urlencoded = new URLSearchParams();
    urlencoded.append("grant_type", "authorization_code");
    urlencoded.append("code", authCode);
    urlencoded.append("client_id", "i0a0h7jp79");
    urlencoded.append("redirect_uri", "https://hub-redirect.netlify.app");

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: urlencoded,
      redirect: "follow"
    };

    fetch("https://hub.netart.io/api/method/frappe.integrations.oauth2.get_token", requestOptions)
      .then((response) => response.text())
      .then((result) => result)
      .catch((error) => console.error(error));
  }


  useEffect(() => {
    // Get the full URL
    const currentUrl = window.location.href;
    setUrl(currentUrl);

    // Extract query parameters
    const searchParams = new URLSearchParams(window.location.search);
    const paramsArray = [];
    let code = '';

    for (let [key, value] of searchParams.entries()) {
      paramsArray.push({ key, value });
      if (key === 'code') {
        code = value; // Extract the authorization code
      }
    }

    setParams(paramsArray);

    // Exchange the authorization code for a token
    if (code) {
      setAuthCode(get_token(code));
    }
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
          {JSON.stringify(authCode)}
        </ul>
      </p>
    </>
  )
}

export default App;
