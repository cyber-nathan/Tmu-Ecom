import { useState } from 'react';
//import CreatePost from '../createPost/CreatePost';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ProductCard from '../productCard/ProductCard';
import { DocumentData, collection, query, orderBy, onSnapshot} from "firebase/firestore"; 
import { db } from '../../pages/firebase.js';
import { useEffect } from 'react';
import TopNavebar from '../navbar/Navebar.js';
import React from 'react';
import { AppContext } from '../../AppContext';
import { Dropdown, Navbar } from 'react-bootstrap';
import { auth } from '../../pages/firebase';
import { getIdTokenResult } from 'firebase/auth';


function ProductDisplay() {
  const [masterItems, setMasterItems] = useState<DocumentData[]>([]); //Original fetched items. kept separate from items to be displayed to avoid re-fetching
  const [items, setItems] = useState<DocumentData[]>([]); //Items to be displayed(after filtering and sorting)
    /* eslint-disable-next-line @typescript-eslint/no-unused-vars*/ //disable linting for setSearchString never used it wont be used here
  const { searchString, setSearchString } = React.useContext(AppContext); //shared state, for search bar to communicate with product display
  const [ queryCategory, setQueryCategory ] = useState<'Items for Sale' | 'Items Wanted' | 'Academic Services' | 'Any'>('Any');
  const [querySort, setQuerySort] = useState<'Recency' | 'Price: Low to High' | 'Price: High to Low' | 'Alphabetical'>('Recency');

  useEffect(() => {
    const action = getAllPosts(); //Update post list
    return () => action();
  }, []);

  
  
  //Use this to check if user is admin
  useEffect(() => {
    const fetchClaims = async () => {
      const idTokenResult = await getIdTokenResult(auth.currentUser);
      const claims = idTokenResult.claims;
      if (claims.admin) {
        //Style changes for admin or something
      }
    }

    if (auth.currentUser) {
      fetchClaims();
    }
  }, []);
  

  useEffect(() => {
    let tempItems = [...masterItems];
    if (searchString !== '') {
      tempItems = tempItems.filter((item) => item.prodName.toLowerCase().includes(searchString.toLowerCase())); //filter the posts by the search string
    } 
    if (queryCategory !== 'Any') {
      tempItems = tempItems.filter((item) => item.category === queryCategory); //filter the posts by the search string
    }
    switch (querySort) {
      case 'Recency':
        tempItems = tempItems.sort((a, b) => a.id - b.id);
        break;
      case 'Price: Low to High':
        tempItems = tempItems.sort((a, b) => b.price - a.price);
        break;
      case 'Price: High to Low':
        tempItems = tempItems.sort((a, b) => a.price - b.price);
        break;
      case 'Alphabetical':
        tempItems = tempItems.sort((a, b) => b.prodName.localeCompare(a.prodName));
        break;
      default:
        break;
    }
    setItems(tempItems);
  }, [searchString, queryCategory, querySort, masterItems]);

    // Fetch the posts from the database and update the state
    const getAllPosts = () => {
      console.log("Fetching posts, stop app if this is called in a loop there is a bug and it will overload the quota");
      const postsRef = collection(db, "Posts");
      const q = query(postsRef, orderBy("id", "asc")); //Get all posts by recency (id is the timestamp of the post)
      
      const getallPosts = onSnapshot(q, (snapshot) => {
        const res = snapshot.docs.map((doc) => doc.data());
        setMasterItems(res);
        setItems(res);
      }, (error) => {
        console.error("Error listening to posts:", error);
      });
      
      return getallPosts;
    };
  
  //Temporary style for navbar, might need change for mobile
  return (
    <><TopNavebar />
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Navbar style={{ width: '1000px' }} className="bg-light justify-content-between"> 

          <ButtonGroup>
                  <Button variant={queryCategory === 'Any' ? 'primary' : 'secondary'} onClick={() => setQueryCategory('Any')}>Any</Button>
                  <Button variant={queryCategory === 'Items for Sale' ? 'primary' : 'secondary'} onClick={() => setQueryCategory('Items for Sale')}>Items for Sale</Button>
                  <Button variant={queryCategory === 'Items Wanted' ? 'primary' : 'secondary'} onClick={() => setQueryCategory('Items Wanted')}>Items Wanted</Button>
                  <Button variant={queryCategory === 'Academic Services' ? 'primary' : 'secondary'} onClick={() => setQueryCategory('Academic Services')}>Academic Services</Button>
          </ButtonGroup>
          
          <Dropdown>
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            Sort by {querySort}
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item onClick={() => setQuerySort('Recency')}>Recency</Dropdown.Item>
            <Dropdown.Item onClick={() => setQuerySort('Price: Low to High')}>Price: Low to High</Dropdown.Item>
            <Dropdown.Item onClick={() => setQuerySort('Price: High to Low')}>Price: High to Low</Dropdown.Item>
            <Dropdown.Item onClick={() => setQuerySort('Alphabetical')}>Alphabetical</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        
      </Navbar>
    {[...items].reverse().map((item, index) => (
        // Render a ProductCard for each item, passing the item as a prop
        <ProductCard key={index} item={item} />
      ))}
    </div></>
  )
}
// new item only gets displayed when i reload this component dont know why
export default ProductDisplay;
