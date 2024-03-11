import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
//import Modal from 'react-bootstrap/Modal';
import TmuLogo from'../../picture/tmuLogo.png'; // local rn
import React, { useState} from 'react';
import CreatePost from '../createPost/CreatePost';


function TopNavebar() {
  const [modalShow, setModalShow] = useState(false);

  return (
    <div> 
      <div style={{paddingBottom: '25px'}}>
        <Navbar className="bg-body-tertiary">
          <Container>
            <Navbar.Brand href="#home">
              <img
                src={TmuLogo}
                width="100"
                height="50"
                className="d-inline-block align-top"
                alt="React Bootstrap logo"
              />
            </Navbar.Brand>
            <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
              />
              <Button variant="outline-primary">Search</Button>
            </Form>

            <Form className="d-flex">
              <Button variant="outline-primary" onClick={() => setModalShow(true)}>Add Post</Button>

              <CreatePost 
                show={modalShow}
                onHide={() => setModalShow(false)}
              />
            </Form>
          </Container>
        </Navbar>
      </div>    

    </div>
  );
}

  
  export default TopNavebar
  