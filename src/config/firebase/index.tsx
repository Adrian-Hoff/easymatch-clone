// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyDyk7YrVS2ybqhVWNiYWYluDprmYlGqhos',
  authDomain: 'easy-match-4fe3d.firebaseapp.com',
  projectId: 'easy-match-4fe3d',
  storageBucket: 'easy-match-4fe3d.appspot.com',
  messagingSenderId: '1007038800984',
  appId: '1:1007038800984:web:c3015bfef599e19a9a162d',
  measurementId: 'G-KHEGHH3M11',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getFirestore(app)
