import React from 'react';
import Header from './header';
import Sidebar from './sidebar';
import Blog from './blog';
import { jwtDecode } from "jwt-decode";


function Dashboard() {
  let token ;
  let decodedToken;

  // useEffect(() => {
  //   const fetchUser = async () => {
  //     try {
  //       const token = localStorage.getItem("token");
  // decodedToken = jwtDecode(token)

  //       if (!token) {
  //         console.error("No token found in localStorage");
  //         return;
  //       }

  //       const response = await axios.get(`http://localhost:8000/${decodedToken.userId}`, {
  //         headers: { Authorization: `Bearer ${token}` },
  //       });
  //       console.log(response.data)
  //       setUser(response.data);
  //     } catch (error) {
  //         console.error("Error fetching user:", error.response?.data || error.message);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchUser();
  // }, []);

  try{
    if(localStorage.getItem("token")){
      token = localStorage.getItem("token");
      decodedToken = jwtDecode(token)

    }
  }
  catch(err){
    console.log(err)
  }


  return (
    <div className="main-content">
      <Header />
      <h1 className="welcome-h1">Welcome to your Dashboard, {decodedToken.email || "guest"} . </h1>
      <Sidebar />
      <Blog />
    </div>
  )
}

export default Dashboard;
