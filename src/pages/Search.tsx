import React, { useState } from 'react'
import {
  collection,
  query,
  where,
  getDocs,
  setDoc,
  doc,
  updateDoc,
  serverTimestamp,
  getDoc,
  DocumentData
} from "firebase/firestore";
import { db } from './firebase';
import { getCurrentUser } from './auth';

export const Search = () => {
  const [username, setUsername] = useState("")
  const [user, setUser] = useState<DocumentData | null>(null)
  const [err, setErr] = useState(false)
  const currentUser = getCurrentUser();

  const handleSearch = async () => {

    //firestore query to look for user on the database
    const q = query(collection(db, "chatUsers"), 
    where("displayName", "==", username));
  
    try {
  const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      setUser(doc.data());
    })
    } catch (error) {
      setErr(true)
  
    }
    

  }


  //serach for user when enter is pressed
  const handleKey = (e: { code: string }) =>{
    e.code === "Enter" && handleSearch();
  };

  const handleSelect = async () => {


    //identifies the conversation between 2 users
  const combinedId =currentUser.uid > user.uid ? currentUser.uid + user.uid : user.uid + currentUser.uid;
    


    try {

    const messRef = collection(db,"messages")
    const q = query(messRef, where("messages", "==",combinedId));
    const res = await getDocs(q);

    if(res.empty){
      //if the conversation doesnt exist, create it with an empty array to contian messages
      await setDoc(doc(db, "messages", combinedId), { messages: [] });
      
      //initializes chat relation between the 2 users
      await updateDoc(doc(db, "chats", currentUser.uid), {
        [combinedId + ".userInfo"]: {
          uid: user.uid,
          displayName: user.displayName,
        
        },
        [combinedId + ".date"]: serverTimestamp(),
      });

      //updates entry in the db
      await updateDoc(doc(db, "chats", user.uid), {
        [combinedId + ".userInfo"]: {
          uid: currentUser.uid,
          displayName: currentUser.displayName,
        
        },
        [combinedId + ".date"]: serverTimestamp(),
      });
    }
    } catch (error) {}
    
    setUser(null)
    setUsername("")
  }


  return (
    <div className='search'>
        <div className='searchForm'>
            <input 
            type='text' 
            placeholder='Find user...' 
            onKeyDown={handleKey} 
            onChange={e => setUsername(e.target.value)}
            value={username}
            />
        </div>
        
        {user && 
        <div className='userChat' onClick={handleSelect}>
          Search Result:
            <div className='userChatInfo'>
                <span>{user.displayName}</span>
            </div>
        </div>}
    </div>
  )
}
export default Search