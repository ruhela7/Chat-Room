import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [username, setUsername] = useState();
  const navigate = useNavigate();

  const handleClick = () => {
    if (username && username.trim() !== "") {
      navigate("/chats", { state: { username } });
    } else {
      alert("Please enter your name");
    }
  };

  return (
    <div className="home">
      <div className="home__inside">
        <input
          type="text"
          placeholder="Enter your name..."
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button onClick={handleClick}> Start Chatting </button>
      </div>
    </div>
  );
};

export default Home;
