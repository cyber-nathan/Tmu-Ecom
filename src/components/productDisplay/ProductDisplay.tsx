import { useState} from 'react';
//import CreatePost from '../createPost/CreatePost';
import ProductCard from '../productCard/ProductCard';
import { DocumentData, collection, query, orderBy, onSnapshot} from "firebase/firestore"; 
import { db } from '../../pages/firebase.js';
import { useEffect } from 'react';



function ProductDisplay() {
  const [items, setItems] = useState<DocumentData[]>([]);
  
  // Fetch the posts from the database
  const getAllPosts = () => {
    const postsRef = collection(db, "Posts");
    const q = query(postsRef, orderBy("id", "asc")); //Get all posts by recency (id is the timestamp of the post)
    const getallPosts = onSnapshot(q, (snapshot) => {
      setItems(snapshot.docs.map((doc) => doc.data())); // Set the items to the data from the database
    }, (error) => {
      console.error("Error listening to posts:", error);
    });
    
    return getallPosts;
  };

  useEffect(() => {
    const action = getAllPosts(); //only get all posts for now, need to look further to see how to get search & filter working
    
    return () => action();
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
