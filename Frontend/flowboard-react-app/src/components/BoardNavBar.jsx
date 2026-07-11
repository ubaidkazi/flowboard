import styles from "../styles/BoardNavbar.module.css"
import { useState, useEffect,useRef } from "react";
import { useParams, useNavigate, Link} from "react-router-dom";
import { DragDropContext, Droppable } from "@hello-pangea/dnd";
import Column from "../components/Column.jsx";
import { Plus, X, CircleArrowLeft, LogOut, User, ArrowLeft, Palette, UserPlus, Sun, Moon, Settings, Trash2, Layers, EllipsisVertical, Ellipsis} from "lucide-react";
import CardOpenModal from "../components/CardOpenModal.jsx";
import AvatarGroup from "../components/AvatarGroup.jsx";
import Avatar from "../components/ui/avatar-new.jsx";
import { API_BASE_URL } from "../api/config.js";


import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';
import ThreeDotMenu from "./ui/ThreeDotMenu.jsx";


function ColorBox({ className }) {
  return (
    <div
      className={className}
      style={{
        width: "16px",
        height: "16px",
        borderRadius: "4px",
        border: "1px solid rgba(0,0,0,.08)",
      }}
    />
  );
}




function BoardNavbar({boardData, boardBackground, setBoardBackground,}) {


  //console.log(boardData);


  //new funcs
  const {boardId } = useParams();
  //const { theme, setTheme } = useTheme()
  
  //const board = boards.find(b => b.id === boardId) || boards[0]
  //const project = projects.find(p => p.id === id) || projects[0]



  
  const [boardName, setBoardName] = useState(boardData?.title)
  const [isEditingName, setIsEditingName] = useState(false)
  const [isInviteDialogOpen, setIsInviteDialogOpen] = useState(false)
  
  const [inviteEmail, setInviteEmail] = useState("");


  




  useEffect(() => {
  setBoardName(boardData?.title ?? "");
}, [boardData]);







  const updateBoardName = async (boardName) => {
      const token = localStorage.getItem("token");
      

     
      try {
        const response = await fetch(`${API_BASE_URL}/board/name/${boardId}`, {
          method: "PUT",
          headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(boardName),
          
        });

        if (response.ok) {
          const updatedName = await response.text();
          setBoardName(updatedName);
        }
      } catch (err) {
        console.error("Error getting project description:", err);
        
      }

     
    };













  const handleNameChange = () => {
    // In a real app, this would save the name
    updateBoardName(boardName);
    setIsEditingName(false)
  }

  const handleInvite = () => {
    // In a real app, this would send an invite
    setIsInviteDialogOpen(false)
    setInviteEmail("")
  }
  //new funcs end


  



  //const { boardId } = useParams();
  //const [boardData, setBoardData] = useState(null);
  const [columnName, setColumnName] = useState("");
  const [cardName, setCardName] = useState("");
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const scrollRef = useRef(null);



const [showModal, setShowModal] = useState(false);

const boardDataRef = useRef(null);






const closeModal = ()=>
{
  setShowModal(false);

}









const navigate = useNavigate();

  
const handleLogout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("username");
  navigate("/Login");
}

const goToDashboard = ()=>
{
  navigate("/dashboard");
}

const goToSettings = ()=>
{
  navigate("/dashboard/settings");
}






    

















  return (
    <>
      

        {/* Board Navbar */}
      <header className=" top-0 left-0 right-0 z-40 flex h-14 items-center justify-between border-b border-border bg-background backdrop-blur-sm px-4">
        
        <div className="flex items-center gap-4" >

          <Link  className={`flex items-center gap-2 hover:text-foreground transition-colors ${styles["goBackBtn"]}`} onClick={()=>navigate(-1)}>
            <ArrowLeft className="h-4 w-4" />
            <span className=" hidden sm:inline">{"GO BACK"}</span>
          </Link>
          
          <div className="h-6 w-px bg-border" />

          {isEditingName ? (
            <input
              value={boardName}
              onChange={(e) => setBoardName(e.target.value)}
              onBlur={handleNameChange}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleNameChange()
                if (e.key === "Escape") {
                  setBoardName(boardData.name)
                  setIsEditingName(false)
                }
              }}
              className={`h-8 w-48 font-semibold  ${styles["board-name-input"]}`}
              autoFocus
            />
          ) : (
            <button
              onClick={() => setIsEditingName(true)}
              className={`font-bold hover:bg-secondary/50 px-2 py-1 rounded-md transition-colors ${styles["board-name"]}`}
            >
              {boardName || "loading"}
            </button>
          )}
        </div>

        

        {/* <div className="flex items-center gap-2">
          <div>
            <div>
              <button variant="ghost" size="sm" className="hidden sm:flex">
                <Palette className="mr-2 h-4 w-4" />
                Background
              </button>
            </div>
            <div align="end" className="w-48">
              <div>Board Background</div>
              <div />
              {backgroundOptions.map((bg) => (
                <div
                  key={bg.id}
                  onClick={() => setSelectedBackground(bg.class)}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center gap-2">
                    <div className={`h-5 w-5 rounded ${bg.class} border border-border`} />
                    <span>{bg.name}</span>
                  </div>
                  {selectedBackground === bg.class && (
                    <Check className="h-4 w-4 text-primary" />
                  )}
                </div>
              ))}
            </div>

            
          </div>

          //Active Users
          <div className="flex items-center gap-2">
            <AvatarGroup  size="sm" />
            
            {/* <div open={isInviteDialogOpen} >
              <div>
                <button variant="outline" size="sm">
                  <UserPlus className="mr-2 h-4 w-4" />
                  <span className="hidden sm:inline">Invite</span>
                </button>
              </div>
              <div>
                <div>
                  <div>Invite to Board</div>
                  <div>
                    Invite team members to collaborate on this board.
                  </div>
                </div>
                <div className="py-4">
                  <div>
                    <div>Email Address</div>
                    <input
                      type="email"
                      placeholder="colleague@company.com"
                      value={inviteEmail}
                      onChange={(e) => setInviteEmail(e.target.value)}
                    />
                  </div>
                </div>
                <div>
                  <button variant="outline" onClick={() => setIsInviteDialogOpen(false)}>
                    Cancel
                  </button>
                  <button onClick={handleInvite}>Send Invite</button>
                </div>
              </div>
            </div> 
          </div>

          <div className="h-6 w-px bg-border" />

          //Theme Toggle 
          <button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="text-muted-foreground hover:text-foreground"
          >
            <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </button>

          //Settings Menu
          <div className="flex">
            <div className="bg-black">
              <button >
                <div className="h-4 w-4" />
              </button>
            </div>
            <div align="end">
              <div>
                <Settings className="mr-2 h-4 w-4" />
                Board Settings
              </div>
              <div />
              <div className="text-destructive">
                <Trash2 className="mr-2 h-4 w-4" />
                Delete Board
              </div>
            </div>
          </div>

          //</header>User Menu
          <div>
            <div>
              <div variant="ghost" className="relative h-8 w-8 rounded-full">
                <div className="h-8 w-8">
                  <div/>
                  <div>{localStorage.getItem("fullName").charAt(0)}</div>
                </div>
              </div>
            </div>
            <div align="end" className="w-56">
              <div>
                <div className="flex flex-col">
                  <span className="text-sm font-medium">{localStorage.getItem("fullName")}</span>
                  <span className="text-xs text-muted-foreground">{localStorage.getItem("email")}</span>
                </div>
              </div>
              <div />
              <div>
                <Link href="/dashboard">
                  <Layers className="mr-2 h-4 w-4" />
                  Dashboard
                </Link>
              </div>
              <div>
                <Link href="/settings">
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </Link>
              </div>
              <div />
              <div >
                <Link href="/" className="text-destructive">
                  <LogOut className="mr-2 h-4 w-4" />
                  Log out
                </Link>
              </div>
            </div>
          </div>
        </div> */}

        
        
        
        
        <div className={styles["right-section"]}>

        


        

            
        <div className={styles["bg-color-div"]}>

            


            <ThreeDotMenu
                trigger={<button className={styles["bg-color-btn"]} > <Palette/> Background </button>}
               options={boardBackground.map((bg) => ({
    label: bg.label,
    icon: <ColorBox className={bg.previewClass}  />,
    onClick: () => setBoardBackground(bg.className),
  }))}
    />



            

        </div>
        <div className={styles["bg-color-div"]}>

            <button className={styles["bg-color-btn"]} > <UserPlus/> Invite </button>

        </div>
        <div className={styles["bg-color-div"]}>

            <button className={styles["bg-color-btn"]} >  <Sun></Sun>  </button>

        </div>


        <div className="h-6 w-px bg-border" />
        


        <div className={styles["menu-trigger-container"]}>


        

            <ThreeDotMenu
                trigger={<button>
           <Ellipsis color="black" size={21}></Ellipsis>
            </button>}
      options={[
        {
          label: "Board Settings",
          icon: <Settings size={16} />,
          danger: false,
          onClick: () => console.log("settings"),
        },
        {
          label: "Delete Board",
          icon: <Trash2 size={16} />,
          danger: true,
          onClick: () => console.log("delete"),
        },
      ]}
    />


        </div >



         <div className={styles["menu-trigger-container"]}>


        

            <ThreeDotMenu
                trigger={<button>
           <Avatar userId={localStorage.getItem("userId")} fullName={localStorage.getItem("fullName")}></Avatar>
            </button>}
      options={[
        {
          label: "Dashboard",
          icon: <Layers size={16} />,
          danger: false,
          onClick: () => {goToDashboard()},
        },
        {
          label: "Settings",
          icon: <Settings size={16} />,
          danger: false,
          onClick: () => {goToSettings()},
        },
        {
          label: "Logout",
          icon: <LogOut size={16} />,
          danger: true,
          onClick: () => {handleLogout()},
        },
      ]}
      showUserDetail={true}
    />


        </div>



                  


        





        </div>
























      </header>
        
        
  


  {showModal && selectedCardId && selectedCard && (
  <CardOpenModal
    CurrentCard={selectedCard}
    columnId={selectedColumnId}
    onClose={closeModal}
    onUpdate={handleCardUpdate}
    onDelete={handleDeleteCard}
  />
  )}
  </>

  )
}

export default BoardNavbar;
