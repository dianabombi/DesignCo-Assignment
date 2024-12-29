import React from 'react';
import Header from './header';
import Sidebar from './sidebar';
import Blog from './blog';

import {useState, useEffect} from "react";
import axios from "axios";

function Dashboard() {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          console.error("No token found in localStorage");
          return;
        }

        const response = await axios.get("http://localhost:8000/me", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setUser(response.data);
      } catch (error) {
          console.error("Error fetching user:", error.response?.data || error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (loading) {
    return <h1>Loading...</h1>;
  }

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
