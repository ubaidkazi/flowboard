import Sidebar from '../components/Sidebar';
import styles from '../styles/ProjectsListView.module.css';
import { useNavigate } from 'react-router-dom';
import { Plus, Search, Funnel, Grid3X3, List} from 'lucide-react';
import ProjectListCard from '../components/ProjectListCard';
import { useState, useEffect} from 'react';
import NewProjectModal from '../components/NewProjectModal';


function ProjectsListView()
{

    const [projectsData, setProjectsData] = useState([]);
    const [refreshTrigger, setRefreshTrigger] = useState(0);
    const [isOpen, setIsOpen] = useState(false);



     const navigate = useNavigate();

    
    


  // GET ALL THE Projects
    //display the name and desc of each projects
    useEffect(() => {
      const fetchProjects = async () => {
        const token = localStorage.getItem("token");
        console.log(token);
  
        try {
          const response = await fetch("http://localhost:8080/project", {
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
            setProjectsData(data);
          } else {
            console.log("Failed to load projects data");
          }
        } catch (err) {
          console.error("Error fetching project:", err);
          console.log("Server error");
        }
      };
  
      fetchProjects();
    }, [refreshTrigger]);


    
    const refreshContent = () => {
    setRefreshTrigger(prev => prev +1);
    console.log("Refresh Content" + refreshTrigger);
    }

    const closeModal = () => {
        setIsOpen(false);
        refreshContent();
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

    
    const handleOpenProject = (id, name, desc) => {
      navigate(`/Dashboard/Projects/${id}/${encodeURIComponent(name)}`, {
      state: { projectDesc: desc }
    });
};

    









    
  






    return(

        <>
        <NewProjectModal  open={isOpen} close={closeModal}/>

        <div className={styles["main-div"]}>
            <Sidebar> </Sidebar>

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
                        <button className={styles["project-btn"]}> <h2 className={styles["btn-name"]} onClick={() => setIsOpen(true)}> <Plus  color="white" size={20} strokeWidth={2.4} className={styles["project-icon"]}   /> New Project </h2> </button>
                        
                    </div>
                    
                </div>
                


                <div className={styles["search-container"]}>
                    <div className={styles["search"]}>
                        <div className={styles["input-wrapper"]}>
                            <Search size={18} style={styles.icon} className={styles["input-icon"]} />
                            <input  type="text" placeholder="Search Projects..."  className={styles["input"]}/>
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

                
                <div className={styles["project-list-div"]}>
                            {/* <ProjectListCard title="Website Redesign" description={"Complete redesign of company website with modern UI/UX"}/> */}
                            {projectsData.map((project, index) => (
                            <ProjectListCard 
                                key={index} 
                                title={project.name} 
                                description={project.description}
                                onDelete={() => handleDeleteProject(project.id)}
                                openProject={() => handleOpenProject(project.id, project.name, project.description)}
                            />
                            ))}
                            
                        
                 </div>

                
                

            </div>
           


        </div>
        
        </>
    );
}

export default ProjectsListView;