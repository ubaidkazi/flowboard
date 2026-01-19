import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import styles from "../styles/NavBar.module.css";
import { Kanban } from "lucide-react";



function NavBar() {
  const [isHidden, setIsHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        setIsHidden(true); // hide on scroll down
      } else {
        setIsHidden(false); // show on scroll up
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <>
      <div className={styles["header-parent"]}>
        <header
          className={`${styles["header"]} ${isHidden ? styles["hide"] : ""}`}
        >
          <nav className={styles["navbar"]}>
            {/* <Kanban size={52} className={styles["icon"]}></Kanban> */}
            <div className={styles["home-link"]}>
                <NavLink to="/"  >
                
                <div className={styles["home-link-w-img"]}>
                  <Kanban size={66} className={styles["icon"]} color="#3b82f6" strokeWidth={2}></Kanban>
                  {/* <img src={kanbanimg} className={styles["kanban-img"]}></img> */}
                  <span className={styles["home-link-text-1"]}>Flow</span>
                  <span className={styles["home-link-text-2"]}>Board</span>
                </div>
                
                </NavLink>

              {/* <a href="/"> Flow<span className={styles["home-link-text-2"]}>Board</span></a> */}
            </div>

            <div className={styles["other-nav-links"]}>
              <NavLink to="/Dashboard/Home"  className={styles["nav-link"]} >
              Learn More
              </NavLink>
              <NavLink to="/login"  className={styles["nav-link"]} >
              Login
              </NavLink>
              <NavLink to="/signup"  className={styles["nav-btn"]} >
              Get Started
              </NavLink>
              
            </div>
          </nav>
        </header>
      </div>
    </>
  );
}

export default NavBar;
