import './App.scss';
import React from 'react';
import NavBar from './components/NavBar';
import SignBoard from './pages/SignBoard';
import ChatBoard from './pages/ChatBoard';
import MyFooter from './components/MyFooter';
import axios from 'axios';
import { useEffect, useState } from 'react';
import WebSocketInstance from './service/WebSocket';

function App() {
  const [messages, setMessages] = useState([]);
  const [count, setCount] = useState(0);
  const [loggedIn, setLoggedIn] = useState(
    localStorage.getItem('token') ? true : false
  );
  const [currentUser, setCurrentUser] = useState('');
  const [allUsers, setAllUsers] = useState([]);
  const [messageType, setMessageType] = useState('All');

  const waitForSocketConnection = callback => {
    setTimeout(function () {
      // Check if websocket state is OPEN
      if (WebSocketInstance.state() === 1) {
        console.log('Connection is made');
        callback();
        return;
      } else {
        console.log('wait for connection...');
        waitForSocketConnection(callback);
      }
    }, 100); // wait 100 milisecond for the connection...
  };

  const refreshList = () => {
    axios
      .get('/api/message/')
      .then(res => {
        setMessages(res.data);
        setCount(res.data.length);
      })
      .catch(err => console.log(err));
  };

  const handleSignup = data => {
    fetch('http://localhost:8000/chat/users/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(res => res.json())
      .then(json => {
        localStorage.setItem('token', json.token);
        setLoggedIn(true);
        setCurrentUser(json.username);
      });
  };

  const handleLogin = user => {
    fetch('http://localhost:8000/token-auth/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    })
      .then(res => res.json())
      .then(json => {
        if (json.user) {
          setCurrentUser(json.user.username);
          localStorage.setItem('token', json.token);
          setLoggedIn(true);
          WebSocketInstance.connect();
          waitForSocketConnection(() => {
            WebSocketInstance.initChatUser(currentUser);
            WebSocketInstance.addCallbacks(refreshList, refreshList);
          });
        } else {
          alert('input correct');
        }
      });
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setLoggedIn(false);
  };

  useEffect(() => {
    // WebSocketInstance.connect();
    refreshList();
  }, [count]);

  useEffect(() => {
    if (loggedIn) {
      fetch('http://localhost:8000/chat/current_user/', {
        headers: {
          Authorization: `JWT ${localStorage.getItem('token')}`,
        },
      })
        .then(res => res.json())
        .then(json => {
          setCurrentUser(json.username);
        });
      fetch('http://localhost:8000/api/userlist/', {
        headers: {
          Authorization: `JWT ${localStorage.getItem('token')}`,
        },
      })
        .then(res => res.json())
        .then(json => {
          if (json.detail == 'Signature has expired.') {
            setLoggedIn(false);
          } else {
            setAllUsers(json);
          }
        });
    }
  }, [loggedIn]);
  return (
    <div className="App">
      {loggedIn ? (
        <>
          <NavBar
            user={{ name: currentUser }}
            handleLogout={handleLogout}
            handleType={setMessageType}
            type={messageType}
          />
          <ChatBoard
            users={allUsers}
            messages={messages}
            me={currentUser}
            refreshList={refreshList}
            type={messageType}
          />
          <MyFooter />
        </>
      ) : (
        <SignBoard handleLogin={handleLogin} handleSignup={handleSignup} />
      )}
    </div>
  );
}

export default App;
