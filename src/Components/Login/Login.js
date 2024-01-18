import React, { useState,useContext } from 'react';
import {FirebaseContext} from '../../storage/FirebaseContext'
import {useHistory} from 'react-router-dom'
import Loading from '../Loading/Loading';


import Logo from '../../olx-logo.png';
import './Login.css';


export default function Login() {
const [email,setEmail] = useState('')
const [password,setPassword] = useState('')
const {firebase} = useContext(FirebaseContext)
const history = useHistory()
const [loading,setLoading] = useState(false)


const handleLogin = async(e)=>{
 e.preventDefault()

 try{
  setLoading(true)


  await firebase.auth().signInWithEmailAndPassword(email, password).then(()=>{
    history.push('/') 

   }).catch((error)=>{
    alert(error.message)
   })
   
  }
  catch(error){
    console.error('try again',error);
  }
  finally{
    setLoading(false)
  }
 }

  return (
    <div>
      { loading ? (<Loading/>
      ) : (
        <div className="loginParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        <form onSubmit={handleLogin}>
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            value={email} 
            onChange={(e)=>setEmail(e.target.value)}
            id="fname"
            name="email"
            defaultValue="John"
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            id="lname"
            name="password"
            defaultValue="Doe"
          />
          <br />
          <br />
          <button onClick={handleLogin}>Login</button>
        </form>
        <a href='/signup'>Signup</a>
      </div>
      )}
    </div>
  );

}

    
      


