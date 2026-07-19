
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from './pages/LandingPage'
import NewLandingPage from './pages/NewLandingPage'
import Signup from './pages/Signup';
import Login from './pages/Login';
import PrivateRoute from '../PrivateRoute';
import Dashboard from './pages/Dashboard';
import ProjectsListView from './pages/ProjectsListView';
import ProjectView from './pages/ProjectView';
import Board from './pages/Board';
import MainLayout from './components/MainLayout';
import TeamView from './pages/TeamView';
import Analytics from "./pages/Analytics";
import Settings from "./pages/Settings";
import TTW from "./pages/TestTW";
import BoardLayout from './components/BoardLayout';
import BoardCopy from "./pages/BoardCopy";



function App() {


  return (
    <>


     <div className="app">
      {/* your app content */}

      <Router>
      <Routes>


        {/* Not Protected + No Layout */}
        <Route path="/" element={<NewLandingPage/>} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/TW" element={<TTW/>} />
        {/* <Route path="/dashboardtemp" element={<Dashboardtemp/>} /> */}





        {/* Protected + MAIN Layout */}
        <Route element={<PrivateRoute />}>
          <Route element={<MainLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/dashboard/projects" element={<ProjectsListView/>} />
            <Route path="/dashboard/projects/:projectId/:projectName" element={<ProjectView/>} />
            <Route path="/dashboard/people" element={<TeamView/>} />
            <Route path="/dashboard/analytics" element={<Analytics/>} />
            <Route path="/dashboard/settings" element={<Settings />} />
          </Route>

        </Route>


       

        
        {/* Protected + board Layout */}
        
        {/* <Route element={<PrivateRoute />}>
          <Route element={<BoardLayout />}>
           <Route path="/board/:boardId" element={<Board/>} />
            
          </Route>

        </Route>  */}




         <Route element={<PrivateRoute />}>
          
           <Route path="/board/:boardId" element={<Board/>} />
            
    
        </Route>
  

         <Route element={<PrivateRoute />}>
          
           <Route path="/boards/:boardId" element={<BoardCopy/>} />
            
    
        </Route>





        

        

      </Routes>
    </Router>
    
    </div>



      

     

        

    </>
  )
}

export default App
