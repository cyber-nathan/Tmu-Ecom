import 'bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import './ProductCard.css'; // Import your CSS file
import { useNavigate } from 'react-router-dom';
import { db } from '../../pages/firebase.js';
import { doc, deleteDoc, where, writeBatch, collection, query, getDocs } from "firebase/firestore";
import DeletePost from '../deletePost/DeletePost';
import { useState, useEffect } from 'react';

// make image fit properly in the card

function ProductCard(props: any) {
  //console.log("prodCard", props); // this also get displayed twice for some reason 
  //console.log("this is img", props.item.picture);
    const navigate = useNavigate();

    const { item, isAdmin, currentUserId } = props;
    const { docId, ownerId } = item;

    const handleButtonClick = () => {
      navigate("/chat");
    };

    const [modalShow, setModalShow] = useState(false);

    // Check if the current user is the owner of the post
    const isOwner = currentUserId === ownerId;

    const handleBanUser = async () => {
      if (!window.confirm(`Are you sure you want to ban the user and delete all their posts and their account?`)) {
        return;
      }
      
      try {
        // Logic to delete all posts by the user
        const postsRef = collection(db, "Posts");
        const q = query(postsRef, where("owner", "==", ownerId));
        const querySnapshot = await getDocs(q);
        const batch = writeBatch(db); // Use a batch to delete all posts at once
    
        querySnapshot.forEach((doc) => {
          batch.delete(doc.ref);
        });
    
        await batch.commit(); // Commit the batch delete for posts
    
        // Logic to delete the user from "chatUsers" collection
        const usersRef = collection(db, "chatUsers");
        const userQuery = query(usersRef, where("uid", "==", ownerId));
        const userQuerySnapshot = await getDocs(userQuery);
    
        if (!userQuerySnapshot.empty) {
          // Assuming a single document per user, delete the first (and should be only) document found
          const userDocRef = userQuerySnapshot.docs[0].ref;
          await deleteDoc(userDocRef);
          alert('The user has been banned, all their posts deleted, and their account removed.');
        } else {
          alert('The user has been banned and all their posts deleted, but no account was found to remove.');
        }
      } catch (error) {
        console.error("Error banning user, deleting posts, and removing account: ", error);
        alert('An error occurred while trying to ban the user, delete their posts, and remove their account.');
      }
    };

    useEffect(() => {
      // Hide price if it is not set
      if(isNaN(Number(props.item.price))) {
        const price_tag = document.getElementById(`price-${props.item.prodName}`);
        if(price_tag) {
          price_tag.style.display = 'none';
        }
      }
      else {
        const price_tag = document.getElementById(`price-${props.item.prodName}`);
        if(price_tag) {
          price_tag.style.display = 'block';
        }
      }
      }, [props.item.price]);

  
  return (
    <Card style={{ width: '1000px' }} className='hover-effect'>
      <div className="row">
        <div className="col-md-4">
          <Card.Img variant="top" src={props.item.picture} width="100" height="210"/> 
          
        </div>
        <div className="col-md-8">
          <Card.Body>
            <Card.Title> 
              <span className={`badge bg-${props.item.category.toLowerCase().replace(/\s/g, '')}`}>{props.item.category}</span>
              {props.item.prodName}
            </Card.Title>
            <ListGroup className="list-group-flush">
              <ListGroup.Item>
              <p>Owner: {props.item.owner_name}</p>
                <p id={`price-${props.item.prodName}`}>Price: ${props.item.price}</p>
                </ListGroup.Item>
              <ListGroup.Item>
                <Card.Text>
                {props.item.description}
                </Card.Text>
              </ListGroup.Item>
            </ListGroup>
          </Card.Body>
          <Card.Body>
            {isAdmin ? (
              null
            ) : <Button variant="primary" onClick={handleButtonClick}>Send Message</Button>}

            {/* Ensure delete button is visible for the owner */}
            {isOwner ? (
              <Button variant="danger" onClick={() => setModalShow(true)}>Delete Post</Button>
            ) : null}

            {isAdmin && (
              <>
                <Button variant="warning" onClick={() => setModalShow(true)}>Manage</Button>
                <Button variant="danger" onClick={() => handleBanUser()}>Ban User</Button>
              </>
            )}

            <DeletePost
              item={item}
              docId={docId}
              show={modalShow}
              onHide={() => setModalShow(false)}
              onDelete={() => {
                  // Logic to handle deletion (e.g., removing the item from the list)
                  setModalShow(false);
              }}
            />

          </Card.Body>
        </div>
      </div>
    </Card>
  );
}

export default ProductCard;

