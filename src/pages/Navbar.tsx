import React from 'react'
import Button from "react-bootstrap/Button";
import {getCurrentUser} from "./auth";

export const Navbar = () => {

  const user = getCurrentUser();


  return (
    <div className='navbar'>
    <span className="logo">Chat</span> 
    <div className="">{user.displayName}</div>

    <Button className='backButton' variant="primary">
                Back
    </Button>
    </div>
    
  )
}

export default Navbar