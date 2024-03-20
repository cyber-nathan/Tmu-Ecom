// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
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

function App() {

  return (
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


  );
}





export default App
