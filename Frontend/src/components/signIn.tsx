import React from "react"
import {auth, firebaseAuth} from '../utils/firebase'
import { Button } from "./ui/button"
import { useAuthState } from "react-firebase-hooks/auth"

export default function SignIn(){
    const [user] = useAuthState(auth)
    const onSignInWithGoogle = () =>{
        const provider = new firebaseAuth.GoogleAuthProvider()
        auth.signInWithPopup(provider)
    }
    if(!user){
        return(
            <div className="flex justify-center items-center my-56">
                <Button onClick={onSignInWithGoogle} className="border border-spacing-2 text-xl">Sign in with Google</Button>
            </div>
        ) 
    }
    else{
        return(
            <div className="flex justify-center items-center my-56">
                <h1 className="text-3xl">You are already Signed in</h1>
            </div>
        ) 
    }
       
 }