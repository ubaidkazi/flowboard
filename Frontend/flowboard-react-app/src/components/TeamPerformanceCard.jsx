import styles from '../styles/TeamPerformanceCard.module.css';
function TeamPerformanceCard()
{
    return(

        <>

        <div className={styles["main-div"]}>

            <div className={styles["left-div"]}>
                <div className={styles["profile-card"]}>
                        <div className={styles["profile-avatar"]}>
                                    SC
                        </div>
                        
                </div>

                <div className={styles["user-detail-div"]}>
                    <h1 className={styles["username"]}> Sara Chen</h1>
                    <h3 className={styles["tasks-completed"]}> 24 Tasks Completed </h3>


                </div>


            </div>


            <div className={styles["right-div"]}>
                <h3 className={styles["efficiency"]}> 94% Efficiency </h3>
                <h3 className={styles["avg-days"]}> Avg 2.5 days </h3>


            </div>




        </div>
        
        
        </>
    );
}
export default TeamPerformanceCard;