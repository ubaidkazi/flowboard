import { Trophy } from "lucide-react";
import styles from "../../styles/LeaderBoardCard.module.css";
import Avatar from "./avatar-new";



export default function LeaderBoardCard({rank, name, completedTasks, progressTasks, user, isTopUser})
{

    


    const user122 = 
    {
        id: '2',
        name: 'Sarah Chen',
        email: 'sarah@flowboard.io',
        avatarUrl:
          'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face',
        role: 'admin'
      }
    




    return(

        <>

        <div className={styles["card"]} >


            <div className={styles["rank-div"]}>

                <h3 className={styles["rank"]}>
                    {rank}
                </h3>

            </div>


            <div className={styles["avatar-section"]}>
                <Avatar user={user}></Avatar>

            </div>


            <div className={styles["stats-section"]}>

                

                

                <div className={styles["name-and-stat"]}>
                    <h3 className={styles["name"]}>
                    {name}
                    </h3>
                    <div className={styles["stats"]}>

                    {completedTasks} completed, {` `}
                    {progressTasks} in progress


                     </div>
                </div>

                <div>


                     {isTopUser && (

                    
                    <div className="flex gap-1 h-7 w-18 items-center justify-center rounded-lg bg-primary">
                        <Trophy className="h-4 w-4 text-white" /> <span className="text-white text-sm">Top</span>
                        </div>
                )}





                </div>

               
                

            </div>

        </div>




        
        
        
        </>
    );
}