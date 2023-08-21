// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDe2Kzc3nAc1PtPne5qJW6Eqa_difMSMH0",
  authDomain: "e-commerce-e48a6.firebaseapp.com",
  projectId: "e-commerce-e48a6",
  storageBucket: "e-commerce-e48a6.appspot.com",
  messagingSenderId: "889427720582",
  appId: "1:889427720582:web:91309bd3f83875e1331407"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const AuthContext = createContext(null);

// use -> we want to expose value returned by useProvideAuth throughout this app
const AuthProvider = ({ children }) => {
  const auth = useProvideAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
  // all children inside will have access to auth object 

};

export const useAuth = () => useContext(AuthContext);

function useProvideAuth() {              // creating a custom hook
  const [user, setUser] = useState();

  const signUp = (email, password, displayName) =>
    createUserWithEmailAndPassword(auth, email, password).then(({ user }) => {
      updateProfile(user, { displayName });             //  1st param - whose profile to update ; 2nd - updating display name 
      setUser(user);
      return user;
    });

  const signIn = (email, password) =>
    signInWithEmailAndPassword(auth, email, password).then(({ user }) => {
      setUser(user);
      return user;
    });

  const signOutUser = () => signOut(auth).then(() => setUser(null));

  useEffect(() => {
    // keep track of any changes to user 
    const unsubscribe = onAuthStateChanged(auth, (user) => {         // user -> changed/updated user  
      user ? setUser(user) : setUser(null);
    });

    return () => unsubscribe();  // unsubscribe from above event ie onAuthStateChanged ,   when hook is unmounted 
  });

  return {
    signIn,
    signUp,
    signOut: signOutUser,
    user,
  };
}

export default AuthProvider;
