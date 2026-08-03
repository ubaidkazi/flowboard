import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../styles/Login.module.css";
import { Link, NavLink } from "react-router-dom";
import { Kanban, User, Mail, KeyRound, CircleX, CheckCheck, Eye, EyeOff, Layers, ArrowLeft } from "lucide-react";
import { API_BASE_URL } from "../api/config";





function Login()
{

  const[showError, setShowError] = useState(false);
  const[showSuccess, setShowSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");


  const togglePasswordVisibility = () => {
  setShowPassword((prev) => !prev);
  };



  
    const navigate = useNavigate();

    
    const proceedFromLogin = () => {
    setTimeout(() => {
          navigate("/dashboard");
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

        setShowError(false);
        setErrorMessage("");

      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage("");
        setShowError(false);
        setShowSuccess(false);
    
        try {
          const response = await fetch(`${API_BASE_URL}/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData)
          });
    
          if (response.ok) {

            const data = await response.json();

            //Save token to localStorage
            localStorage.setItem("token", data.token);
            localStorage.setItem("userId", Number(data.userId));
            localStorage.setItem("userName", data.userName);
            localStorage.setItem("fullName", data.fullName);
            localStorage.setItem("userEmail", data.email);
            // setShowError(false);
            setShowSuccess(true);
            proceedFromLogin();
            //alert("Login successful!");
            return;

            
          }

    if (response.status === 401) {
      setErrorMessage("Incorrect username or password.");
    } else if (response.status === 429) {
      setErrorMessage(
        "Too many login attempts. Please try again later."
      );
    } else if (response.status >= 500) {
      setErrorMessage(
        "FlowBoard is temporarily unavailable. Please try again shortly."
      );
    } else {
      setErrorMessage(
        "Unable to sign in. Please try again."
      );
    }

    setShowError(true);
  } catch (error) {
    console.error("Login request failed:", error);

    setErrorMessage(
      "Unable to connect to FlowBoard. Check your connection or try again later."
    );
    setShowError(true);
  }
};

      const goHome = () => {
          navigate("/");
        
    }

    

    

    return(
      <>

      <div className={styles["wrapper"]}>

       

       

      <div className={styles["left-side"]}>



        <div className={styles["left-side-section"]}>

          <div className={styles["heading-logo"]}>
            <Layers size={88} className={styles["logo"]}> </Layers>
          </div>

          <div>
            <h1  className={styles["heading"]} onClick={()=>navigate("/")}>FlowBoard  </h1>

          <div className={styles["left-section-text"]}>
            <p> Welcome back!</p>
          </div>

          </div>
          
        </div>
      </div>

      <div className={styles["right-section"]}>


        
      
      
      <div className={styles["form"]}>

      <div className={styles["home-div"]} onClick={goHome}>
          <Link className={styles["home-link"]} to={"/"}> <ArrowLeft size={20} ></ArrowLeft> Home</Link>
      </div>


        
       

          




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
          <input type={showPassword ? "text" : "password"} name="password" value={formData.password} onChange={handleChange}  placeholder='Enter your password' required  className={styles["input"]}/>
          <span onClick={togglePasswordVisibility} className={styles["password-toggle-icon"]}>
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </span>
        </div>

        </div>
        <br />

        { showError && (
          <p  className={styles["login-error"]}> <CircleX size={16} className={styles["error-icon"]}> </CircleX> {errorMessage}</p>
        )}
        { showSuccess && (
          <h1  className={styles["reg-success"]}>   <CheckCheck size={16}> </CheckCheck> Login Successful. </h1>
        )}
        
        <div className={styles["button-wrapper"]}>
        
       <button type="submit" className={styles["login-button"]}>Login</button>
        </div>
        <div className={styles["navlink-div"]}>

         <NavLink to="/signup" className={styles["nav-link"]}>Don't have an account?</NavLink>
         {/* <NavLink to="/" className={styles["nav-link"]}>  HOME </NavLink> */}
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