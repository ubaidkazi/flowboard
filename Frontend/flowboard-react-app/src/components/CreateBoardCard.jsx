import styles from '../styles/CreateBoardCard.module.css';
import { Plus } from 'lucide-react';


export default function CreateBoardCard({onClick})
{


    return(
        <>

        <div className={styles["card"]} onClick={onClick}>

            <div className="cursor-pointer border-dashed hover:border-primary/50 transition-colors">
              <div className="flex flex-col items-center justify-center h-full py-12">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 mb-3">
                  <Plus className="h-6 w-6 text-primary" />
                </div>
                <span className="font-medium text-muted-foreground">Create New Board</span>
              </div>
            </div>
        </div>
        
        
        </>
    );

}