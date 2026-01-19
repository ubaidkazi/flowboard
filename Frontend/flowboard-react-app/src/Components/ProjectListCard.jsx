import styles from '../styles/ProjectListCard.module.css';
import { FolderOpen, CircleCheckBig, Calendar, Users, Ellipsis, Trash, Trash2} from 'lucide-react';
import { NavLink } from 'react-router-dom';

function ProjectListCard({title, description, onDelete, openProject})
{

    return(

        <>

        <div className={styles["card"]}>

            <div className={styles["icon-div"]}>
                <FolderOpen size={26} color='#000000ff' strokeWidth={1.5} />
                <div className={styles["del-icon-div"]}>
                    <Trash2 size={20} strokeWidth={1.5} onClick={() => {onDelete()}} className={styles["menu-icon"]}/>
                </div>

            </div>

            <div className={styles["card-title-desc-div"]}>
                <h1 className={styles["card-title"]} onClick={openProject}> {title }</h1>
                <h2 className={styles["card-desc"]}  onClick={openProject}> {description} </h2>
            </div>


            <div className = {styles["progress-container"]}>
                                <div className = {styles["progress-label"]}>
                                    <span>Progress</span>
                                    <span className = {styles["progress-percent"]}>75%</span>
                                </div>
                            <div className = {styles["progress-bar"]}>
                                    <div className = {styles["progress-fill"]}></div>
                            </div>
            </div>

            <div className={styles["stats-div"]}>
                <div className={styles["left-stats-div"]}>
                    <CircleCheckBig color='#3333338e'  size={17}/>
                    <h3 className={styles["tasks-stat"]}>  18/24 tasks </h3>
                </div>
                <div className={styles["right-stats-div"]}>
                    <Calendar  color='#3333338e' size={17}  />
                    <h3 className={styles["days-left"]}> -177 days left </h3>


                </div>
            </div>


            <div className={styles["members-div"]}>
                    <Users  color='#3333338e' size={17}  />
                    <h3 className={styles["members-num"]}> 4 members </h3>
            </div>


            <div className={styles["status-div"]}>
                <NavLink className={styles["status"] + " " + styles["state"]}>active</NavLink>
                 <NavLink className={styles["status"] + " " + styles["priority"]}>high priority</NavLink>
            </div>



            <div className={styles["action-div"]}>
                <button className={styles["action-navlink1"]}  onClick={openProject} > View Board </button>
                <button className={styles["action-navlink2"]} onClick={openProject} > Open Project </button>
            </div>



        </div>
        
        
        
        
        </>
    );
}

export default ProjectListCard;