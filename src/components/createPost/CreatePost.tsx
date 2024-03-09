//import React from 'react'
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import './CreatePost.css';

// Define an interface for the component's props
interface Props {
    onHide: () => void;
    onPost: (data: any) => void;
    show: boolean; // Declaring that 'show' is expected to be a boolean
  }
  
  interface FormData {
    title: string;
    price: string;
    description: string;
    files: (string | null)[];
  }
  
  function CreatePost(props: Props) {
    const [formData, setFormData] = useState<FormData>({
      title: '',
      price: '',
      description: '',
      files: [],
    });

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = event.target;
      console.log("event", name, value)
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    };
  
    const handleFileInputChange = (event: React.ChangeEvent<HTMLInputElement>, slotIndex: number) => {
      const file = event.target.files ? event.target.files[0] : null; // Check if files is null
      const newFiles = [...formData.files];
      newFiles[slotIndex] = file ? URL.createObjectURL(file) : null;
      setFormData((prevData) => ({
        ...prevData,
        files: newFiles,
      }));
    };
  
    // const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
    //   const files = event.target.files;
    //   if (files) {
    //     const newFiles = [...formData.files];
    //     newFiles[index] = files[0]; // Assuming you're interested in the first file only
    //     setFormData((prevData) => ({
    //       ...prevData,
    //       files: newFiles,
    //     }));
    //   }
    // };
  
    const handleSubmit = () => {
      props.onPost(formData); // Pass the form data back to the parent component
      //props.onHide(); // Hide the modal
    };

    function areTextFieldsFilled() {
      if (formData.title.trim() !== '' && formData.price.trim() !== '' && formData.description.trim() !== '') {
        return true;
      }
    }

    // const areTextFieldsFilled = () => {
    //   return formData.title.trim() !== '' && formData.price.trim() !== '' && formData.description.trim() !== '';
    // };



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
                  <input type="file" onChange={(event) => handleFileInputChange(event, 0)} className="form-control" />
                  Upload File 1
                </div>
              </Col>
              <Col xs={6}>
                <div className="upload-slot">
                  <input type="file" onChange={(event) => handleFileInputChange(event, 1)} className="form-control" />
                  Upload File 2
                </div>
              </Col>
            </Row>
            {/* Second row of 2 columns */}
            <Row>
              <Col xs={6}>
                <div className="upload-slot">
                  <input type="file"  onChange={(event) => handleFileInputChange(event, 2)}className="form-control" />
                  Upload File 3
                </div>
              </Col>
              <Col xs={6}>
                <div className="upload-slot">
                  <input type="file"  onChange={(event) => handleFileInputChange(event, 3)}className="form-control" />
                  Upload File 4
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
          onChange={handleInputChange}
        />
        </InputGroup>
      <InputGroup className="mb-3">
        <InputGroup.Text>$</InputGroup.Text>
        <Form.Control 
          aria-label="Amount (to the nearest dollar)" 
          name="price"
          onChange={handleInputChange}
          />
        <InputGroup.Text>.00</InputGroup.Text>
      </InputGroup>

      <InputGroup>
        <InputGroup.Text>Description</InputGroup.Text>
        <Form.Control 
        as="textarea" 
        aria-label="With textarea" 
        name="description"
        onChange={handleInputChange}
        />
      </InputGroup>
    </Form>

          </Container>
        </Modal.Body>
       
        <Modal.Footer>
        <Button variant="secondary" onClick={props.onHide}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={!areTextFieldsFilled()}>Post</Button>
        </Modal.Footer>
      </Modal>
    );
  }
  
    
    

export default CreatePost