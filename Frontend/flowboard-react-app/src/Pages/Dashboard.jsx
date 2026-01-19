import styles from '../styles/Dashboard.module.css';
import NewSidebar from '../Components/Sidebar';
import DashboardCard from '../Components/DashboardCard';
import ProjectCard from '../Components/ProjectCard';
import { Kanban, CircleCheckBig, Users, Clock4Icon, ChartColumn, Plus} from 'lucide-react';
import QuickActionButton from '../Components/QuickActionBtn';
import QuickActionButtonBlack from '../Components/QuickActionBtnBlack';
import RecentActivityCard from '../Components/RecentActivityCard';


function Dashboard()
{




    return (
        <>
        <div className={styles["main-div"]}>
            <NewSidebar> </NewSidebar>

            <div className={styles["dashboard-content"]}>
                <div>
                    <h1 className={styles["dashboard-heading"]}>Dashboard</h1>
                    <h3 className={styles["dashboard-text"]}> Overview of all your projects and team performance </h3>

                </div>
                


                <div className={styles["card-container"]}>
                    <DashboardCard icon={Kanban} iconcolor={"#3b82f6"} value={12} metric="Total Projects" ></DashboardCard>
                    <DashboardCard icon={CircleCheckBig} iconcolor={"#08c751ff"} value={284} metric="Completed Tasks"></DashboardCard>
                    <DashboardCard icon={Users} iconcolor={"#720ff4ff"} value={18} metric="Team Members"></DashboardCard>
                    <DashboardCard icon={Clock4Icon} iconcolor= "#ea7609ff" value="5.2" metric="Avg. Completion"></DashboardCard>
                </div>

                
                    <div className={styles["action-section"]}>

                        <div className={styles["active-projects"]}>
                            <div  className={styles["active-projects-title"]}>
                                <h1> ACTIVE PROJECTS </h1>

                            </div>
                            

                            <ProjectCard></ProjectCard>
                            <ProjectCard></ProjectCard>
                            <ProjectCard></ProjectCard>
                            <ProjectCard></ProjectCard>
                            <ProjectCard></ProjectCard>
                            <ProjectCard></ProjectCard>
                            
                            

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

                    </div>

                
                

            </div>
           


        </div>
        
        
        </>
    );
}

export default Dashboard;