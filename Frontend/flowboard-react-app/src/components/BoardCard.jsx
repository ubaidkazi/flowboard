import styles from '../styles/BoardCard.module.css';



export default function BoardCard({boardTitle, users, totalLists, backGround})
{


    return(

        <>

        <div  className={styles["card"]}>


            <div className={styles["cover"]}>
                <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face" className={styles["cover"]}></img>
                
            </div>


             <div className={styles["title-members-lists"]}>

                <div className={styles["title"]}>

                    {boardTitle}

                </div>


                <div className={styles["members-lists"]}>

                    <div>
                         {totalLists}

                    </div>
                    <div>
                         {totalLists}

                    </div>

                   

                    


                </div>
                
            </div>






        </div>
        
        
        
        </>
    );
}