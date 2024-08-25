import './App.css'
import CardForm from './components/cardForm'
import { ThemeProvider } from './components/themeProvider'
function App() {


  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <CardForm />
      </ThemeProvider>

    </>
  )
}

export default App
