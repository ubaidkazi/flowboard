import Avatar from "./avatar-new"
import { X } from "lucide-react"
export default function MemberSearchCard({userId, fullName, onClick, isMember=false, toggleMember})
{


     const styles = {
        memberResultCard : {
      display: "flex",
      alignItems: "center",
      gap: "1rem",
      border: "1px solid lightgray",
      padding: "0.3rem",
      borderRadius: "var(--radius)",
       justifyContent: "space-between",
    },
    xIcon: {
      cursor: "pointer",
      
    },
    rightSide:
    {
      display: "flex",
      alignItems: "center",
      gap: "1rem"
     
    },
    leftSide:
    {
      padding: "0.2rem 1rem"

    }
    
    }




    return(

        <>

        <div style={styles.memberResultCard} onClick={onClick}>
        
                                <div style={styles.rightSide}>

                                   <Avatar userId={userId} fullName={fullName} ></Avatar>
                                <p> {fullName}</p>

                                </div>
                               
                              {isMember &&
                                            (
                                              <div style={styles.leftSide}>
                                                 <X onClick={toggleMember} style={styles.xIcon} size={22}> </X>


                                              </div>

                                              
                                            )



                              }
                               
        
        
        </div>

        
        
        </>
    )
}