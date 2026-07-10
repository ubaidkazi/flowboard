import Avatar from "./ui/avatar-new"
// import {users} from './MockData';
import styles from '../styles/UpcomingTaskCard.module.css';

export default function AvatarGroup({users})
{

    if(!users)
    {
        return;
    }

    






    const visible = users.slice(0, 3);
    const remaining = users.length - visible.length;




    return(

        <>


        <div className={styles["right-section"]}>
                
                <div 
                    style={
                        {
                            
                        display: "flex",
                        alignItems: "center",
  
                        }
                    }>
                    {visible.map((user,index) => (
                        <div 
                                        className={styles.avatarWrapper} key={index}
                                        >
                        <Avatar key={index} fullName={user.fullName} userId={user.id} />

                         <div className={styles.avatarTooltip}>
                                            <strong>{user.fullName}</strong>
                                            <span>{user.email}</span>
                                        </div>
                                        </div>

                    ))}

                    {remaining > 0 && (
                        <div className={`${styles.avatar} ${styles["avatar-more"]}`}>
                            +{remaining}
                        </div>
                     )}
                </div>
                

                

        </div>


        {/* <div
            style={{
                backgroundColor: "lightblue",
                padding: "20px",
                borderRadius: "10px",
            }}>
            <h1 style={{ color: "navy" }}>
                Hello React
            </h1>
        </div> */}




        
        
        </>
    );
}