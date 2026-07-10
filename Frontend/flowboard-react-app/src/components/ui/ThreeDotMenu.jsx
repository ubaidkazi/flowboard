import { useState, useRef, useEffect } from "react";
import styles from '../../styles/ThreeDotMenu.module.css'

export default function ThreeDotMenu({ trigger, options = [] , showUserDetail=false}) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div style={{ position: "relative", display: "inline-block" }} ref={ref}>
      {/* trigger is fully customizable */}
      <div onClick={() => setOpen((v) => !v)} className={styles["trigger"]}>
        {trigger}
      </div>

      {open && (
        <div className={styles["menu"]}>

        {showUserDetail && (
  <>
    <div className={styles.userDetails}>
      <h3 className={styles.userFullName}>
        {localStorage.getItem("fullName")}
      </h3>

      <p className={styles.userEmail}>
        {localStorage.getItem("userEmail")}
      </p>
    </div>

  </>
)}












            
          {options.map((opt) => (
            <button
              key={opt.label}
              onClick={() => {
                opt.onClick?.();
                setOpen(false);
              }}
              className={`${styles.item} ${opt.danger ? styles.danger : ""}`}
            >
              {opt.icon && <span className={styles["icon"]}>{opt.icon}</span>}
              {opt.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

