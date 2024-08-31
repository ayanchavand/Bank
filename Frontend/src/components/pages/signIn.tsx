import { auth, firebaseAuth } from '../utils/firebase'
import { useAuthState } from "react-firebase-hooks/auth"
import { Button } from "./ui/button"

export default function SignIn() {
    const [user] = useAuthState(auth as any)

    const onSignInWithGoogle = () => {
        const provider = new firebaseAuth.GoogleAuthProvider()
        auth.signInWithPopup(provider)
    }

    if (!user) {
        return (
            <div className="flex justify-center items-center my-56">
                <Button onClick={onSignInWithGoogle}
                className="border border-spacing-2 text-xl">Sign in with Google</Button>
            </div>
        )
    } else {
        return (
            <div className="flex flex-wrap justify-center items-center my-56">
                <h1 className="text-3xl">Welcome, {auth.currentUser?.displayName}</h1>
                <Button onClick={() => auth.signOut()} 
                className="border border-spacing-2 text-xl m-10">Sign out</Button>
            </div>
        )
    }

}