import React from 'react'
import { getCurrentUser } from './auth';
import {getChat} from "./chatContext"
interface UserInfo {
    displayName: string;
    uid: string;
    lastMessage?: { text: string };
  }
  
  interface ChatData {
    userInfo: UserInfo;
  }
  
export const Chats = () => {

    const currentUser = getCurrentUser()
    const chats = getChat();
    console.log(Object.entries(chats))

    // retrieves the information from the clicked contact and saves it into local storage
    const handleChatClick = (chatID, displayName, userID) => {

        localStorage.setItem('selectedChatId', chatID);
        localStorage.setItem('selectedChatDisplayName', displayName);
        localStorage.setItem('selectedUserID', userID )
       
        console.log(localStorage.getItem('selectedChatId'))
        console.log(localStorage.getItem('selectedChatDisplayName'))
        console.log(localStorage.getItem('selectedUserID'))

        location.reload();
        

    }
return (
    <div className='chats'>
        {Object.entries(chats)?.map(([chatID, chatData]: [string, any]) => (
            <div className='userChat' key={chatID} onClick={() => handleChatClick(chatID, chatData.userInfo.displayName, chatData.userInfo.uid)}>
                <div className='userChatInfo'>
                    <span>{chatData.userInfo.displayName}</span>
                    <p>{chatData.userInfo.lastMessage?.text}</p>
                </div>  
            </div> 
        ))}
    </div>
)
}


export default Chats