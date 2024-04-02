import { doc, onSnapshot } from "firebase/firestore";
import { useState, useEffect } from 'react'
import { db } from './firebase';
import { getCurrentUser } from './auth';


function getChat(){
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

    return chats;


}

export {getChat}