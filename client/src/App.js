import { useState } from 'react';
import './App.css';
import Login from './components/Login';
import SignUp from './components/SignUp';
import { StreamChat } from "stream-chat";
import { Chat } from "stream-chat-react";
import Cookie from "universal-cookie";
import JoinGame from './components/JoinGame';

function App() {
  
  const api_key = process.env.REACT_APP_API_KEY;

  const cookies = new Cookie();
  const token = cookies.get("token");

  const client = StreamChat.getInstance(api_key);
  const [isAuth, setIsAuth] = useState(false);

  const logOut = () => {
    cookies.remove("token");
    cookies.remove("username");
    cookies.remove("userId");
    cookies.remove("firstName");
    cookies.remove("lastName");
    // channelName
    cookies.remove("hashedPassword");
    client.disconnectUser();
    setIsAuth(false);
  }

  if(token) {
    client.connectUser({
      id: cookies.get("userId"),
      name: cookies.get("username"),
      firsName: cookies.get("firstName"),
      lastName: cookies.get("lastName"),
      hashedPassword: cookies.get("hashedPassword")
    },
    token
  )
  .then((user) => {
    setIsAuth(true);
  });
  }

  return (
    <div className="App">
      {isAuth ? (
        <Chat client={client} >
          <JoinGame />
          <button className='logout' onClick={logOut} >Log Out</button>
        </Chat>
      ) : (
        <>
          <SignUp setIsAuth={setIsAuth} />
          <Login setIsAuth={setIsAuth} />
        </>
      )}
    </div>
  );
}

export default App;
