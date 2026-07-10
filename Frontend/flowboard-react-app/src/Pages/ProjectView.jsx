import Sidebar from '../components/Sidebar';
import styles from '../styles/ProjectView.module.css';
import { NavLink, useNavigate, useLocation, useParams, Link } from 'react-router-dom';
import DashboardCard from '../components/DashboardCard';
import ProjectCard from '../components/ProjectCard';
import { Kanban, CircleCheckBig, Users, Clock4Icon, ChartColumn, Plus, Search, Funnel, Grid3X3, List, FolderPen, NotepadText, Clock, User, CircleAlertIcon, Table, ArrowLeft, LayoutGrid, UserRoundPlus, Trash2} from 'lucide-react';
import QuickActionButton from '../components/QuickActionBtn';
import QuickActionButtonBlack from '../components/QuickActionBtnBlack';
import RecentActivityCard from '../components/RecentActivityCard';
import ProjectListCard from '../components/ProjectListCard';
import BoardListCard from '../components/BoardListCard';
import { useState, useEffect, act} from 'react';
import NewBoardModal from '../components/NewBoardModal';
import NewMemberModal from '../components/NewMemberModal'
import TabSwitchComponent from '../components/ui/tab-switch-component';
import SprintCard from '../components/SprintCard';

import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';
import BoardCard from '../components/BoardCard';
import MemberCard from '../components/MemberCard';
import NewRecentActivityCard from '../components/NewRecentActivityCard';
import CreateBoardCard from '../components/CreateBoardCard';

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









    const memberMock = 
    {
      id: 1,
      name: "Ahmed Abbasi",
      contact: "ahmed@flowboard.io",
      avatarUrl: 'https://media.licdn.com/dms/image/v2/D5603AQHY1wnl6oalew/profile-displayphoto-scale_200_200/B56ZwIM876K4AY-/0/1769664141187?e=2147483647&v=beta&t=InVaKpyxNXmVeKj-2F5w8dbLC8zSnNKTkIzKAe6mutc',
      role: "Owner"
    }
    const memberMock2 = 
    {
      id: 1,
      name: "Alex Johnson",
      contact: "alex@flowboard.io",
      avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
      role: "Admin"
    }
    
    const memberMock3 = 
    {
      id: 1,
      name: "Alex Johnson",
      contact: "alex@flowboard.io",
      avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face',
      role: "Member"
    }
    const memberMock4 = 
    {
      id: 1,
      name: "Alex Johnson",
      contact: "alex@flowboard.io",
      avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face',
      role: "Member"
    }







   const TABS = [
        { label: "Boards", value: "boards"},
        { label: "Members", value: "members" },
        { label: "Activity", value: "activity" }
     ];



    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const initialTab = searchParams.get("tab") || "boards";
    const [activeTab, setActiveTab] = useState(initialTab);


    // const [activeTab, setActiveTab] = useState(TABS[0].value);


    const [modalVariant, setModalVariant] = useState("default");



    useEffect(() => {
      const token = localStorage.getItem("token");
      let stompClient;
    
     
      const socket = new SockJS("http://localhost:8080/ws");
    
      stompClient = new Client({
        webSocketFactory: () => socket,
        connectHeaders: {
          Authorization: `Bearer ${token}`,
        },
        onConnect: () => {
          console.log("STOMP connected");
    
          stompClient.subscribe(
            `/topic/projects/${projectId}`,
            (message) => {
              const event = JSON.parse(message.body);
              handleProjectEvent(event);
            }
          );
        },
      });
    
      stompClient.activate();
      //fetchBoard();
    
      return () => {
        stompClient.deactivate();
      };
    }, [projectId]);



    const handleProjectEvent = (event) => {
  switch (event.type) {
  

  case "BOARD_CREATED":


  const newBoard = {
        name  : event.title,
        description: event.desc,
        user: {
          id: event.createdBy
        }
      }

  

   setBoardsData((prev) => {
        if (!prev) return [newBoard];

        return [...prev, newBoard];
      });


  


  console.log("Board Added!");
  console.log(event);
  

  break;

 

  }
}



    


  useEffect(() => {
    const params = new URLSearchParams(location.search);
    params.set("tab", activeTab);
    navigate(`${location.pathname}?${params.toString()}`, { replace: true });
  }, [activeTab]);




    const navigate = useNavigate();


  const getProjectDescription = async (projectId) => {
      const token = localStorage.getItem("token");
      // const currentUser = localStorage.getItem("userId");
      //console.log(token);

     
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
          //console.log("Got Desc:", response);
        } else {
          setMessage("Failed to get description of the project");
        }
      } catch (err) {
        console.error("Error getting project description:", err);
        
      }

     
    };


    
    const refreshContent = () => {
    setRefreshTrigger(prev => prev +1);
    //console.log("Refresh Content" + refreshTrigger);
    }

    const closeModal = () => {
        setIsOpen(false);
        refreshContent();
    }

    const closeMemberModal = () =>
    {
      setIsMMOpen(false);
    }

    const openModal = (variant) =>
    {
      setIsMMOpen(true);
      setModalVariant(variant);

    }

      const handleDeleteProject = async (id) => {
          if (!window.confirm("Delete?")) return;

          try {
              await deleteProject(id);
              navigate(-1);
          } catch (err) {
              console.error(err);
          }
      };

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
          //console.log("Board Deleted:", response);
        } else {
          const text = await response.text();
          console.log(text);
          //setMessage("Failed to delete project");
        }
      } catch (err) {
        console.error("Error delete project:", err);
        
      }

     
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
      //console.log(token);

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
          //console.log("Fetched boards:", data);
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
      //console.log(token);

      try {
        const response = await fetch(`http://localhost:8080/project/member/all?projectId=${projectId}`, {
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
          //setMessage("Failed to load Members data");
        }
      } catch (err) {
        console.error("Error fetching Members:", err);
        //setMessage("Server error");
      }
    };

    fetchMembers();
  }, [refreshTrigger]);





  const handleDeleteBoard = (boardId) => {
    // if (window.confirm("Are you sure you want to delete this board?")) {
    //                 //console.log("Delete Board pressed" + boardId);
                   
    //                 // console.log(id);
    //         }

             deleteBoard(boardId);
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
          //console.log("Board Deleted:", response);
        } else {
          setMessage("Failed to delete board");
        }
      } catch (err) {
        console.error("Error delete board:", err);
        
      }

      refreshContent();
    };


    const deleteMember = async (userId) => {
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
          alert("Member removed successfully.");
        } else {
          const message = await response.text();

          switch (response.status) {
            case 403:
              alert(message); // "Only the project owner can remove members."
              break;

            case 400:
              alert(message); // "The project owner cannot be removed."
              break;

            case 404:
              alert(message); // "Member not found."
              break;

            default:
              alert(message || "Failed to delete member.");
          }
        }
      } catch (err) {
        console.error("Error deleting member:", err);
        alert("Something went wrong. Please try again.");
      }

      refreshContent();
    };


    const handleDeleteMember = (userId) =>
    {
      deleteMember(userId);
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





    const addBoard = async(boardData) => {

        const token = localStorage.getItem("token");
        const userId = localStorage.getItem("userId");
        //console.log(token);
        console.log(`Project ID: ${projectId}`)

        const newBoard = {
        name  : boardData,
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

    const handleOpenBoard = (id) => {
        refreshContent();
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
        const data = await response.text(); //await here
      //console.log("Project name retrieved:", data);
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



const handleOpenBoardModal = ()=>
{
  console.log("handleOpenBoardModal");
  openModal("board");
}



const handleAddBoard = (newBoardData)=> {
        addBoard(newBoardData);
        console.log("Add Board called");
        setIsMMOpen(false);
        refreshContent();
      
    }



const addProjectMember = async (identifier, role) => {
  try {
    const token = localStorage.getItem("token");

    const body = { identifier, role };

    console.log("Sending request body:", body);

    const response = await fetch(
      `http://localhost:8080/project/member/add?projectId=${projectId}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    );

    const text = await response.text();
    console.log("Response:", text);
    if(response.status === 409)
    {
      alert(text);
    }
    else if (!response.ok) {
      console.error("Request failed:", response.status, text);
    }
    
  } catch (err) {
    console.error("Error:", err);
  }
};




const handleAddMember = async (identifier, role)=>
{
   await addProjectMember(identifier, "MEMBER");
   console.log("add member function called")
   setIsMMOpen(false);
   refreshContent();

}










    
  






    return(

        <>
        {/* <NewBoardModal  open={isOpen} close={closeModal} projectId={projectId}/> */}
        <NewMemberModal  open={isMMOpen} close={closeMemberModal} projectId={projectId} addMember={addMember} currentUsers={projectMembersData} variant={modalVariant}  onSubmit={ modalVariant=="board" ? handleAddBoard : handleAddMember }/>

        <div className={styles["main-div"]}>
            

            <div className={styles["projects-content"]}>



              <div className={styles["back-navlink"]}>

                <Link to="/dashboard/projects" className={styles["link"]}>      <ArrowLeft size={18} />             Back to projects </Link>

              </div>


                <div className={styles["top-div"]}>



                  <div className={styles["icon-name-desc"]}>

                      <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10">
                          <LayoutGrid className="h-7 w-7 text-primary" />
                      </div>

                 







                    <div className={styles["name-desc"]}>
                         {/* Project Name Element */}
                         
                         
                         <div className={styles["project-title-div"]}>

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
                                  className={styles["project-title"]}
                                 onClick={() => setIsEditingName(true)}
                                                              style={{ cursor: "text" }}
                                       title="Click to edit"
                                >
                                 {projectName}
                              </h1>
                              )}


                         </div>


                         <div className={styles["desc-div"]}>

                          <h1
                                  className={styles["project-desc"]}
                                //  onClick={() => setIsEditingName(true)}
                                //                               style={{ cursor: "text" }}
                                      //  title="Click to edit"
                                >
                                 {projectDescription}
                              </h1>

                         </div>
                         

                            


                         {/* <h1 className={styles["project-heading"]}>{projectName}  </h1> */}
                        {/* <h3 className={styles["project-text"]}> {projectDescription} </h3> */}
                        {/* <h3 className={styles["project-text"]}> All the details like people, boards, tasks are below </h3> */}
                    </div>





                  </div>


                    


                    <div>
                         {/* <h1 className={styles["project-heading"]}>{projectName}  </h1> */}
{/* 
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
                              )} */}

                        {/* <h1 className={styles["project-heading"]}> {projectDescription} </h1> */}
                        {/* <h3 className={styles["project-text"]}> All the details like people, boards, tasks are below </h3> */}
                    </div>
                    <div className={styles["project-btn-div"]}   >
                        
                          {/* <button    className={styles["project-btn"]} onClick={() => setIsOpen(true)}> New Project  </button> */}
                                  
                          <button className={styles["project-btn"]} onClick={() => openModal("member")}>  <UserRoundPlus size={16} strokeWidth={2.4} className={styles["project-icon"]}  /> Invite  </button>
                          <button className={styles["project-btn"]} onClick={() => openModal("board")}>  <Kanban size={16} strokeWidth={2.4} className={styles["project-icon"]}  /> Create Board  </button>
                          <button className={styles["project-btn"]} onClick={() => handleDeleteProject(projectId)}>  <Trash2 size={16} strokeWidth={2.4} className={styles["project-icon"]}  /> Delete Project  </button>
                        
                        
                        
                        
                    </div>
                    
                </div>



                <div className={styles["profile-tabs"]}>
                                
                  <TabSwitchComponent options={TABS} activeTab={activeTab} onTabChange={handleTabChange} ></TabSwitchComponent>
                
                
                </div>



                    
                <div className={styles["project-grid-div"]}>



                { activeTab === "boards" && 
                      (<>

                      { boardsData.map( (board, index) =>(
                                    
                    
                                      <SprintCard
                                            key={index}
                                            title={board.name}
                                            listsNumber={board.columnCount}
                                            members={board.members}
                                            onClick={ ()=>{ handleOpenBoard(board.id) }    }
                                            onDelete={()=> {handleDeleteBoard(board.id)}}
                                            // coverGradient="linear-gradient(135deg,#d8b4fe,#818cf8)"
                                            // coverImage={"https://i.pravatar.cc/150?img=2"}
                                            />                                 
                                             ))}



                                             {/* <SprintCard
                                            title={"UBAID"}
                                            users={[
                                            "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
                                            "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
                                            "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
                                            ]}
                                            onClick={ ()=>{ handleOpenBoard(1) }    }
                                            // coverGradient="linear-gradient(135deg,#d8b4fe,#818cf8)"
                                            // coverImage={"https://i.pravatar.cc/150?img=2"}
                                            />                                  */}



                                            <CreateBoardCard onClick={handleOpenBoardModal}> </CreateBoardCard>

                    </>)}
















                    { activeTab === "members" && 
                      (<>
                      <div className={styles["cards-container"]}>
                        <div className={styles["cards-container-heading"]}> Team Members </div>
                          <div className={styles["mc-container"]}>



                            {projectMembersData.map( (member, index) =>(
                                    
                    
                                      <MemberCard member={member} key={index} onDelete={handleDeleteMember}/>                           
                                          ))}










                          </div>
                      </div>
                    </>)}















                    
                    { activeTab === "activity" && 
                      (<>
                      <div className={styles["cards-container"]}>
                        <div className={styles["cards-container-heading"]}> Recent Activity </div>
                          <div className={styles["rac-container"]}>
                            <NewRecentActivityCard userName={"Sara Chen"} actionType={"created"} action={"Design system update"} timeStamp={'5 minutes ago'} avatarVariant={'large'}  />
                            <NewRecentActivityCard userName={"Sara Chen"} actionType={"updated"} action={"3 cards"}  timeStamp={'25 minutes ago'} avatarVariant={'large'}/>
                            <NewRecentActivityCard userName={"Sara Chen"} actionType={"updated"} action={"3 cards"}  timeStamp={'25 minutes ago'} avatarVariant={'large'}/>
                            <NewRecentActivityCard userName={"Sara Chen"} actionType={"updated"} action={"3 cards"}  timeStamp={'25 minutes ago'} avatarVariant={'large'}/>
                            <NewRecentActivityCard userName={"Sara Chen"} actionType={"updated"} action={"3 cards"}  timeStamp={'25 minutes ago'} avatarVariant={'large'}/>
                            <NewRecentActivityCard userName={"Sara Chen"} actionType={"updated"} action={"3 cards"}  timeStamp={'25 minutes ago'} avatarVariant={'large'}/>

                            

                          </div>
                      </div>
                    </>)}

















                    













                      </div>

                      


            </div>
           


        </div>
        
        </>
    );
}

export default ProjectView;