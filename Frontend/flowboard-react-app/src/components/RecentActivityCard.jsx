import styles from '../styles/RecentActivityCard.module.css';
import { Dot } from 'lucide-react';

function RecentActivityCard({title ,description, username, time})
{



    return(
        <>

        <div className={styles["card"]}>

        <div className={styles["bullet-icon"]}> <Dot color='#1767e7ff' size={8} strokeWidth={20}  /></div>
        <div className={styles["content"]}>
            <div className={styles["title"]}> {title} </div>
            <div className={styles["description"]}> {description}</div>
            <div className={styles["details"]}> 
                <div className={styles["user-name"]}>  {username} </div>
                <div className={styles["small-icon"]}>   •  </div>
                <div className={styles["activity-time"]}>  {time}  </div>
            </div>
         </div>

        </div>
        
        
        
        </>
    );
}

export default RecentActivityCard;