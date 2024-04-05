import React, { useEffect, useRef } from 'react'
import { getCurrentUser } from './auth'

export const Message = ({message}) => {

  const currentUser = getCurrentUser();

  console.log(message);

  const ref = useRef<HTMLDivElement>(null); 

  useEffect(() => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [message]);
  
  return (
    <div className={`message ${message.senderID === currentUser.uid && "owner"}`}>
        <div className='messageContent'>
            <p>{message.text}</p>
        </div>
    </div>
  )
}


export default Message