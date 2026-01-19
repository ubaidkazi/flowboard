import styles from '..//styles/QuickActionBtn.module.css';
import { NavLink } from 'react-router-dom';

function QuickActionBtn({name,path, icon: Icon})
{




    return(
        <>
        <div className={styles["button"]}> 
            <Icon  color="black" size={25} strokeWidth={1.5} className={styles["icon"]}   />
            <NavLink to={path} className={styles["nav-link"]}> <h2 className={styles["btn-name"]}> {name} </h2> </NavLink>

        </div>
        </>
    );
}

export default QuickActionBtn;