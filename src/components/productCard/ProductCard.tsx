import 'bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import './ProductCard.css'; // Import your CSS file

// make image fit properly in the card

function ProductCard(props: any) {
  //console.log(props);
  console.log("this is img", props.info.files[0]);
  return (
    <Card style={{ width: '1000px' }} className='hover-effect'>
      <div className="row">
        <div className="col-md-4">
          <Card.Img variant="top" src={props.info.files[0]} width="100" height="210"/> 
          
        </div>
        <div className="col-md-8">
          <Card.Body>
            <Card.Title>{props. info.title}</Card.Title>
            <ListGroup className="list-group-flush">
              <ListGroup.Item>Price: ${props.info.price}</ListGroup.Item>
              <ListGroup.Item>
                <Card.Text>
                {props.info.description}
                </Card.Text>
              </ListGroup.Item>
            </ListGroup>
          </Card.Body>
          <Card.Body>
            <Button variant="primary">Send Message</Button>{' '}
            {/* open up dialog which allows the user to type a message to the owner */}
          </Card.Body>
        </div>
      </div>
    </Card>
  );
}

export default ProductCard;

