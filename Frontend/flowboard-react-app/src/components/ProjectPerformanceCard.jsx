import styles from '../styles/ProjectPerformanceCard.module.css';

function ProjectPerformanceCard()
{




    return(
        <>

        <div className={styles["main-div"]}>

            <div className={styles["title-div"]}>
                <h3 className={styles["project-title"]}> Website Redesign</h3>
                <div className={styles["cr-badge"]} > <h3> 75% Complete</h3></div>
            </div>

            <div className={styles["bottom-div"]}>
                

                <div className={styles["completion-div"]}>
                    <h3 className={styles["completion-title"]}> Completion</h3>
                    <h3 className={styles["completion-desc"]}> 75%</h3>
                    <div className = {styles["progress-bar"]}>
                        <div className = {styles["progress-fill"]}></div>
                    </div>
                   

                </div>

                <div className={styles["ontime-div"]}>
                    <h3 className={styles["ontime-title"]}> On Time</h3>
                    <h3 className={styles["ontime-desc"]}> 92%</h3>

                </div>

                <div className={styles["efficiency-div"]}>
                    <h3 className={styles["efficiency-title"]}> Efficiency</h3>
                    <h3 className={styles["efficiency-desc"]}> 88%</h3>

                </div>
            </div>

        </div>
        
        
        </>
    );

}
export default ProjectPerformanceCard;
