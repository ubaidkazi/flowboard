import styles from '../styles/Settings.module.css';
import { useState, useRef } from 'react';
import { User, Bell, Palette,Shield, Settings2, Save, Camera, Upload, Layers, Bookmark} from 'lucide-react';
import TabSwitchComponent from "../components/ui/tab-switch-component";
import Avatar from '../components/ui/avatar-new';


function Settings()
{   


    const fullUserName = localStorage.getItem("fullName");
    const email = localStorage.getItem("userEmail");
    const intials = localStorage.getItem("userInitials");
    const userId = localStorage.getItem("userId");

    const names = fullUserName.trim().split(' ');

    const firstName = names[0];

    const fileInputRef = useRef(null);



    
    const lastName =    names.length>2 ? `${names[1]} ${names[2]}` : `${names[1]}`;



    const handleFileChange = async (event) => {
      const file = event.target.files[0];
      if (!file) return;

      console.log("Selected file:", file);

      event.target.value = null;

      await uploadProfilePic(file);
    };


    const uploadProfilePic = async (file) => {
  const token = localStorage.getItem("token");

  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch(
    `http://localhost:8080/user/${userId}/profile-picture`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        // DO NOT set Content-Type manually
      },
      body: formData,
    }
  );

  console.log(await response.text());
};










    const tabs = [
        { label: "Profile", value: "profile", icon: User,},
        { label: "Appearance", value: "appearance" , icon: Palette,},
        { label: "Notifications", value: "notifications" , icon: Bell,},
        { label: "Account", value: "account" , icon: Shield,},
     ];
    
        const [activeTab, setActiveTab] = useState(tabs[0].value);
    
        const handleTabChange = (tab) => {
            setActiveTab(tab);
    
            // Whatever should happen when the tab changes
            console.log(tab);
        };




        const handleUploadClick = () => {
            fileInputRef.current.click();
          };

      

      






    



    return(

        <>

        <div className={styles["main-div"]}>
            


            <div className={styles["settings-content"]}>


                <div className={styles["top-div"]}>
                    <div>
                         <h1 className={styles["settings-heading"]}>Settings</h1>
                        <h3 className={styles["settings-text"]}> Manage your account settings and preferences </h3>
                    </div>
                </div>

                <div className={styles["profile-tabs"]}>
                
                <TabSwitchComponent options={tabs} activeTab={activeTab} onTabChange={handleTabChange} ></TabSwitchComponent>


                </div>


            

        


                


                    <div className={styles["settings-view-container"]}>
                     
                                    {activeTab === "profile" && (
            <>
              <h1 className={styles["settings-title"]}>
                Profile Information
              </h1>

              <h3 className={styles["description"]}>
                Update your profile details and public information.
              </h3>

              <div className={styles["profile-pic-container"]}>
                <div className={styles["profile-card"]}>
                  <div className={styles["profile-avatar"]}>
                    <Avatar fullName={fullUserName} userId={userId} variant='xlarge'></Avatar>
                  </div>
                </div>

                <div className={styles["profile-pic-upload"]}>

                  <input
  type="file"
  ref={fileInputRef}
  style={{ display: "none" }}
  accept="image/*"
  onChange={handleFileChange}
/>

                  <button className={styles["dp-upload-btn"]} onClick={handleUploadClick}>
                    <Upload size={16} className={styles["camera-icon"]} />
                    Upload Photo
                  </button>

                  <h3 className={styles["dp-instructions"]}>
                    JPG, PNG or GIF. Max size 2MB.
                  </h3>
                </div>
              </div>

              <form className={styles["settings-form"]}>
                <div className={styles["full-name"]}>
                  <div className={styles["first-name"]}>
                    <label>First Name</label>
                    <input
                      type="text"
                      placeholder="First Name"
                      className={styles["input"]}
                      value={firstName}
                    />
                  </div>

                  <div className={styles["last-name"]}>
                    <label>Last Name</label>
                    <input
                      type="text"
                      placeholder="Last Name"
                      className={styles["input"]}
                      value={lastName}
                    />
                  </div>
                </div>

                <div className={styles["email"]}>
                  <label>Email Address</label>
                  <input
                    type="email"
                    placeholder="Email Address"
                    className={styles["input"]}
                    value={email}
                  />
                </div>

                <div className={styles["phone-number"]}>
                  <label>Phone Number</label>
                  <input
                    type="tel"
                    placeholder="Phone Number"
                    className={styles["input"]}
                  />
                </div>

                <div className={styles["location"]}>
                  <label>Location</label>
                  <input
                    type="text"
                    placeholder="Location"
                    className={styles["input"]}
                  />
                </div>

                <div className={styles["save-btn-div"]}>
                  <button type="submit" className={styles["save-button"]}>
                    <Bookmark />
                    Save Changes
                  </button>
                </div>
              </form>
            </>
          )}







    {["account", "appearance", "notifications"].includes(activeTab) && (
    <>
    <div className={styles["coming-soon-div"]}>


        

        <h1 className={styles["cs-title"]}>
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-(--primary)">
                                        <Layers color="white" className="h-5 w-5" /> 

                                        
                </div>

                <div className={styles["cs-description-div"]}>
                                      This section is still under development. Thanks for checking!!



                </div>
                    
        </h1>



        <div className={styles["cs-description-div"]}>


             





            {/* <h3 className={styles["cs-description"]}> Flowboard </h3> */}




        </div>

                
               





        
        
        


                





                </div>
      

      
    </>
  )}





                    </div>



             










            </div>

        </div>
        
        
        </>
    );
}
export default Settings;