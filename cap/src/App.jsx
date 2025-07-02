import { useState } from 'react'
import './App.css'
const ACCESS_KEY = import.meta.env.VITE_APP_APIFLASH_ACCESS_KEY;

function App() {
  const [inputs, setInputs] = useState({
    url: "",
    format: "",
    no_ads: "",
    no_cookie_banners: "",
    width: "",
    height: "",
  })

  return (
    <>
      
    </>
  )
}

export default App
