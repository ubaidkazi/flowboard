import Avatar from './/ui/avatar-new';
import styles from "../styles/CardOpenModal.module.css";
import { X, Check, UserRoundPlus, Tag, Trash2, Save, PlusCircle, Plus, Database } from "lucide-react";
import { useState, useEffect } from "react";
import TaskBadge from './ui/task-badge';
import MemberSearchCard from './ui/MemberSearchCard';
import AvatarGroup from './AvatarGroup';

function CardOpenModal({ CurrentCard, onClose, onUpdate, onDelete, columnId, projectMembers, onAddMember, onRemoveMember}) {
  const card = CurrentCard;

  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [editedTitle, setEditedTitle] = useState(card.title);
  const [addMemberModalOpen, setAddMemberModalOpen] = useState(false);
  const [memberSearch, setMemberSearch] = useState("");

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



  const toggleAddMemberModal = (state)=>
  {
    setAddMemberModalOpen(!state);
  }






  return (
    <>
      <div className={styles.modalOverlay} onClick={onClose}>
        <div></div>
        <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
          
          
          <div className={styles.modalHeader}>


            <div className={styles["checkbox-and-name"]}>
              {/* Checkbox */}

              <div>

                <label className={styles["card-checkbox"]}>
                <input
                  type="checkbox"
                  checked={card.checked}
                  onChange={(e) => updateCard({ checked: e.target.checked })}
                />
                <span className={styles.circle}>
                  {card.checked && <Check size={14} strokeWidth={3} color="#fff" />}
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
                  onBlur={() => {
                    if (editedTitle.trim() !== "") updateCard({ title: editedTitle });
                    setIsEditingTitle(false);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      updateCard({ title: editedTitle });
                      setIsEditingTitle(false);
                    }
                    if (e.key === "Escape")
                    {
                      setIsEditingTitle(false);
                      setEditedTitle(card.title);
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

            <div className={styles.closeBtn} onClick={onClose}>
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
                <button className={styles["addMembers-button"]} onClick={()=>{toggleAddMemberModal(addMemberModalOpen)}}> <Plus size={21} color={"white"}> </Plus> </button>
                
                
                {addMemberModalOpen &&
                (
                  <div onClick={toggleAddMemberModal} className={styles["search-member-modal-overlay"]}>

                    <div className={styles["search-member-modal"]}  onClick={ (e) => {e.stopPropagation()}}>



                  <div className={styles["member-modal-header"]}>

                      <h3 className={styles["member-modal-heading"]}> Members </h3>
                      
                      <X className={styles["member-modal-close-btn"]} onClick={()=>{toggleAddMemberModal(addMemberModalOpen)}}></X>
                  </div>


                  <div className={styles["member-search-container"]}>

                    <input type='text' placeholder='Seach Members' className={styles["search-member-input"]} value={memberSearch} onChange={(e) => setMemberSearch(e.target.value)}/>

                    <div className={styles["member-search-result"]}>

                     <p style={{ padding: "0.2rem" }}>Project Members</p>



                     { filteredMembers.map((projectMember, index)=>(
                            <MemberSearchCard  key={index} userId={projectMember.id} fullName={projectMember.fullName} onClick={()=>{

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







                    
                    
                      {/* <MemberSearchCard userId={1} fullName={"Ubaid Kazi"} onClick={()=>{console.log("Add this member")}} isMember={true}  />
                       <MemberSearchCard userId={1} fullName={"Ubaid Kazi"} onClick={()=>{console.log("Add this member")}}  />
                       <MemberSearchCard userId={1} fullName={"Ubaid Kazi"} onClick={()=>{console.log("Add this member")}}  />
                       <MemberSearchCard userId={1} fullName={"Ubaid Kazi"} onClick={()=>{console.log("Add this member")}}  /> */}
                       

                      
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
                <p> Add Labels </p>
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
                value={card.progress || "Not Started"}
                onChange={(e) => updateCard({ progress: e.target.value })}
              >
                <option value="Not Started">Not Started</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
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
              value={card.description || ""}
              placeholder="Write a comment..."
              className={styles["des-box"]}
              onChange={(e) => updateCard({ description: e.target.value })}
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
              <Save size={30} className={styles["action-icon-save"]} onClick={onClose} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CardOpenModal;
