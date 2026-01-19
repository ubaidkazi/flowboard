import styles from '../styles/Signup.module.css';
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Kanban, User, Lock, Mail, KeyRound, CircleX, CheckCheck, Eye, EyeOff } from 'lucide-react';

function Signup() {


  const [showError, setShowError] = useState(false);
  const[showSuccess, setShowSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);


  const togglePasswordVisibility = () => {
  setShowPassword((prev) => !prev);
  };



  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    email: "",
    passwordHash: ""
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        // alert("Signup successful!");
        setShowError(false);
        setShowSuccess(true);
        console.log(await response.json());
        setTimeout(() => {
          navigate("/login");
            }, 1500);
      } else {
        const error = await response.text();
        setShowError(true);
        setTimeout(() => setShowError(false), 4000);
        setShowSuccess(false);
        // alert("Signup failed: " + error);
      }
    } catch (error) {
      // alert("Error connecting to server.");
      setShowError(true);
      setTimeout(() => setShowError(false), 4000);
      setShowSuccess(false);
      console.error(error);
    }
  };

  return (
    <>
    <div className={styles["wrapper"]}>

      <div className={styles["left-side"]}>

        <div className={styles["left-side-section"]}>

          <div className={styles["heading-logo"]}>
            <Kanban size={88} className={styles["logo"]}> </Kanban>
            <NavLink to="/" className={styles["heading"]}>Flow<span className={styles["heading-second-half"]} >Board </span></NavLink>
          </div>
          <div className={styles["left-section-text"]}>
            <p> FlowBoard is your team's digital workspace — manage projects, track tasks, and collaborate in real time with powerful, visual Kanban boards.</p>
          </div>
        </div>
      </div>

      <div className={styles["right-section"]}>
      <div className={styles["form"]}>
      <form onSubmit={handleSubmit}>
        <div className={styles["label-div"]}>
          <div> 
            <h1 className={styles["form-label"]}> Sign Up </h1>

          </div>
          <h1 className={styles["form-label-2"]}> Enter your details to create your account</h1>
        </div>
        
        <div className={styles["inputs-labels"]}>


          <div  className={styles["input-wrapper"]}>
          <User size={28} className={styles["input-icon"]}> </User>
          <input name="fullName" value={formData.fullName} onChange={handleChange} placeholder='Enter your full name' required  className={styles["input"]}/>
        </div>
          <div  className={styles["input-wrapper"]}>
          <User size={28} className={styles["input-icon"]}> </User>
          <input name="username" value={formData.username} onChange={handleChange} placeholder='Make your username' required  className={styles["input"]}/>
        </div>
        <div className={styles["input-wrapper"]}> 
          
          <Mail size={28} className={styles["input-icon"]}> </Mail>
          <input type="email" name="email" value={formData.email} onChange={handleChange}  placeholder='Enter your email address' required  className={styles["input"]}/>
        </div>
        <div className={styles["input-wrapper"]}>
          
          <KeyRound size={28} className={styles["input-icon"]}> </KeyRound>
          <input type={showPassword ? "text" : "password"} name="passwordHash" value={formData.passwordHash} onChange={handleChange}  placeholder='Set your password' required  className={styles["input"]}/>
          <span onClick={togglePasswordVisibility} className={styles["password-toggle-icon"]}>
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </span>
        </div>

        </div>
        <br />
        
        <div className={styles["button-wrapper"]}>
        { showError && (
          <p  className={styles["incorrect-creds"]}> <CircleX size={16}> </CircleX> Something went wrong - please try again later</p>
        )}
        { showSuccess && (
          <h1  className={styles["reg-success"]}>   <CheckCheck size={16}> </CheckCheck> Successfully Registered. Redirecting you to login </h1>
        )}
        
       <button type="submit" className={styles["login-button"]}>Sign Up</button>
        </div>
        <div className={styles["navlink-div"]}>

         <NavLink to="/login" className={styles["nav-link"]}>Already have an account?</NavLink>
        </div>
      </form>
      </div>

    </div>
    


    </div>
    

    </>
    
  );
}

export default Signup;
