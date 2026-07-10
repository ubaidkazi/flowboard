import { useState } from 'react';
import styles from '../../styles/TabSwitchComponent.module.css';









export default function TabSwitchComponent({options, activeTab, onTabChange})
{

    return(


        <>


        <div className={styles["project-type-tab"]}>



        {options.map((option) => {
          const Icon = option.icon;

          return (
          <button
              key={option.value}
              onClick={() => onTabChange(option.value)}
              className={`${styles["tab-btn"]} ${
                activeTab === option.value ? styles["tab-active"] : ""
              }`}
            >
              <div className={styles["icon-label"]}>
              {Icon && <Icon size={18} className={styles["icon"]}/>}
              {option.label}
              </div>
              
            </button>
          );
        })}



                                
        </div>

        
        
        </>
    );
}