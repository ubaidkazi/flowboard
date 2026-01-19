import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../styles/Login.module.css";
import { Link, NavLink } from "react-router-dom";
import { Kanban, User, Mail, KeyRound, CircleX, CheckCheck, Eye, EyeOff } from "lucide-react";

function Login()
{

  const[showError, setShowError] = useState(false);
  const[showSuccess, setShowSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);


  const togglePasswordVisibility = () => {
  setShowPassword((prev) => !prev);
  };



  
    const navigate = useNavigate();

    
    const proceedFromLogin = () => {
    setTimeout(() => {
          navigate("/newdashboard");
            }, 1500);
    }

    const [formData, setFormData] = useState({
        username: "",
        password: ""
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
          const response = await fetch("http://localhost:8080/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData)
          });
    
          if (response.ok) {

            const data = await response.json();

            //Save token to localStorage
            localStorage.setItem("token", data.token);
            localStorage.setItem("userId", data.userId);
            localStorage.setItem("userName", data.userName);
            localStorage.setItem("fullName", data.fullName);
            localStorage.setItem("userEmail", data.email);
            setShowError(false);
            setShowSuccess(true);
            proceedFromLogin();
            //alert("Login successful!");
            console.log(data);
            console.log(localStorage.getItem("userId"));
          } else {
            const error = await response.text();
            setShowError(true);
            setTimeout(() => {
            setShowError(false);
              }, 3000);
            setShowSuccess(false);
            // alert("Login failed: " + error);
          }
        } catch (error) {
          setShowError(true);
          // alert("Error connecting to server.");
          setTimeout(() => {
          setShowError(false);
              }, 3000);
          setShowSuccess(false);
          console.error(error);
        }
      };
    

    return(
      <>

      <div className={styles["wrapper"]}>

      <div className={styles["left-side"]}>

        <div className={styles["left-side-section"]}>

          <div className={styles["heading-logo"]}>
            <Kanban size={88} className={styles["logo"]}> </Kanban>
            <NavLink to="/" className={styles["heading"]}>Flow<span className={styles["heading-second-half"]} >Board </span></NavLink>
          </div>
          <div className={styles["left-section-text"]}>
            <p> Welcome back!</p>
          </div>
        </div>
      </div>

      <div className={styles["right-section"]}>
      <div className={styles["form"]}>
      <form onSubmit={handleSubmit}>
        <div className={styles["label-div"]}>
          <div> 
            <h1 className={styles["form-label"]}> Login </h1>

          </div>
          <h1 className={styles["form-label-2"]}> Enter your credentials to access your account</h1>
        </div>
        
        <div className={styles["inputs-labels"]}>


          <div  className={styles["input-wrapper"]}>
          <User size={28} className={styles["input-icon"]}> </User>
          <input name="username" value={formData.username} onChange={handleChange} placeholder='Enter your username' required  className={styles["input"]}/>
        </div>
        <div className={styles["input-wrapper"]}>
          
          <KeyRound size={28} className={styles["input-icon"]}> </KeyRound>
          <input type={showPassword ? "text" : "password"} name="password" value={formData.password} onChange={handleChange}  placeholder='Set your password' required  className={styles["input"]}/>
          <span onClick={togglePasswordVisibility} className={styles["password-toggle-icon"]}>
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </span>
        </div>

        </div>
        <br />
        
        <div className={styles["button-wrapper"]}>
        { showError && (
          <p  className={styles["incorrect-creds"]}> <CircleX size={16}> </CircleX> Invalid Username/Password </p>
        )}
        { showSuccess && (
          <h1  className={styles["reg-success"]}>   <CheckCheck size={16}> </CheckCheck> Login Successful. </h1>
        )}
       <button type="submit" className={styles["login-button"]}>Login</button>
        </div>
        <div className={styles["navlink-div"]}>

         <NavLink to="/signup" className={styles["nav-link"]}>Don't have an account?</NavLink>
        </div>
      </form>
      </div>

    </div>
    


    </div>
    




























        {/* <div className={styles["form-container"]}>
          <div className={styles.form}>
              <form onSubmit={handleSubmit}>
                <h1> FLOW BAORD LOGIN </h1>
                <p> Login to your account </p>
                <div>
                  <label>Username<sup><small>*</small></sup>: </label>
                  <input name="username" value={formData.username} onChange={handleChange} placeholder='enter your username' required />
                </div>
                <div>
                  <label>Password<sup><small>*</small></sup>: </label>
                  <input type="password" name="password" value={formData.password} onChange={handleChange}  placeholder='enter your password' required />
                </div>
                <br />
                <button type="submit" className={styles.loginbutton}>Login</button>
                <p>
                  <small>
                    Don't have an account?  Create one  <Link to="/signup">here!</Link>
                  </small>
                </p>
              </form>
            </div>
        </div> */}

        </>
    );


}
export default Login;