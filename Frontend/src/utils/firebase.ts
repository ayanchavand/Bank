//TODO: FIX THIS COMPAT SDK MESS FFS
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  arrayUnion,
  updateDoc,
} from "firebase/firestore";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyAX2ELgxCu2v4Ao8YFZGc66tjHUualqI6Q",
  authDomain: "bankmanager-ce669.firebaseapp.com",
  projectId: "bankmanager-ce669",
  storageBucket: "bankmanager-ce669.appspot.com",
  messagingSenderId: "743045129394",
  appId: "1:743045129394:web:56174e92958aea1cb395ab",
  measurementId: "G-4E8NJ830RB",
});

export const firestore = getFirestore();
export const auth = firebaseApp.auth();
export const firebaseAuth = firebase.auth;
export { doc, setDoc, getDoc, arrayUnion, updateDoc };
export default firebaseApp;

const docPath = doc(firestore, "users/" + auth.currentUser?.uid);
export const addCredData = async (values: object) => {
  
    try {
    const data = (await getDoc(docPath)).data();
    //Check if the default data exists in the Document 
    //If it doesnt exist add the dault data
    if (!data) {
      const defaultData = {
        creditCard: [],
        debitCard: [],
      };

      try {
        await setDoc(docPath, defaultData);
      } catch (error) {
        console.log("oops");
      }
      //if data exists append the new information
    } else {
      await updateDoc(docPath, {
        creditCard: arrayUnion(values),
      });
    }
  } catch (error) {
    console.log("Couldn't fetch");
  }
};

export const addDebitData = async (values: object) => {
  
    try {
    const data = (await getDoc(docPath)).data();
    //Check if the default data exists in the Document 
    //If it doesnt exist add the dault data
    if (!data) {
      const defaultData = {
        creditCard: [],
        debitCard: [],
      };

      try {
        await setDoc(docPath, defaultData);
      } catch (error) {
        console.error("oops");
      }
      //if data exists append the new information
    } else {
      await updateDoc(docPath, {
        debitCard: arrayUnion(values),
      });
    }
  } catch (error) {
    console.error("Couldn't fetch Data");
  }
};
