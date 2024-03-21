import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
//import Modal from 'react-bootstrap/Modal';
import TmuLogo from'../../picture/tmuLogo.png'; // local rn
import  { useState} from 'react';
import CreatePost from '../createPost/CreatePost';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../../pages/firebase';
import { AppContext } from '../../AppContext';
import NavDropdown from 'react-bootstrap/NavDropdown';


function TopNavebar() {
  const [modalShow, setModalShow] = useState(false);
  const [temp_searchString, setTemp_searchString] = useState('');
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { searchString, setSearchString } = React.useContext(AppContext); //shared state, for search bar to communicate with product display
  const user = JSON.parse(localStorage.getItem('user') ?? 'null');
  const navigate = useNavigate();
  //use this line to see what keys are there in the dictinoary
  console.log(JSON.stringify(user));



  const Logout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>
      <div style={{ paddingBottom: '25px' }}>
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
                onChange={(e) => {
                  setTemp_searchString(e.target.value);
                  if (e.target.value === '') {
                    setSearchString('');
                  }
                }}
              />
              <Button variant="outline-primary" onClick={() => setSearchString(temp_searchString)}>Search</Button>
            </Form>

            <Form className="d-flex">
              <Button variant="outline-primary" onClick={() => setModalShow(true)}>Add Post</Button>

              <CreatePost
                show={modalShow}
                onHide={() => setModalShow(false)}
              />
              
            </Form>


            

            <NavDropdown
              id="nav-dropdown-dark-example"
              title={user["displayName"]}
              menuVariant="light"
            >
              <NavDropdown.Item >Messages</NavDropdown.Item>
              <NavDropdown.Item onClick={Logout}>Log Out</NavDropdown.Item>
              
            </NavDropdown>
          
            {/* {user ? (
              <div>
                <p>{user["displayName"]}</p>
                <button onClick={Logout} className='btnLogout'>Log Out</button>
              </div>
            ) : (
              <p></p>
            )} */}

            {/*<p>{user["displayName"]}</p>*/}
            {/*<button onClick={Logout} className='btnLogout'>Log Out</button>*/}
          </Container>
        </Navbar>
      </div>

    </div>
  );
}


export default TopNavebar
