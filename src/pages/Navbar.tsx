import React from 'react'
import Button from "react-bootstrap/Button";
import {getCurrentUser} from "./auth";
import { useNavigate } from 'react-router-dom';

export const Navbar = () => {

  const user = getCurrentUser();
  const navigate = useNavigate();
  
  const handleButtonClick = () => {
    navigate("/ecom");
  };

  return (
    <div className='navbar'>
    <span className="logo">Chat</span> 
    <div className="">{user.displayName}</div>

    <Button className='backButton' variant="primary" onClick={handleButtonClick}>
                Back
    </Button>
    </div>
    
  )
}

export default Navbar