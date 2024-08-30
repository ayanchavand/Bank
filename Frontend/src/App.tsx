import './App.css'
import CardForm from './components/cardForm'
import { ThemeProvider } from './components/themeProvider'
import {useAuthState} from 'react-firebase-hooks/auth'
import {auth} from './utils/firebase'
import SignIn from './components/signIn'
import DebitCardView from './components/debitCardView'
import CreditCardForm from './components/forms/creditCardForm'
import CreditCardView from './components/creditCardView'
import CardView from './components/cardView'
import NavBar from './components/navbar'
function App() {
 const [user] = useAuthState(auth)
  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <NavBar/>
      </ThemeProvider>
    </>
  )
}

export default App
