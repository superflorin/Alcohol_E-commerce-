import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const config={
  apiKey: "AIzaSyCIEoAcp5_waDaJnR7FeTuanieYdZ0U8v8",
  authDomain: "e-commerce-19e87.firebaseapp.com",
  projectId: "e-commerce-19e87",
  storageBucket: "e-commerce-19e87.appspot.com",
  messagingSenderId: "420806208775",
  appId: "1:420806208775:web:6566bb3aff6d33e2a6a9a2",
  measurementId: "G-XBEQLFHHDY"
};

export const createUserProfileDocument = async(userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`user/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if(!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      })
    } catch (error) {
      console.log('error creating user', error.message);
    }
  } 

  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;

