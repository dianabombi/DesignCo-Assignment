import React from 'react';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";

function Register() {

  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    username: "",
    email: "",
    password: "",
    password2: "",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate ();

  const handleChange = (event) => {
    const {name, value} = event.target;
    setFormData ({...formData, [name]:value});
  };

  const handleRegister = async () => {
    const { name, surname, username, email, password, password2 } = formData;

    if (!name || !surname || !username || !email || !password || !password2) {
      setError("Please fill out all fields.");
      return;
    }

    if (password !== password2) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const response = await axios.post("https://designco-assignment.onrender.com/users/register", {
        name,
        surname,
        username,
        email,
        password,
        password2
      });

      if (response.data.status) {
        alert("Registration successful!");
        navigate("/login"); 
      } else {
        setError(response.data.message || "Registration failed.");
      }
    } catch (err) {
      console.error("Error during registration:", err);
      setError(err.response?.data?.message || "An error occurred. Please try again.");
    }
  };

  const handleHomeClick = () => {
    navigate("/");
  };

  return (
    <div>
      <FontAwesomeIcon className="home-icon" icon={faHouse} size="2x" onClick={handleHomeClick}/>
    <div className="register-page">
      <div className="register-form">
      <h2>Would you like to be the part of our community?</h2>
      <p>Register here</p>
      
      <input 
        type="text" 
        placeholder="Name"
        name = "name"
        value={formData.name}
        onChange={handleChange}
        />

      <input 
        type="text" 
        placeholder="Surname"
        name = "surname"
        value={formData.surname}
        onChange={handleChange}
        />

      <input 
        type="text" 
        placeholder="Username"
        name = "username"
        value={formData.username}
        onChange={handleChange}
        />

      <input 
        type="text" 
        placeholder="email"
        name = "email"
        value={formData.email}
        onChange={handleChange}
        />
      <input 
        type="password" 
        placeholder="password"
        name = "password"
        value={formData.password}
        onChange={handleChange}
        />
      
      <input 
        type="password" 
        placeholder="confirm password"
        name = "password2"
        value={formData.password2}
        onChange={handleChange}/>
      
      <button onClick={handleRegister}>REGISTER</button>
      </div>
    </div>
    </div>
  )
}

export default Register;
