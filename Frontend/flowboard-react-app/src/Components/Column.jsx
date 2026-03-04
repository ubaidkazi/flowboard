import React, { useState, memo } from 'react';
import { Droppable, Draggable } from '@hello-pangea/dnd';
import Card from './Card';
import styles from '../Styles/Column.module.css';
import { Plus, X } from 'lucide-react';

function Column({ column, index, boardId, refresh, onCardClick, onCardUpdate, onDeleteCard, addOptimisticCard }) {
  const token = localStorage.getItem("token");
  const [showAddCard, setShowAddCard] = useState(false);
  const [cardName, setCardName] = useState("");

  const handleDeleteColumn = async () => {
  const token = localStorage.getItem("token"); //get the JWT token

  if (!token) {
    console.error("No JWT token found");
    return;
  }

  try {
    const response = await fetch(`http://localhost:8080/board/${boardId}/${column.id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json" // optional but safe
      },
    });

    if (!response.ok) {
      console.error("Delete column failed:", response.status);
      return;
    }

    refresh(); // refresh the board after successful deletion
  } catch (err) {
    console.error("Error deleting column:", err);
  }
};


// ====== Not Optimistic =======
  // const handleAddCard = async () => {
  //   if (!cardName.trim()) return;
  //   try {
  //     await fetch(`http://localhost:8080/board/card/${boardId}/${column.id}`, {
  //       method: "POST",
  //       headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
  //       body: JSON.stringify({ title: cardName, description: "" }),
  //     });
  //     setCardName("");
  //     setShowAddCard(false);
  //   } catch (err) {
  //     console.error("Error adding card:", err);
  //   }
  // };



  const handleAddCard = async () => {
  if (!cardName.trim()) return;

  //add an optimistic card right away
  const tempId = addOptimisticCard(column.id, cardName);

  try {
    await fetch(
      `http://localhost:8080/board/card/${boardId}/${column.id}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ title: cardName, description: "" }),
      }
    );

    setCardName("");
    setShowAddCard(false);

  } catch (err) {
    console.error("Error adding card:", err);

    // Optional rollback

    // Optional: rollback optimistic update on failure
    setBoardData(prev => {
      if (!prev) return prev;

      return {
        ...prev,
        columns: prev.columns.map(col =>
          col.id === column.id
            ? {
                ...col,
                cards: col.cards.filter(card => card.id !== tempId)
              }
            : col
        )
      };
    });

  }
};



  return (
    <Draggable draggableId={`col-${column.id}`} index={index}>
  {(provided) => (
    <div
      className={styles.columnOuter}
      ref={provided.innerRef}
      {...provided.draggableProps}
    >
      <div className={styles["col-name-div"]}
      {...provided.dragHandleProps}
      >


        <div
        className={styles['column-name']}
        // {...provided.dragHandleProps}
        // onClick={handleDeleteColumn}
      >
        {column.name}
      </div>

      <div
        className={styles['column-del']}
        // {...provided.dragHandleProps}
        onClick={handleDeleteColumn}
      >
        <X strokeWidth={3} size={20}></X> 
      </div>



      </div>
      

      <Droppable droppableId={column.id.toString()} type="CARD">
        {(provided) => (
          <div
            className={styles.columnScroll}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
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
              {provided.placeholder}
            </div>
          </div>
        )}
      </Droppable>

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
            onKeyDown={(e) =>
            {
              if(e.key === "Enter")
              {
                handleAddCard();
              }
              else if(e.key=== "Escape")
              {
                setShowAddCard(false);
                setCardName("");
              }
            }
            }
            value={cardName}
            placeholder="Enter card name"
            required
            className={styles["card-name-input"]}
            onBlur={()=>{setShowAddCard(false); setCardName("");}}
            autoFocus
          />
          <div className={styles["card-btn-div"]}>
            <button
            onMouseDown={(e) => {
              e.preventDefault(); // prevents blur
              handleAddCard();
              }}
            className={styles["card-btn"]}>
              Add Card
            </button>
            <button 
              onMouseDown={(e) => {
              e.preventDefault(); // prevents blur
              setShowAddCard(false);
              }}
              className={styles["card-cancel-btn"]}>
              <X size={20}/>
            </button>
          </div>
        </div>
      )}
    </div>
  )}
</Draggable>

  );
}

export default React.memo(Column);
