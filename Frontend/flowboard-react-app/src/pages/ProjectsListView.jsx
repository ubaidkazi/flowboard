import styles from '../styles/ProjectsListView.module.css';
import { useNavigate } from 'react-router-dom';
import { Plus, Search, Funnel, LayoutGrid, List} from 'lucide-react';
import ProjectListCard from '../components/ProjectListCard';
import { useState, useEffect} from 'react';
import NewProjectModal from '../components/NewProjectModal';
import ProjectCardNew from '../components/ProjectCardNew';
import TabSwitchComponent from '../components/ui/tab-switch-component';
import NewMemberModal from '../components/NewMemberModal';
import { API_BASE_URL } from '../api/config';
import {getProjects} from '../service/projectService';
import { getRelativeTime } from '../lib/dateUtils';




function ProjectsListView()
{

    const [projectsData, setProjectsData] = useState([]);
    const [refreshTrigger, setRefreshTrigger] = useState(0);
    const [isProjectModalOpen, setProjectModalOpen] = useState(false);
     const navigate = useNavigate();


    //could also only use labels and compare the labels, but having value will let us change the labels without changing any logic.
    const tabs = [
    { label: "All Projects", value: "all projects" },
    { label: "Owned", value: "owned projects" },
    { label: "Shared", value: "shared projects" }, ];

    const [activeTab, setActiveTab] = useState(tabs[0].value);

    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };


    const views = {
      Grid: "grid",
      List: "list",
    }
        



    const[activeView, setActiveView] = useState(views.Grid);

    const handleViewChange = (view) => {
     if (view !== activeView) {
      setActiveView(view);
    }
    };



  // GET ALL THE Projects
  //display the name and desc of each projects
  useEffect(() => {

    const fetchProjects = async () => {

        try {

            const data = await getProjects();


            const sortedProjects = [...data].sort((a, b) => {
              const dateA = new Date(
                a.lastActivityAt ?? a.updatedAt ?? a.createdAt
              );

              const dateB = new Date(
                b.lastActivityAt ?? b.updatedAt ?? b.createdAt
              );

              return dateB - dateA;
            });

            setProjectsData(sortedProjects);

        } catch(error) {

            console.error(error);

        }

    };
    fetchProjects();

}, [refreshTrigger]);  

    
    const refreshContent = () => {
    setRefreshTrigger(prev => prev +1);
    console.log("Refresh Content" + refreshTrigger);
    }

    const closeModal = () => {
        setProjectModalOpen(false);
        refreshContent();
    }


    const handleDeleteProject =  async(id)=> {
        console.log("project deleted!!!");
        
        if (window.confirm("Are you sure you want to delete this project?")) {
                    await deleteProject(id);
                    console.log(id);
            }

        
    }

  
    const deleteProject = async (projectId) => {
      const token = localStorage.getItem("token");

     
      try {
        const response = await fetch(`${API_BASE_URL}/project/${projectId}`, {
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

    
    const handleOpenProject = (id, name, desc) => {
      navigate(`/Dashboard/Projects/${id}/${encodeURIComponent(name)}`, {
      state: { projectDesc: desc }
    });
};


const addProject = async(newProjectData) => {

        console.log(newProjectData);
        const token = localStorage.getItem("token");
        const userId = localStorage.getItem("userId");
        

        const newProject = {
        name  : newProjectData.projectName,
        description: newProjectData.projectDesc,
        owner: {
          id: userId
        }
      }

      try {
        const response = await fetch(`${API_BASE_URL}/project/create`, {
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



    const handleAddProject =  async (newProjectData)=> {
        await addProject(newProjectData);
        console.log("Add project called");
        setProjectModalOpen(false);
        refreshContent();
      
    }
    
    
  const ownedProjects = projectsData?.filter(project => project.role === "OWNER");
  const sharedProjects = projectsData?.filter(project => project.role === "MEMBER")


  const displayedProjects =
    activeTab === "owned projects"
        ? ownedProjects
        : activeTab === "shared projects"
        ? sharedProjects
        : projectsData;



const emptyMessage =
  activeTab === "owned projects"
    ? "You don't own any projects yet :)"
    : activeTab === "shared projects"
    ? "No Shared Projects :)"
    : "You don't have any active projects :)";


// <ProjectCardNew
//                                 key={project.id}
//                                 title={project.name}
//                                 description={project.description}
//                                 members={project.projectMembers}
//                                 timeStamp={getRelativeTime(project.lastActivityAt)}
//                                 openProject={() =>
//                                   handleOpenProject(
//                                     project.id,
//                                     project.name,
//                                     project.description 
//                                   )
//                                 }
//                               />

    return(
        <>
        {/* <NewProjectModal  open={isOpen} close={closeModal}/> */}
        {isProjectModalOpen && (
                <NewMemberModal
                  open={true}
                  close={() => setProjectModalOpen(false)}
                  variant="project"
                  onSubmit={handleAddProject}
                  
                />
              )}


        <div className={styles["main-div"]}>

            <div className={styles["projects-content"]}>


                <div className={styles["top-div"]}>
                    <div>
                         <h1 className={styles["project-heading"]}>Projects</h1>
                        <h3 className={styles["project-text"]}> Manage and track all your projects in one place </h3>
                    </div>
                    <div className={styles["project-btn-div"]}   >
                        {/* <div className={styles["project-btn"]}> 
                            <Plus  color="white" size={20} strokeWidth={2.2} className={styles["icon"]}   />
                            <button    className={styles["nav-link"]}> <h2 className={styles["btn-name"]}> New Project </h2> </button>
                        </div> */}
                        <button className={styles["project-btn"]} onClick={() => setProjectModalOpen(true)}> <h2 className={styles["btn-name"]} > <Plus  color="white" size={20} strokeWidth={2.4} className={styles["project-icon"]}   /> New Project </h2> </button>
                        
                    </div>
                    
                </div>
                
                <div className={styles["search-container"]}>


                    <div className={styles["project-type-tabs"]}>

                         <TabSwitchComponent options={tabs} activeTab={activeTab} onTabChange={handleTabChange} ></TabSwitchComponent>


                        

                    </div>


                        <div className={styles["search-view-container"]}>
                          <div className={styles["search"]}>
                            <div className={styles["input-wrapper"]}>
                              <Search size={18} style={styles.icon} className={styles["input-icon"]} />
                              <input  type="text" placeholder="Search Projects..."  className={styles["input"]}/>
                            </div>
                           </div>


            
                    <div className={styles["view-container"]}>


                        <div className={styles["view-btns"]}>
                            <button className={ `${styles["view-btn"]}   ${activeView === views.Grid ? styles["view-btn-active"] : "" } ` } onClick={()=>{handleViewChange(views.Grid)}}> <LayoutGrid  size={20} strokeWidth={2.0} className={styles["funnel-icon"]} /> </button>
                            <button className={ `${styles["view-btn"]}   ${activeView === views.List ? styles["view-btn-active"] : "" } ` }  onClick={()=>{handleViewChange(views.List)}}> <List   size={20} strokeWidth={2.0} className={styles["funnel-icon"]} /> </button>
                        </div>
                    </div>

                  </div>
                </div>


                
                <div
                    className={
                      activeView === views.List
                        ? styles["project-list-div"]
                        : styles["project-grid-div"]
                    }
                  >
                    {displayedProjects?.length > 0 ? (
                      displayedProjects.map((project) => (
                        <ProjectCardNew
                          key={project.id}
                          title={project.name}
                          description={project.description}
                          members={project.projectMembers}
                          timeStamp={getRelativeTime(project.lastActivityAt)}
                          openProject={() =>
                            handleOpenProject(
                              project.id,
                              project.name,
                              project.description
                            )
                          }
                        />
                      ))
                    ) : (
                      <div className={styles.emptyState}>
                        {emptyMessage}
                      </div>
                    )}
                  </div>
            </div>
        </div>
        
        </>
    );
}

export default ProjectsListView;