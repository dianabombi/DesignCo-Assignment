import React from 'react';
import NavBar from './navBar';

function Homepage() {

  return (
    <div>
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
