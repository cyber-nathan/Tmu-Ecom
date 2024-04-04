import 'bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import './ProductCard.css'; // Import your CSS file
import { useNavigate } from 'react-router-dom';
import DeletePost from '../deletePost/DeletePost';
import { useState } from 'react';

// make image fit properly in the card

function ProductCard(props: any) {
  //console.log("prodCard", props); // this also get displayed twice for some reason 
  //console.log("this is img", props.item.picture);
    const navigate = useNavigate();

    const { item, isAdmin } = props;
    const { docId } = props.item;

    const handleButtonClick = () => {
      navigate("/chat");
    };

    const [modalShow, setModalShow] = useState(false);


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
                Price: ${props.item.price}
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
              <Button variant="warning" onClick={() => setModalShow(true)}>Manage</Button>
            ) : (
              <Button variant="primary" onClick={handleButtonClick}>Send Message</Button>
            )}

            <DeletePost
              item={item}
              docId={docId} // Pass docId here
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

