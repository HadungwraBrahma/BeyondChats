import { useState } from "react";
import { useNavigate } from "react-router-dom";
import TestChatbot from "../components/integration/TestChatbot";
import IntegrationGuide from "../components/integration/IntegrationGuide";
import TestIntegration from "../components/integration/TestIntegration";
import "../styles/pages/ChatbotIntegration.css";

const ChatbotIntegration = () => {
  const navigate = useNavigate();
  const [currentView, setCurrentView] = useState("main");

  const handleIntegrationTest = (success) => {
    console.log("Integration success:", success);
  };

  const handleBack = () => {
    if (currentView === "main") {
      navigate("/setup");
    } else {
      setCurrentView("main");
    }
  };

  const renderView = () => {
    switch (currentView) {
      case "test":
        return <TestChatbot onClose={() => setCurrentView("main")} />;
      case "integrate":
        return <IntegrationGuide onClose={() => setCurrentView("main")} />;
      case "testIntegration":
        return (
          <TestIntegration
            onResult={handleIntegrationTest}
            onBack={() => setCurrentView("main")}
          />
        );
      default:
        return (
          <div className="integration-options">
            <h2>Chatbot Integration</h2>
            <div className="options-grid">
              <button
                className="option-button"
                onClick={() => setCurrentView("test")}
              >
                <span className="icon">🤖</span>
                <h3>Test Chatbot</h3>
                <p>Preview and test your chatbot before integration</p>
              </button>

              <button
                className="option-button"
                onClick={() => setCurrentView("integrate")}
              >
                <span className="icon">⚡</span>
                <h3>Integrate on Website</h3>
                <p>Get integration code or send to developer</p>
              </button>

              <button
                className="option-button"
                onClick={() => setCurrentView("testIntegration")}
              >
                <span className="icon">✅</span>
                <h3>Test Integration</h3>
                <p>Verify successful integration</p>
              </button>
            </div>
            <div className="navigation-buttons">
              <button className="button button-secondary" onClick={handleBack}>
                Back to Setup
              </button>
            </div>
          </div>
        );
    }
  };

  return <div className="chatbot-integration">{renderView()}</div>;
};

export default ChatbotIntegration;
