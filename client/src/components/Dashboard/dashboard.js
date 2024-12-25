import React from 'react';
import { useState } from 'react';
import Header from './header';
import Sidebar from './sidebar';
import Blog from './blog';

function Dashboard() {
  const [posts, setPosts] = useState([]);


  return (
    <div>
      <Header />
      <Sidebar />
      <Blog posts={posts}/>
    </div>
  )
}

export default Dashboard;
