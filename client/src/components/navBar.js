import React from 'react';
import { useNavigate } from 'react-router-dom';

function NavBar() {

    const navigate = useNavigate();

    const redirectToLogin = () => {
      navigate("/login");
    };

    const redirectToRegister = () => {
        navigate("/register");
      };

      const redirectToTrending = () => {
        navigate("/trending");
      };

      const redirectToCommunities = () => {
        navigate("/communities");
      };

  return (
    <div className="nav-bar-styling">
        <button 
            className='button-navbar'
            onClick={redirectToTrending}
            >What's new</button>
        
        <button 
            className='button-navbar'
            onClick={redirectToRegister}
            >Register</button>
        
        <button 
            className='button-navbar'
            onClick={redirectToLogin}>
                Login</button>

        <button 
            className='button-navbar'
            onClick={redirectToCommunities}>
        Find your community</button>
    </div>
  )
}

export default NavBar;
