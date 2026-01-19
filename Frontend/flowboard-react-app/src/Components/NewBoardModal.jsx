import styles from '../styles/NewProjectModal.module.css';
import { Save, CirclePlus, CircleX } from 'lucide-react';
import { useState } from 'react';

function NewBoardModal({open, close, projectId})
{

    if(!open) return null;



    const [newBoardData, setNewBoardData] = useState({
        boardName: "",
        boardDesc: ""  
      });


    const handleInputChange = (e) => {
        setNewBoardData( (prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }));

        console.log(e.target.value);
    }

    const handleAddBoard = (projecId)=> {
        addBoard(projecId);
        console.log("Add project called");
    }


    const addBoard = async(projectId) => {

        const token = localStorage.getItem("token");
        const userId = localStorage.getItem("userId");
        console.log(token);

        const newBoard = {
        name  : newBoardData.boardName,
        description: newBoardData.boardDesc,
        user: {
          id: userId
        }
      }

      try {
        const response = await fetch(`http://localhost:8080/board/${projectId}`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify(newBoard)
        });

        if (response.ok) {
          // const text = await response.text();
          // setMessage(text);
          // const data = await response.json();
          console.log("Board Added:", response);
        } else {
          setMessage("Failed to add Board");
        }
      } catch (err) {
        console.error("Error add Board:", err);
      }
      
    };

 




    return(


        <>

        <div className={styles["overlay"]} onClick={close}>

            <div className={styles["modal"]} onClick={ (e) => {e.stopPropagation()}}>
                
                
               


                <div className={styles["project-form"]}>


                  <div className={styles["close-modal"]}>
                    <button  onClick={close} className={styles["close-modal-btn"]}> <CircleX></CircleX> </button>
                  </div>

                   <form className={styles["form"]} >
                    

                    <div className={styles["label-input-div"]}>
                        <label className={styles["label"]}> Name: </label>
                        <input type='text' name='boardName' value={newBoardData.projectName} onChange={handleInputChange}  placeholder='name your new board' className={styles["input"]} required/> 

                    </div>
                    <div className={styles["label-input-div"]}>
                        <label className={styles["label"]}> Description: </label>
                        <input type='text' name='boardDesc'  value={newBoardData.projectDesc} onChange={handleInputChange}  placeholder='how would you describe it?' className={styles["input"]}/>
                    </div>
                    <div  className={styles["create-btn-div"]}>
                        <button type="submit" onClick={()=> handleAddBoard(projectId)} className={styles["create-btn"]}><CirclePlus size={15}/> Create Board </button>
                    </div>
                     



                    
                                
                                
                              

                                
                                






                    </form>


                </div>

            </div>



        </div>
        
        
        </>
    );
}

export default NewBoardModal;