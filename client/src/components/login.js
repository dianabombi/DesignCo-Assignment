import React, {useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


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
      const response = await axios.post("http://localhost:8000/users/login", credentials);
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

  return (
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
  );
}

export default Login;
