import styles from '../styles/ProjectCard.module.css';
import { NavLink } from 'react-router-dom';
import { Users, Calendar } from 'lucide-react';

function ProjectCard()
{



    return(

        <>
        <div className={styles["project-card"]}>

            <h1  className={styles["title"]}>Website Redesign</h1>
            <h3  className={styles["description"]}>Complete redesign of company website with modern UI/UX</h3>
            <div className = {styles["progress-container"]}>
                    <div className = {styles["progress-label"]}>
                        <span>Progress</span>
                        <span className = {styles["progress-percent"]}>75%</span>
                    </div>
                <div className = {styles["progress-bar"]}>
                        <div className = {styles["progress-fill"]}></div>
                </div>
            </div>

            <div className={styles["bottom-section"]}>

                <div className={styles["left-section"]}>
                    <h3 className={styles["members"]}> <Users size={16} className="icon" /> 4 members </h3>
                    <h3 className={styles["due-date"]}>  <Calendar size={16} className="icon" /> Due 2025-02-15 </h3>

                </div>
                <div className={styles["right-section"]}>

                    <NavLink  className={styles["view-board"]}>  View Board</NavLink>

                </div>
                

                
                
                

            </div>


        </div>
        
        
        </>
    );
}
export default ProjectCard;