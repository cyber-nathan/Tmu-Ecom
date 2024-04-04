//import React from 'react'
import  React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { ProdItem } from '../../interfaces';
import { db } from '../../pages/firebase.js';
import { doc, deleteDoc } from "firebase/firestore";
import './DeletePost.css';



interface Props {
  item: ProdItem;
  onHide: () => void;
  //onPost: (data: any) => void;
  onDelete: () => void;
  show: boolean; // Declaring that 'show' is expected to be a boolean
  docId: string;
}

  
  function DeletePost({ item, onHide, onDelete, show, docId }: Props) { // Include docId in your component parameters
    const handleDelete = async () => {
      console.log(`Attempting to delete post with Firestore document ID: ${docId}`); // Use the actual Firestore document ID
      try {
        await deleteDoc(doc(db, "Posts", docId)); // Use docId here
        console.log("Post deleted successfully");
        onDelete(); // Refresh the list in the parent component
      } catch (error) {
        console.error("Error deleting post: ", error);
      }
      onHide(); // Hide modal after attempting to delete
    };
    
    return (
      <Modal
        show={show}
        onHide={onHide}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Are you sure you want to delete this item?
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Card style={{ width: '100%' }}>
            <Card.Body>
              <Card.Title>{item.prodName}</Card.Title>
              <Card.Img variant="top" src={item.picture} />
              <ListGroup className="list-group-flush">
                <ListGroup.Item>Price: ${item.price}</ListGroup.Item>
                <ListGroup.Item>Description: {item.description}</ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>Cancel</Button>
          <Button variant="danger" onClick={handleDelete}>Delete</Button>
        </Modal.Footer>
      </Modal>
    );
  }
  
  export default DeletePost;