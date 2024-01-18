import React, { useState,useContext } from 'react';

import Logo from '../../olx-logo.png';
import './Signup.css';
import { FirebaseContext } from '../../storage/FirebaseContext';
import {useHistory} from 'react-router-dom'
import Loading from '../Loading/Loading'


export default function Signup() {
  const [loading,setLoading] = useState(false)
  const history = useHistory()
  const [username,setUsername] = useState('')
  const [email,setEmail] = useState('')
  const [phone,setPhone] = useState('')
  const [password,setPassword]  = useState('')
  const {firebase} = useContext(FirebaseContext)

  // form validation

  function formValidation() {

    // check if the username empty or not.
    if (username.trim() === ''){
      alert('Name cannot be Empty..please enter the name')
      return false
    }

    // if email is empty or not
    if (email.trim() === ''){
      alert('Email cannot be Empty..please enter the Email')
      return false
    }

      // Add a simple email validation check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)){
      alert('invalid email format.please re-enter a valid email address')
      return false
    }

      // check if phone number is empty or not
    if (phone.trim() === ''){
      alert('Phone number cannot be empty.please enter the phone number')
      return false
    }

      // Add a simple phone number validation check (assuming 10 digits)
    const phoneRegex = /^\d{10}$/;
    if(!phoneRegex.test(phone)){
      alert('Invalid phone number format. Please enter a valid 10-digit phone number.')
      return false
    }

      // check if password empty or not
    if (password.trim() === ''){
      alert('Password can not be empty.Please enter the Password')
      return false
    }

    if (password.length<6) {
      alert('Atleast 6 charaters minimum')
      return false
    }

    return true
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formValidation()){
      return
    }

    try {
      setLoading(true);
  
      const result = await firebase.auth().createUserWithEmailAndPassword(email, password);
      await result.user.updateProfile({ displayName: username });
  
      await firebase.firestore().collection('users').add({
        id: result.user.uid,
        phone: phone,
        username: username
      });
  
      history.push('/login');
    } catch (error) {
      console.error('Signup failed:', error);
      // Handle error, show a message to the user, or log the error details
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div>
      {loading ? (
        <Loading />
      ) :(
        <div className="signupParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        <form onSubmit={handleSubmit}>
          
          <label htmlFor="fname">Username</label>
          <br />
          <input
            className="input"
            type="text"
            value={username}
            onChange={(e)=>setUsername(e.target.value)}
            id="fname"
            name="name"
            placeholder="Your Name"
          />
          <br />

          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            id="femail"
            name="email"
            placeholder="@gmail.com"
          />
          <br />
          <label htmlFor="lname">Phone</label>
          <br />
          <input
            className="input"
            type="number"
            value={phone}
            onChange={(e)=>setPhone(e.target.value)}
            id="fphone"
            name="phone"
            placeholder="000000000"
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            id="fpassword"
            name="password"
            placeholder="...."
          />
          <br />
          <br />
          <button onClick={handleSubmit}>Signup</button>
        </form>
        <a href='/login' className='loginButton'>Login</a>
      </div>
      )}
      
      </div>
  );
}
