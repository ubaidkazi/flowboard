


function TaskBadge({badgeTitle})
{

    if(!badgeTitle)
    {
        return;
    }





    return(
       <div className={'inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden             border-transparent bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90'}>
        {badgeTitle}

       </div>
    )
}
    
export default TaskBadge;