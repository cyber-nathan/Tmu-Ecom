//import React from 'react'
import  { useState } from 'react';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Modal from 'react-bootstrap/Modal';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { ProdItem } from '../../interfaces';
import { auth, db, storage } from '../../pages/firebase.js';
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
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
    const [pictureUpload, setPictureUpload] = useState<FileList | null>(null);
    const [category, setCategory] = useState<'Items for Sale' | 'Items Wanted' | 'Academic Services'>('Items for Sale');

    const resetState = () => {
      setProdName('');
      setPrice('');
      setDescription('');
      setPictureUpload(null);
      setCategory('Items Wanted');
    };

    //Validate data client side, there are also rules in firebase in case this fails
    const data_validation = () => {
      if (prodName === '' || price === '' || description === '') { //Or other logic if needed
        //TODO: Add alert to tell user to fill in all fields
        console.log("Missing Fields");
        return false;
      }
      return true;
    }

    const handleSubmit = async () => {
      // Firebase upload
      if (data_validation() && pictureUpload) { //pictureUpload seperate so IDE dont throw error about pictureUpload being null
        try {
          // Upload picture to fireebase storage
          const file = pictureUpload[0];
          const storageRef = ref(storage, `images/${uuidv4()}`); //generate unique id for the picture
          await uploadBytes(storageRef, file);
          const url = await getDownloadURL(storageRef); // Get the URL to the picture
                
          const newItem: ProdItem = {
            id: new Date().getTime(), // Simple way to generate unique IDs
            picture: url,
            prodName,
            price: Number(price),
            owner: auth.currentUser?.uid,
            description,
            category
          };
      
          //add item to firebase database
          try {
            await addDoc(collection(db, "Posts"), newItem);
            resetState();
          } catch (e) {
            console.error("Error adding document: ", e);
          }
        } catch (error) {
          console.error("Error uploading picture: ", error);
        }
      }
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
            <Row>
              <Col xs={6}>
              <ButtonGroup>
                <Button variant={category === 'Items for Sale' ? 'primary' : 'secondary'} onClick={() => setCategory('Items for Sale')}>Items for Sale</Button>
                <Button variant={category === 'Items Wanted' ? 'primary' : 'secondary'} onClick={() => setCategory('Items Wanted')}>Items Wanted</Button>
                <Button variant={category === 'Academic Services' ? 'primary' : 'secondary'} onClick={() => setCategory('Academic Services')}>Academic Services</Button>
              </ButtonGroup>
              </Col>
            </Row>
          </Container>
        </Modal.Body>
        <Modal.Body className="grid-example">
          <Container>
            {/* First row of 2 columns */}
            <Row className="mb-3">
              <Col xs={6}>
                <div className="upload-slot">
                  <input type="file" onChange={(e) => {setPictureUpload(e.target.files);}} className="form-control" />
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