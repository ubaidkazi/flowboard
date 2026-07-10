
import styles from "..//../styles/DropDownSelect.module.css";
import { useState, useRef, useEffect } from "react";
import { ChevronDown, Check } from "lucide-react";



export default function DropDownSelect({options, icon:Icon, onChange})
{


    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState(options[0]);

    const handleSelect = (option) => {
            setSelected(option);
            setOpen(false);



            onChange(option);
            
        };
    
    
        const dropdownRef = useRef(null);
    
    
        useEffect(() => {
            const handleClickOutside = (event) => {
                if (
                    dropdownRef.current &&
                    !dropdownRef.current.contains(event.target)
                ) {
                    setOpen(false);
                }
            };
    
            document.addEventListener("mousedown", handleClickOutside);
    
            return () =>
                {
                    document.removeEventListener("mousedown", handleClickOutside);
                };
            }, []);
    
    
    
    
    
    
    


    





    return(


        <>


        <div ref={dropdownRef} className={styles["dropdown-div"]}> 
                            



                            <div className={styles["dropdown-container"]}>
                            <button
                                className={styles["dropdown-btn"]}
                                onClick={() => setOpen(!open)}
                            >
                                <div className={styles["selection-and-icon"]}>
                                    {Icon ? <Icon className="h-4 w-4 text-black" /> : null}
                                    {selected}
                                    <ChevronDown size={18}> </ChevronDown>
                                    
                                    
                                </div>
                            </button>

                            
                            <div className={`${styles["dropdown-menu"]} ${open ? styles["open"] : styles["closed"]}`}>
                                    
                                {options.map((option) => (
                                    <div
                                    key={option}
                                    className={`${styles["dropdown-option"]} ${
                                        selected === option ? styles["selected"] : ""
                                    }`}
                                    onClick={() => handleSelect(option)}
                                    >
                                    
                                    

                                    {option}
                                    <div className={styles["check-icon"]}> <Check size={15}> </Check></div>
                                    </div>
                                ))}
                                </div>
                            
                            </div>


                        </div>


        
        </>
    );
}