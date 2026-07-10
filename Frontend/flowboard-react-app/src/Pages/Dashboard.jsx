import styles from '../styles/Dashboard.module.css';
import NewSidebar from '../components/Sidebar';
import DashboardCard from '../components/DashboardCard';
import ProjectCard from '../components/ProjectCard';
import { FolderKanban, Kanban, CircleCheckBig, Users, Clock, ChartColumn, Plus, CalendarCheck,
  CheckCircle2, ArrowRight, Settings} from 'lucide-react';
import QuickActionButton from '../components/QuickActionBtn';
import QuickActionButtonBlack from '../components/QuickActionBtnBlack';
import RecentActivityCard from '../components/RecentActivityCard';
import { useState, useEffect } from 'react';
import { Item } from '@radix-ui/react-dropdown-menu';
import { href, Link, NavLink } from 'react-router-dom';
import UpcomingTaskCard from '../components/UpcomingTaskCard';
import NewRecentActivityCard from '../components/NewRecentActivityCard';
import QuickActionCard from '../components/QuickActionCard';
import ProjectCardNew from '../components/ProjectCardNew';


function Dashboard()
{

    const [projectsData, setProjectsData] = useState([]);


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
        }, []);
    
    
        const fullUserName = localStorage.getItem("fullName");

        const names = fullUserName.trim().split(' ');

        const firstName = names[0];






    return (
        <>
        <div className={styles["main-div"]}>
            {/* <NewSidebar> </NewSidebar> */}

            <div className={styles["dashboard-content"]}>
                <div>
                    <h1 className={styles["dashboard-heading"]}>Welcome back, {firstName}</h1>
                    <h3 className={styles["dashboard-text"]}> Here's what's happening with your projects today. </h3>

                </div>
                


                <div className={styles["card-container"]}>
                    <DashboardCard title="Total Projects" value={12}  icon={FolderKanban} trend={{ value: 12, positive: true }}></DashboardCard>
                    <DashboardCard title="Tasks Due Today" value={12}  icon={CalendarCheck} trend={{ value: 12, positive: false }}></DashboardCard>
                    <DashboardCard title="Completed Tasks" value={12}  icon={CheckCircle2} trend={{ value: 12, positive: true }}></DashboardCard>
                    <DashboardCard title="Active Collaborators" value={12}  icon={Users} ></DashboardCard>
                   
                </div>




                <div className={styles["upcoming-taks-recent-activity"]}>
                    
                    
                    
                    <div className={styles["upcoming-tasks"]}>

                        <div className={styles["heading-and-navlink"]}>
                            <h3 className={styles["upcoming-tasks-heading"]}>Upcoming Tasks</h3>
                            <Link className={styles["view-all-navlink"]} to="/Dashboard/Projects"> 
                                View All
                                <ArrowRight className="ml-1 h-4 w-4"/>
                            </Link> 
                        </div>

                        <div className={styles["task-cards-container"]}>
                            <UpcomingTaskCard  
                            title={"Design new landing page"}
                            description={"Create mockups for the new landing page design"}
                            />
                            <UpcomingTaskCard  
                            title={"Design new landing page"}
                            description={"Create mockups for the new landing page design"}
                            />
                            <UpcomingTaskCard  
                            title={"Design new landing page"}
                            description={"Create mockups for the new landing page design"}
                            />
                           

                        </div>


                    </div>
                    
                    
                    <div className={styles["new-recent-activity"]}>
                        
                        <div className={styles["recent-activity-heading"]}>  Recent Activity </div>
                            
                        <div className={styles["recentactivity-card-container"]}>
                            <NewRecentActivityCard userName={"Sara Chen"} actionType={"created"} action={"Design system update"} timeStamp={'5 minutes ago'}  />
                            <NewRecentActivityCard userName={"Sara Chen"} actionType={"created"} action={"3 cards"}  timeStamp={'5 minutes ago'}/>
                            <NewRecentActivityCard userName={"Sara Chen"} actionType={"created"} action={"3 cards"}  timeStamp={'5 minutes ago'}/>
                            <NewRecentActivityCard userName={"Sara Chen"} actionType={"created"} action={"3 cards"}  timeStamp={'5 minutes ago'}/>
                            <NewRecentActivityCard userName={"Sara Chen"} actionType={"created"} action={"3 cards"}  timeStamp={'5 minutes ago'}/>
                            <NewRecentActivityCard userName={"Sara Chen"} actionType={"created"} action={"3 cards"}  timeStamp={'5 minutes ago'}/>
                            <NewRecentActivityCard userName={"Sara Chen"} actionType={"created"} action={"3 cards"}  timeStamp={'5 minutes ago'}/>

                        </div>

                    </div>

                </div>



                 <div className={styles["quick-actions"]}>

                    <div className={styles["quick-actions-heading"]}>  Quick Actions </div>

                    <div className={styles["quick-action-cards-container"]}>

                        <QuickActionCard actionName={'Create Project'} icon={Plus} address={"Projects"}/>
                        <QuickActionCard actionName={'Invite Team'} icon={Users} address={"Projects"}/>
                        <QuickActionCard actionName={'View Reports'} icon={Clock} address={"Analytics"}/>
                        <QuickActionCard actionName={'Settings'} icon={Settings} address={"Settings"}/>

                    </div>
                </div>



                <div className={styles["recent-projects-section"]}>

                   
                   <div className={styles["recent-projects"]}>

                        <div className={styles["heading-and-navlink"]}>
                            <h3 className={styles["recent-projects-heading"]}>Recent Projects</h3>
                            
                            <Link className={styles["view-all-navlink"]} to="/Dashboard/Projects"> 
                                View All
                                <ArrowRight className="ml-1 h-4 w-4"/>
                            </Link> 
                        </div>

                        <div className={styles["recent-projects-container"]}>

                            <ProjectCardNew title={"Website Redesign"} description={"Complete overhaul of the company website with modern design"}/>
                            <ProjectCardNew title={"Website Redesign"} description={"Complete overhaul of the company website with modern design"}/>
                            <ProjectCardNew title={"Website Redesign"} description={"Complete overhaul of the company website with modern design"}/>
                            <ProjectCardNew title={"Website Redesign"} description={"Complete overhaul of the company website with modern design"}/>
                            <ProjectCardNew title={"Website Redesign"} description={"Complete overhaul of the company website with modern design"}/>
                            <ProjectCardNew title={"Website Redesign"} description={"Complete overhaul of the company website with modern design"}/>
                            <ProjectCardNew title={"Website Redesign"} description={"Complete overhaul of the company website with modern design"}/>
                            <ProjectCardNew title={"Website Redesign"} description={"Complete overhaul of the company website with modern design"}/>
                            <ProjectCardNew title={"Website Redesign"} description={"Complete overhaul of the company website with modern design"}/>

                        </div>




                    </div>

                </div>












                
                {/* <div className={styles["action-section"]}>

                    <div className={styles["active-projects"]}>
                        <div  className={styles["active-projects-title"]}>
                            <h1> ACTIVE PROJECTS </h1>
                        </div>

                        {projectsData.map((project, index) => (
                        <ProjectCard 
                            key={project.id} 
                            title={project.name} 
                            description={project.description}
                        />
                        ))}
                    </div>

                    <div className={styles["action-history-container"]}>
                        <div className={styles["quick-action"]}>
                            <h1>Quick Actions</h1>
                            <QuickActionButtonBlack name="View All Boards" icon={Kanban} path="/landingpage" ></QuickActionButtonBlack>
                            <QuickActionButton name="Create New Project" icon={Plus}></QuickActionButton>
                            <QuickActionButton name="View Analytics" icon={ChartColumn}></QuickActionButton>
                            <QuickActionButton name="Manage Team" icon={Users}></QuickActionButton>
                        </div> 

                        <div className={styles["recent-activity"]}>
                            <h1>Recent Activity</h1>
                            <RecentActivityCard title="Task Completed" description="Design system components finalized" username="Sarah Chen" time=" 2 hours ago"/>
                            <RecentActivityCard title="Task Completed" description="Design system components finalized" username="Sarah Chen" time=" 2 hours ago"/>
                            <RecentActivityCard title="Task Completed" description="Design system components finalized" username="Sarah Chen" time=" 2 hours ago"/>
                            <RecentActivityCard title="Task Completed" description="Design system components finalized" username="Sarah Chen" time=" 2 hours ago"/>
                            <RecentActivityCard title="Task Completed" description="Design system components finalized" username="Sarah Chen" time=" 2 hours ago"/>
                            <RecentActivityCard title="Task Completed" description="Design system components finalized" username="Sarah Chen" time=" 2 hours ago"/>
                        </div>
                    </div>

                </div> */}

            </div>
        </div>
        
        
        </>
    );
}

export default Dashboard;