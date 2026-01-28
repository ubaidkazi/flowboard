import Sidebar from '../components/Sidebar';
import styles from '../styles/ProjectView.module.css';
import { NavLink, useNavigate } from 'react-router-dom';
import DashboardCard from '../components/DashboardCard';
import ProjectCard from '../components/ProjectCard';
import { Kanban, CircleCheckBig, Users, Clock4Icon, ChartColumn, Plus, Search, Funnel, Grid3X3, List, FolderPen, NotepadText, Clock, User, CircleAlertIcon, Table} from 'lucide-react';
import QuickActionButton from '../components/QuickActionBtn';
import QuickActionButtonBlack from '../components/QuickActionBtnBlack';
import RecentActivityCard from '../components/RecentActivityCard';
import ProjectListCard from '../components/ProjectListCard';
import BoardListCard from '../components/BoardListCard';
import { useState, useEffect, act} from 'react';
import NewBoardModal from '../components/NewBoardModal';
import { useParams } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import NewMemberModal from '../components/NewMemberModal'

function ProjectView()
{

    const [boardsData, setBoardsData] = useState([]);
    const [projectMembersData, setProjectMembersData] = useState([]);
    const [refreshTrigger, setRefreshTrigger] = useState(0);
    const [isOpen, setIsOpen] = useState(false);
    const [isViewBoards, setIsViewBoards] = useState(true);
    const { projectId, projectName:projectParamName } = useParams();
    // const [isAddMemberOpen, setIsAddMemberOpen] = useState(false);
    const [isMMOpen, setIsMMOpen] = useState(false);
    const [projectDescription, setProjectDescription] = useState("");
    const [projectName, setProjectName] = useState(projectParamName);


    //INLINE EDITABLE NAME SECTION STATES
    const [isEditingName, setIsEditingName] = useState(false);
    const [editedProjectName, setEditedProjectName] = useState(projectName);
    
    //DESCRIPTION
    const [isEditingDesc, setIsEditingDesc] = useState(false);
    const [editedProjectDesc, setEditedProjectDesc] = useState(projectDescription);







    const TABS = {
      BOARDS: 'boards',
      PEOPLE: "people",
    }

    const searchParams = new URLSearchParams(location.search);
    const initialTab = searchParams.get("tab") || TABS.BOARDS;
    const [activeTab, setActiveTab] = useState(initialTab);
    


  useEffect(() => {
    const params = new URLSearchParams(location.search);
    params.set("tab", activeTab);
    navigate(`${location.pathname}?${params.toString()}`, { replace: true });
  }, [activeTab]);




    const navigate = useNavigate();


  const getProjectDescription = async (projectId) => {
      const token = localStorage.getItem("token");
      // const currentUser = localStorage.getItem("userId");
      console.log(token);

     
      try {
        const response = await fetch(`http://localhost:8080/project/desc/${projectId}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          },
          
        });

        if (response.ok) {
          const desc = await response.text();
          // setMessage(text);
          // const data = await response.json();
          setProjectDescription(desc);
          console.log("Got Desc:", response);
        } else {
          setMessage("Failed to get description of the project");
        }
      } catch (err) {
        console.error("Error getting project description:", err);
        
      }

     
    };


    
    const refreshContent = () => {
    setRefreshTrigger(prev => prev +1);
    console.log("Refresh Content" + refreshTrigger);
    }

    const closeModal = () => {
        setIsOpen(false);
        refreshContent();
    }

    const closeMemberModal = () =>
    {
      setIsMMOpen(false);
    }


    const handleDeleteProject = (id)=> {
        console.log("project deleted!!!");
        
        if (window.confirm("Are you sure you want to delete this project?")) {
                    deleteProject(id);
                    console.log(id);
            }

        
    }


    const deleteProject = async (projectId) => {
      const token = localStorage.getItem("token");
      // const currentUser = localStorage.getItem("userId");
      console.log(token);

     
      try {
        const response = await fetch(`http://localhost:8080/project/${projectId}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          },
          
        });

        if (response.ok) {
          // const text = await response.text();
          // setMessage(text);
          // const data = await response.json();
          console.log("Board Deleted:", response);
        } else {
          setMessage("Failed to delete project");
        }
      } catch (err) {
        console.error("Error delete project:", err);
        
      }

      refreshContent();
    };


    const toggleBoardsVisibility = () =>
    {
        setIsViewBoards(!isViewBoards);

    }

    // GET ALL THE BOARDS
  //display the name and desc of each board
  useEffect(() => {
    const fetchBoards = async () => {
      const token = localStorage.getItem("token");
      console.log(token);

      try {
        const response = await fetch(`http://localhost:8080/board/project/${projectId}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          // const text = await response.text();
          // setMessage(text);
          const data = await response.json();
          console.log("Fetched boards:", data);
          setBoardsData(data);
        } else {
          setMessage("Failed to load dashboard data");
        }
      } catch (err) {
        console.error("Error fetching dashboard:", err);
        setMessage("Server error");
      }
    };

    fetchBoards();
    getProjectDescription(projectId);
    getProjectName();
  }, [refreshTrigger]);



  // GET ALL THE Members
  useEffect(() => {
    const fetchMembers = async () => {
      const token = localStorage.getItem("token");
      console.log(token);

      try {
        const response = await fetch(`http://localhost:8080/project/${projectId}/members`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          // const text = await response.text();
          // setMessage(text);
          const data = await response.json();
          console.log("Fetched Members:", data);
          setProjectMembersData(data);
        } else {
          setMessage("Failed to load Members data");
        }
      } catch (err) {
        console.error("Error fetching Members:", err);
        setMessage("Server error");
      }
    };

    fetchMembers();
  }, [refreshTrigger]);





  const handleDeleteBoard = (boardId) => {
    if (window.confirm("Are you sure you want to delete this board?")) {
                    console.log("Delete Board presses" + boardId);
                    deleteBoard(boardId);
                    // console.log(id);
            }
    }

    const deleteBoard = async (boardId) => {
      const token = localStorage.getItem("token");
      // const currentUser = localStorage.getItem("userId");
      console.log(token);

     
      try {
        const response = await fetch(`http://localhost:8080/board/${boardId}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          },
          
        });

        if (response.ok) {
          // const text = await response.text();
          // setMessage(text);
          // const data = await response.json();
          console.log("Board Deleted:", response);
        } else {
          setMessage("Failed to delete board");
        }
      } catch (err) {
        console.error("Error delete board:", err);
        
      }

      refreshContent();
    };


    const deleteMember = async (projectId, userId) => {
      const token = localStorage.getItem("token");
      // const currentUser = localStorage.getItem("userId");
      console.log(token);

     
      try {
        const response = await fetch(`http://localhost:8080/project/${projectId}/members/${userId}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          },
          
        });

        if (response.ok) {
          // const text = await response.text();
          // setMessage(text);
          // const data = await response.json();
          console.log("Board Member:", response);
        } else {
          console.log("Failed to delete member");
        }
      } catch (err) {
        console.error("Error delete member:", err);
        
      }

      refreshContent();
    };


    const handleDeleteMember = (projectId, userId) =>
    {
      deleteMember(projectId, userId);
      console.log("delete member called");
    }


    const addMember = async(projectId, userId) => {

        const token = localStorage.getItem("token");
        console.log(token);

      try {
        const response = await fetch(`http://localhost:8080/project/${projectId}/members/${userId}`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          }
          
        });

        if (response.ok) {
          // const text = await response.text();
          // setMessage(text);
          // const data = await response.json();
          console.log("Member Added:", response);
          refreshContent();
        } else {
          console.log("Failed to add member");
          console.log(response.message);
        }
      } catch (err) {
        console.error("Error add member:", err);
      }
      
    };





    const addBoard = async() => {

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
        const response = await fetch("http://localhost:8080/board/18", {
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

    const handleOpenBoard = (id) => {
        openBoard(id);
    }

    const  openBoard = (id) => {
        navigate(`/board/${id}`);
    }


    const handleTabChange = (tab) => {
     if (tab !== activeTab) {
      setActiveTab(tab);
    }
    };




    const handleSaveProjectName = async () => {
  if (editedProjectName.trim() === "") return;

  setIsEditingName(false);

  if (editedProjectName !== projectName) {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(`http://localhost:8080/project/name/${projectId}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: editedProjectName,
      });

      if (response.ok) {
        setProjectName(editedProjectName);
        const query = location.search; // preserve ?tab=boards etc.
        const updatedPath = `/Dashboard/Projects/${projectId}/${encodeURIComponent(editedProjectName)}${query}`;

        // Navigate to updated path
        navigate(updatedPath, { replace: true });

        console.log("Project name updated");
        getProjectName();
      } else {
        console.error("Failed to update project name");
        // Optionally show an error
      }
    } catch (err) {
      console.error("Error updating project name:", err);
    }
  }
};


  const getProjectName  = async() => {

    try {
      const token = localStorage.getItem("token");

      const response = await fetch(`http://localhost:8080/project/name/${projectId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.text(); // ✅ await here
      console.log("Project name retrieved:", data);
      setProjectName(data);
      } else {
        console.error("Failed to get project name");
        // Optionally show an error
      }
    } catch (err) {
      console.error("Error getting project name:", err);
    }


  }

  const handleSaveProjectDesc = async () => {
  if (editedProjectDesc.trim() === "") {
    setIsEditingDesc(false);
    return;
  }

  setIsEditingDesc(false);

  if (editedProjectDesc !== projectDescription) {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(`http://localhost:8080/project/desc/${projectId}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: editedProjectDesc,
      });

      if (response.ok) {
        setProjectDescription(editedProjectDesc);
        console.log("Project description updated");
      } else {
        console.error("Failed to update project description");
      }
    } catch (err) {
      console.error("Error updating project description:", err);
    }
  }
};









    
  






    return(

        <>
        <NewBoardModal  open={isOpen} close={closeModal} projectId={projectId}/>
        <NewMemberModal  open={isMMOpen} close={closeMemberModal} projectId={projectId} addMember={addMember} currentUsers={projectMembersData}/>

        <div className={styles["main-div"]}>
            <Sidebar> </Sidebar>

            <div className={styles["projects-content"]}>


                <div className={styles["top-div"]}>
                    <div>
                         <h3 className={styles["project-name-heading"]}> Project Name </h3>
                         {/* Project Name Element */}
                         {isEditingName ? (
                                <input
                                  type="text"
                                  value={editedProjectName}
                                 onChange={(e) => setEditedProjectName(e.target.value)}
                                  onBlur={handleSaveProjectName}
                                 onKeyDown={(e) => {
                                   if (e.key === 'Enter') {
                                     handleSaveProjectName();
                                   } else if (e.key === 'Escape') {
                                      setIsEditingName(false);
                                            setEditedProjectName(projectName); // revert
                                   }
                                 }}
                                 autoFocus
                                  className={styles["editable-input"]}
                               />
                              ) : (
                                <h1
                                  className={styles["project-heading"]}
                                 onClick={() => setIsEditingName(true)}
                                                              style={{ cursor: "text" }}
                                       title="Click to edit"
                                >
                                 {projectName}
                              </h1>
                              )}

                         {/* <h1 className={styles["project-heading"]}>{projectName}  </h1> */}
                        {/* <h3 className={styles["project-text"]}> {projectDescription} </h3> */}
                        {/* <h3 className={styles["project-text"]}> All the details like people, boards, tasks are below </h3> */}
                    </div>
                    <div>
                         <h3 className={styles["project-name-heading"]}> Description </h3>
                         {/* <h1 className={styles["project-heading"]}>{projectName}  </h1> */}

                         {isEditingDesc ? (
                                <input
                                  type="text"
                                  value={editedProjectDesc}
                                 onChange={(e) => setEditedProjectDesc(e.target.value)}
                                  onBlur={handleSaveProjectDesc}
                                 onKeyDown={(e) => {
                                   if (e.key === 'Enter') {
                                     handleSaveProjectDesc();
                                   } else if (e.key === 'Escape') {
                                      setIsEditingDesc(false);
                                            setEditedProjectDesc(projectDescription); // revert
                                   }
                                 }}
                                 autoFocus
                                  className={styles["editable-input"]}
                               />
                              ) : (
                                <h1
                                  className={styles["project-heading"]}
                                 onClick={() => 
                                 {
                                  setIsEditingDesc(true);
                                 setEditedProjectDesc(projectDescription);
                                 }
                                 }
                                                              style={{ cursor: "text" }}
                                       title="Click to edit"
                                >
                                 {projectDescription}
                              </h1>
                              )}

                        {/* <h1 className={styles["project-heading"]}> {projectDescription} </h1> */}
                        {/* <h3 className={styles["project-text"]}> All the details like people, boards, tasks are below </h3> */}
                    </div>
                    <div className={styles["project-btn-div"]}   >
                        {/* <div className={styles["project-btn"]}> 
                            <Plus  color="white" size={20} strokeWidth={2.2} className={styles["icon"]}   />
                            <button    className={styles["nav-link"]}> <h2 className={styles["btn-name"]}> New Project </h2> </button>
                        </div> */}
                        { activeTab === TABS.BOARDS && 
                        (
                          <button className={styles["project-btn"]}> <h2 className={styles["btn-name"]} onClick={() => setIsOpen(true)} title='Add a new project'> <Plus  color="white" size={20} strokeWidth={2.4} className={styles["project-icon"]}   /> Board </h2> </button>
                        )
                        }
                        { activeTab === TABS.PEOPLE && 
                        (
                          <button className={styles["project-btn"]}> <h2 className={styles["btn-name"]} onClick={() => setIsMMOpen(true)}> <Plus  color="white" size={20} strokeWidth={2.4} className={styles["project-icon"]}  /> Invite </h2> </button>
                        )
                        }
                        
                        
                    </div>
                    
                </div>


                <div className={styles["tab-bar"]}>

                      <button onClick={() => handleTabChange(TABS.BOARDS)} className={`${styles["tab-btn"]} ${activeTab === TABS.BOARDS ? styles["tab-active"] : ""}`}>
                        Boards

                      </button>
                      <button className={ `${styles["tab-btn"]}   ${activeTab == TABS.PEOPLE ? styles["tab-active"] : "" } ` } onClick={() => handleTabChange(TABS.PEOPLE)}>
                        People
                      </button>
                </div>

                
                
                <div className={styles["content-wrapper"]}>


                
                
                
                
                    



                    <div className={styles["boards-people-div"]}>


                    

                    
                  
                    <div className={styles["boards-diva"]}>
                      { activeTab === TABS.BOARDS && (
                        <>
                        {/* <BoardListCard title= "BOARDS"  description= "board's description" onDelete={() => handleDeleteProject(2)}/> */}

                        <div className={styles["tab-title-icons"]}>
                  

                  <h1 className={styles["tab-title"]}> Project Boards</h1>

                  

                <div className={styles["search-container"]}>
                    <div className={styles["search"]}>
                        <div className={styles["input-wrapper"]}>
                            <Search size={18} style={styles.icon} className={styles["input-icon"]} />
                            <input  type="text" placeholder="Search a board..."  className={styles["input"]}/>
                        </div>
                    </div>
                    <div className={styles["filters"]}>
                        <button className={styles["filter-btn"]}> <Funnel  color="black" size={20} strokeWidth={2.0} className={styles["funnel-icon"]}/>   Filters </button>
                    </div>
                    <div className={styles["view-container"]}>
                        <div className={styles["view-btns"]}>
                            <button className={styles["view-btn"]}> <Grid3X3  color="black" size={20} strokeWidth={2.0} className={styles["funnel-icon"]}/> </button>
                            <button className={styles["view-btn"]}> <List  color="black" size={20} strokeWidth={2.0} className={styles["funnel-icon"]}/> </button>
                        </div>
                    </div>

                </div>

                </div>


                            <table className={styles["board-table"]}> 
                                <thead>
                                  <tr>
                                    <th> <FolderPen  size={17} /> Name </th>
                                    <th> <NotepadText size={17}/> Description </th>
                                    <th> <Clock  size={17}/> Updated Time </th>
                                    <th> <User size={17}/> Owner </th>
                                    <th> <CircleAlertIcon size={17}/> Priority </th>
                                  </tr>
                                </thead>
                                <tbody>
                                  { boardsData.map( board=>(
                                    <tr key={board.id}>
                                      <td onClick={ () => {handleOpenBoard(board.id)}}> {board.name}</td>
                                      <td> {board.description}</td>
                                      <td> {board.timeUpdated}</td>
                                      <td> Owner </td>
                                      <td onClick={ ()=>{handleDeleteBoard(board.id)}}> Prority </td>
                                    </tr>
                                  ))}
                                </tbody>
                        </table>
                        </>
                  
                      )
                      
                      
                      }
                    </div>

                    <div className={styles["peoplea-div"]}>
                      { activeTab === TABS.PEOPLE && 
                      
                      (
                      <>

                        <div className={styles["tab-title-icons"]}>
                  

                  <h1 className={styles["tab-title"]}> Project Members</h1>

                  

                <div className={styles["search-container"]}>
                    <div className={styles["search"]}>
                        <div className={styles["input-wrapper"]}>
                            <Search size={18} style={styles.icon} className={styles["input-icon"]} />
                            <input  type="text" placeholder="Search a project member..."  className={styles["input"]}/>
                        </div>
                    </div>
                    <div className={styles["filters"]}>
                        <button className={styles["filter-btn"]}> <Funnel  color="black" size={20} strokeWidth={2.0} className={styles["funnel-icon"]}/>   Filters </button>
                    </div>
                    <div className={styles["view-container"]}>
                        <div className={styles["view-btns"]}>
                            <button className={styles["view-btn"]}> <Grid3X3  color="black" size={20} strokeWidth={2.0} className={styles["funnel-icon"]}/> </button>
                            <button className={styles["view-btn"]}> <List  color="black" size={20} strokeWidth={2.0} className={styles["funnel-icon"]}/> </button>
                        </div>
                    </div>

                </div>

                </div>

                        
                        {/* // <BoardListCard title= "PEOPLES"  description= "board's description" onDelete={() => handleDeleteProject(2)}/> */}
                        <table className={styles["board-table"]}> 
                                <thead>
                                  <tr>
                                    <th> <FolderPen  size={17} /> Name </th>
                                    {/* <th> <NotepadText size={17}/> Description </th> */}
                                    <th> <Clock  size={17}/> Team </th>
                                    <th> <User size={17}/> Owner </th>
                                    <th> <CircleAlertIcon size={17}/> Priority </th>
                                  </tr>
                                </thead>
                                <tbody>
                                  { projectMembersData.map( member=>(
                                    <tr key={member.id}>
                                      <td> {member.user.username}</td>
                                      {/* <td> {board.description}</td> */}
                                      <td> Default </td>
                                      <td> Owner </td>
                                      <td onClick={ ()=>{handleDeleteMember(projectId, member.user.id)}}> Priorty </td>
                                    </tr>
                                  ))}
                                </tbody>
                        </table>

                        </>
                      )
                      }

                    </div>


                    </div>
                  </div>


            </div>
           


        </div>
        
        </>
    );
}

export default ProjectView;