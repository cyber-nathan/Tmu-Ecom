import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import UserCard from '../userCard/UserCard';
import { collection, query, onSnapshot } from 'firebase/firestore';
import { db } from '../../pages/firebase.js';
import TopNavebar from '../navbar/Navebar.js';
import { Navbar, Button } from 'react-bootstrap';

function AdminDashboard() {
    const navigate = useNavigate();

    const handleNavigateToProducts = () => {
        navigate('/ecom'); // Navigate programmatically to /ecom
      };
  
      return (
        <>
          <TopNavebar />
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Navbar style={{ width: '1000px' }} className="bg-light justify-content-between">
              <Button onClick={handleNavigateToProducts} variant="outline-primary">Back to Products</Button>
            </Navbar>
            {/* Rendering UserCards */}
          </div>
        </>
      );
    } 

export default AdminDashboard;
