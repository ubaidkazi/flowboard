
import React, { useState, useEffect, memo } from 'react';
import { Check, Trash2 } from 'lucide-react';
import styles from '../styles/Card.module.css';

function Card({ card, index, onDelete, onClick, onUpdate }) {
  const [isChecked, setIsChecked] = useState(card.checked);

  useEffect(() => {
    setIsChecked(card.checked);
  }, [card.checked]);

  const handleCheckChange = (e) => {
    e.stopPropagation();
    const newChecked = e.target.checked;
    setIsChecked(newChecked);

    const newProgress = newChecked ? 'Completed' : 'In Progress';

    onUpdate?.({
      ...card,
      checked: newChecked,
      progress: newProgress,
    });
  };

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
    <div className={styles.card}>
      <div className={styles.cardContent} onClick={() => onClick(card)}>
        <div className={styles.cardHeader}>
          <div className={styles.nameCheckbox}>
            <label
              className={styles.trelloCheckbox}
              onClick={(e) => e.stopPropagation()}
              onMouseDown={(e) => e.stopPropagation()}
            >
              <input type="checkbox" checked={isChecked} onChange={handleCheckChange} />
              <span className={styles.circle}>
                {isChecked && <Check size={14} strokeWidth={3} color="#fff" />}
              </span>
            </label>
            <p className={styles.cardName}>{card.title}</p>
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
            📅 {new Date(card.dueDate).toLocaleDateString('en-US', { month: 'short', day: '2-digit' })}
          </div>
        )}
      </div>
    </div>
  );
}

export default React.memo(Card);
