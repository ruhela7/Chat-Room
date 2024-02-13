import React from 'react'

const Message = ({username, text}) => {
  return (
    <div className='message'>
      <span className='message__username'>{username} :  </span>
      <span className='message__text'>{text}</span>
    </div>
  )
}

export default Message