//TODO: FIX THIS COMPAT SDK MESS FFS
import firebase from 'firebase/compat/app'; 
import 'firebase/compat/auth'; 
import {getFirestore, doc, setDoc, getDoc} from 'firebase/firestore'

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyAX2ELgxCu2v4Ao8YFZGc66tjHUualqI6Q",
    authDomain: "bankmanager-ce669.firebaseapp.com",
    projectId: "bankmanager-ce669",
    storageBucket: "bankmanager-ce669.appspot.com",
    messagingSenderId: "743045129394",
    appId: "1:743045129394:web:56174e92958aea1cb395ab",
    measurementId: "G-4E8NJ830RB"
  })

export const firestore = getFirestore()
export const auth = firebaseApp.auth()
export const firebaseAuth = firebase.auth
export {doc, setDoc, getDoc}
export default firebaseApp