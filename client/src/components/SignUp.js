import React from 'react'
import { useState } from 'react'
import Axios from "axios";
import Cookie from "universal-cookie";

const SignUp = ({setIsAuth}) => {
    const [user, setUser] = useState(null);
    const cookies = new Cookie();
    const signUp = () => {
        Axios.post("http://localhost:3001/signup", user).then(res => {
            const {token, firstName, lastName, userId, username, hashedPassword} = res.data;

            cookies.set("token", token);
            cookies.set("firstName", firstName);
            cookies.set("lastName", lastName);
            cookies.set("userId", userId);
            cookies.set("username", username);
            cookies.set("hashedPassword", hashedPassword);
            setIsAuth(true);
        })
    }
  return (
    <div className='signUp'>
        <label>Sign Up</label>
        <input placeholder='First Name' onChange={(e) => {
            setUser({...user, firstName: e.target.value });
        }} />
        <input placeholder='Last Name' onChange={(e) => {
            setUser({...user, lastName: e.target.value });
        }} />
        <input placeholder='Username' onChange={(e) => {
            setUser({...user, username: e.target.value });
        }} />
        <input placeholder='Password' type='password' onChange={(e) => {
            setUser({...user, password: e.target.value });
        }} />
        <button onClick={signUp} >Sign Up</button>
    </div>
  )
}

export default SignUp;