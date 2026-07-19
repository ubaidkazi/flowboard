
import styles from '../styles/DashboardCard.module.css';
// import { Kanban, CircleCheckBig} from 'lucide-react';
import { cn } from "../lib/utils"; 

function DashboardCard({icon: Icon, value, description, trend, title})
{

    return(
        <>

        <div className={styles["dash-card"]}>

            <div className={styles["card-content"]}>

               
                {/* <Kanban size={39} className="kanban-icon"  color="#3b82f6"/> */}
                {/* <CircleCheckBig size={32} color="#08c751ff" strokeWidth={2.5} /> */}
                {/* <img src={cardicon} className={styles["icon"]}></img> */}
                {/* <Icon size={32} color={iconcolor} strokeWidth={2.0} />
                <h2 className={styles["card-num"]}> {value} </h2>
                <h2 className={styles["card-desc"]}> {metric} </h2> */}


                <div className="flex items-start justify-between">
          <div className={cn("flex-1", styles["title-value"])}>
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className="mt-2 text-3xl font-semibold tracking-tight text-foreground">{value}</p>
            {description && (
              <p className="mt-1 text-sm text-muted-foreground">{description}</p>
            )}
            {trend && (
              <p className={cn(
                "mt-2 text-sm font-medium",
                trend.positive ? "text-success" : "text-destructive"
              )}>
                {trend.positive ? "+" : "-"}{Math.abs(trend.value)}% from last week
              </p>
            )}
          </div>
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
            <Icon className="h-6 w-6 text-primary" />
          </div>
        </div>

                
            </div>
            

        </div>
        
        
        
        
        
        </>
    );

}

export default DashboardCard