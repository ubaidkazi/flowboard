import styles from '../styles/ProjectCardNew.module.css';
import { FolderKanban } from 'lucide-react';
import AvatarGroup from './AvatarGroup';

export default function ProjectCardNew({title, description, timeStamp, openProject, members})
{


    




    return(


        <>

        <div className={styles["card"]} onClick={()=>{openProject()}}>
            <div  className={` ${styles.iconDiv}  flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors `} >
            <FolderKanban className={` ${styles.icon}  h-6 w-6 text-primary`} />
          </div>

            <div className={styles["title-description"]}> 
                <h3 className={styles["title"]}> {title} </h3>
                <h3 className={styles["description"]}> {description} </h3>
            </div>
            <div className={styles["users-timestamp-section"]}>

                <div className={styles["user-avatar-group"]}>
                    

                    <AvatarGroup users={members}></AvatarGroup>
                    
                </div>

                <div >
                    <h3 className={styles["activity-timestamp"]}> 2 hours ago</h3>
                </div>    
                
             </div>


        </div>

        
        
        </>
    )
}