//import React from 'react'
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
//import InputGroup from 'react-bootstrap/InputGroup';
import TmuLogo from'../picture/tmuLogo.png'; // local rn
//import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { auth, googleAuthProvider } from './firebase'; 
import { signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
    
    const navigate = useNavigate();

    const googleLogin = async () => {
      try{
        const result = await signInWithPopup(auth, googleAuthProvider);
        console.log(result);
        localStorage.setItem('token', (result.user as any).accessToken);
        localStorage.setItem('user',JSON.stringify(result.user));
        const email = JSON.stringify(result.user["email"])//check email
        const splitEmail = email.split("@")[1];
        if (splitEmail == 'torontomu.ca"')
        {          
          navigate("/ecom");
        }
        else{
          console.log("email:" + splitEmail);
          alert("Not a TMU email!");
        }
      }catch(error){
        console.error(error);
      }
    }
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
              <script src="firebase.js" defer type='module' ></script>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Username</Form.Label>
                <Form.Control type="email" placeholder="Torontomu username"  style={{ width: '100%'}}/>
              </Form.Group>
              <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password"  style={{ width: '100%'}}/>
              </Form.Group>
              <Button variant="primary" onClick={googleLogin }>LogIn</Button>{' '}
            </Form>
          </Card.Body>
        </Card>
      </div>
    );
  }