import styles from '../styles/NewProjectModal.module.css';
import { Save, CirclePlus, CircleX } from 'lucide-react';
import { useState } from 'react';

function NewProjectModal({open, close})
{

    if(!open) return null;


    const [newProjectData, setNewProjectData] = useState({
        projectName: "",
        projectDesc: ""  
      });


    const handleInputChange = (e) => {
        setNewProjectData( (prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }));

        console.log(e.target.value);
    }

    const handleAddProject = ()=> {
        addProject();
        console.log("Add project called");
    }


    const addProject = async() => {

        const token = localStorage.getItem("token");
        const userId = localStorage.getItem("userId");
        console.log(token);

        const newProject = {
        name  : newProjectData.projectName,
        description: newProjectData.projectDesc,
        owner: {
          id: userId
        }
      }

      try {
        const response = await fetch("http://localhost:8080/project/create", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify(newProject)
        });

        if (response.ok) {
          // const text = await response.text();
          // setMessage(text);
          // const data = await response.json();
          console.log("Project Added:", response);
        } else {
          setMessage("Failed to add Project");
        }
      } catch (err) {
        console.error("Error add Project:", err);
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
                        <input type='text' name='projectName' value={newProjectData.projectName} onChange={handleInputChange}  placeholder='name your new project' className={styles["input"]} required/> 

                    </div>
                    <div className={styles["label-input-div"]}>
                        <label className={styles["label"]}> Description: </label>
                        <input type='text' name='projectDesc'  value={newProjectData.projectDesc} onChange={handleInputChange}  placeholder='how would you describe it?' className={styles["input"]}/>
                    </div>
                    <div  className={styles["create-btn-div"]}>
                        <button type="submit" onClick={()=> handleAddProject()} className={styles["create-btn"]}><CirclePlus size={15}/> Create Project </button>
                    </div>
                     



                    
                                
                                
                              

                                
                                






                    </form>


                </div>

            </div>



        </div>
        
        
        </>
    );
}

export default NewProjectModal;