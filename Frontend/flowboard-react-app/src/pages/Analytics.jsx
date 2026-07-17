import styles from '../styles/Analytics.module.css';

import { NavLink } from 'react-router-dom';
import DashboardCard from '../components/DashboardCard';
import ProjectCard from '../components/ProjectCard';
import { Kanban, CircleCheckBig, Users, Clock4Icon, ChartColumn, Plus, Search, Funnel, Grid3X3, List, Download, CircleAlert, CircleCheck, Target, Clock, Trophy, PiSquare, ChevronDown, Check, Calendar} from 'lucide-react';
import QuickActionButton from '../components/QuickActionBtn';
import QuickActionButtonBlack from '../components/QuickActionBtnBlack';
import RecentActivityCard from '../components/RecentActivityCard';
import ProjectListCard from '../components/ProjectListCard';
import ProjectPerformanceCard from '../components/ProjectPerformanceCard';
import TeamPerformanceCard from '../components/TeamPerformanceCard';
import { useState, useRef, useEffect } from 'react';
import DropDownSelect from '../components/ui/dropdown-select';
import TasksChart from '../components/ui/TasksChart';
import NewRecentActivityCard from '../components/NewRecentActivityCard';
import LeaderBoardCard from '../components/ui/leader-board-card';
import {users} from "../components/MockData";
import TeamPerformanceChart from '../components/ui/TeamPerformanceChart';
import NewProjectPerformanceCard from '../components/NewProjectPerformanceCard';
import TeamMemberCard from '../components/TeamMemberCard';

function Analytics()
{


    const optionsProject = ["All Projects", "Project 1", "Project 2", "Project 3322 "];
    const optionsTimeFrame = ["Last 7 days", "Last 30 days", "Last 90 days"];
    

    

  


        const handleProjectOptionChange = (option)=>
        {
            console.log(`${option} selected!`);
            // setSelected(option);
            // setOpen(false);
        }











    return(

        <>

        <div className={styles["main-div"]}>
            



            <div className={styles["projects-content"]}>


                <div className={styles["top-div"]}>
                    <div>
                         <h1 className={styles["project-heading"]}>Analytics</h1>
                        <h3 className={styles["project-text"]}> Track performance and insights across your projects </h3>
                    </div>
                    <div className={styles["project-btn-div"]}>


                        


                        <DropDownSelect icon={Calendar} options={optionsTimeFrame} onChange={(option)=> { handleProjectOptionChange(option) }}></DropDownSelect>
                        <DropDownSelect options={optionsProject} onChange={(option)=> { handleProjectOptionChange(option) }}></DropDownSelect>

                        <div className={styles["project-btn"]}> 
                            <Download  color="white" size={15} strokeWidth={2.2} className={styles["icon"]}   />
                            <NavLink  className={styles["nav-link"]}> <h2 className={styles["btn-name"]}> Export Report </h2> </NavLink>
                        </div>


                        

                        
                        



                    </div>

                    





                </div>


                <div className={styles["card-container"]}>
                    
                    <DashboardCard title="Total Completed" value={12}  icon={CircleCheck} trend={{ value: 12, positive: true }}></DashboardCard>
                    <DashboardCard title="Avg. per Day" value={14}  icon={Target} trend={{ value: 8, positive:true }}></DashboardCard>
                    <DashboardCard title="On-time Rate" value={87}  icon={Clock} trend={{ value: 3, positive: false }}></DashboardCard>
                    <DashboardCard title="Team Score" value={"A+"} icon={Trophy} trend={{value:3, positive:false}}></DashboardCard>
                    
                </div>





                <div className={styles["chart-and-leaderboard"]}>

                    
                    

                    <div className={styles["chart"]}>

                        <div className={styles["leaderboard-heading-div"]}>
                            <h3 className={styles["leaderboard-heading"]}> Tasks Completed Over Time </h3>

                        </div>


                        <TasksChart ></TasksChart>

                    </div>
                    
                    <div className={styles["leaderboard"]}>
                        
                        <div className={styles["leaderboard-heading-div"]}>
                            <h3 className={styles["leaderboard-heading"]}> Team Leaderboard </h3>

                        </div>

                        <div className={styles["leaderboard-cards-div"]}>

                            {users.slice(0, 5).map((user, index) => (
                                <LeaderBoardCard
                                    key={user.id}
                                    rank={index + 1}
                                    name={user.name}
                                    completedTasks={24}
                                    progressTasks={5}
                                    user={user}
                                    isTopUser={index==0}
                                />
                            ))}


                            {/* <NewRecentActivityCard userName={"Ubaid"} timeStamp={`24 tasks 5 in progress`}></NewRecentActivityCard> */}
                        {/* <LeaderBoardCard rank={1} name={"Ubaid"} completedTasks={24} progressTasks={5}></LeaderBoardCard>
                        <LeaderBoardCard rank={2}name={"Ubaid"} completedTasks={24} progressTasks={5}></LeaderBoardCard>
                        <LeaderBoardCard rank={3} name={"Ubaid"} completedTasks={24} progressTasks={5}></LeaderBoardCard> */}


                        </div>
                        

                    </div>





                </div>






                <div className={styles["chart-and-projectprogress"]}>

                    
                    

                    <div className={styles["chart"]}>

                        <div className={styles["leaderboard-heading-div"]}>
                            <h3 className={styles["leaderboard-heading"]}> Tasks Completed Over Time </h3>

                        </div>


                        <TeamPerformanceChart></TeamPerformanceChart>

                    </div>
                    
                    <div className={styles["project-performace"]}>
                        <div className={styles["leaderboard-heading-div"]}>
                            <h3 className={styles["leaderboard-heading"]}> Project Health </h3>

                        </div>

                        <div className={styles["ppc-div"]}>

                           <NewProjectPerformanceCard></NewProjectPerformanceCard>
                           <NewProjectPerformanceCard></NewProjectPerformanceCard>
                           <NewProjectPerformanceCard></NewProjectPerformanceCard>
                           <NewProjectPerformanceCard></NewProjectPerformanceCard>
                           <NewProjectPerformanceCard></NewProjectPerformanceCard>
                           <NewProjectPerformanceCard></NewProjectPerformanceCard>
                           <NewProjectPerformanceCard></NewProjectPerformanceCard>
                           <NewProjectPerformanceCard></NewProjectPerformanceCard>
                           <NewProjectPerformanceCard></NewProjectPerformanceCard>


                            {/* <NewRecentActivityCard userName={"Ubaid"} timeStamp={`24 tasks 5 in progress`}></NewRecentActivityCard> */}
                        {/* <LeaderBoardCard rank={1} name={"Ubaid"} completedTasks={24} progressTasks={5}></LeaderBoardCard>
                        <LeaderBoardCard rank={2}name={"Ubaid"} completedTasks={24} progressTasks={5}></LeaderBoardCard>
                        <LeaderBoardCard rank={3} name={"Ubaid"} completedTasks={24} progressTasks={5}></LeaderBoardCard> */}


                        </div>



                        
                        

                    </div>


                    





                </div>


               





                


                
        

                
                

            </div>
           



        </div>
        
        
        </>
    );
}
export default Analytics;