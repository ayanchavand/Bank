import './App.css'
import CardForm from './components/cardForm'
import { ThemeProvider } from './components/themeProvider'
import {useAuthState} from 'react-firebase-hooks/auth'
import {auth} from './utils/firebase'
import SignIn from './components/signIn'
function App() {
 const [user] = useAuthState(auth)
  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        {user ? <CardForm/> :<SignIn/>}
      </ThemeProvider>
    </>
  )
}

export default App
