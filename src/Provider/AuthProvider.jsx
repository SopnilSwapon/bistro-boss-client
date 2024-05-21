import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import app from "../Firebase/firebase.confiq";
import { GoogleAuthProvider } from "firebase/auth";

export const AuthContext = createContext(null);
const auth = getAuth(app);
const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true);
    const googleProvider = new GoogleAuthProvider();

    // Register Account //
    const crateAccount = (email, password) =>{
        return createUserWithEmailAndPassword(auth,email, password)
    }
    // sign In //
    const loginUser = (email, password) =>{
        return signInWithEmailAndPassword(auth, email, password)
    }
    // Google Login //
    const googleLogin = () =>{
        return signInWithPopup(auth, googleProvider)
    }
    // sign out//
    const userSignOut = () =>{
        return signOut(auth)
    }
    const authInfo = {
            loading,
            user,
            crateAccount,
            loginUser,
            googleLogin, 
            userSignOut
    }
    useEffect(()=>{
      const unSubscribe =  onAuthStateChanged(auth, currentUser =>{
            setUser(currentUser)
            setLoading(false)
            console.log(currentUser);
        })
        return () =>{
            return unSubscribe();
        }
    },[])
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;