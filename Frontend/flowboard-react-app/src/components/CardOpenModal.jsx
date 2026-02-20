import styles from "../styles/CardOpenModal.module.css";
import { X, Check, UserRoundPlus, Tag, Trash2, Save } from "lucide-react";
import { useState, useEffect } from "react";

function CardOpenModal({ CurrentCard, onClose, onUpdate, onDelete, columnId }) {
  const card = CurrentCard;

  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [editedTitle, setEditedTitle] = useState(card.title);

  // Keep editedTitle in sync when card changes
  useEffect(() => {
    setEditedTitle(card.title);
  }, [card.title]);

  // Helper to update card
  const updateCard = (updates) => {
    // Sync checked <-> progress for three states
    if (updates.checked !== undefined) {
      updates.progress = updates.checked ? "Completed" : card.progress === "Completed" ? "In Progress" : card.progress;
    }

    if (updates.progress !== undefined) {
      updates.checked = updates.progress === "Completed";
    }

    onUpdate(card.id, updates);
  };

  return (
    <>
      <div className={styles.modalOverlay} onClick={onClose}>
        <div></div>
        <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
          <div className={styles.modalHeader}>
            <div className={styles["checkbox-and-name"]}>
              {/* Checkbox */}
              <label className={styles["trello-checkbox"]}>
                <input
                  type="checkbox"
                  checked={card.checked}
                  onChange={(e) => updateCard({ checked: e.target.checked })}
                />
                <span className={styles.circle}>
                  {card.checked && <Check size={14} strokeWidth={3} color="#fff" />}
                </span>
              </label>

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
                <h2 onClick={() => setIsEditingTitle(true)} className={styles["card-title"]}>
                  {card.title}
                </h2>
              )}
            </div>

            <div className={styles.closeBtn} onClick={onClose}>
              <X size={20} />
            </div>
          </div>

          <div className={styles["assign-people"]}>
            <p>
              <UserRoundPlus size={20} /> Assign
            </p>
          </div>

          <div className={styles["labels"]}>
            <p>
              <Tag /> Add Labels
            </p>
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
