import { useState } from "react";
import "../../styles/components/integration/TestChatbot.css";

const TestChatbot = ({ onClose }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [messages, setMessages] = useState([
    { text: "Hello! How can I help you today?", sender: "bot" },
  ]);
  const [inputText, setInputText] = useState("");

  const handleSend = () => {
    if (inputText.trim()) {
      setMessages([...messages, { text: inputText, sender: "user" }]);
      setInputText("");

      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            text: "Thanks for your message! This is a demo response.",
            sender: "bot",
          },
        ]);
      }, 1000);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  return (
    <div className="demo-page">
      <div className="back-button-container">
        <button className="back-button" onClick={onClose}>
          ← Back
        </button>
      </div>

      <div className="demo-container">
        <div className="demo-content">
          <h1>Demo Website</h1>
          <p>
            This is a demo page showing how the chatbot would appear on your
            website. The chatbot interface appears in the bottom right corner.
          </p>
          <div className="placeholder-box medium"></div>
          <div className="placeholder-box small"></div>
          <div className="placeholder-box large"></div>
        </div>
      </div>

      {isOpen ? (
        <div className="chatbot-widget">
          <div className="feedback-bar">
            Chatbot not working as intended?
            <button>Share feedback</button>
          </div>

          <div className="chat-header">
            <h4>BeyondChats Assistant</h4>
            <button className="cross-button" onClick={() => setIsOpen(false)}>
              ×
            </button>
          </div>

          <div className="messages-container">
            {messages.map((msg, idx) => (
              <div key={idx} className={`message ${msg.sender}`}>
                {msg.text}
              </div>
            ))}
          </div>

          <div className="input-container">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Type your message..."
            />
            <button className="send-button" onClick={handleSend}>
              Send
            </button>
          </div>
        </div>
      ) : (
        <button className="reopen-button" onClick={() => setIsOpen(true)}>
          <span className="chat-icon">💬</span>
          Chat with us
        </button>
      )}
    </div>
  );
};

export default TestChatbot;
