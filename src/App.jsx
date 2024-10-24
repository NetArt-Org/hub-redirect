import './App.css'
import { useEffect, useState } from 'react';
import { auth, provider, signInWithPopup } from './functions/firebase';

function App() {
  const [accessToken, setAccessToken] = useState('');
  const [refreshToken, setRefreshToken] = useState('');
  const [userInfo, setUserInfo] = useState(null); 

  const handleLogin = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        // Get the tokens and other user info
        const credential = result._tokenResponse;
        setAccessToken(credential.oauthAccessToken);
        setRefreshToken(credential.oauthRefreshToken);

        // Set user information
        const user = result.user;
        setUserInfo({
          displayName: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
        });

        console.log('Result:', result);
        console.log('User Info:', user);
      })
      .catch((error) => {
        console.error('Error during login', error);
      });
  };

  useEffect(() => {
    handleLogin();
  }, [])

  useEffect(() => {
    if (accessToken) {
      // Add a small delay before redirecting
      setTimeout(() => {
        window.location.href = `draftbit://LoginSuccessfulScreen/${accessToken}/${refreshToken}/${userInfo}`;
      }, 1000); // 1000 ms delay
    }
  }, [accessToken]);
  
  return (
    accessToken ? (
      <>
        <h2>
          Logged in successfully!
        </h2>
        <p className="read-the-docs">
          Redirecting...
        </p>
      </>
    ) : (
      <>
        <p className="read-the-docs">
          Logging in...
        </p>
      </>
    )
  );
}

export default App;
