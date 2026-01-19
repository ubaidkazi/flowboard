import styles from '../styles/Sidebar.module.css';
import { useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { Kanban, LayoutDashboard, FolderOpen, Users, ChartColumn, Settings, Cog, LogOut } from 'lucide-react';

function Sidebar()
{
    const navigate = useNavigate();

    const fullName = localStorage.getItem("fullName");
    const email = localStorage.getItem("userEmail");
    

    

    const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    navigate("/Login");
    }


    const getInitials = (fullName)=> 
    {
    if (!fullName) return '';

    const names = fullName.trim().split(' ');
    if (names.length === 1) return names[0][0].toUpperCase();

    return (
    names[0][0].toUpperCase() + names[names.length - 1][0].toUpperCase()
    );
    }


    const initials  = getInitials(fullName);




    return(
        <>

        <div className={styles['sidebar']}>
            <div className={styles['sidebar-header']} >
                <div className={styles["brand-name-full"]}>
                    <Kanban color="#1462df" strokeWidth={2}  className={styles['icon']}/>
                    <NavLink to='/' className={styles['brand-name']}> FlowBoard</NavLink>
                </div>
                <div className={styles['divider']} />

            </div>

            


            
            
            
        
            <div className={styles["sidebar-links"]} >

                <div className={styles["top-section"]}>
                    <NavLink to="/newdashboard" className={({ isActive }) => isActive  ? `${styles["nav-link"]} ${styles["active-nav-link"]}` : styles["nav-link"]} > <LayoutDashboard size={20} strokeWidth={1.5} className={styles["link-icon"]} /> Dashboard </NavLink>
                    <NavLink to="/Dashboard/Projects" className={({ isActive }) => isActive  ? `${styles["nav-link"]} ${styles["active-nav-link"]}` : styles["nav-link"]}> <FolderOpen size={20}  strokeWidth={1.5}  className={styles["link-icon"]}/> Projects </NavLink>
                    <NavLink to="/Dashboard/people"className={({ isActive }) => isActive  ? `${styles["nav-link"]} ${styles["active-nav-link"]}` : styles["nav-link"]}>  <Users size={20} strokeWidth={1.5} className={styles["link-icon"]} /> My Team </NavLink>
                    <NavLink to="/Dashboard/Analytics" className={({ isActive }) => isActive  ? `${styles["nav-link"]} ${styles["active-nav-link"]}` : styles["nav-link"]}>  <ChartColumn size={20}  strokeWidth={1.5} className={styles["link-icon"]} /> Analytics </NavLink>
                    <NavLink to="/Dashboard/Settings"className={({ isActive }) => isActive  ? `${styles["nav-link"]} ${styles["active-nav-link"]}` : styles["nav-link"]}><Settings size={20} strokeWidth={1.5} className={styles["link-icon"]} /> Settings </NavLink>
                </div>


            
            <div className={styles["bottom-section"]}>
                <div className={styles['divider']} />
                {/* <NavLink to="/dashboard/settings" className={styles["nav-link"]}>   <Users size={25} color="#1a1c1def" strokeWidth={1.5} className={styles["link-icon"]} /> Name section </NavLink> */}
                <div className={styles["user-detail-div"]}>
                    <div className={styles["profile-card"]}>
                        <div className={styles["profile-avatar"]}>
                        {initials}
                        </div>
                                            
                    </div>
                    <div className={styles["name-email-div"]}>
                        <h3 className={styles["user-name"]}> {fullName} </h3>
                        <h4 className={styles["user-email"]}>  {email} </h4>
                    </div>
                    


                </div>
                
                <button onClick={handleLogout} className={styles["logout-button"]}> <div className={styles["logout-icon-div"]}> <LogOut size={20}> </LogOut>  Logout  </div>  </button>
                </div>

            {/* {localStorage.getItem("fullName")}  {localStorage.getItem("userEmail")} */}

            </div>
        
        </div>
        
        </>
    );


}

export default Sidebar;