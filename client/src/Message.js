import React from "react";

const Message = ({ username, text, isCurrentUser}) => {
  const messageClass = isCurrentUser ? "right__display" : "left__display";
  const name = isCurrentUser ? "You" : username;
  return (
    <div className={messageClass}>
      <div className="message__inside">
        <span className="message__username">{name}: </span>
        <span className="message__text">{text}</span>
      </div>
    </div>
  );
};

export default Message;
