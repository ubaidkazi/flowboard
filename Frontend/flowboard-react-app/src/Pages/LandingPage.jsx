import styles from '../styles/LandingPage.module.css';
import FeatureCard from '../components/Feature-card';
import NewNavBar from '../components/NavBar';
import { NavLink } from 'react-router-dom';
import { Kanban, Target, Clock4, Users, ChartColumn, Calendar  } from 'lucide-react';


function LandingPage()
{


    return(
        <>
        <section className= {styles['hero-section']}>
            <NewNavBar></NewNavBar>
            <h1 className={styles['hero-text-1']}>
                Organize Tasks with
            </h1>
            <h1 className={styles['hero-text-2']}>
                Visual Kanban Boards
            </h1>
            <p className={styles['hero-text-3']}>
                Streamline your workflow, collaborate with your team, and deliver projects faster with our intuitive kanban board solution.
            </p>
            <section className={styles["hero-btns"]}>
                <button className={styles["hero-btn-1"]}> 
                Try demo board &#8594;
                </button>
                <NavLink  to="/newdashboard" className={styles["hero-btn-2"]}> 
                View Dashbaord
                </NavLink>

            </section>


        </section>
        <section className= {styles['feature-section']}>
            
            <h1 className={styles['feature-text-1']}>
                Everything you need to manage projects
            </h1>
            <p className={styles['feature-text-2']}>
                Powerful features designed to help teams stay organized and productive
            </p>


            <div className={styles['feature-grid']}>
                <FeatureCard icon={Kanban} iconSize="33" name="Visual Workflow" desc="Organize tasks in intuitive columns with drag-and-drop functionality"> </FeatureCard>
                <FeatureCard icon={Users}  iconSize="33" name="Team Collaboration" desc="Work together seamlessly with real-time updates and task assignments"> </FeatureCard>
                <FeatureCard icon={ChartColumn} iconSize="33"  name="Project Analytics" desc="Track progress and identify bottlenecks with detailed insights"> </FeatureCard>
                <FeatureCard icon={Calendar} iconSize="33" name="Due Date Management" desc="Never miss deadlines with smart notifications and calendar integration"> </FeatureCard>
                <FeatureCard icon={Target}  iconSize="33"name="Priority System" desc="Focus on what matters most with color-coded priority levels"> </FeatureCard>
                <FeatureCard icon={Clock4}  iconSize="33" name="Time Tracking" desc="Monitor time spent on tasks to improve productivity and estimation"> </FeatureCard>
            </div>

            <section className={styles['cta-section']} >
                <h1 className={styles['cta-heading']}> Ready to boost your productivity?</h1>
                <p className={styles['cta-text']} >
                    Join thousands of teams already using KanbanFlow to manage their projects
                </p>
                <div className={styles['cta-btns']}>
                    <button className={styles['cta-btn-1']}> Start Using Board </button>
                    <button className={styles['cta-btn-2']}>  Explore Dashboard </button>

                </div>

            </section>
            <footer className={styles['footer']} >
                
                <p className={styles['footer-brandname']} >
                    FlowBoard
                </p>
                <p className={styles['footer-text']}>
                    © 2025 FlowBoard. Built by  <a href='https://www.github.com/'  target="_blank" rel="noopener noreferrer" className={styles['footer-dev-link']} >Ubaid</a>.
                </p>
                

            </footer>
            

        </section>

        </>
    );
}
export default LandingPage;