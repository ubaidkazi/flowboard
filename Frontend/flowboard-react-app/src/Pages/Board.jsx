import styles from "../styles/Board.module.css";
import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Column from "../Components/Column.jsx";
import { Plus, X, ArrowBigLeft } from "lucide-react";

function Board() {
  const { boardId } = useParams();
  const [boardData, setBoardData] = useState(null);
  const [columnName, setColumnName] = useState("");
  const [cardName, setCardName] = useState("");
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const scrollRef = useRef(null);

  const [showAddColumn, setShowAddColumn] = useState(false);

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
    const handleMouseDown = (e) => {
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
  };

  const handleColumnNameChange = (e) => setColumnName(e.target.value);
  const handleCardNameChange = (e) => {
    setCardName(e.target.value);
  };

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

  const goBack = () => {
    navigate(-1);
  };

  const refreshContent = () => {
    setRefreshTrigger((prev) => prev + 1);
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

  return (
    <>
      <div className={styles["board-wrapper"]}>
        <div className={styles["nav-bar"]}>
          {/* <h3>Board ID: {boardId} </h3> */}
          <h3>Board Name: {boardData?.name || "Loading..."} </h3>

          <button onClick={handleLogout}>Log out</button>
          <button onClick={goBack}>
            <ArrowBigLeft></ArrowBigLeft>
          </button>
        </div>

        <div className={styles["board-content"]}>
          {boardData && (
            <div className={styles["column-container"]} ref={scrollRef}>
              {boardData.columns.map((col, index) => (
                <Column
                  key={col.id}
                  column={col}
                  index={index}
                  boardId={boardId}
                  refresh={refreshContent}
                  onCardUpdate={handleCardUpdate}
                  onDelete={handleDeleteCard}
                  // cardName={cardName}
                  // setCardName={setCardName}
                />
              ))}

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
                  <Plus size={16} strokeWidth={3} /> Add List
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
                      }}
                      className={styles["col-btn"]}
                    >
                      Add List
                    </button>
                    <button
                      onClick={() => {
                        setColumnName("");
                        setShowAddColumn(false);
                      }}
                      className={styles["col-cancel-btn"]}
                    >
                      <X size={20} />
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Board;
