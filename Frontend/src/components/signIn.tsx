import React from "react"
import {auth, firebaseAuth} from '../utils/firebase'
import { Button } from "./ui/button"

export default function SignIn(){
    const onSignInWithGoogle = () =>{
        const provider = new firebaseAuth.GoogleAuthProvider()
        auth.signInWithPopup(provider)

        if()
    }
    return(
        <div className="flex items-center justify-center ">
            <Button onClick={onSignInWithGoogle} className="border border-spacing-2 text-xl ">Sign in with Google</Button>
        </div>
    )    
 }