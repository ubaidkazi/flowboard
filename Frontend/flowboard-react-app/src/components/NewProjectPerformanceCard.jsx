
import styles from "../styles/NewProjectPerformanceCard.module.css";




export default function NewProjectPerformanceCard()
{



    return(


        <>
        
        <div className={styles["card"]}>



            <div className={styles["top-div"]}>

                <h3 className={styles["project-label"]}> Website Redesign </h3>
                <h3 className={styles["progress-label"]}> 50% </h3>

            </div>
            
            <div> </div>


            <div className = {styles["progress-container"]}>
                               
                            <div className = {styles["progress-bar"]}>
                                    <div className = {styles["progress-fill"]}></div>
                            </div>
                        </div>







        </div>
        
        
        </>
    );
}