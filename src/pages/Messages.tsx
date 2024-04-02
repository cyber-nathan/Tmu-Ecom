import React, { useEffect, useState } from 'react'
import Message from './Message'
import { getCurrentUser } from './auth';
import { doc, onSnapshot } from 'firebase/firestore';
import { set } from 'firebase/database';
import { db } from './firebase';

const Messages = () => {

  const user = getCurrentUser();
  const chatContact = localStorage.getItem('selectedChatDisplayName');
  const chatID = localStorage.getItem('selectedChatId');

  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const unSub = onSnapshot(doc(db, "messages",  chatID), (doc) => {
      doc.exists() && setMessages(doc.data().messages)

    });
  
    return () => {
      unSub()
    }
  }, [chatID])
  

  return (
    <div className='messages'>
      {messages.map(m=>(
        <Message message={m} key={m.id}/>
      ))}
    

    </div>
  )
}

export default Messages