import React, { useState} from 'react';
//import CreatePost from '../createPost/CreatePost';
import ProductCard from '../productCard/ProductCard';
import { DocumentData, collection } from "firebase/firestore"; 
import { db } from '../../pages/firebase.js';
import { onSnapshot } from "firebase/firestore";
import { useEffect } from 'react';



function ProductDisplay() {
  const [items, setItems] = useState<DocumentData[]>([]);
  
  // Fetch the posts from the database
  useEffect(() => {
    const getPosts = onSnapshot(collection(db, "Posts"), (snapshot) => {
      setItems(snapshot.docs.map((doc) => doc.data())); // Set the items to the data from the database
    }, (error) => {
      console.error("Error listening to posts:", error);
    });
    return () => getPosts();
  }, []);
  
  
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
    {[...items].reverse().map((item, index) => (
        // Render a ProductCard for each item, passing the item as a prop
        <ProductCard key={index} item={item} />
    ))}
</div>
  )
}
// new item only gets displayed when i reload this component dont know why
export default ProductDisplay;
