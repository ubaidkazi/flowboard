import styles from "../styles/CardOpenModal.module.css";
import {X, Check, UserRoundPlus, Tag, Trash2, Save} from "lucide-react";
import { useState, useEffect } from "react";
import { useCallback } from "react";
import Column from "./Column";


function CardOpenModal({CurrentCard, onClose, onUpdate, onDelete, columnId})
{

    const [card, setCard] = useState(CurrentCard);
    const [checked, setChecked] = useState(card.checked || false);


    const [selectedDate, setSelectedDate] = useState(card.dueDate || "");
    const [priority, setPriority] = useState(card.priority || "Low");
    const [progress, setProgress] = useState(card.progress || "Not Started");

    const handleDateChange = (event) => {
      setSelectedDate(event.target.value);
        };


    // Simple debounce helper
    function debounce(fn, delay) {
         let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => fn(...args), delay);
    };
    }

    // Debounced PATCH request
  const sendUpdate = useCallback(
    debounce(async (updates) => {
        const token = localStorage.getItem("token");
      try {
        await fetch(`http://localhost:8080/cards/${card.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
           },
          body: JSON.stringify(updates),
        });
      } catch (err) {
        console.error("Failed to update card:", err);
      }
    }, 600),
    [card.id]
  );

  const updateCard = (updates) => {
    const newCard = { ...card, ...updates };
    setCard(newCard);
    sendUpdate(updates); // send only changed fields
    onUpdate(newCard); //notify parent on the update

  };


    useEffect(() => {
    setCard(CurrentCard);
    setChecked(CurrentCard.checked || false);
    }, [CurrentCard]);







    return(
        <>
        <div className={styles.modalOverlay} onClick={()=> {console.log("close modal clicked!");
            onClose();
        }}>
    {/* prevent close on inner click */}
    <div>
        
    </div>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}> 
        <div className={styles.modalHeader}>

        <div className={styles["checkbox-and-name"]}>
        <label className={styles["trello-checkbox"]}>
        <input
        type="checkbox"
        checked={checked}
        onChange={(e) => {
    const newChecked = e.target.checked;
    let newProgress;

     if (newChecked) {
    newProgress = "Completed";
        } else {
    // If user unchecks a completed task, you decide where to fall back:
    // Either go back to "In Progress" or "Not Started"
      newProgress = progress === "Completed" ? "In Progress" : progress;
    }

    setChecked(newChecked);
    setProgress(newProgress);
    updateCard({ checked: newChecked, progress: newProgress });
    }}

      />
      <span className={styles.circle}>
        {checked && <Check size={14} strokeWidth={3} color="#fff" />}
      </span>
       {/* <p>{checked ? "Checked" : "Unchecked"}</p> */}
    </label>
    <h2>{card.title}</h2>

        </div>
   

          <div className={styles.closeBtn}  onClick={()=> {console.log("close modal clicked!");
            onClose();
          }}>
            <X size={20} />
          </div>
        </div>


        <div className={styles["assign-people"]}>

            <p> <UserRoundPlus size={20}/> Assign    </p>
            
        </div>

        <div className={styles["labels"]}>
             <p> <Tag/> Add Lables </p>
        </div>

        {/* <p className={styles.description}>{CurrentCard.description}</p> */}

        <div className={styles["options-div"]}>

        

        <div className={styles["option"]}> 
            <label> Priority </label>
            <select value={priority} 
            onChange={(e) => {
            const newPriority = e.target.value;
            setPriority(newPriority);
            updateCard({ priority: newPriority });
            }}>
            {/* <option value="">-- Choose a Priority --</option> */}
            <option value="Low"> Low </option>
            <option value="Medium"> Medium </option>
            <option value="Important"> Important </option>
            <option value="Urgent"> Urgent </option>
            </select>
        </div>


        <div className={styles["option"]}>
            <label> Progress </label>
            <select value={progress} 
            onChange={(e) => {
      const newProgress = e.target.value;
      let newChecked = checked;

      // sync logic: if progress is "Completed", checkbox should be checked
      if (newProgress === "Completed") {
        newChecked = true;
      } else {
        newChecked = false;
      }

      setProgress(newProgress);
      setChecked(newChecked);

      // send both fields in one update
      updateCard({ progress: newProgress, checked: newChecked });
    }}>
            {/* <option value="">-- Choose a Progress Status --</option> */}
            <option value="Not Started"> Not Started </option>
            <option value="In Progress"> In Progress </option>
            <option value="Completed"> Completed </option>
            </select>
        </div>



    <div className={styles["option"]}>
      <label>Due Date </label>

      <input type="date" value={selectedDate} 
      onChange={(e) => {
        const newDate = e.target.value;
        setSelectedDate(newDate);
        updateCard({ dueDate: newDate });
        }}/>

      {/* {selectedDate && <p>Due Date: {selectedDate}</p>} */}
    </div>


    </div>



        

        

        <div className={styles.section}>
          <h4>Description</h4>
          <textarea value={card.description}  placeholder="Write a comment..." className={styles["des-box"]}   onChange={(e) => updateCard({ description: e.target.value })}/>
          
        </div>
        <div className={styles.section}>

            <div className={styles["action-div"]}> 
            {/* <h4>Actions</h4> */}
          {/* <textarea value={card.description}  placeholder="Write a comment..." className={styles["des-box"]}   onChange={(e) => updateCard({ description: e.target.value })}/> */}
          <Trash2 size={30} className={styles["action-icon-delete"]}
          onClick={()=> {
            onDelete(card.id, columnId);
            onClose();
            
          }}

          ></Trash2>
          
          <Save size={30} className={styles["action-icon-save"]} onClick={onClose}></Save>




            </div>
          
        </div>


      </div>
        </div>


        
        
        </>
    );
}
export default CardOpenModal;