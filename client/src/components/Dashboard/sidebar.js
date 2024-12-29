import React from 'react';
import { useNavigate } from 'react-router-dom';

function Sidebar() {
    
    const navigate = useNavigate ();

    const handleRedirect = () => {
        navigate ("/blog");
    };


  return (
    <aside className="sidebar">
      <ul className="sidebar-list">
        <li>Home</li>
        <li>Analytics</li>
        <li>Settings</li>
        <li onClick={handleRedirect}>Crate Post</li>
        <li>Blog</li>
      </ul>
    </aside>
  );
}

export default Sidebar;