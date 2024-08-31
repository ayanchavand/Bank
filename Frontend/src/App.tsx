import { useAuthState } from 'react-firebase-hooks/auth'
import { Route, Routes } from 'react-router-dom'
import { auth } from './utils/firebase'
import { ThemeProvider } from './components/themeProvider'
import CardForm from './components/cardForm'
import SignIn from './components/signIn'
import CardView from './components/cardView'
import NavBar from './components/navbar'
import './App.css'

function App() {
  //auth as any is just a band aid
  //solution for a ts error
  const [user] = useAuthState(auth as any)

  if (user) {
    return (
      <>
        <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
          <NavBar />
          <Routes>
            <Route path='/' element={<SignIn />} />
            <Route path='/addCard' element={<CardForm />} />
            <Route path='/viewCard' element={<CardView />} />
          </Routes>
        </ThemeProvider>
      </>
    )
  }
  else {
    return (<SignIn />)
  }

}

export default App
