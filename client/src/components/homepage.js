import React from 'react';
import NavBar from './navBar';
import {useNavigate} from 'react-router-dom';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";

function Homepage() {
  const navigate = useNavigate();

  const handleHomeClick = () => {
    navigate("/");
  };

  return (
    <div>
      <FontAwesomeIcon className="home-icon" icon={faHouse} size="2x" onClick={handleHomeClick}/>
        <h1 className ="home-page-h1">Welcome to Community App</h1>
        < NavBar />
        <img 
            src="/communityPicture.jpg" 
            alt="community-homepage" 
            style={{ width: "100%", height: "auto"}} 
            className='image-fixed'
        />
    </div>
  )
}

export default Homepage;
