import { Title } from '@radix-ui/react-dialog';
import styles from '../styles/QuickActionCard.module.css';
import {Link} from 'react-router-dom';

export default function QuickActionCard({ actionName, icon: Icon, address})
{




    return(

        <>
        <div className={styles["card"]}>
            <Link to={address} className={styles["link"]}>
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 group-hover:bg-primary/20 hover:color-red transition-colors mb-3">
            <Icon className={`${styles.icon} h-6 w-6 text-primary`} />
            
                </div>
                <span className={styles["action-name"]}>{actionName}</span>
            </Link>
        </div>


        {/* <div className={styles["card"]}>

            <Link className={styles["Link"]}/>

            

            

        </div> */}

        
        
        </>
    )

}