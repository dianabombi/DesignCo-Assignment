import React, {useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";


function Login() {

  const [credentials, setCredentials] = useState({email:"", password:""});
  const [error, setError] = useState("");
  const navigate = useNavigate();


  const handleChange = (event) => {
    const { name, value } = event.target;
    setCredentials({ ...credentials, [name]: value });
  };
 

  const handleLogin = async () => {
    try {
      const response = await axios.post("https://designco-assignment.onrender.com/users/login", credentials);

      localStorage.setItem("token", response.data.token); // Save token
      
      if (response.data.token) {
        navigate("/dashboard"); 
      } else {
        setError(response.data.message || "Invalid username or password.");
      }
    } catch (err) {
      console.error("Error during login:", err);
      setError("Login failed. Please try again.");
    }
  };

    const handleHomeClick = () => {
      navigate("/");
    };

  return (
    <div>
      <FontAwesomeIcon className="home-icon" icon={faHouse} size="2x" onClick={handleHomeClick}/>
      <div className="login-container"> 
        <div className ="login-form">
        <h2>Login Page</h2>
        {error && <p className="error-message">{error}</p>}
        <input 
          type="text"
          name="email"
          placeholder="E-mail"
          value={credentials.email}
          onChange={handleChange}
          />

        <input 
          type="password"
          name="password"
          placeholder="Password"
          value={credentials.password}
          onChange={handleChange}
          />

        <button onClick={handleLogin}>Log In</button>
        </div>
      </div>
    </div>
  );
}

export default Login;
