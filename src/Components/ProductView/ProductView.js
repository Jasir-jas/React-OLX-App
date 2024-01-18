import React, { useEffect, useState,useContext } from 'react';
import { useParams } from 'react-router-dom';
import { FirebaseContext } from '../../storage/FirebaseContext';
import './ProductView.css'


function ProductView() {
  const { productId } = useParams();
  const [productDetails, setProductDetails] = useState(null);
  const { firebase } = useContext(FirebaseContext);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        // Fetch product details based on the productId
        const productDoc = await firebase.firestore().collection('products').doc(productId).get();

        if (productDoc.exists) {
          setProductDetails(productDoc.data());
        } else {
          console.error('Product not found');
        }
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    };

    fetchProductDetails();
  }, [productId, firebase]);

  return (
    <div className='viewParentDiv'>

      {productDetails ? (
        <div className='allProducts'>
            <div className='imageShowDiv'>
                <img src={productDetails.url} alt="" />
            </div>

            <div className='rightSection'>
                <div className='productDetails'>
                    <p>&#x20B9; {productDetails.price}</p>
                    <span> {productDetails.name} </span>
                    <p> {productDetails.category} </p>
                    <span> {productDetails.createdAt}</span>
                </div>
            </div>
               
          
          
          {/* Display other product details based on your data model */}
        </div>
      ) : (
        <p>Loading product details...</p>
      )}
    </div>
  );
}

export default ProductView;
