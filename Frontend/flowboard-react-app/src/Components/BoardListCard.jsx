import styles from '../styles/BoardListCard.module.css';
import { Kanban, CircleCheckBig, Calendar, Users, Trash2} from 'lucide-react';
import { NavLink } from 'react-router-dom';

function BoardListCard({title, description, onDelete, onOpen})
{

    return(

        <>

        <div className={styles["card"]}>

            <div className={styles["icon-div"]}>
                {/* <Kanban size={26} color='rgba(0, 0, 0, 1)' strokeWidth={2.5} /> */}
                <h1 className={styles["card-title"]}> {title }</h1>
                <div className={styles["del-icon-div"]}>
                    <Trash2 size={20} strokeWidth={1.5} onClick={() => {onDelete()}} className={styles["menu-icon"]}/>
                </div>

            </div>

            <div className={styles["card-title-desc-div"]}>
               
                {/* <h2 className={styles["card-desc"]}> {description} </h2> */}
            </div>


            

            <div className={styles["stats-div"]}>
                <div className={styles["left-stats-div"]}>
                    <CircleCheckBig color='#3333338e'  size={17}/>
                    <h3 className={styles["tasks-stat"]}>  18/24 tasks </h3>
                </div>
               <div className={styles["members-div"]}>
                    <Users  color='#3333338e' size={17}  />
                    <h3 className={styles["members-num"]}> 4 members </h3>
            </div>
            </div>


            


        
            {/* <div className={styles["action-div"]}>
                <button className={styles["action-navlink1"]} > View Team </button>
                <button className={styles["action-navlink2"]} onClick={() => {onOpen()}} > Open Board </button>
            </div> */}



        </div>
        
        
        
        
        </>
    );
}

export default BoardListCard;