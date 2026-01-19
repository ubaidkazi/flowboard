import styles from '../styles/DashboardCard.module.css';
// import { Kanban, CircleCheckBig} from 'lucide-react';

function DashboardCard({icon: Icon, iconcolor, value, metric})
{

    return(
        <>

        <div className={styles["dash-card"]}>

            <div className={styles["card-content"]}>

               
                {/* <Kanban size={39} className="kanban-icon"  color="#3b82f6"/> */}
                {/* <CircleCheckBig size={32} color="#08c751ff" strokeWidth={2.5} /> */}
                {/* <img src={cardicon} className={styles["icon"]}></img> */}
                <Icon size={32} color={iconcolor} strokeWidth={2.0} />
                <h2 className={styles["card-num"]}> {value} </h2>
                <h2 className={styles["card-desc"]}> {metric} </h2>

                
            </div>
            

        </div>
        
        
        
        
        
        </>
    );

}

export default DashboardCard