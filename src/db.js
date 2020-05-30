import firebase from 'firebase/app'
import 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyDIm6AyKl_tuA70WyuI_pRv_hrnk-oXy2g",
  authDomain: "news-bf4d6.firebaseapp.com",
  databaseURL: "https://news-bf4d6.firebaseio.com",
  projectId: "news-bf4d6",
  storageBucket: "news-bf4d6.appspot.com",
  messagingSenderId: "30509302973",
  appId: "1:30509302973:web:4383706258de171c0c23d4",
  measurementId: "G-2FC32X2W5T"
};

// Get a Firestore instance
export const db = firebase
  .initializeApp(firebaseConfig)
  .firestore()

// Export types that exists in Firestore
// This is not always necessary, but it's used in other examples
const { Timestamp, GeoPoint } = firebase.firestore
export { Timestamp, GeoPoint }