import { useState } from 'react';
//import CreatePost from '../createPost/CreatePost';
import ProductCard from '../productCard/ProductCard';
import { DocumentData, collection, query, orderBy, onSnapshot} from "firebase/firestore"; 
import { db } from '../../pages/firebase.js';
import { useEffect } from 'react';
import React from 'react';
import { AppContext } from '../../AppContext';



function ProductDisplay() {
  const [items, setItems] = useState<DocumentData[]>([]);
  /* eslint-disable-next-line @typescript-eslint/no-unused-vars*/ //disable linting for setSearchString never used it wont be used here
  const { searchString, setSearchString } = React.useContext(AppContext); //shared state, for search bar to communicate with product display
  
  // Fetch the posts from the database and update the state
  const getAllPosts = () => {
    const postsRef = collection(db, "Posts");
    const q = query(postsRef, orderBy("id", "asc")); //Get all posts by recency (id is the timestamp of the post)
    const getallPosts = onSnapshot(q, (snapshot) => {
      let result: DocumentData[] = snapshot.docs.map((doc) => doc.data());
      if (searchString !== '') {
        result = result.filter((item) => item.prodName.toLowerCase().includes(searchString.toLowerCase())); //filter the posts by the search string
      }
      setItems(result);
    }, (error) => {
      console.error("Error listening to posts:", error);
    });
    
    return getallPosts;
  };

  useEffect(() => {
    const action = getAllPosts(); //Update post list
    
    return () => action();
  }, [searchString]);
  
  
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
