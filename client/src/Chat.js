import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import Message from "./Message";
import { useLocation, useNavigate } from "react-router-dom";

const socket = io("http://localhost:5000");

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const { username } = location.state;
  const [messages, setMessages] = useState([]);
  const [messageText, setMessageText] = useState("");

  useEffect(() => {
    socket.on("message", (message) => {
      //receiving msg from server
      setMessages([...messages, message]);
    });
  }, [messages]);

  const sendMessage = () => {
    socket.emit("sendMessage", { username: username, text: messageText }); //sending msg to server
    setMessageText("");
  };

  const leaveHandler = () => {
    alert("Are you sure you want to leave");
    navigate("/");
  };

  return (
    <div className="app">
      <div className="app__inside">
        <div className="app__heading">
          <h1>Welcome to Worldcup.io Chat Room</h1>
          <button onClick={leaveHandler}>Leave</button>
        </div>
        <div className="app__body">
          <div className="app__body__messages">
            {messages.map((message, index) => (
              <Message
                key={index}
                username={message.username}
                text={message.text}
              />
            ))}
          </div>
          <div className="app__body__input">
            <input
              type="text"
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              placeholder="Type your message..."
            />
            <button onClick={sendMessage}>Send</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;