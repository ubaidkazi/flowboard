import AvatarGroup from './AvatarGroup';
import styles from './SprintCard.module.css';
import { LayoutGrid, Trash2 } from "lucide-react";

function SprintCard({
  title,
  listsNumber,
  users = [],
  coverImage,
  coverGradient,
  onClick,
  onDelete,
  members
}) {


  const gradientOptions = [
  // 0. Blue Gradient
  `linear-gradient(
    to bottom right,
    color-mix(in oklch, var(--primary) 20%, transparent),
    color-mix(in oklch, var(--accent) 20%, transparent)
  )`,

  // 1. Green Gradient
  `linear-gradient(
    to bottom right,
    color-mix(in oklch, var(--chart-2) 20%, transparent),
    color-mix(in oklch, var(--chart-3) 20%, transparent)
  )`,

  // 2. Purple Gradient
  `linear-gradient(
    to bottom right,
    color-mix(in oklch, var(--chart-4) 20%, transparent),
    color-mix(in oklch, var(--primary) 20%, transparent)
  )`,

  // 3. Orange Gradient
  `linear-gradient(
    to bottom right,
    color-mix(in oklch, var(--warning) 20%, transparent),
    color-mix(in oklch, var(--destructive) 20%, transparent)
  )`,

  // 4. Neutral
  `color-mix(in oklch, var(--secondary) 50%, transparent)`,
];




  


  return (
    <div className={styles.card} onClick={onClick}>
      <div
        className={styles.cover}
        style={

           coverImage
            ? {
                backgroundImage: `url(${coverImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }
            :

          
          
          
          {
          background: coverGradient ?? gradientOptions[2],
        }}
      />

      <div className={styles.content}>
        <div className={styles.left}>
          <h2 className={styles.title}>{title}</h2>

          <AvatarGroup users={members} > </AvatarGroup>
        </div>

        <div className={styles.right}>
          <LayoutGrid size={15} strokeWidth={1.8} />
          <span>{listsNumber} Lists</span>

          <div  className={styles["del-icon-div"]} 
          onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}>
            <Trash2 size={15} strokeWidth={1.8} className={styles["del-icon"]}/>
          </div>
          
        </div>
      </div>
    </div>
  );
}

export default SprintCard;