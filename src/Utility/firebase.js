     

// // Import the functions you need from the SDKs you need
// // Import the functions you need from the SDKs you need
// import firebase from "firebase/compat/app";
// // to ge authentication service
// import { getAuth } from "firebase/auth"
//  // to get firestore database service
// import "firebase/compat/firestore"
// import "firebase/compat/auth"

//  // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyCFyJ9XgndajEvC69FBReCrARMBcVvEm3s",
//   authDomain: "clone-5dab2.firebaseapp.com",
//   projectId: "clone-5dab2",
//   storageBucket: "clone-5dab2.appspot.com",
//   messagingSenderId: "808938866510",
//   appId: "1:808938866510:web:55ae1d7e9ca6dff04e801f",
// };

// // // // Initialize Firebase
// const app = firebase.initializeApp(firebaseConfig);

// export const auth = getAuth(app)

// export const db = app.firestore();





import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: "AIzaSyCFyJ9XgndajEvC69FBReCrARMBcVvEm3s",
  authDomain: "clone-5dab2.firebaseapp.com",
  projectId: "clone-5dab2",
  storageBucket: "clone-5dab2.appspot.com",
  messagingSenderId: "808938866510",
  appId: "1:808938866510:web:55ae1d7e9ca6dff04e801f",
};

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
export const auth = getAuth(app)