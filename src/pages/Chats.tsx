import React from 'react'
import { doc, onSnapshot } from "firebase/firestore";
import { useState, useEffect } from 'react'
import { db } from './firebase';
import { getCurrentUser } from './auth';

export const Chats = () => {

    const currentUser = getCurrentUser()
    const [chats, setChats] = useState([])


    useEffect(() => {
        const getChats = () => {
            const unsub = onSnapshot(doc(db, "chats", currentUser.uid), (doc) => {
                setChats(doc.data());
            });
        
          return () => {
            unsub();
          }
        }
        currentUser.uid && getChats();
    }, [currentUser.uid])
    


  return (
    <div className='chats'>
        {Object.entries(chats)?.map((chat)=>(
            <div className='userChat' key={chat[0]}>
            <div className='userChatInfo'>
                <span>{chat[1].userInfo.displayName}</span>
                <p>{chat[1].userInfo.lastMessage?.text}</p>
            </div>  
        </div> 
        ))}
        
    </div>
  )
}


export default Chats