import { act } from 'react';
import styles from '../styles/NewRecentActivityCard.module.css';
import Avatar from './ui/avatar-new';



const userId = localStorage.getItem("userId");


const user1 = 
    {
      id: 1,
      name: "John Smith",
      avatarUrl: `http://localhost:8080/user/${userId}/profile-picture`
    }



export default function NewRecentActivityCard({userName, actionType, action, timeStamp, avatarVariant }){




    return(

        <>
        <div className={styles["card"]}>


            <div className={styles["left-section"]}>

                <Avatar fullName={user1.name} userId={user1.id} variant={avatarVariant} className={styles["avatars"] }  />

            </div>


            <div className={styles["right-section"]}>

                <div className={styles["upper-right-section"]}>
                    <div className={styles["user-name"]}> {userName} </div>
                    <div className={styles["action-type"]}> {actionType} </div>
                    <div className={styles["action"]}> {action}  </div>
                </div>

                <div className={styles["time-stamp"]}>
                    {timeStamp}
                </div>
                

                
                
                

            </div>



        </div>
        
        
        
        
        
        </>
    )
}