import { useState } from 'react';
//import CreatePost from '../createPost/CreatePost';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ProductCard from '../productCard/ProductCard';
import { DocumentData, collection, query, orderBy, onSnapshot, where} from "firebase/firestore"; 
import { db } from '../../pages/firebase.js';
import { useEffect } from 'react';
import React from 'react';
import { AppContext } from '../../AppContext';
import { Container } from 'react-bootstrap';



function ProductDisplay() {
  const [items, setItems] = useState<DocumentData[]>([]);
  /* eslint-disable-next-line @typescript-eslint/no-unused-vars*/ //disable linting for setSearchString never used it wont be used here
  const { searchString, setSearchString } = React.useContext(AppContext); //shared state, for search bar to communicate with product display
  const [ queryCategory, setQueryCategory ] = useState<'WTS' | 'WTB' | 'Service' | 'Any'>('Any');
  
  // Fetch the posts from the database and update the state
  const getAllPosts = () => {
    const postsRef = collection(db, "Posts");
    let q = query(postsRef, orderBy("id", "asc")); //Get all posts by recency (id is the timestamp of the post)
    if (queryCategory !== 'Any') { //If a category is selected, filter by category
      q = query(postsRef, orderBy("id", "asc"), where("category", "==", queryCategory));
    }

    
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
  }, [searchString, queryCategory]);
  
  
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Container>
        <form>
        <ButtonGroup>
                <Button variant={queryCategory === 'Any' ? 'primary' : 'secondary'} onClick={() => setQueryCategory('Any')}>Any</Button>
                <Button variant={queryCategory === 'WTS' ? 'primary' : 'secondary'} onClick={() => setQueryCategory('WTS')}>WTS</Button>
                <Button variant={queryCategory === 'WTB' ? 'primary' : 'secondary'} onClick={() => setQueryCategory('WTB')}>WTB</Button>
                <Button variant={queryCategory === 'Service' ? 'primary' : 'secondary'} onClick={() => setQueryCategory('Service')}>Service</Button>
              </ButtonGroup>
        </form>
      </Container>
    {[...items].reverse().map((item, index) => (
        // Render a ProductCard for each item, passing the item as a prop
        <ProductCard key={index} item={item} />
    ))}
</div>
  )
}
// new item only gets displayed when i reload this component dont know why
export default ProductDisplay;
