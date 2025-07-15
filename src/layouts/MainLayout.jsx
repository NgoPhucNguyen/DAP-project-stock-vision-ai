import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Chatbox from "../components/Chatbox";
import ChatToggleButton from "../components/ChatToggleButton";

const MainLayout = () => {
  const [showChat, setShowChat] = useState(false);

  return (
    <div>
        <Navbar />
      
      <div className="container mt-5 pt-4">
        <Outlet />
      </div>

      {!showChat && <ChatToggleButton onClick={() => setShowChat(true)} />}
      {showChat && (
        <div style={{
          position: "fixed", bottom: "80px", right: "20px",
          zIndex: 999, width: "320px", height: "460px"
        }}>
          <Chatbox onClose={() => setShowChat(false)} />
        </div>
      )}
    </div>
  );
};

export default MainLayout;
