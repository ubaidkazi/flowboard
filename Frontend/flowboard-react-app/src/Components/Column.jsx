import React, { useState, memo } from 'react';
import Card from './Card';
import styles from '../styles/Column.module.css';
import { Plus, X } from 'lucide-react';

function Column({ column, index, boardId, refresh, onCardClick, onCardUpdate, onDeleteCard }) {
  const token = localStorage.getItem("token");
  const [showAddCard, setShowAddCard] = useState(false);
  const [cardName, setCardName] = useState("");

  const handleDeleteColumn = async () => {
    try {
      await fetch(`http://localhost:8080/board/${boardId}/${column.id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      refresh();
    } catch (err) {
      console.error("Error deleting column:", err);
    }
  };

  const handleAddCard = async () => {
    if (!cardName.trim()) return;
    try {
      await fetch(`http://localhost:8080/board/card/${boardId}/${column.id}`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
        body: JSON.stringify({ title: cardName, description: "" }),
      });
      setCardName("");
      setShowAddCard(false);
      refresh();
    } catch (err) {
      console.error("Error adding card:", err);
    }
  };

  return (
    <div className={styles.columnOuter}>
      <div className={styles["col-name-div"]}>
        <div
          className={styles['column-name']}
        >
          {column.name}
        </div>

        <div
          className={styles['column-del']}
          
          onClick={handleDeleteColumn}
        >
          <X strokeWidth={3} size={20}></X> 
        </div>
      </div>

      <div className={styles.columnScroll}>
        <div className={styles.cards}>
          {column.cards?.map((card, index) => (
            <Card
              key={card.id}
              card={card}
              index={index}
              onDelete={() => onDeleteCard(card.id, column.id)}
              onClick={() => onCardClick(card)}
              onUpdate={onCardUpdate}
            />
          ))}
        </div>
      </div>

      {!showAddCard ? (
        <button
          className={styles["add-card-button"]}
          onClick={() => setShowAddCard(true)}
        >
          <Plus size={16} strokeWidth={3}/> Add Card
        </button>
      ) : (
        <div className={styles["add-card"]}>
          <input
            name="cardName"
            onChange={(e) => setCardName(e.target.value)}
            value={cardName}
            placeholder="Enter card name"
            required
            className={styles["card-name-input"]}
          />
          <div className={styles["card-btn-div"]}>
            <button onClick={handleAddCard} className={styles["card-btn"]}>
              Add Card
            </button>
            <button onClick={() => setShowAddCard(false)} className={styles["card-cancel-btn"]}>
              <X size={20}/>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default React.memo(Column);
