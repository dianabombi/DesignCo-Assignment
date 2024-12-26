import React from 'react';

function Homepage() {
  return (
    <div>
      <h1 className ="home-page-h1">Welcome to Community App</h1>

      <img 
        src="/communityPicture.jpg" 
        alt="community-homepage" 
        style={{ width: "100%", height: "auto" }} 
      />
    </div>
  )
}

export default Homepage;
