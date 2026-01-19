import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from './Pages/LandingPage'
import Signup from './Pages/Signup';
import Login from './Pages/Login';
import PrivateRoute from '../PrivateRoute';
import Dashboard from './Pages/Dashboard';
import ProjectsListView from './Pages/ProjectsListView';

function App() {


  return (
    <>
      

     <Router>
      <Routes>
        <Route path="/" element={<LandingPage/>} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/login" element={<Login/>} />



         {/* Protected routes */}
        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>


        <Route element={<PrivateRoute />}>
          <Route path="/Dashboard/Projects" element={<ProjectsListView/>} />
        </Route>

        

        

      </Routes>
    </Router>

        

    </>
  )
}

export default App
