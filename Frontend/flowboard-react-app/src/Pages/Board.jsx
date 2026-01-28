import styles from "../styles/Board.module.css";
import { useState, useEffect,useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { DragDropContext, Droppable } from "@hello-pangea/dnd";
import Column from "../components/Column.jsx";
import { Plus, X, ArrowBigLeft } from "lucide-react";
import CardOpenModal from "../Components/CardOpenModal.jsx";



function Board() {
  const { boardId } = useParams();
  const [boardData, setBoardData] = useState(null);
  const [columnName, setColumnName] = useState("");
  const [cardName, setCardName] = useState("");
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const scrollRef = useRef(null);



  const [showAddColumn, setShowAddColumn] = useState(false);


const [selectedCard, setSelectedCard] = useState(null);
const [showModal, setShowModal] = useState(false);


const closeModal = ()=>
{
  setShowModal(false);

}





  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    const fetchData = async () => {
      try {
        const res = await fetch(`http://localhost:8080/board/${boardId}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!res.ok) throw new Error("Failed to fetch");

        const data = await res.json();
        console.log("Fetched data:", data);
        setBoardData(data);
      } catch (err) {
        console.error("Error:", err);
      }
    };

    fetchData();

  }, [refreshTrigger]);



  useEffect(() => {
  const el = scrollRef.current;
  if (!el) return;

  let isDown = false;
  let startX;
  let scrollLeft;

  // Detect if mousedown was on a drag handle
  const isDraggingHandle = (target) => {
    // Hello-pangea-dnd adds this attribute to drag handles
    return target.closest('[data-rbd-drag-handle-context-id]');
  };

  const handleMouseDown = (e) => {
    if (isDraggingHandle(e.target)) return; // skip grab scroll
    isDown = true;
    el.classList.add(styles.grabbing); // apply grabbing class
    startX = e.pageX - el.offsetLeft;
    scrollLeft = el.scrollLeft;
  };

  const handleMouseLeave = () => {
    isDown = false;
    el.classList.remove(styles.grabbing);
  };

  const handleMouseUp = () => {
    isDown = false;
    el.classList.remove(styles.grabbing);
  };

  const handleMouseMove = (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - el.offsetLeft;
    const walk = (x - startX) * 1.2; // adjust scroll speed here
    el.scrollLeft = scrollLeft - walk;
  };

  el.addEventListener("mousedown", handleMouseDown);
  el.addEventListener("mouseleave", handleMouseLeave);
  el.addEventListener("mouseup", handleMouseUp);
  el.addEventListener("mousemove", handleMouseMove);

  return () => {
    el.removeEventListener("mousedown", handleMouseDown);
    el.removeEventListener("mouseleave", handleMouseLeave);
    el.removeEventListener("mouseup", handleMouseUp);
    el.removeEventListener("mousemove", handleMouseMove);
  };
}, [boardData]);





  
const handleLogout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("username");
  navigate("/Login");
}







  const handleColumnNameChange = (e) => setColumnName(e.target.value);
  const handleCardNameChange = (e) => {
    setCardName(e.target.value);
    
  }

  const handleAddColumn = async () => {
    const token = localStorage.getItem("token");
    const url = `http://localhost:8080/board/column/${boardId}`;
    const columnData = { name: columnName };

    try {
      await fetch(url, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(columnData),
      });

      refreshContent();
    } catch (error) {
      console.error("Error adding column:", error.message);
    }
  };

  const handleAddCard = async (boardId, columnId) => {
    const token = localStorage.getItem("token");
    const url = `http://localhost:8080/board/card/${boardId}/${columnId}`;
    const cardData = {
      title: cardName,
      description: "description",
    };

    try {
      await fetch(url, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cardData),
      });

      setRefreshTrigger((prev) => prev + 1);
    } catch (error) {
      console.error("Error adding card:", error.message);
    }
  };

  const handleDeleteColumn = async (boardId, columnId) => {
    const token = localStorage.getItem("token");
    const url = `http://localhost:8080/board/${boardId}/${columnId}`;

    try {
      await fetch(url, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      setRefreshTrigger((prev) => prev + 1);
    } catch (error) {
      console.error("Error deleting column:", error.message);
    }
  };

  // const handleDeleteCard = async (boardId, columnId, cardId) => {
  //   const token = localStorage.getItem("token");
  //   const url = `http://localhost:8080/board/${boardId}/${columnId}/${cardId}`;

  //   try {
  //     await fetch(url, {
  //       method: "DELETE",
  //       headers: { Authorization: `Bearer ${token}` },
  //     });

  //     setRefreshTrigger((prev) => prev + 1);
  //   } catch (error) {
  //     console.error("Error deleting card:", error.message);
  //   }
  // };

  const goBack = () => {
    navigate(-1);
  };


  const refreshContent = ()=>{
    setRefreshTrigger((prev)=> prev+1);
  }

  



  

  //Handle card drag logic (same-column drag for now)
  //it is updating the columns where a card is dragged from and where a card is dropped to.
  const handleDragEnd = async (result) => {
  const { source, destination, type } = result;
  if (!destination || !boardData) return;

  const newColumns = structuredClone(boardData.columns);

  if (type === "COLUMN") {
    const [movedCol] = newColumns.splice(source.index, 1);
    newColumns.splice(destination.index, 0, movedCol);

    const payload = {
      boardId: boardData.id,
      updatedColumns: newColumns.map((col, i) => ({ id: col.id, position: i })),
      updatedCards: []
    };

    //Update UI once (no flicker)
    setBoardData(prev => ({ ...prev, columns: newColumns }));

    sendReorderRequest(payload); // fire & forget
    return;
  }

  if (type === "CARD") {
    const sourceColumn = newColumns.find(col => col.id.toString() === source.droppableId);
    const destColumn = newColumns.find(col => col.id.toString() === destination.droppableId);

    const [movedCard] = sourceColumn.cards.splice(source.index, 1);
    destColumn.cards.splice(destination.index, 0, movedCard);

    const payload = {
      boardId: boardData.id,
      updatedColumns: newColumns.map((col, i) => ({ id: col.id, position: i })),
      updatedCards: newColumns.flatMap(col =>
        col.cards.map((card, i) => ({
          id: card.id,
          columnId: col.id,
          position: i
        }))
      )
    };

    //Update UI once
    setBoardData(prev => ({ ...prev, columns: newColumns }));

    sendReorderRequest(payload); // no second UI update
  }
};


const sendReorderRequest = async (payload) => {
  const token = localStorage.getItem("token");
  try {
    const res = await fetch("http://localhost:8080/board/reorder", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(payload)
    });

    if(res.ok)
    {
      console.log("Board reordered successfully in the backend");
      // refreshContent();
      
    }

    if (!res.ok) throw new Error("Failed to update");

    
  } catch (error) {
    console.error("Reorder error:", error);
  }
};


const handleDragUpdate = (update) => {
  if (!scrollRef.current) return;

  const container = scrollRef.current;
  const rect = container.getBoundingClientRect();

  // `client` has current pointer coords
  const pointer = update?.client;
  if (!pointer) return;

  const scrollThreshold = 50; // pixels from edge to start scrolling
  const scrollSpeed = 10; // pixels to scroll per update event

  if (pointer.x > rect.right - scrollThreshold) {
    container.scrollLeft += scrollSpeed;
  } else if (pointer.x < rect.left + scrollThreshold) {
    container.scrollLeft -= scrollSpeed;
  }
};

const handleCardClick = (card) => {
  const column = boardData?.columns.find(col =>
    col.cards.some(c => c.id === card.id)
  );

  setSelectedCard({ ...card, columnId: column?.id });
  setShowModal(true);
};



let updateTimeout;

const handleCardUpdate = (updatedCard) => {
  // Update UI immediately
  setBoardData((prev) => ({
    ...prev,
    columns: prev.columns.map((col) => ({
      ...col,
      cards: col.cards.map((card) =>
        card.id === updatedCard.id ? updatedCard : card
      ),
    })),
  }));

  clearTimeout(updateTimeout);

  // Wait 300ms before persisting (to avoid spamming backend)
  updateTimeout = setTimeout(async () => {
    const token = localStorage.getItem("token");
    try {
      await fetch(`http://localhost:8080/cards/${updatedCard.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          checked: updatedCard.checked,
          progress: updatedCard.progress,
        }),
      });
    } catch (error) {
      console.error("Error syncing card:", error);
    }
  }, 300);
};



const handleDeleteCard = async (cardId, columnId) => {
    const token = localStorage.getItem("token");
  
  try {
      
      await fetch(`http://localhost:8080/board/${boardId}/${columnId}/${cardId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      refreshContent();
    } catch (err) {
      console.error("Error deleting card:", err);
    }
  };









  return (
    <>
      

      <div className={styles["board-wrapper"]}>
        <div className={styles["nav-bar"]}>
          {/* <h3>Board ID: {boardId} </h3> */}
          <h3>Board Name: {boardData?.name || "Loading..."} </h3>
       
          <button onClick={handleLogout}>Log out</button>
          <button onClick={goBack}> <ArrowBigLeft></ArrowBigLeft>  </button>
        </div>
        
        <div className={styles["board-content"]}>
          {boardData && (
          <DragDropContext onDragEnd={handleDragEnd} onDragUpdate={handleDragUpdate}>
            <Droppable droppableId="columns" direction="horizontal" type="COLUMN">
              {(provided) => (
                <div
                  className={styles["column-container"]}
                ref={(node) => {
                scrollRef.current = node;
                provided.innerRef(node);
              }}
                  {...provided.droppableProps}
                >
                  {boardData.columns.map((col, index) => (
                    <Column
                      key={col.id}
                      column={col}
                      index={index}
                      boardId={boardId}
                      refresh={refreshContent}
                      onCardClick={handleCardClick}
                      onCardUpdate={handleCardUpdate}
                      onDeleteCard={handleDeleteCard}
                      // cardName={cardName}
                      // setCardName={setCardName}
                    />
                  ))}
                  {provided.placeholder}

                  {/* <div className={styles["add-column"]}>
                    <input
                        name="columnName"
                        onChange={(e) => setColumnName(e.target.value)}
                        value={columnName}
                        placeholder="Enter a new list"
                        required />
                        <button onClick={handleAddColumn}>Add List</button>
                  </div> */}

                  {!showAddColumn ? (
                  <button
                 className={styles["add-column-button"]}
                   onClick={() => setShowAddColumn(true)}
                   >
              <Plus  size={16} strokeWidth={3}/> Add List
                </button>
            ) : (
  <div className={styles["add-column"]}>
    <input
      name="columnName"
      onChange={(e) => setColumnName(e.target.value)}
      value={columnName}
      placeholder="Enter list name"
      required
      className={styles["col-name-input"]}
    />
    <div className={styles["col-btn-div"]}>
      <button
        onClick={async () => {
          if (columnName.trim() !== "") {
            await handleAddColumn();
            setColumnName("");
            setShowAddColumn(false);
          }
          }}  className={styles["col-btn"]}>
            Add List
          </button>
         <button onClick={() => { setColumnName(""); setShowAddColumn(false);}}  className={styles["col-cancel-btn"]}> <X size={20} /> </button>
    </div>
  </div>
  )}
  </div>
  )}
  </Droppable>
  </DragDropContext>
  )}
  </div>
  </div>


  {showModal && selectedCard && (
  <CardOpenModal
    CurrentCard={selectedCard}
    columnId={selectedCard.columnId}
    onClose={closeModal}
    onUpdate={handleCardUpdate}
    onDelete={handleDeleteCard}
  />
   )}






  </>
  );
}

export default Board;
