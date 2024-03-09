//import React from 'react'
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { ProdItem, ITEM } from '../../interfaces';
import './CreatePost.css';



interface Props {
  onHide: () => void;
  //onPost: (data: any) => void;
  show: boolean; // Declaring that 'show' is expected to be a boolean
}

  
  function CreatePost(props:Props) {
    const [prodName, setProdName] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [owner, setOwner] = useState('');
    const [picture, setPicture] = useState('');

    const handleSubmit = () => {
      const newItem: ProdItem = {
        id: new Date().getTime(), // Simple way to generate unique IDs
        picture,
        prodName,
        price: Number(price),
        owner,
        description,
      };
  
      //props.onUpdateDatabase(newItem); // make it so that the New item gets pushed to the ITEM ARRAY 
      ITEM.push(newItem);
      console.log("New item In ITEM", ITEM)
      props.onHide(); // Hide modal after submission
    };

    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Upload Item
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="grid-example">
          <Container>
            {/* First row of 2 columns */}
            <Row className="mb-3">
              <Col xs={6}>
                <div className="upload-slot">
                  <input type="file" onChange={(e) => setPicture(e.target.value)} className="form-control" />
                  Upload File 1
                </div>
              </Col>
            </Row>
          </Container>
        </Modal.Body>

        <Modal.Body className="grid-example">
          <Container>
          <Form>
              <InputGroup className="mb-3">
        <InputGroup.Text id="basic-addon1">Title</InputGroup.Text>
        <Form.Control
          placeholder="Title"
          aria-label="Title"
          aria-describedby="basic-addon1"
          name="title"
          onChange={(e) => setProdName(e.target.value)}
        />
        </InputGroup>
      <InputGroup className="mb-3">
        <InputGroup.Text>$</InputGroup.Text>
        <Form.Control 
          aria-label="Amount (to the nearest dollar)" 
          name="price"
          onChange={(e) => setPrice(e.target.value)}
          />
        <InputGroup.Text>.00</InputGroup.Text>
      </InputGroup>

      <InputGroup>
        <InputGroup.Text>Description</InputGroup.Text>
        <Form.Control 
        as="textarea" 
        aria-label="With textarea" 
        name="description"
        onChange={(e) => setDescription(e.target.value)}
        />
      </InputGroup>
    </Form>

          </Container>
        </Modal.Body>
       
        <Modal.Footer>
        <Button variant="secondary" onClick={props.onHide}>
            Cancel
          </Button>
          <Button  onClick={handleSubmit}>Post</Button>
        </Modal.Footer>
      </Modal>
    );
  }
  
    
    

export default CreatePost