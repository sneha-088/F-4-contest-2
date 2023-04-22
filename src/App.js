import React, { useState, useEffect } from 'react';

function LoginPage() {
  const [usernameState, setUsernameState] = useState('');
  const [passwordState, setPasswordState] = useState('');
  const [errorState, setErrorState] = useState('');

  const handleLogin = () => {
    fetch('https://dummyjson.com/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: usernameState,
        password: passwordState,
      }),
    })
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        } else {
          throw new Error(res.statusText);
        }
      })
      .then((data) => {
        localStorage.setItem('token', data.token);
        localStorage.setItem('id', data.id);
        window.location.href = '/profile';
      })
      .catch((error) => {
        setErrorState(error.message);
      });
  };

  return (
    <div>
      <h1>Login</h1>
      <label>Username:</label>
      <input
        type="text"
        value={usernameState}
        onChange={(e) => setUsernameState(e.target.value)}
      />
      <br />
      <label>Password:</label>
      <input
        type="password"
        value={passwordState}
        onChange={(e) => setPasswordState(e.target.value)}
      />
      <br />
      <button onClick={handleLogin}>Login</button>
      {errorState && <div>{errorState}</div>}
    </div>
  );
}

function ProfilePage() {
  const [userState, setUserState] = useState(null);

  useEffect(() => {
    const id = localStorage.getItem('id');
    const token = localStorage.getItem('token');
    fetch(`https://dummyjson.com/users/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        } else {
          throw new Error(res.statusText);
        }
      })
      .then((data) => {
        setUserState(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div>
      <h1>Profile</h1>
      {userState ? (
        <div>
          <div>Name: {userState.name}</div>
          <div>Email: {userState.email}</div>
          <div>Address: {userState.address}</div>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}

function App() {
  return (
    <div>
    const token = localStorage.getItem('token');
    {
        !token ? <LoginPage /> : <ProfilePage />
    }
      
    </div>
  );
}

export default App;
