import React from 'react';
import Messages from "./Messages";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import "./ChatPage.css"; // Assuming you create this CSS file for styling
import Sidebar from './Sidebar';
import {getCurrentUser} from "./auth";
import Input from './Input';

function ChatPage() {


  const user = getCurrentUser();
  const chatContact = localStorage.getItem('selectedChatDisplayName');
  const chatData = localStorage.getItem('selectedChatId');

  return (
    <div className="chat-page">
      <Card className="chat-card">
      <Container>
      <Row>
        <Col sm={4}>
         
        {/* Sidebar for chat participants */}

        <Sidebar/>
        </Col>
         
        <Col sm={8}>

        <div style={{paddingTop: '15px', paddingLeft: '15px'}} >
          <h2>{chatContact}</h2>
          
          
          
        </div >



        <Card.Body className="chat-body">
          <div className="chat-messages">
            {/* Dynamically list chat messages here */}
            <Messages/>
            {/* End of chat messages */}
          </div>



          <div className="chat-input">

          
            <Input/>


          </div>


        </Card.Body>
        </Col>
      </Row>
      </Container>
      </Card>
    </div>
  );
}

export default ChatPage;
