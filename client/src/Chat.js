import React, { useState, useEffect, useRef } from "react";
import io from "socket.io-client";
import Message from "./Message.js";
import { useLocation, useNavigate } from "react-router-dom";
import Footer from "./Footer.js";

const socket = io("http://localhost:5000");

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const { username } = location.state;
  const [messages, setMessages] = useState([]);
  const [messageText, setMessageText] = useState("");
  const [users, setUsers] = useState(new Set());
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  //receiving msg from server
  useEffect(() => {
    socket.on("message", (message) => {
      setMessages([...messages, message]);
    });

  }, [messages]);

  useEffect(() => {
    socket.on("users", (users) => {
      setUsers(new Set(users));
    });

    return () => {
      socket.off("users");
    };
  }, []);

  useEffect(() => {
    socket.emit("join", username);
  }, []);

  //sending msg to server
  const sendMessage = () => {
    if (messageText) {
      socket.emit("sendMessage", { username: username, text: messageText });
      setMessageText("");
    } else {
      alert("Please enter a message");
    }
  };

  const leaveHandler = () => {
    alert("Are you sure you want to leave");
    const updateUsers = [...users].filter((user) => user !== username);
    console.log(updateUsers);
    setUsers(new Set(updateUsers));
    socket.disconnect();
    navigate("/");
  };

  return (
    <div className="app">
      <div className="app__inside">
        <div className="app__heading">
          <h1>Welcome to Worldcup.io Chat Room</h1>
          <button onClick={leaveHandler}>Leave</button>
        </div>
        <div className="app__container">
          <div className="app__body__users">
            <h3>Users Online</h3>
            <div className="user__list">
              {
                [...users].map((user, index) => (
                  <div className={user == username ? "user__list__curr__name" : "user__list__name"} key={index}>
                    {user}
                  </div>
                ))}{" "}
            </div>
          </div>
          <div className="app__body">
            <div className="app__body__messages">
              {messages.map((message, index) => (
                <Message
                  key={index}
                  username={message.username}
                  text={message.text}
                  isCurrentUser={message.username === username}
                />
              ))}
              <div ref={messagesEndRef} />
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
      <Footer />
    </div>
  );
}

export default App;
