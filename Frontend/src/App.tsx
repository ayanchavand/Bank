import './App.css'
import CardForm from './components/cardForm'
import { ThemeProvider } from './components/themeProvider'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from './utils/firebase'
import {Route, Routes} from 'react-router-dom'
import SignIn from './components/signIn'
import CardView from './components/cardView'
import NavBar from './components/navbar'
function App() {
  const [user] = useAuthState(auth)
  
  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <NavBar />
        <Routes>
          <Route path='/' element={<SignIn/>}/>
          <Route path='/addCard' element={<CardForm/>}/>
          <Route path='/viewCard' element={<CardView/>}/>
        </Routes>
      </ThemeProvider>
    </ >
  )
}

export default App
