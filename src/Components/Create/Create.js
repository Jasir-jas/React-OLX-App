import React, { Fragment, useContext, useState } from 'react';
import './Create.css';
import Header from '../Header/Header';
import {FirebaseContext,AuthContext} from '../../storage/FirebaseContext'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import Loading from '../Loading/Loading';


export default function Create() {
  const {firebase} = useContext(FirebaseContext)
  const {user} = useContext(AuthContext)
  const [name,setName] = useState('')
  const [category,setCategory] = useState('')
  const [price,setPrice] = useState('')
  const [image,setImage] = useState('')
  const [loading,setLoading] = useState(false)
  
  const history = useHistory()

  const date = new Date()

  const handleSubmit = async()=>{

    try {
      setLoading(true)
      await firebase.storage().ref(`/images${image.name}`).put(image).then(({ref})=>{
        console.log(ref);
        ref.getDownloadURL().then((url)=>{
          console.log(url);
           firebase.firestore().collection('products').add({
            name,
            category,
            price,
            url,
            userId:user.uid,
            createdAt:date.toDateString()
          })
          history.push('/')
        })
  
  
      })
    }catch(error){
      console.error('Something Error',error)
    }finally{
      setLoading(false)
    }
  }

    


  return (
    <Fragment>
      <Header />
      <card>
        <div>
          {
            loading ? (<Loading/>
            ) : (
              <div className="centerDiv">
          <form>
            <label htmlFor="fname">Name</label>
            <br />
            <input
              className="input"
              type="text"
              value={name}
              onChange={(e)=>{
                setName(e.target.value)
              }}
              id="fname"
              name="Name"
              placeholder="Your Name"
            />
            <br />
            <label htmlFor="fname">Category</label>
            <br />
            <input
              className="input"
              type="text"
              value={category}
              onChange={(e)=>{
                setCategory(e.target.value)
              }}
              id="fname"
              name="category"
              placeholder="Category"
            />
            <br />
            <label htmlFor="fname">Price</label>
            <br />
            <input className="input" 
              type="number"
              value={price}
              onChange={(e)=>{
              setPrice(e.target.value)}}
              id="fname" 
              name="Price" />
            <br />
          </form>
          <br />
          <img alt="Posts" width="200px" height="200px" src={image ? URL.createObjectURL(image) : ''}></img>
          
            <br />
            <input type="file"
              onChange={(e)=>{
                setImage(e.target.files[0])
              }} />
            <br />
            <button onClick={handleSubmit} className="uploadBtn">upload and Submit</button>
          
        </div>

            )
          }

        
        </div>
      </card>
    </Fragment>
  );
}

