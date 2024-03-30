import React from 'react'

export const Chats = () => {
  return (
    <div className='chats'>
        <div className='userChat'>
            <div className='userChatInfo'>
                <span>Person 1</span>
                <p>Recent Message </p>
            </div>  
        </div>  
        <div className='userChat'>
            <div className='userChatInfo'>
                <span>Person 2</span>
                <p>Recent Message </p>
            </div>  
        </div>  
        <div className='userChat'>
            <div className='userChatInfo'>
                <span>Person 3</span>
                <p>Recent Message</p>
            </div>  
        </div>  
    </div>
  )
}


export default Chats