import styles from "../styles/Board.module.css";
import { useState, useEffect,useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { DragDropContext, Droppable } from "@hello-pangea/dnd";
import Column from "../components/Column.jsx";
import { Plus, X, CircleArrowLeft, LogOut, User} from "lucide-react";
import CardOpenModal from "../components/CardOpenModal.jsx";
import BoardNavbar from "../components/BoardNavBar.jsx";
import { API_BASE_URL } from "../api/config.js";

import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';





function Board() {



  const { boardId } = useParams();
  const [boardData, setBoardData] = useState(null);
  const [columnName, setColumnName] = useState("");
  const [cardName, setCardName] = useState("");
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const isDraggingRef = useRef(false);
  const scrollRef = useRef(null);
  const isDownRef = useRef(false);
  const mousePosition = useRef({ x: 0, y: 0 });
  const autoScrollTimer = useRef(null);
  const [boardBackground, setBoardBackground] = useState(styles.bgGradientBlue);
  const [projectMembersData, setProjectMembersData] = useState([]);







  const [showAddColumn, setShowAddColumn] = useState(false);


const [selectedCardId, setSelectedCardId] = useState(null);
const [selectedColumnId, setSelectedColumnId] = useState(null);

const [showModal, setShowModal] = useState(false);

const boardDataRef = useRef(null);


const projectId = boardData?.projectId;


const backgrounds = [
  {
    label: "Blue Gradient",
    previewClass: styles.bgGradientBlue,
    className: styles.bgGradientBlue,
  },
  {
    label: "Green Gradient",
    previewClass: styles.bgGradientGreen,
    className: styles.bgGradientGreen,
  },
  {
    label: "Purple Gradient",
    previewClass: styles.bgGradientPurple,
    className: styles.bgGradientPurple,
  },
  {
    label: "Orange Gradient",
    previewClass: styles.bgGradientOrange,
    className: styles.bgGradientOrange,
  },
  {
    label: "Neutral",
    previewClass: styles.bgNeutral,
    className: styles.bgNeutral,
  },
];


useEffect(() => {
  boardDataRef.current = boardData;
}, [boardData, isDragging]);


useEffect(() => {
  const trackMouse = (e) => {
  if (!isDraggingRef.current) return;

  mousePosition.current.x = e.clientX;
  mousePosition.current.y = e.clientY;
  };

  window.addEventListener("mousemove", trackMouse);

  return () => {
    window.removeEventListener("mousemove", trackMouse);
  };
}, []);




 // GET ALL THE Members
  useEffect(() => {

    if (!projectId) return;

    const fetchMembers = async () => {
      const token = localStorage.getItem("token");
      //console.log(token);

      try {
        const response = await fetch(`${API_BASE_URL}/project/member/all?projectId=${projectId}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          // const text = await response.text();
          // setMessage(text);
          const data = await response.json();
          console.log("Fetched Members:", data);
          setProjectMembersData(data);
        } else {
          //setMessage("Failed to load Members data");
        }
      } catch (err) {
        console.error("Error fetching Members:", err);
        //setMessage("Server error");
      }
    };

    fetchMembers();
  }, [projectId]);






const closeModal = ()=>
{
  setShowModal(false);

}


 const fetchBoard = async () => {
  const token = localStorage.getItem("token");
    try {
      const res = await fetch(`${API_BASE_URL}/board/${boardId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      setBoardData(data);
    } catch (err) {
      console.error(err);
    }
  };








  const navigate = useNavigate();

  useEffect(() => {
  const token = localStorage.getItem("token");
  let stompClient;

 
  const socket = new SockJS(`${API_BASE_URL}/ws`);

  stompClient = new Client({
    webSocketFactory: () => socket,
    connectHeaders: {
      Authorization: `Bearer ${token}`,
    },
    onConnect: () => {
      console.log("STOMP connected");

      stompClient.subscribe(
        `/topic/boards/${boardId}`,
        (message) => {
          const event = JSON.parse(message.body);
          handleBoardEvent(event);
        }
      );
    },
  });

  stompClient.activate();
  fetchBoard();

  return () => {
    stompClient.deactivate();
  };
}, [boardId]);


// const handleBoardEvent = (event) => {
//   if (event.type === "CARD_CREATED") {
//     setBoardData(prev => ({
//       ...prev,
//       columns: prev.columns.map(col =>
//         col.id === event.columnId
//           ? { ...col, cards: [...col.cards, event.card] }
//           : col
//       )
//     }));
//   }

// }



const handleBoardEvent = (event) => {
  switch (event.type) {
  

  case "CARD_CREATED":

  const newCard = {
    id: event.cardId,
    title: event.title,
    position: event.position,
    checked: false,
    description: "",
    dueDate: null,
    priority: null,
    progress: null,
    createdAt: event.createdAt,
    updatedAt: event.updatedAt
  };

  setBoardData(prev => {
    if (!prev) return prev;

    return {
      ...prev,
      columns: prev.columns.map(col => {
        if (col.id !== event.columnId) return col;

        // Remove any temp cards
        const withoutTemp = col.cards.filter(
          card => !String(card.id).startsWith("temp-")
        );

        // Prevent duplicates (idempotency)
        if (withoutTemp.some(card => card.id === newCard.id)) {
          return col;
        }

        return {
          ...col,
          cards: [...withoutTemp, newCard]
        };
      })
    };
  });

break;



  case "CARD_DELETED":
  console.log(`Card deleted event received from the board topic.. by user: ${event.deletedBy} CARD ID: ${event.cardId}  DELETED AT:${event.createdAt} `);
  setBoardData(prev => {
      if (!prev) return prev;

      return {
        ...prev,
        columns: prev.columns.map(col =>
          col.id === event.columnId
            ? {
                ...col,
                cards: col.cards.filter(
                  card => card.id !== event.cardId
                )
              }
            : col
        )
      }})
  
  break;

  case "CARD_UPDATED":
  console.log(`Card updated event received from the board topic.. by user: ${event.updatedBy} CARD ID: ${event.cardId}  Updated AT:${event.updatedAt} `);
  console.log(event);
  const updatedCard = {
      id: event.cardId,
      title: event.cardTitle,
      checked: event.checked,
      description: event.description,
      dueDate: event.dueDate,
      priority: event.priority,
      progress: event.progress,
      createdAt: event.createdAt,
      updatedAt: event.updatedAt
    };

    setBoardData(prev => {
  if (!prev) return prev;

  return {
    ...prev,
    columns: prev.columns.map(col =>
      col.id === event.columnId
        ? {
            ...col,
            cards: col.cards.map(card =>
              card.id === updatedCard.id
                ? { ...card, ...updatedCard }
                : card
            )
          }
        : col
    )
  };
});

  break;

  case "CARD_MOVED":

    console.log("Card moved event received");
    console.log(event);
    console.log(`Card moved by user: ${event.movedBy} CARD ID: ${event.cardId}  Updated AT:${event.movedAt} `);
    refreshContent();

  break;

  case "COLUMN_CREATED":

  const newColumn = {
    id: event.columnId,
    name: event.title,
    position: event.position,
    createdAt: event.createdAt,
    cards: []
  };

  setBoardData(prev => {
    if (!prev) return prev;

    // Remove temp column if exists
    const withoutTemp = prev.columns.filter(
      col => !String(col.id).startsWith("temp-")
    );

    // Prevent duplicates
    if (withoutTemp.some(col => col.id === newColumn.id)) {
      return prev;
    }

    return {
      ...prev,
      columns: [...withoutTemp, newColumn]
    };
  });

break;

  case "COLUMN_DELETED":

  console.log(`Column deleted event received.. by user: ${event.deletedBy} COLUMN ID: ${event.columnId} DELETED AT: ${event.deletedAt}`);
  //console.log(event);
  //console.log(event.type);
  setBoardData(prev => {
    if (!prev) return prev;
    return {
      ...prev,
      columns: prev.columns.filter(
        col => col.id !== event.columnId
      )
    };
  });
  break;

  case "COLUMN_UPDATED":
  setBoardData(prev => {
    if (!prev) return prev;

    return {
      ...prev,
      columns: prev.columns.map(col =>
        col.id === event.columnId
          ? { ...col, name: event.newTitle }
          : col
      )
    };
  });
  break;


  case "COLUMN_MOVED":
  
  //already a Number
  const userId = localStorage.getItem("userId");

  if(Number(userId) === event.movedBy)
  {
    console.log("ignored the event, bc current user");
    return;
  }
  else
  {
    refreshContent();
    console.log(event);


    //console.log("stored userid:  " + userId);
    //console.log("event moved by:  " + event.movedBy);


  }
  
  break;
}


};







  useEffect(() => {
  const el = scrollRef.current;
  if (!el) return;

  let isDown = false;
  let startX;
  let scrollLeft;

  // Detect if mousedown was on a drag handle
  const isDraggingHandle = (target) => {
  return target.closest('[data-rbd-drag-handle-draggable-id]');
};

  const handleMouseDown = (e) => {

  if (isDraggingHandle(e.target)) {
    return;
  }

  if (isDraggingRef.current) return;

  isDownRef.current = true;

  el.classList.add(styles.grabbing);
  startX = e.pageX - el.offsetLeft;
  scrollLeft = el.scrollLeft;
};


const stopScrolling = () => {
  isDownRef.current = false;
  el.classList.remove(styles.grabbing);
};


const handleMouseLeave = stopScrolling;

const handleMouseUp = () => {
  isDownRef.current = false;
  el.classList.remove(styles.grabbing);
};

  const handleMouseMove = (e) => {
  // if (isDragging) return;
  if (isDraggingRef.current) return;
  // if (!isDown) return;
  if (!isDownRef.current) return;

  e.preventDefault();

  const x = e.pageX - el.offsetLeft;
  const walk = (x - startX) * 1.2; //scroll speed
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






    


// ============== how column was being added at first ==================
// const handleAddColumn = async () => {
//   const token = localStorage.getItem("token");
//   const url = `${API_BASE_URL}/board/column/${boardId}`;
//   const columnData = { name: columnName };

//   try {
//     await fetch(url, {
//       method: "POST",
//       headers: {
//         Authorization: `Bearer ${token}`,
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(columnData),
//     });

//     //refreshContent();
//   } catch (error) {
//     console.error("Error adding column:", error.message);
//   }
// };



const addOptimisticCard = (columnId, cardTitle) => {
  const tempId = "temp-" + Date.now();

  const optimisticCard = {
    id: tempId,
    title: cardTitle,
    position: 0,
    checked: false,
    description: "",
    dueDate: null,
    priority: null,
    progress: null,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  setBoardData(prev => {
    if (!prev) return prev;

    return {
      ...prev,
      columns: prev.columns.map(col =>
        col.id === columnId
          ? { ...col, cards: [...col.cards, optimisticCard] }
          : col
      )
    };
  });

  return tempId;
};






const updateMember = async (userId, method) => {
  const token = localStorage.getItem("token");

  try {
    const response = await fetch(
      `${API_BASE_URL}/card/${selectedCardId}/${userId}`,
      {
        method,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.ok) {
      const updatedCard = await response.json();

      setBoardData(prevBoard => ({
    ...prevBoard,
    columns: prevBoard.columns.map(column => ({
      ...column,
      cards: column.cards.map(card =>
        card.id === updatedCard.id ? updatedCard : card
      )
    }))
              }));
    }

  } catch(err) {
    console.error(err);
  }
};



const addMemberToCard = (userId) => {
  return updateMember(userId, "POST");
};


const removeMemberFromCard = (userId) => {
  return updateMember(userId, "DELETE");
};



























// ====== Add Column with Optimistic update ===== 
const handleAddColumn = async () => {

  if(columnName.trim() === "")
  {
    return;
  }

  const token = localStorage.getItem("token");
  const url = `${API_BASE_URL}/board/column/${boardId}`;
  const columnData = { name: columnName };

  // Temporary client-side ID
  const tempId = "temp-" + Date.now();

  const optimisticColumn = {
    id: tempId,
    name: columnName,
    position: boardData.columns.length + 1,
    createdAt: new Date().toISOString(),
    cards: []
  };

  //Immediately update UI
  setBoardData(prev => ({
    ...prev,
    columns: [...prev.columns, optimisticColumn]
  }));

  try {
    await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(columnData),
    });

  } catch (error) {
    console.error("Error adding column:", error.message);
  }
};











  const goBack = () => {
    navigate(-1);
  };


  const refreshContent = ()=>{
    fetchBoard();
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

    const movedColumnId = Number(result.draggableId);
    const oldPosition = result.source.index;
    const newPosition = result.destination.index;

    console.log("Moved column ID:", movedColumnId);
    console.log("Old position:", oldPosition);
    console.log("New position:", newPosition);

     //now old and new col positions only
    const payload = {
      boardId: boardData.id,
      columnMoved: movedColumnId,
      oldPosition: oldPosition,
      newPosition: newPosition
      
    };

    //Update UI once (no flicker)
    setBoardData(prev => ({ ...prev, columns: newColumns }));

    sendMoveColRequest(payload); // fire & forget
    return;
  }

  if (type === "CARD") {
    const sourceColumn = newColumns.find(col => col.id.toString() === source.droppableId);
    const destColumn = newColumns.find(col => col.id.toString() === destination.droppableId);

    const [movedCard] = sourceColumn.cards.splice(source.index, 1);
    destColumn.cards.splice(destination.index, 0, movedCard);



    //new
    const movedCardId = Number(result.draggableId);
    const fromColumnId = Number(result.source.droppableId);
    const toColumnId = Number(result.destination.droppableId);
    const newPosition = result.destination.index;



    //now old and new card positions only
    const payload = {
      boardId: boardData.id,
      cardMoved: movedCardId,
      oldColumn: fromColumnId,
      newColumn: toColumnId,
      newPosition: newPosition
    };

    


    
    //Update UI once
    setBoardData(prev => ({ ...prev, columns: newColumns }));

    sendMoveCardRequest(payload); // no second UI update
  }
};

const sendMoveColRequest = async (payload) => {
  const token = localStorage.getItem("token");
  //console.log(JSON.stringify(payload));
  try {
    const res = await fetch(`${API_BASE_URL}/board/moveColumn`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(payload)
    });

    if(res.ok)
    {
      console.log("Column moved successfully in the backend");
      // refreshContent();
      console.log(res.text());
      
    }

    if (!res.ok) throw new Error("Failed to update");

    
  } catch (error) {
    console.error("Reorder error:", error);
  }
};




const sendMoveCardRequest = async (payload) => {
  const token = localStorage.getItem("token");
  //console.log(JSON.stringify(payload));
  try {
    const res = await fetch(`${API_BASE_URL}/card/moveCard`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(payload)
    });

    if(res.ok)
    {
      console.log("Card Moved successfully in the backend");
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

  setSelectedCardId(card.id);
  setSelectedColumnId(column?.id);
  setShowModal(true);
};





const handleDeleteCard = async (cardId, columnId) => {
    const token = localStorage.getItem("token");
  
  try {
      
      await fetch(`${API_BASE_URL}/board/${boardId}/${columnId}/${cardId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      refreshContent();
    } catch (err) {
      console.error("Error deleting card:", err);
    }
    refreshContent();
  }


  function debounce(fn, delay) {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => fn(...args), delay);
  };
}



 const debouncedSendUpdate = useRef(
  debounce(async (cardId, updates) => {
    const token = localStorage.getItem("token");

    try {
      await fetch(`${API_BASE_URL}/cards/${cardId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updates),
      });
    } catch (err) {
      console.error("Failed to update card:", err);
    }
  }, 500)
).current;


// const handleCardUpdate = (cardId, updates) => {
//   if (!updates) return;


//   const finalUpdates = { ...updates };

//   /// Checkbox → Progress
//   if (updates.checked !== undefined) {
//     finalUpdates.progress = updates.checked
//       ? "Completed"
//       : "In Progress";
//   }

//   // Progress → Checkbox
//   if (updates.progress !== undefined) {
//     finalUpdates.checked = updates.progress === "Completed";
//   }


//   setBoardData(prev => ({
//     ...prev,
//     columns: prev.columns.map(col => ({
//       ...col,
//       cards: col.cards.map(card =>
//         card.id === cardId
//           ? { ...card, ...updates }
//           : card
//       )
//     }))
//   }));

//   debouncedSendUpdate(cardId, finalUpdates);
// };


const handleCardUpdate = (cardId, updates) => {
  if (!updates) return;

  const finalUpdates = { ...updates };

  // Checkbox toggle
  if (updates.checked !== undefined) {
    finalUpdates.progress = updates.checked
      ? "Completed"
      : "Not started";
  }

  // Progress dropdown change
  if (updates.progress !== undefined) {
    finalUpdates.checked = updates.progress === "Completed";
  }

  setBoardData(prev => {
    if (!prev) return prev;

    return {
      ...prev,
      columns: prev.columns.map(col => ({
        ...col,
        cards: col.cards.map(card =>
          card.id === cardId
            ? { ...card, ...finalUpdates }
            : card
        )
      }))
    };
  });

  debouncedSendUpdate(cardId, finalUpdates);
};


  






const selectedCard = boardData?.columns
  .flatMap(col => col.cards)
  .find(card => card.id === selectedCardId);





  return (
    <>
      

      <div className={`${styles["board-wrapper"]} ${boardBackground}`} >
        {/* <div className={styles["nav-bar"]}> */}
          {/* <h3>Board ID: {boardId} </h3> */}
          {/* <h3>Name: {boardData?.name || "Loading..."} </h3>
          <button onClick={goBack}> <CircleArrowLeft></CircleArrowLeft>  </button>
          <button onClick={handleLogout}><LogOut></LogOut></button>
          
        </div> */}

        {/* Board Navbar */}
        <div className={styles["nav-bar"]}>
                  <BoardNavbar boardData={boardData} boardBackground={backgrounds}
        setBoardBackground={setBoardBackground}></BoardNavbar>


        </div>
        
        <div className={styles["board-content"]}>
          {boardData && (
          <DragDropContext 
          
            
            onDragStart={()=>{
  isDraggingRef.current=true;
}}

onDragUpdate={(update)=>{


  console.log(update.destination);


}}

onDragEnd={(result)=>{

  isDraggingRef.current=false;

  handleDragEnd(result);

}}

            >

            <Droppable droppableId="columns" direction="horizontal" type="COLUMN">
  
                  {(provided) => (

                    <div
                      className={styles["column-container"]}
                      ref={(node)=>{
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
                      addOptimisticCard={addOptimisticCard}
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
      onChange={(e) => 
        {setColumnName(e.target.value)}
      }
      onKeyDown={(e) => {
                        if (e.key === "Enter" && columnName.trim() !== "") {
                        handleAddColumn();
                        setColumnName("");
                        setShowAddColumn(false);
                        }
                        if (e.key === "Escape") {
                          setShowAddColumn(false);
                          setColumnName("");
                        }
                        
                      }}
      value={columnName}
      placeholder="Enter list name"
      required
      className={styles["col-name-input"]}
      autoFocus
      onBlur={()=> { setShowAddColumn(false); setColumnName("");} }
    />
    <div className={styles["col-btn-div"]}>
      <button
        onMouseDown={async (e) => {
    e.preventDefault(); // prevents focus shift → prevents blur
    if (columnName.trim() !== "") {
      await handleAddColumn();
      setColumnName("");
      setShowAddColumn(false);
      }
    }}
      className={styles["col-btn"]}>
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


  {showModal && selectedCardId && selectedCard && (
  <CardOpenModal
    CurrentCard={selectedCard}
    columnId={selectedColumnId}
    projectMembers={projectMembersData}
    onClose={closeModal}
    onUpdate={handleCardUpdate}
    onDelete={handleDeleteCard}
    projectMembers={projectMembersData}
    onAddMember={addMemberToCard}
    onRemoveMember={removeMemberFromCard}
  />
  )}
  </>
  );
}

export default Board;
