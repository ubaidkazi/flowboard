import styles from "../styles/CardOpenModal.module.css";
import { X, Check, UserRoundPlus, Tag, Trash2, Save, Plus } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import TaskBadge from './ui/task-badge';
import MemberSearchCard from './ui/MemberSearchCard';
import AvatarGroup from './AvatarGroup';

function CardOpenModal({ CurrentCard, onClose, onUpdate, onDelete, columnId, projectMembers, onAddMember, onRemoveMember}) {
  const card = CurrentCard;

  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [editedTitle, setEditedTitle] = useState(card.title);
  const [addMemberModalOpen, setAddMemberModalOpen] = useState(false);
  const [memberSearch, setMemberSearch] = useState("");


  const cancelTitleEditRef = useRef(false);

  const [editedDescription, setEditedDescription] = useState(
  card.description ?? ""
);

const [descriptionDirty, setDescriptionDirty] = useState(false);


  // Keep editedTitle in sync when card changes
  useEffect(() => {
    setEditedTitle(card.title);
  }, [card.title]);

  // // Helper to update card
  // const updateCard = (updates) => {
  //   // Sync checked <-> progress for three states
  //   if (updates.checked !== undefined) {
  //     updates.progress = updates.checked ? "Completed" : card.progress === "Completed" ? "In Progress" : card.progress;
  //   }

  //   if (updates.progress !== undefined) {
  //     updates.checked = updates.progress === "Completed";
  //   }

  //   onUpdate(card.id, updates);
  // };


  useEffect(() => {
  if (!descriptionDirty) {
    setEditedDescription(card.description ?? "");
  }
}, [card.id, card.description, descriptionDirty]);




    const isAssigned = (userId) => {

    return CurrentCard?.assignedMembers?.some(
        member => member.id === userId
    );
};





  const filteredMembers = projectMembers
  ?.filter((member) => {
    const search = memberSearch.toLowerCase();

    return (
      member.fullName?.toLowerCase().includes(search) ||
      member.username?.toLowerCase().includes(search) ||
      member.email?.toLowerCase().includes(search)
    );
  })
  .sort((a, b) => Number(isAssigned(b.id)) - Number(isAssigned(a.id)));



  const updateCard = (updates) => {
  onUpdate(card.id, updates);
    };



  const toggleAddMemberModal = () => {
  setAddMemberModalOpen((current) => !current);
};


  const isCompleted = card?.progress === "COMPLETED";



  const saveDescription = () => {
  if (!descriptionDirty) {
    return;
  }

  const currentDescription = card.description ?? "";

  if (editedDescription !== currentDescription) {
    updateCard({
      description: editedDescription
    });
  }

  setDescriptionDirty(false);
};


const handleClose = () => {
  saveDescription();
  onClose();
};


const saveTitle = () => {


   if (cancelTitleEditRef.current) {
    cancelTitleEditRef.current = false;
    setEditedTitle(card.title);
    setIsEditingTitle(false);
    return;
  }

  const trimmedTitle = editedTitle.trim();

  if (!trimmedTitle) {
    setEditedTitle(card.title);
    setIsEditingTitle(false);
    return;
  }

  if (trimmedTitle !== card.title) {
    updateCard({
      title: trimmedTitle,
    });
  }

  setEditedTitle(trimmedTitle);
  setIsEditingTitle(false);
};

const closeMemberModal = () => {
  setAddMemberModalOpen(false);
  setMemberSearch("");
};











  return (
    <>
      <div className={styles.modalOverlay} onClick={handleClose}>
        <div></div>
        <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
          
          
          <div className={styles.modalHeader}>


            <div className={styles["checkbox-and-name"]}>
              {/* Checkbox */}

              <div>

                <label className={styles["card-checkbox"]}>
                <input
                  type="checkbox"
                  checked={isCompleted}
                  onChange={(e) => {
                      updateCard({
                        progress: e.target.checked
                          ? "COMPLETED"
                          : "IN_PROGRESS"
                      });
                    }}
                />
                <span className={styles.circle}>
                  {isCompleted && <Check size={18} strokeWidth={3} color="#fff" />}
                </span>
              </label>


              </div>
              

              {/* Editable Title */}
              {isEditingTitle ? (
                <input
                  className={styles["editable-input"]}
                  type="text"
                  value={editedTitle}
                  onChange={(e) => setEditedTitle(e.target.value)}
                  onBlur={saveTitle}
                  onKeyDown={(event) => {
                    if (event.key === "Enter") {
                      event.preventDefault();
                      event.currentTarget.blur();
                    }
                    if (event.key === "Escape")
                    {
                      event.preventDefault();
                      cancelTitleEditRef.current = true;
                      event.currentTarget.blur();
                    }
                  }}
                  autoFocus
                />
              ) : (
                  <div onClick={() => setIsEditingTitle(true)} className={styles["card-title"]}>
                  {card.title}
                </div>

                
              )}
            </div>

            <div className={styles.closeBtn}
             onClick={handleClose}>
              <X size={20} />
            </div>


          </div>



        <div className={styles["members-and-labels-div"]}>

          <div className={styles["members"]}>

            <div className={styles["members-heading"]}>
               <UserRoundPlus size={20} />
                <p>Assigned To </p>
            </div>


            <div className={styles["card-members"]}>

              <div>
                <AvatarGroup users={card.assignedMembers} className={styles["avatar-group"]}> </AvatarGroup>
              </div>


             

              <div className={styles["add-members"]}>
                <button className={styles["addMembers-button"]} onClick={() => setAddMemberModalOpen(true)}> <Plus size={21} color={"white"}> </Plus> </button>
                
                
                {addMemberModalOpen &&
                (
                  <div onClick={closeMemberModal} className={styles["search-member-modal-overlay"]}>

                    <div className={styles["search-member-modal"]}  onClick={ (e) => {e.stopPropagation()}}>



                  <div className={styles["member-modal-header"]}>

                      <h3 className={styles["member-modal-heading"]}> Members </h3>
                      
                      <X className={styles["member-modal-close-btn"]} onClick={closeMemberModal}></X>
                  </div>


                  <div className={styles["member-search-container"]}>

                    <input type='text' placeholder='Search Members' className={styles["search-member-input"]} value={memberSearch} onChange={(e) => setMemberSearch(e.target.value)}/>

                    <div className={styles["member-search-result"]}>

                     <p style={{ padding: "0.2rem" }}>Project Members</p>

                     { filteredMembers?.map((projectMember)=>(
                            <MemberSearchCard  key={projectMember.id} userId={projectMember.id} fullName={projectMember.fullName} onClick={()=>{
                                                                          if(isAssigned(projectMember.id))
                                                                            {onRemoveMember(projectMember.id);}
                                                                            else 
                                                                            {onAddMember(projectMember.id); 

                                                                            }}} 
                                                                            isMember={isAssigned(projectMember.id)}
                                                                            >                                                    
                            </MemberSearchCard>
                     ))
                     }

                    </div>

                  </div>

                 

                </div>

                  
                  </div>
                )}

              </div>
              

            </div>
           
          </div>

          <div className={styles["labels"]}>


            <div className={styles["labels-heading"]}>
                <Tag />
                <p> Add Tags </p>
            </div>


            <div className={styles["card-labels"]}>

             

                <TaskBadge badgeTitle={"Web design"}></TaskBadge>
                <TaskBadge badgeTitle={"Database Migration"}></TaskBadge>
                <TaskBadge badgeTitle={"Project X"}></TaskBadge>
                <TaskBadge badgeTitle={"Design Workflows"}></TaskBadge>





             
            </div>


           
          </div>


        </div>
          



          <div className={styles["options-div"]}>
            {/* Priority */}
            <div className={styles["option"]}>
              <label>Priority</label>
              <select
                value={card.priority || "Low"}
                onChange={(e) => updateCard({ priority: e.target.value })}
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="Important">Important</option>
                <option value="Urgent">Urgent</option>
              </select>
            </div>

            {/* Progress */}
            <div className={styles["option"]}>
              <label>Progress</label>
              <select
                value={card.progress ?? "NOT_STARTED"}
                onChange={(e) => updateCard({ progress: e.target.value })}
              >
                <option value="NOT_STARTED">Not Started</option>
                <option value="IN_PROGRESS">In Progress</option>
                <option value="COMPLETED">Completed</option>
              </select>
            </div>

            {/* Due Date */}
            <div className={styles["option"]}>
              <label>Due Date</label>
              <input
                type="date"
                value={card.dueDate || ""}
                onChange={(e) => updateCard({ dueDate: e.target.value })}
              />
            </div>
          </div>

          {/* Description */}
          <div className={styles.section}>
            <h4>Description</h4>
            <textarea
              value={editedDescription}
              placeholder="Write a description..."
              className={styles["des-box"]}
              onChange={(e) => {
                  setEditedDescription(e.target.value);
                  setDescriptionDirty(true);
                }}          
                />
          </div>

          {/* Actions */}
          <div className={styles.section}>
            <div className={styles["action-div"]}>
              <Trash2
                size={30}
                className={styles["action-icon-delete"]}
                onClick={() => {
                  onDelete(card.id, columnId);
                  onClose();
                }}
              />
              <Save size={30} className={styles["action-icon-save"]}
              onClick={handleClose}
             />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CardOpenModal;
