import styles from '../styles/UpcomingTaskCard.module.css';
import TaskBadge from './ui/task-badge';
import {users} from './MockData';
import Avatar  from './ui/avatar-new';
import {Calendar} from 'lucide-react';

function UpcomingTaskCard({title, description,tags, date})
{


    const visible = users.slice(0, 3);
    const remaining = users.length - visible.length;



    return(
        <>
        <div className={styles["card"]}>

            <div className={styles["left-section"]}>


                <div className={styles["title-and-badges"]}>
                    <h3 className={styles["title"]}>{title}</h3>
                    <div className={styles["badges"]}>

                        <TaskBadge badgeTitle={"Badge 1"}  />
                        <TaskBadge badgeTitle={"Badge 1"}  />   
                        <TaskBadge badgeTitle={"Badge 1"}  />

                    </div>
                    
                </div>

                <div className={styles["description"]}>
                    {description}
                </div>

                
                

            </div>


            <div className={styles["right-section"]}>
                
                <div className={styles["avatar-group"]}>
                    {visible.map((user) => (
                        <Avatar key={user.id} user={user} />
                    ))}

                    {remaining > 0 && (
                        <div className={`${styles.avatar} ${styles["avatar-more"]}`}>
                            +{remaining}
                        </div>
                     )}
                </div>
                {date}

                <div className={styles["due-date"]}>
                    <Calendar className="h-3.5 w-3.5" />

                    24 march 

                </div>

            </div>

        </div>



        </>
    )

}

export default UpcomingTaskCard;