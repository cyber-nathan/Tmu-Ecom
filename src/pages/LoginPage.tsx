//import React from 'react'
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
//import InputGroup from 'react-bootstrap/InputGroup';
import TmuLogo from'../picture/tmuLogo.png'; // local rn
//import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { auth, googleAuthProvider } from './firebase'; 
import { signInWithPopup, getIdTokenResult } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { doc, setDoc } from "firebase/firestore"; 
import {db} from "./firebase"

export default function LoginPage() {
    
    const navigate = useNavigate();

    const googleLogin = async () => {
      try{
        const result = await signInWithPopup(auth, googleAuthProvider);
        console.log(result);
        localStorage.setItem('token', (result.user as any).accessToken);
        localStorage.setItem('user',JSON.stringify(result.user));
        //commented block below is to check if user is a TMU email client side, disabled currently to allow gmail admin account
        /*
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
        */
       
        await setDoc(doc(db, "chatUsers", result.user.uid),{
          uid: result.user.uid,
          displayName: result.user.displayName,
          email: result.user.email
        })

        await setDoc(doc(db, "chats", result.user.uid),
        {


          
        })


       //Checking admin status and route accordingly
       //For checking Admin status in other pages see useeffect example in productDisplay.tsx
        const idTokenResult = await getIdTokenResult(auth.currentUser);
        const claims = idTokenResult.claims;
        if (claims.admin) {
          navigate("/ecom"); //Or route to admin page
          console.log("Logged in as admin"); //debug 
        }
        else{
          navigate("/ecom");
          console.log("Logged in as user");
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
              <Button variant="primary" onClick={googleLogin }>Login</Button>{' '}
            </Form>
          </Card.Body>
        </Card>
      </div>
    );
  }