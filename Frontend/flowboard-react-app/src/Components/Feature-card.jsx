import styles from '../styles/FeatureCard.module.css'

function FeatureCard({icon: Icon, name, desc, iconSize})
{



    return (
        <>
        <div className={styles["card"]}>

            {/* <img src={kanabnblue} className={styles["icon"]}> </img> */}
            <Icon color={"#1462df"} size={iconSize} strokeWidth={2}> </Icon>
                
            
            <h1 className={styles["name"]}>
                {name}
            </h1>
            <h1 className={styles["desc"]}>
                {desc}
            </h1>


        </div>

        </>
    );
}
export default FeatureCard;