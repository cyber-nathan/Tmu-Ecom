// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
/* eslint-disable @typescript-eslint/no-unused-vars */ //for err to searchString never used
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
//import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
//import TopNavebar from './components/navbar/Navebar';
import LoginPage from './pages/LoginPage';
import ProductDisplay from './components/productDisplay/ProductDisplay';
import ChatPage from './pages/ChatPage';
// import ProductCard from './components/productCard/ProductCard';
import Protected from './components/Protected';
import  {AppContext}  from './AppContext';
import { useContext } from 'react';


function App() {


  const [searchString, setSearchString] = React.useState(''); //for Context API to share Navbar search input with product display
  return (
  <AppContext.Provider value={{ searchString, setSearchString }}>
    <BrowserRouter>
      <Routes>
        {/* Define the route for the Home component */}
        <Route path="/" element={<LoginPage />} />
        {/* Will jump to login page if user has not login */}
        <Route path="/" element={<Protected />}> 
          {/* Define the route for the Blog component */}
          <Route path="/ecom" element={<ProductDisplay />} />
          <Route path="/chat" element={<ChatPage /> } />
        </Route>
        
      </Routes>
    </BrowserRouter>
    </AppContext.Provider>
  );
}





export default App
