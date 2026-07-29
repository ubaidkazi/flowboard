import styles from '../styles/UpcomingTaskCard.module.css';
import TaskBadge from './ui/task-badge';
import {users} from './MockData';
import Avatar  from './ui/avatar-new';
import {Calendar} from 'lucide-react';
import AvatarGroup from './AvatarGroup';

function UpcomingTaskCard({title, description,tags, dueDate="No Date Set", assignees, onClick})
{

    
    // const visible = assignees?.slice(0, 3);
    // const remaining = assignees?.length - visible.length;    
    
    



    return(
        <>
        <div className={styles["card"]} onClick={onClick}>

            <div className={styles["left-section"]}>


                <div className={styles["title-and-badges"]}>
                    <h3 className={styles["title"]}>{title}</h3>
                    <div className={styles["badges"]}>

                        <TaskBadge badgeTitle={"Tag 1"}  />
                        <TaskBadge badgeTitle={"Tag 2"}  />   
                        <TaskBadge badgeTitle={"Tag 3"}  />

                    </div>
                    
                </div>

                <div className={styles["description"]}>
                    {description !== "" ? description : "No Description"}
                </div>

                
                

            </div>


            <div className={styles["right-section"]}>
                
                <div className={styles["avatar-group"]}>
                    {/* {visible.map((user) => (
                        <Avatar key={user.id} user={user} />
                    ))}

                    {remaining > 0 && (
                        <div className={`${styles.avatar} ${styles["avatar-more"]}`}>
                            +{remaining}
                        </div>
                     )} */}
                     
                </div>
                <AvatarGroup users={assignees} > </AvatarGroup>
            

                <div className={styles["due-date"]}>
                    <Calendar className="h-3.5 w-3.5" />

                    {dueDate}
                    

                </div>

            </div>

        </div>



        </>
    )

}

export default UpcomingTaskCard;