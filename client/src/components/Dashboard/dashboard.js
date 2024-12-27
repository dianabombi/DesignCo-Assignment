import React from 'react';
import Header from './header';
import Sidebar from './sidebar';
import Categories from './categories';
import Blog from './blog';

function Dashboard() {
  
  return (
    <div>
      <Header />
      <Sidebar />
      <Categories />
      <Blog />
    </div>
  )
}

export default Dashboard;
