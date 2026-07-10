import { useState, createContext, useContext } from "react";
import { AppNavbar } from "./AppNavbar";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

// Create a sidebar context to manage collapse state
const SidebarContext = createContext({
  collapsed: false,
  setCollapsed: () => {}
});

export const useSidebar = () => useContext(SidebarContext);

function MainLayout() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <SidebarContext.Provider value={{ collapsed, setCollapsed }}>
      <div className="min-h-screen  flex">
        {/* Sidebar */}
        <aside
          className={`
            fixed top-0 left-0 h-screen bg-gray-900 transition-all duration-300
            ${collapsed ? "w-16" : "w-64"} 
            max-md:w-0  
          `}
        >
          <Sidebar />
        </aside>

        {/* Main content */}
        <div className="flex-1 flex flex-col min-h-screen">
          <AppNavbar />
          <main
            className={`
              pt-1 transition-all duration-300
              ${collapsed ? "ml-16" : "ml-64"} 
              max-md:ml-0
              bg-white-100
              flex-1
            `}
          >
            <div className="p-1 lg:px-2 py-10">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </SidebarContext.Provider>
  );
}

export default MainLayout;