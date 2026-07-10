import styles from '../styles/NewMemberModal.module.css';
import { Save, CirclePlus, CircleX, Variable, XIcon} from 'lucide-react';
import { useState, useRef, useEffect} from 'react';
import UserResultCard from './UserResultCard';

function NewMemberModal({open, close, projectId, addMember, currentUsers, variant="default", onSubmit})
{


 

  const currentMembers = currentUsers ?? [];



  // const variants = ["default", "Member", "Project", "Board"];



  const useVariant = variant;




   const [newProjectData, setNewProjectData] = useState({
        projectName: "",
        projectDesc: ""  
      });

    const handleProjectInputChange = (e) => {
        setNewProjectData( (prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }));

        console.log(e.target.value);
    }



    const [newBoardData, setNewBoardData] = useState("");
    const [memberIdentifier, setMemberIdentifier] = useState("");

   const handleBoardInputChange = (e) => {
    setNewBoardData(e.target.value);
    };

    const handleMemberInputChange = (e) => {
    setMemberIdentifier(e.target.value);
    };





    const handleAddProject = ()=> {

        //addProject();


        console.log("Add project called");


        onSubmit(newProjectData);
    }




     const handleAddBoard = ()=> {

        //addProject();


        console.log("Add Board called");


        onSubmit(newBoardData);
    }


    const handleAddMember = ()=> {

        //addProject();


        console.log("Add Member called");


        onSubmit(memberIdentifier);
    }


























    

    

    const [newQuery, setNewQuery] = useState("");


    const[userResults, setUserResults] = useState([]);

    const inputRef = useRef(null);

    useEffect(() => {
    inputRef.current?.focus();
    }, [open]);




     if(!open) return null;
     




    const handleInputChange = (e) => {
        const value = e.target.value;
        setNewQuery(value);
        //findUser(value);

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




            {useVariant == "default" && (
                        <>

                         <div className={styles["top-section"]}>                
                <div className={styles["title-desc"]}>

                    <h1 className={styles["modal-title"]}> THIS IS A DEFAULT MODAL - NO VARIANT </h1>
                    <h1 className={styles["modal-desc"]}> Send an invitation to collaborate on this project. </h1>

                </div>

                <div className={styles["close-div"]} onClick={close}>
                  <XIcon size={18}></XIcon>

                </div>

              </div>



                {/* <label className={styles["label"]}> Name: </label> */}

                <div className={styles["label-input"]}>

                  <label className={styles["label"]}>Email Address</label>
                <input ref={inputRef} type='text' name='newQuery' value={newQuery} onChange={handleInputChange}  placeholder='name@company.com' className={styles["input"]} required/>
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
                


                <div className={styles["bottom-div"]}>

                  <button className={styles["cancel-btn"]} onClick={close}>  Cancel</button>
                  <button className={styles["send-btn"]}> Send Invite</button>

                </div>


                          
                        </>
                      )}








              {useVariant == "member" && (
                        <>

                         <div className={styles["top-section"]}>                
                <div className={styles["title-desc"]}>

                    <h1 className={styles["modal-title"]}> Invite Team Member </h1>
                    <h1 className={styles["modal-desc"]}> Send an invitation to collaborate on this project. Enter their FlowBoard usename or email.</h1>

                </div>

                <div className={styles["close-div"]} onClick={close}>
                  <XIcon size={18}></XIcon>

                </div>

              </div>



                {/* <label className={styles["label"]}> Name: </label> */}

                <div className={styles["label-input"]}>

                  <label className={styles["label"]}>Email Address/Username</label>
                <input ref={inputRef} type='text' name='memberIdentifier' value={memberIdentifier} onChange={handleMemberInputChange}  placeholder='name@company.com' className={styles["input"]} required/>
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
                


                <div className={styles["bottom-div"]}>

                  <button className={styles["cancel-btn"]} onClick={close}>  Cancel</button>
                  <button className={styles["send-btn"]} onClick={handleAddMember}> Add to project</button>

                </div>


                          
                        </>
                      )}



              



              {useVariant == "project" && (
                        <>

                <div className={styles["top-section"]}>                
                <div className={styles["title-desc"]}>

                    <h1 className={styles["modal-title"]}> ADD PROJECT </h1>
                    <h1 className={styles["modal-desc"]}> Fill basic information about your new project. </h1>

                </div>

                <div className={styles["close-div"]} onClick={close}>
                  <XIcon size={18}></XIcon>

                </div>

              </div>



                {/* <label className={styles["label"]}> Name: </label> */}

                <div className={styles["label-input"]}>

                  <label className={styles["label"]}>Name:</label>
                <input ref={inputRef} type='text' name='projectName' value={newProjectData.projectName} onChange={handleProjectInputChange}  placeholder='My awesome project' className={styles["input"]} required/>
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
                
                <div className={styles["label-input"]}>

                  <label className={styles["label"]}>Description:</label>
                <textarea  type='text' name='projectDesc' value={newProjectData.projectDesc} onChange={handleProjectInputChange}  placeholder='Describe your project' className={styles["input"]} required/>
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
                


                <div className={styles["bottom-div"]}>

                  <button className={styles["cancel-btn"]} onClick={close}>  Cancel</button>
                  <button className={styles["send-btn"]} onClick={handleAddProject}> Add Project</button>

                </div>


                          
                        </>
                      )}











            {useVariant == "board" && (
                        <>

                         <div className={styles["top-section"]}>                
                <div className={styles["title-desc"]}>

                    <h1 className={styles["modal-title"]}> ADD BOARD </h1>
                    <h1 className={styles["modal-desc"]}> Name your new board </h1>

                </div>

                <div className={styles["close-div"]} onClick={close}>
                  <XIcon size={18}></XIcon>

                </div>

              </div>



                {/* <label className={styles["label"]}> Name: </label> */}

                <div className={styles["label-input"]}>

                  <label className={styles["label"]}>Title</label>
                <input ref={inputRef} type='text' name='newBoardData' value={newBoardData} onChange={handleBoardInputChange}  placeholder='My awesome board' className={styles["input"]} required/>
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
                


                <div className={styles["bottom-div"]}>

                  <button className={styles["cancel-btn"]} onClick={close}>  Cancel</button>
                  <button className={styles["send-btn"]} onClick={handleAddBoard}> Add Board</button>

                </div>


                          
                        </>
                      )}










             
                







              
                
                

                
                
                        
                            

            </div>

        </div>
        
        
        </>
    );
}

export default NewMemberModal;