
import styles from '../styles/TeamView.module.css';
import { NavLink } from 'react-router-dom';
import ProjectCard from '../components/ProjectCard';
import { Kanban, CircleCheckBig, Users, Clock4Icon, ChartColumn, Plus, Search, Funnel, Grid3X3, List} from 'lucide-react';
import TeamMemberCard from '../Components/TeamMemberCard';



function TeamView()
{


    return(

        <>

        <div className={styles["main-diva"]}>
            

            <div className={styles["projects-content"]}>


                <div className={styles["top-div"]}>
                    <div>
                         <h1 className={styles["project-heading"]}>My Team</h1>
                        <h3 className={styles["project-text"]}> Manage and track all your team members in one place </h3>
                    </div>
                    <div className={styles["project-btn-div"]}>
                        <div className={styles["project-btn"]}> 
                            <Plus  color="white" size={20} strokeWidth={2.2} className={styles["icon"]}   />
                            <NavLink  className={styles["nav-link"]}> <h2 className={styles["btn-name"]}> Invite </h2> </NavLink>
                        </div>
                    </div>
                </div>
                


                <div className={styles["search-container"]}>
                    <div className={styles["search"]}>
                        <div className={styles["input-wrapper"]}>
                            <Search size={18} style={styles.icon} className={styles["input-icon"]} />
                            <input  type="text" placeholder="Search People..."  className={styles["input"]}/>
                        </div>
                    </div>
                    <div className={styles["filters"]}>
                        <button className={styles["filter-btn"]}> <Funnel  color="black" size={20} strokeWidth={2.0} className={styles["funnel-icon"]}/>   Filters </button>
                    </div>
                    <div className={styles["view-container"]}>
                        <div className={styles["view-btns"]}>
                            <button className={styles["view-btn"]}> <Grid3X3  color="black" size={20} strokeWidth={2.0} className={styles["funnel-icon"]}/> </button>
                            <button className={styles["view-btn"]}> <List  color="black" size={20} strokeWidth={2.0} className={styles["funnel-icon"]}/> </button>
                        </div>
                    </div>

                </div>

                
                <div className={styles["people-list-div"]}>

                    <TeamMemberCard></TeamMemberCard>
                    <TeamMemberCard></TeamMemberCard>
                    <TeamMemberCard></TeamMemberCard>
                    <TeamMemberCard></TeamMemberCard>
                    <TeamMemberCard></TeamMemberCard>
                       
                        
                 </div>

                
                

            </div>
           


        </div>
        
        
        
        </>
    );
}
export default TeamView;