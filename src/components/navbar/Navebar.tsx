import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
//import Modal from 'react-bootstrap/Modal';
import TmuLogo from'C:/Users/Nathan/Documents/Cps630Proj/Tmu-Ecom/src/picture/tmuLogo.png'; // local rn
import React, { useState} from 'react';
import CreatePost from '../createPost/CreatePost';
import ProductCard from '../productCard/ProductCard';

interface FormData { // why is this needed?
  title: string;
  description: string;
  // Add other properties as needed
}

function TopNavebar() {
  const [modalShow, setModalShow] = useState(false);
  const [postData, setPostData] = useState<FormData[]>([]); // This state will hold the data for ProductCard // what does useState<FormData[]>([]) do and for?

  const handlePost = (formData: FormData) => { // dont understand what htis dones 
    setPostData((prevData) => [...prevData, formData]);
    setModalShow(false); // Close modal after submission
    console.log(formData);
  };

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

              <CreatePost show={modalShow}
                onHide={() => setModalShow(false)}
                onPost={handlePost}
              />
            </Form>
          </Container>
        </Navbar>
      </div>      
      
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      {[...postData].reverse().map((info, index) => (
    <ProductCard key={index} info={info} />
      ))}
      </div>
    </div>
  );
}

  
  
  
  
  export default TopNavebar
  