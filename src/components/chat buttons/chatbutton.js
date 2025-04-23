import React from "react";
import { SiWhatsapp } from "react-icons/si"; // better looking icon
import { FaCommentDots } from "react-icons/fa";
import "./chatbutton.css";

const ChatButtons = () => {
  return (
    <div className="chat-buttons">
      <a
        href="https://wa.me/yourwhatsapplink"
        target="_blank"
        rel="noopener noreferrer"
        title="WhatsApp"
        className="chat-icon whatsapp"
      >
        <SiWhatsapp size={24} />
      </a>
      <a href="/chat" title="Live Chat" className="chat-icon live-chat">
        <FaCommentDots size={24} />
      </a>
    </div>
  );
};

export default ChatButtons;
