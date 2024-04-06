import 'bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import './ProductCard.css';
import { useNavigate } from 'react-router-dom';
import DeletePost from '../deletePost/DeletePost';
import { useState, useEffect } from 'react';

function ProductCard(props: any) {
    const navigate = useNavigate();

    const { item, isAdmin, currentUserId } = props;
    const { docId, ownerId } = item;

    const handleButtonClick = () => {
      navigate("/chat");
    };

    const [modalShow, setModalShow] = useState(false);

    // Check if the current user is the owner of the post
    const isOwner = currentUserId === ownerId;

    // Hide price if it is not set
    useEffect(() => {
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
    

      console.log("isAdmin:", isAdmin);
console.log("currentUserId:", currentUserId);
console.log("ownerId:", ownerId);
console.log("isOwner:", isOwner);
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

            {/* Ensure delete button is visible for admins or the owner */}
            {isAdmin || isOwner ? (
              <Button variant="danger" onClick={() => setModalShow(true)}>Delete Post</Button>
            ) : null}

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

