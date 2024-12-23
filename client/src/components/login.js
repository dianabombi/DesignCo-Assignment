import React, {useState } from "react";
import { useNavigate } from "react-router-dom";


function Login() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const handleLogin = () => {
    setIsLoggedIn(true);
    navigate("/dashboard"); // Navigate to dashboard after login
  };

  return (
    <div>
      <h2>Login Page</h2>
      <input type="text"/>
      <input type="text"/>
      <button onClick={handleLogin}>Log In</button>
    </div>
  );
}

export default Login;
