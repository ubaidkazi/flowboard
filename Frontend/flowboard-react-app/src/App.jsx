import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from './Pages/LandingPage'
import Signup from './Pages/Signup';
import Login from './Pages/Login';

function App() {


  return (
    <>
      

     <Router>
      <Routes>
        <Route path="/" element={<LandingPage/>} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/login" element={<Login/>} />
        

      </Routes>
    </Router>

        

    </>
  )
}

export default App
