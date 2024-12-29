import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState(""); // SearchBar initial state

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    alert("You have been logged out.");
    window.location.href = "/login"; // Redirect
  };

  const data = [
    "Apple",
    "Banana",
    "Orange",
    "Pineapple",
    "Mango",
    "Strawberry",
    "Blueberry",
  ]; // Replace with actual content

  const filteredData = data.filter((item) =>
    item.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <header>
        <nav>
          <input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={handleSearchChange} // Handle search input
          />
          <button>Notifications</button>
          <button>Profile</button>
          <button onClick={handleLogout}>Log Out</button>
        </nav>
        {/* Display Filtered Results */}
        {searchTerm && (
          <ul>
            {filteredData.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        )}
      </header>
    </div>
  );
}

export default Header;
