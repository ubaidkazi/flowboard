import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'


createRoot(document.getElementById('root')).render(
  //Strict Mode On
  // <StrictMode>
  //   <App />
    
  // </StrictMode>,

  //Strict Mode Off
  <App />


)
