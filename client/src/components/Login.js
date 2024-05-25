import React, { useState } from 'react';
import Axios from "axios";
import Cookie from "universal-cookie";

const Login = ({setIsAuth}) => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const cookies = new Cookie();

    const login = () => {
      Axios.post("http://localhost:3001/login", {
        username,
        password,
      }).then((res) => {
        const {firstName, lastName, username, token, userId} = res.data;
        
        cookies.set("token", token);
        cookies.set("firstName", firstName);
        cookies.set("lastName", lastName);
        cookies.set("userId", userId);
        cookies.set("username", username);
        setIsAuth(true);
      })
    }
  return (
    <div className='login'>
        <label>Login</label>
        <input placeholder='Username' onChange={(e) => {
            setUsername(e.target.value);
        }} />
        <input placeholder='Password' type='password' onChange={(e) => {
            setPassword(e.target.value);
        }} />
        <button onClick={login} >Login</button>
    </div>
  )
}

export default Login;