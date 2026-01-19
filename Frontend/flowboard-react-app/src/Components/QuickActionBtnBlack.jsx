import styles from '..//styles/QuickActionBtnBlack.module.css';
import { NavLink } from 'react-router-dom';

function QuickActionBtnBlack({name,path, icon: Icon})
{




    return(
        <>
        <div className={styles["button"]}> 
            <Icon  color="white" size={25} strokeWidth={2.2} className={styles["icon"]}   />
            <NavLink to={path} className={styles["nav-link"]}> <h2 className={styles["btn-name"]}> {name} </h2> </NavLink>

        </div>
        </>
    );
}

export default QuickActionBtnBlack;