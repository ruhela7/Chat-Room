import React from "react";

const Message = ({ username, text, isCurrentUser}) => {
  const messageClass = isCurrentUser ? "right__display" : "left__display";
  return (
    <div className={messageClass}>
      <div className="message__inside">
        <span className="message__username">{username} : </span>
        <span className="message__text">{text}</span>
      </div>
    </div>
  );
};

export default Message;
