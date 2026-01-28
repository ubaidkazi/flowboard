import styles from '../styles/NewMemberModal.module.css';
import { Save, CirclePlus, CircleX, Variable } from 'lucide-react';
import { useState, useRef, useEffect} from 'react';
import UserResultCard from './UserResultCard';

function NewMemberModal({open, close, projectId, addMember, currentUsers})
{

    if(!open) return null;

    const currentMembers = currentUsers;

    

    const [newQuery, setNewQuery] = useState("");


    const[userResults, setUserResults] = useState([]);

    const inputRef = useRef(null);

    useEffect(() => {
    inputRef.current?.focus();
    }, []);




    const handleInputChange = (e) => {
        const value = e.target.value;
        setNewQuery(value);
        findUser(value);

        // console.log(e.target.value);
    }

   

    


    


    const findUser = async(query) => {

        const token = localStorage.getItem("token");
        // const userId = localStorage.getItem("userId");
        // console.log(token);

        
    // console.log(JSON.stringify(newMember));

      try {
        const response = await fetch(`http://localhost:8080/users/search?query=${query}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          },
        //   body: JSON.stringify(newMember)
        });

        if (response.ok) {
          // const text = await response.text();
          // setMessage(text);
          // const data = await response.json();
        const data = await response.json();
        setUserResults(data);
          console.log("Search member called");
        } else {
          console.log("Failed to add member");
          console.log(response.message);
        }
      } catch (err) {
        console.error("Error add member:", err);
      }
      
    };

    const currentUserId = localStorage.getItem("userId");




    return(


        <>

        <div className={styles["overlay"]} onClick={close}>

            <div className={styles["modal"]} onClick={ (e) => {e.stopPropagation()}}>
                
                

                
                {/* <label className={styles["label"]}> Name: </label> */}
                <input ref={inputRef} type='text' name='newQuery' value={newQuery} onChange={handleInputChange}  placeholder='their username here' className={styles["input"]} required/>
                {/* <button onClick={ () => {handleAddMember(projectId)}}> Add </button> */}
                {userResults
                .filter(user => user.id !== Number(currentUserId)) 
                .map((user) => {
                    const isDisabled = currentMembers.some((member) => member.user.id === user.id);
  
                    return (
                    <UserResultCard
                 key={user.id}
                userName={user.username}
                userEmail={user.email}
                fullName={user.fullName}
                addMember={() => addMember(projectId, user.id)}
                isDisabled={isDisabled}/>
                );
                })}

                        
                            

            </div>

        </div>
        
        
        </>
    );
}

export default NewMemberModal;