import firebase from 'firebase';
import 'firebase/auth';
import "firebase/firestore";
import 'firebase/storage'


// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCvoRue8ad9MEwPswiSlknsrzZmAzP__jo",
    authDomain: "fir-534c6.firebaseapp.com",
    projectId: "fir-534c6",
    storageBucket: "fir-534c6.appspot.com",
    messagingSenderId: "570229603789",
    appId: "1:570229603789:web:edaf5a22d5e1cd2c9d9884",
    measurementId: "G-SP40JRKX3H"
  };

export default firebase.initializeApp(firebaseConfig)