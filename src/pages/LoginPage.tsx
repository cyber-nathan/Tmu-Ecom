//import React from 'react'
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
//import InputGroup from 'react-bootstrap/InputGroup';
import TmuLogo from'C:/Users/Nathan/Documents/Cps630Proj/Tmu-Ecom/src/picture/tmuLogo.png'; // local rn
//import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

export default function LoginPage() {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Card style={{ width: '25%', height:'500px', justifyContent: 'center', alignItems: 'center' }}>
          <img
            src={TmuLogo}
            width="150"
            height="100"
            className="d-inline-block align-top"
            alt="React Bootstrap logo"
          />
          <Card.Body >
            <Form>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Username</Form.Label>
                <Form.Control type="email" placeholder="Torontomu username"  style={{ width: '100%'}}/>
              </Form.Group>
              <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password"  style={{ width: '100%'}}/>
              </Form.Group>
              <Button variant="primary">LogIn</Button>{' '}
            </Form>
          </Card.Body>
        </Card>
      </div>
    );
  }