import React from 'react';
import Header from './header';
import Sidebar from './sidebar';
import Blog from './blog';

import {useState, useEffect} from "react";
import axios from "axios";

function Dashboard() {
  const [user, setUser] = useState({});

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:8000/users/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, []);

  return (
    <div>
      <h1>Welcome to your Dashboard, {user.name || "guest"}. </h1>
      <Header />
      <Sidebar />
      <Blog />
    </div>
  )
}

export default Dashboard;
