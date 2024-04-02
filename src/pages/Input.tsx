import React, { useState } from 'react'
import { getCurrentUser } from './auth';
import { doc, updateDoc, arrayUnion, arrayRemove, Timestamp, serverTimestamp } from "firebase/firestore";
import { db } from './firebase';
import { v4 as uuid } from 'uuid';


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
    await updateDoc(doc(db, "userChats", user.uid), {
      [chatID + ".lastMessage"]: {
        text,
      },
      [chatID + ".date"]: serverTimestamp(),
    });

    await updateDoc(doc(db, "userChats", chatContactID), {
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
        <input type='text' placeholder='Type something...' onChange={e=>setText(e.target.value)}/>
        <div className='send'>
            <button onClick={handleSend}>Send</button>
        </div>
    
    </div>
  )
}


export default Input