// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import TopNavebar from './components/navbar/Navebar';
import LoginPage from './pages/LoginPage';
import ProductDisplay from './components/productDisplay/ProductDisplay';
// import ProductCard from './components/productCard/ProductCard';


function App() {

  return (
    <BrowserRouter>
    <TopNavebar />
      <Routes>
        {/* Define the route for the Home component */}
        <Route path="/" element={<LoginPage />} />
        
        {/* Define the route for the Blog component */}
        <Route path="/ecom" element={<ProductDisplay /> } />
        
        {/* Define the route for the NewPost component */}
        {/* <Route path="/new-post" element={<NewPost />} /> */}
      </Routes>
    </BrowserRouter>


  );
}





export default App
