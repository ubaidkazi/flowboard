// src/Components/Card.jsx
import React, { useState, useEffect, memo } from 'react';
import { Draggable } from '@hello-pangea/dnd';
import { Check, Trash2, Calendar } from 'lucide-react';
import styles from '../styles/Card.module.css';

function Card({ card, index, onDelete, onClick, onUpdate }) {
  

  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [editedCardTitle, setEditedCardTitle] = useState(card.title);



   
  const handleCheckChange = (e) => {
    e.stopPropagation();
    const newChecked = e.target.checked;
    onUpdate(card.id, { checked: newChecked });
  };

  useEffect(() => {
  setEditedCardTitle(card.title);
}, [card.title]);



const formatDueDate = (dueDate) => {
  const [year, month, day] = dueDate.split('-')
  const date = new Date(year, month - 1, day)

  const currentYear = new Date().getFullYear()

  const options = {
    month: 'short',
    day: '2-digit',
    ...(date.getFullYear() !== currentYear && { year: 'numeric' })
  }

  return date.toLocaleDateString('en-US', options)
}











  return (
    <Draggable draggableId={card.id.toString()} index={index}>
      {(provided, snapshot) => {
        // Determine status class for due date
        let statusClass = '';
        if (card.dueDate) {
          const now = new Date();
          const date = new Date(card.dueDate);
          const diffDays = Math.ceil((date - now) / (1000 * 60 * 60 * 24));

          if (diffDays < 0) statusClass = styles.overdue;
          else if (diffDays <= 2) statusClass = styles.dueSoon;
          else statusClass = styles.onTrack;
        }

        return (
          // OUTER: DnD container, minimal styling
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            className={styles.card}
          >
            {/* INNER: your full visual styling, hover, padding, flex */}
            <div className={`${styles.cardContent} ${snapshot.isDragging ? styles.dragging : ''}`} onClick={() => onClick(card)}>
              <div className={styles.cardHeader}>
                <div className={styles.nameCheckbox}>
                  <label
                    className={styles.trelloCheckbox}
                    onClick={(e) => e.stopPropagation()}
                    onMouseDown={(e) => e.stopPropagation()}
                  >
                    <input type="checkbox" checked={card.checked} onChange={handleCheckChange} />
                    <span className={styles.circle}>
                      {<Check size={14} strokeWidth={3} color="#fff" />}
                    </span>
                  </label>

                  { isEditingTitle ? (
                        <input
                      className={styles["editable-input"]}
                      type="text"
                      value={editedCardTitle}
                      onClick={(e) => e.stopPropagation()}
                      onMouseDown={(e) => e.stopPropagation()}
                      onChange={
                        (e) => {setEditedCardTitle(e.target.value);}
                      }
                      onBlur={() => {
                        if (editedCardTitle.trim() !== "")
                        {
                          onUpdate(card.id, { title: editedCardTitle });
                        }
                        setIsEditingTitle(false);
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          onUpdate(card.id, { title: editedCardTitle });
                          setIsEditingTitle(false);
                        }
                        if (e.key === "Escape") {
                          setIsEditingTitle(false);
                          setEditedCardTitle(card.title);
                        }
                        
                      }}
                      autoFocus
                    />
                      )
                          : (<p onClick={(e) => {
                            e.stopPropagation();
                             setIsEditingTitle(true);
                          }}  className={styles.cardName}>{card.title}</p>)}
        

                  


                </div>
                <div
                  className={styles.cardDelete}
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete();
                  }}
                >
                  <Trash2 size={17} />
                </div>
              </div>

              {card.dueDate && (
                <div className={`${styles.dueDateDiv} ${statusClass}`}>
                <Calendar size={13}/> {formatDueDate(card.dueDate)}
                </div>
              )}
            </div>
          </div>
        );
      }}
    </Draggable>
  );
}

export default React.memo(Card);
