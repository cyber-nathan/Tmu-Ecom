import React from 'react'
import Button from "react-bootstrap/Button";

export const Navbar = () => {
  return (
    <div className='navbar'>
    <span className="logo">Chat</span> 
    <div className="">Username</div>

    <Button className='backButton' variant="primary">
                Back
    </Button>
    </div>
    
  )
}

export default Navbar