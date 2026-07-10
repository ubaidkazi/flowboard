import styles from '../styles/MemberCard.module.css';
import Avatar from './ui/avatar-new';
import TaskBadge from './ui/task-badge';
import { Trash2 } from 'lucide-react';



export default function MemberCard({member, onDelete})
{

    if (!member) {
        return null; // or a loader/skeleton
    }



    const imgSrc = "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face";
    const userId = member?.id;
    const userFullName= member?.fullName;


    return(
        <>

        <div  className={styles["card"]}>

            


            <div className={styles["avatar-name"]}>

                <Avatar userId={userId} fullName={userFullName} variant='large'></Avatar>
                <div className={styles["name-contact"]}>
                    <h3 className={styles["name"]}> {member.fullName} </h3>
                    <h3 className={styles["contact"]}>  {member.email} </h3>




                </div>

               


            </div>


            <div className={styles["role"]}>

                
                <div  className={styles["del-icon-div"]} 
                          onClick={() => {
                              onDelete(userId);
                            }}>
                            <Trash2 size={15} strokeWidth={1.8} className={styles["del-icon"]}/>
                          </div>
                
                <TaskBadge badgeTitle={member.role}></TaskBadge>

                

                

            </div>



        </div>



        
        
        
        
        
        </>
    );



}