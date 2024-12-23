import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';


function Header() {

    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState(""); // SearchBar initial state

    const handleLoginToggle = () => {
        navigate("/login");
    };

    const data = [
        "Apple",
        "Banana",
        "Orange",
        "Pineapple",
        "Mango",
        "Strawberry",
        "Blueberry",
      ]; // will be changed according to the content 

    const filterData = data.filter((item)=>
        item.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

  return (
    <div>
      <header>
      <nav>
        <input 
            type="text" 
            placeholder="Search" 
            value ={searchTerm}
            
            />
        <button onClick={handleSearchChange}>Search</button>
        <button>Notifications</button>
        <button>Profile</button>
        <button onClick={handleLoginToggle}>Log Out</button>
      </nav>
      </header>
    </div>
  );
}

export default Header;
