import React,{useContext,useState,useEffect} from 'react';

import './Header.css';
import OlxLogo from '../../assets/OlxLogo';
import Search from '../../assets/Search';
import Arrow from '../../assets/Arrow';
import SellButton from '../../assets/SellButton';
import SellButtonPlus from '../../assets/SellButtonPlus';
import { AuthContext, FirebaseContext } from '../../storage/FirebaseContext';
import {useHistory} from 'react-router-dom'



function Header() {
  const history = useHistory()
  const [search,setSearch] = useState('')
  const [searchResult,setSearchResult] = useState([])

  const {user} = useContext(AuthContext)
  const {firebase} = useContext(FirebaseContext)

  const handleLoginClick = () => {
    // Redirect to the "/login" route
    history.push('/login');
  };
  useEffect(()=>{
    const fetchSearchResult = async()=>{
      if(search != ''){
        try{
          const searchData = await firebase.firestore().collection('products').where('category' , '==',search).get()

          const result = searchData.docs.map((doc)=>({
            id : doc.id,
            data : doc.data()
          }))
          setSearchResult(result)
        }catch (error) {
          console.error('Error fetching search results:', error);
        }
      }else{
        setSearchResult([])
      }
    }
    fetchSearchResult()
  },[search,firebase]) 
  return (
    <div className="headerParentDiv">
      <div className="headerChildDiv">
        <div className="brandName">
          <OlxLogo onClick={()=>{
            history.push('/')
          }}>
            
          </OlxLogo>
        </div>
        <div className="placeSearch">
          <Search></Search>
          <input type="text" />
          <Arrow></Arrow>
        </div>
        <div className="productSearch">
          <div className="input">
            <input
              type="text"
              placeholder="Find car,mobile phone and more..."
              value={search}
              onChange={(e)=>setSearch(e.target.value)}
            />
          </div>
          <div className="searchAction">
            <Search color="#ffffff"></Search>
          </div>
        </div>

        {searchResult.length > 0 && (
          <div className="searchResults">
            <ul>
              {searchResult.map((result) => (
                <li key={result.id}>
                  <div onClick={()=>{
                    console.log('Clicked on result', result);
                    history.push(`/product/${result.id}`);
                    
                  }}>
                  {result.data.category}
                  </div>
                </li>
                
              ))}
            </ul>
          </div>
        )}

        <div className="language">
          <span> ENGLISH </span>
          <Arrow></Arrow>
        </div>
        <div className="loginPage"> 
          <span onClick={user ? null : handleLoginClick}>
            {user ? `Welcome ${user.displayName}` : 'Login'}
            </span>
          <hr />
        </div>
        <div className='logoutPage'>
          {user && <span  onClick={()=>{
            firebase.auth().signOut()
            history.push('/login')
          }}>Logout</span>}
        </div>
        
        
        
        <div onClick={()=>{
          history.push('/create')
        }} className="sellMenu">
          
          <SellButton></SellButton>
          <div className="sellMenuContent">
            <SellButtonPlus></SellButtonPlus>
            <span>SELL</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
