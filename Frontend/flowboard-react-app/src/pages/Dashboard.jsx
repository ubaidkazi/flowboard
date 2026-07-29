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
import { API_BASE_URL } from '../api/config';
import { fetchDashboardData } from "../api/dashboardApi";
import { useNavigate } from 'react-router-dom';
import {getRelativeTime, formatDate} from '../lib/dateUtils';

function Dashboard()
{

    const [projectsData, setProjectsData] = useState([]);

    const [dashboardData, setDashboardData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();


    useEffect(() => {
    const loadDashboard = async () => {
        try {
        setIsLoading(true);
        setError(null);

        const data = await fetchDashboardData();
        setDashboardData(data);
       
        } catch (error) {
        console.error("Unable to load dashboard:", error);
        setError("Unable to load dashboard.");
        } finally {
        setIsLoading(false);
        }
    };

    loadDashboard();
    }, []);


    console.log(getRelativeTime("2026-07-26T16:04:11.771727"));

    const openTask = (task) => {
    navigate(
      `/board/${task.boardId}?cardId=${task.cardId}`
    );
  };




    // // GET ALL THE Projects
    //     //display the name and desc of each projects
    //     useEffect(() => {
    //       const fetchProjects = async () => {
    //         const token = localStorage.getItem("token");
    //         // console.log(token);
      
    //         try {
    //           const response = await fetch(`${API_BASE_URL}/project`, {
    //             method: "GET",
    //             headers: {
    //               Authorization: `Bearer ${token}`,
    //             },
    //           });
      
    //           if (response.ok) {
    //             // const text = await response.text();
    //             // setMessage(text);
    //             const data = await response.json();
    //             // console.log("Fetched boards:", data);
    //             setProjectsData(data);
    //           } else {
    //             console.log("Failed to load projects data");
    //           }
    //         } catch (err) {
    //           console.error("Error fetching project:", err);
    //           console.log("Server error");
    //         }
    //       };
      
    //       fetchProjects();
    //     }, []);
    
    
        const fullUserName = localStorage.getItem("fullName");

        const names = fullUserName.trim().split(' ');

        const firstName = names[0];


         
    const handleOpenProject = (id, name, desc) => {
      navigate(`/Dashboard/Projects/${id}/${encodeURIComponent(name)}`, {
      state: { projectDesc: desc }
    });
};

const completedTrend = dashboardData?.summary?.completedTasksTrend;









    return (
        <>
        <div className={styles["main-div"]}>
            {/* <NewSidebar> </NewSidebar> */}

            <div className={styles["dashboard-content"]}>
                <div>
                    <h1 className={styles["dashboard-heading"]}>Welcome back, {firstName}</h1>
                    <h3 className={styles["dashboard-text"]}> Here's what's happening with your projects today. </h3>

                </div>


                {dashboardData?.summary?.totalProjects === 0 && (
                    <div className={styles["onboarding-banner"]}>
                    <h2>Welcome to FlowBoard</h2>

                    <p>
                        Create your first project to start organizing tasks and collaborating.
                    </p>

                    <Link to="/Dashboard/Projects">
                        Create your first project
                    </Link>
                    </div>
                )}

                


                <div className={styles["card-container"]}>
                    <DashboardCard title="Total Projects" value={dashboardData?.summary.totalProjects}  icon={FolderKanban} description={"Across your workspace"} toolTip={"Projects you own and you are collaborating on accross your workspace"}></DashboardCard>
                    <DashboardCard title="Tasks Due Today" value={dashboardData?.summary.tasksDueToday}  icon={CalendarCheck} description={"Across all projects"} toolTip={"Tasks assigned to you and are due today"}></DashboardCard>
                    <DashboardCard title="Completed Tasks" value={dashboardData?.summary.completedTasksThisWeek}  icon={CheckCircle2} 
                                trend={
                                    completedTrend != null
                                    ? {
                                        value: Math.abs(completedTrend),
                                        positive: completedTrend >= 0
                                    }
                                    : null
                            }
                            showTrendPlaceholder={true}
                            toolTip={"Tasks assigned to you and marked completed. Percentage below is comparison to your completed tasks at this point in previous week"}>
                
                    </DashboardCard>
                    {/* <DashboardCard title="Completed Tasks" value={dashboardData?.summary.completedTasksThisWeek}  icon={CheckCircle2} 
                                trend={{
                                    
                                        value: Math.abs(49),
                                        positive: 49 >= 0
                                    }
                                    
                            }
                            showTrendPlaceholder={true}
                            toolTip={"Tasks assigned to you and marked completed. Percentage below is comparison to your completed tasks at this point in previous week"}>
                
                    </DashboardCard> */}
                    <DashboardCard title="Active Collaborators" value={dashboardData?.summary.activeCollaborators}  icon={Users} description={"Across all projects"} toolTip={"Active Collaborators across workspace"} ></DashboardCard>
                   
                </div>




                <div className={styles["upcoming-taks-recent-activity"]}>
                    
                    
                    
                    <div className={styles["upcoming-tasks"]}>

                        <div className={styles["heading-and-navlink"]}>
                            <h3 title="Unfinished Tasks that are assigned to you and are due within a week or overdue or have no due date" className={styles["upcoming-tasks-heading"]}>My Tasks</h3>
                            <Link className={styles["view-all-navlink"]} to="/Dashboard/Projects"> 
                                View All
                                <ArrowRight className="ml-1 h-4 w-4"/>
                            </Link> 
                        </div>

                        <div className={styles["task-cards-container"]}>

                            {/* {
                                dashboardData?.tasks.map((task, index)=>(
                                    <UpcomingTaskCard  
                                    key={index}
                            title={task.title}
                            description={task.description}
                            dueDate={formatDate(task.dueDate)}
                            assignees={task.assignees}
                            onClick={()=>{openTask(task)}}
                            />
                                    
                                ))
                            } */}


                            {dashboardData?.tasks?.length > 0 ? (
                            dashboardData.tasks.map((task, index)=>(
                                    <UpcomingTaskCard  
                                    key={index}
                            title={task.title}
                            description={task.description}
                            dueDate={formatDate(task.dueDate)}
                            assignees={task.assignees}
                            onClick={()=>{openTask(task)}}
                            />
                                    
                                ))
                            ) : (
                            <div className={styles["empty-state"]}>
                                <h4>No tasks assigned yet</h4>
                                <p>Assigned and upcoming tasks will appear here.</p>
                                <Link to="/Dashboard/Projects">View projects</Link>
                            </div>
                            )}











{/* 
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
                            <UpcomingTaskCard  
                            title={"Design new landing page"}
                            description={"Create mockups for the new landing page design"}
                            /> */}
                           

                        </div>


                    </div>
                    
                    
                    <div className={styles["new-recent-activity"]}>
                        
                        <div className={styles["recent-activity-heading"]}>  Recent Activity </div>
                            
                        <div className={styles["recentactivity-card-container"]}>


                            {/* {
                                dashboardData?.recentActivities.map((activity, index)=>(
                                   <NewRecentActivityCard key={index} actorName={activity.actorName} actorId={activity.actorUserId} actionType={activity.actionText} action={activity.entityName} timeStamp={getRelativeTime(activity.occurredAt)}  />
                                    
                                ))
                            } */}


                            {dashboardData?.recentActivities?.length > 0 ? (
                                dashboardData.recentActivities.map((activity, index)=>(
                                   <NewRecentActivityCard key={index} actorName={activity.actorName} actorId={activity.actorUserId} actionType={activity.actionText} action={activity.entityName} timeStamp={getRelativeTime(activity.occurredAt)}  />
                                    
                                ))
                                ) : (
                                <div className={styles["empty-state"]}>
                                    <h4>No recent activity</h4>
                                    <p>Project and task activity will appear here.</p>
                                </div>
                                )}




                            {/* <NewRecentActivityCard actorId={1} actorName={"Sara Chen"} actionType={"created"} action={"Design system update"} timeStamp={'5 minutes ago'}  />
                            <NewRecentActivityCard actorId={1} actorName={"Sara Chen"} actionType={"created"} action={"3 cards"} timeStamp={'5 minutes ago'}  />
                            <NewRecentActivityCard actorId={1} actorName={"Sara Chen"} actionType={"created"} action={"3 cards"} timeStamp={'5 minutes ago'}  />
                            <NewRecentActivityCard actorId={1} actorName={"Sara Chen"} actionType={"created"} action={"3 cards"} timeStamp={'5 minutes ago'}  />
                            <NewRecentActivityCard actorId={1} actorName={"Sara Chen"} actionType={"created"} action={"3 cards"} timeStamp={'5 minutes ago'}  />
                            <NewRecentActivityCard actorId={1} actorName={"Sara Chen"} actionType={"created"} action={"3 cards"} timeStamp={'5 minutes ago'}  />
                            <NewRecentActivityCard actorId={1} actorName={"Sara Chen"} actionType={"created"} action={"3 cards"} timeStamp={'5 minutes ago'}  />
                            <NewRecentActivityCard actorId={1} actorName={"Sara Chen"} actionType={"created"} action={"3 cards"} timeStamp={'5 minutes ago'}  />
                            <NewRecentActivityCard actorId={1} actorName={"Sara Chen"} actionType={"created"} action={"3 cards"} timeStamp={'5 minutes ago'}  />
                            <NewRecentActivityCard actorId={1} actorName={"Sara Chen"} actionType={"created"} action={"3 cards"} timeStamp={'5 minutes ago'}  />
                            <NewRecentActivityCard actorId={1} actorName={"Sara Chen"} actionType={"created"} action={"3 cards"} timeStamp={'5 minutes ago'}  />
                            <NewRecentActivityCard actorId={1} actorName={"Sara Chen"} actionType={"created"} action={"3 cards"}   /> */}
                            

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


                             {/* {
                                dashboardData?.recentProjects.map((project, index)=>(
                                     <ProjectCardNew key={index} title={project.name} description={project.description} timeStamp={getRelativeTime(project.lastActivityAt)} openProject={() =>
                                  handleOpenProject(
                                    project.projectId,
                                    project.name,
                                    project.description
                                  )
                                }/>
                                    
                                ))
                            } */}


                            {dashboardData?.recentProjects?.length > 0 ? (
                           dashboardData.recentProjects.map((project, index)=>(
                                     <ProjectCardNew key={index} title={project.name} description={project.description} timeStamp={getRelativeTime(project.lastActivityAt)}  openProject={() =>
                                  handleOpenProject(
                                    project.projectId,
                                    project.name,
                                    project.description
                                  )
                                }/>
                                    
                                ))
                            ) : (
                            <div className={styles["empty-state"]}>
                                <h4>No projects yet</h4>
                                <p>Create your first project to start organizing your work.</p>
                                <Link to="/Dashboard/Projects">Create a project</Link>
                            </div>
                            )}



                            {/* <ProjectCardNew title={"Website Redesign"} description={"Complete overhaul of the company website with modern design"}/>
                            <ProjectCardNew title={"Website Redesign"} description={"Complete overhaul of the company website with modern design"}/>
                            <ProjectCardNew title={"Website Redesign"} description={"Complete overhaul of the company website with modern design"}/>
                            <ProjectCardNew title={"Website Redesign"} description={"Complete overhaul of the company website with modern design"}/>
                            <ProjectCardNew title={"Website Redesign"} description={"Complete overhaul of the company website with modern design"}/>
                            <ProjectCardNew title={"Website Redesign"} description={"Complete overhaul of the company website with modern design"}/>
                            <ProjectCardNew title={"Website Redesign"} description={"Complete overhaul of the company website with modern design"}/>
                            <ProjectCardNew title={"Website Redesign"} description={"Complete overhaul of the company website with modern design"}/>
                            <ProjectCardNew title={"Website Redesign"} description={"Complete overhaul of the company website with modern design"}/> */}

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