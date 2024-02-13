import React from "react";
import { Route, Routes } from "react-router-dom";
import Chat from "./Chat";
import Home from "./Home";
import "./App.css";

export const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chats" element={<Chat />} />
      </Routes>
    </>
  );
};

export default App;
