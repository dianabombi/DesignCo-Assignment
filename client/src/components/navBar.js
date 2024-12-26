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

      const redirectToBlog = () => {
        navigate("/blog");
      };

  return (
    <div className="nav-bar-styling">
        <button 
            className='button-navbar'
            onClick={redirectToBlog}
            >News in Community</button>
        
        <button 
            className='button-navbar'
            onClink={redirectToRegister}
            >Register</button>
        
        <button 
            className='button-navbar'
            onClick={redirectToLogin}>
                Login</button>
    </div>
  )
}

export default NavBar;
