import { AppNavbar } from "./AppNavbar";
import { Outlet } from "react-router-dom";
import BoardNavbar from "./BoardNavBar";

function BoardLayout() {
  return (
    <div className="h-screen flex flex-col overflow-hidden">
      {/* Navbar */}
      <BoardNavbar />

      {/* Board */}
      <main className="flex-1 overflow-hidden">
        <Outlet />
      </main>
    </div>
  );
}

export default BoardLayout;