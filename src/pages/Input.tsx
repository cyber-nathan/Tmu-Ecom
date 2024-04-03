import React, { useState } from 'react'
import { getCurrentUser } from './auth';
import { doc, updateDoc, arrayUnion, arrayRemove, Timestamp, serverTimestamp } from "firebase/firestore";
import { db } from './firebase';
import { v4 as uuid } from 'uuid';
import Button from "react-bootstrap/Button";



export const Input = () => {

  const [text, setText] = useState<string>('');

  const user = getCurrentUser();
  const chatContact = localStorage.getItem('selectedChatDisplayName');
  const chatContactID = localStorage.getItem('selectedUserID');
  const chatID = localStorage.getItem('selectedChatId');


  const handleSend = async() => {

    if (chatID === null || chatContactID === null) {
      console.error('chatID or chatContactID is null');
      return;
    }

    await updateDoc(doc(db, "messages", chatID), {
      messages: arrayUnion({
        id: uuid(),
        text,
        senderID: user.uid,
        date: Timestamp.now(),
      })
    })
    await updateDoc(doc(db, "chats", user.uid), {
      [chatID + ".lastMessage"]: {
        text,
      },
      [chatID + ".date"]: serverTimestamp(),
    });

    await updateDoc(doc(db, "chats", chatContactID), {
      [chatID + ".lastMessage"]: {
        text,
      },
      [chatID + ".date"]: serverTimestamp(),
    });

    console.log(text)

    setText("");



  }

  return (
    <div className='input'>
        <input className="textArea" type='text' placeholder='Type something...' value={text} onChange={e=>setText(e.target.value)}/>
        <div className='send'>
            <Button className='sendButton' onClick={handleSend}>Send</Button>
        </div>
    
    </div>
  )
}


export default Input