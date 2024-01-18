import React,{useContext,useEffect} from 'react';
import './App.css';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom'
import Signup from './Pages/Signup'
import Login from './Pages/Login'
import Create from './Pages/Create'
import View from './Pages/ViewPost'
import ViewProduct from './Pages/ViewProduct'
import {AuthContext,FirebaseContext} from './storage/FirebaseContext'
import Post from './storage/postContext'

/**
 * ?  =====Import Components=====
 */
import Home from './Pages/Home';




function App() {
  const {user,setUser} = useContext(AuthContext)
  const {firebase} = useContext(FirebaseContext)

  useEffect(()=>{
    firebase.auth().onAuthStateChanged((user)=>{
      setUser(user)

    })
  },[])

  return (
    <div>
    <Post>
      <Router>
        <Route exact path='/'>
        <Home/>
        </Route>
      
        <Route path='/signup' component={Signup}>
        <Signup/>
        </Route>

        <Route path='/login' component={Login}>
        <Login/>
        </Route>

        <Route path='/create'>
        <Create/>
        </Route>

        <Route path='/view'>
        <View/>
        </Route>

        <Switch>
          <Route path='/product/:productId'>
          <ViewProduct/>
          </Route>
        </Switch>
      </Router>
    </Post>
      
      
      



    
    </div>
  );
}

export default App;
