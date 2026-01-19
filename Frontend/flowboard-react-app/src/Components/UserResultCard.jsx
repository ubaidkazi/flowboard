import styles from '../styles/UserResultCard.module.css';

function UserResultCard({ userName, userEmail, fullName, addMember, isDisabled})
{


    const getInitials = (fullName)=> 
    {
    if (!fullName) return '';

    const names = fullName.trim().split(' ');
    if (names.length === 1) return names[0][0].toUpperCase();

    return (
    names[0][0].toUpperCase() + names[names.length - 1][0].toUpperCase()
    );
    }


    const initials  = getInitials(fullName);







    return(

        <>

        <div className={styles["card"]}>

            <div className={styles["left-side"]}> 
                <div className={styles["profile-card"]}>
                                    <div className={styles["profile-avatar"]}>
                                    {initials}
                                    </div>
                                                        
                                </div>
            <div className={styles["name-email"]}>

                <div className={styles["userName"]}> {userName} </div>
            
            <div className={styles["email"]}> {userEmail} </div>

            </div>
            </div>


            <div className={styles["right-side"]}>

                <button onClick={addMember} className={`${styles["add-btn"]} ${isDisabled ? styles["disabled"] : ""}`} disabled={isDisabled}> {isDisabled ? "Already a Member" : "Add"}  </button>

            </div>



            


        </div>


        
        
        </>
    );
}

export default UserResultCard;