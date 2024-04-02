import React from 'react'

export const Message = ({message}) => {

  console.log(message)
  
  return (
    <div className='message owner'>
        <div className='messageContent'>
            <p>New Message</p>
        </div>
    </div>
  )
}


export default Message