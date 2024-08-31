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
  DocumentReference,
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

//returns a docRef ONLY IF USER IS AUTHENTICATED
const getUserDocRef = (): DocumentReference | null => {
  const user = auth.currentUser;
  return user ? doc(firestore, "users", user.uid) : null;
};

export const addCardData = async (
  values: object,
  cardType: "creditCard" | "debitCard"
) => {
  const docRef = getUserDocRef();

  if (!docRef) {
    console.error("User not authenticated");
    return;
  }

  try {
    //Checks if there exists data for user
    
    
    const docSnapshot = await getDoc(docRef);
    const data = docSnapshot.data();
    //if not adds the default empty data
    if (!docSnapshot.exists() || !data) {
      const defaultData = {
        creditCard: [],
        debitCard: [],
      };
      await setDoc(docRef, defaultData);
    }
    //and then appends the data to the default array
    await updateDoc(docRef, {
      [cardType]: arrayUnion(values),
    });
  } catch (error) {
    console.error(`Error adding ${cardType} data:`, error);
    throw error;
  }
};

export const getCards = async (cardType: "creditCard" | "debitCard") => {
  const docRef = getUserDocRef();
  if (!docRef) {
    console.error("User not authenticated");
    return null;
  }

  try {
    const docSnapshot = await getDoc(docRef);

    if (!docSnapshot.exists()) {
      console.log("No such document!");
      return null;
    }

    const data = docSnapshot.data();

    if (!data || !data[cardType]) {
      console.log(`No ${cardType} data found!`);
      return null;
    }

    return data[cardType];
  } catch (error) {
    console.error(`Error fetching ${cardType}:`, error);
    throw error;
  }
};

//Nothing to see here, just a function wrapper
export const addCreditData = (values: object) =>
  addCardData(values, "creditCard");
export const addDebitData = (values: object) =>
  addCardData(values, "debitCard");
export const getCreditCards = () => getCards("creditCard");
export const getDebitCards = () => getCards("debitCard");

export const firebaseAuth = firebase.auth;
export { doc, setDoc, getDoc, arrayUnion, updateDoc };
export default firebaseApp;