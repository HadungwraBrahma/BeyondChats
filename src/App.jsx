import { useState } from "react";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import "./App.css";

import Registration from "./pages/Registration";
import SetupOrganization from "./pages/SetupOrganization";
import ChatbotIntegration from "./pages/ChatbotIntegration";

const StepsHeader = ({ currentStep }) => {
  const steps = [
    { number: 1, title: "Registration" },
    { number: 2, title: "Setup Organization" },
    { number: 3, title: "Chatbot Integration" },
  ];

  return (
    <div className="steps-container">
      {steps.map((step) => (
        <div
          key={step.number}
          className={`step ${currentStep >= step.number ? "active" : ""} ${
            currentStep > step.number ? "completed" : ""
          }`}
        >
          <div className="step-number">{step.number}</div>
          <div className="step-title">{step.title}</div>
        </div>
      ))}
    </div>
  );
};

const PageWrapper = ({ children }) => (
  <div className="app">
    <header className="app-header">
      <h1>BeyondChats</h1>
      <StepsHeader currentStep={children.props.stepNumber} />
    </header>
    <main className="app-main">{children}</main>
    <footer className="app-footer">
      <p>© 2025 BeyondChats and Hadungwra Brahma. All rights reserved.</p>
    </footer>
  </div>
);

const App = () => {
  const [userData, setUserData] = useState({});
  const navigate = useNavigate();

  const handleUserData = (data) => {
    setUserData((prev) => ({ ...prev, ...data }));
  };

  return (
    <Routes>
      <Route
        path="/"
        element={
          <PageWrapper>
            <Registration
              onNext={() => navigate("/setup")}
              onUserData={handleUserData}
              stepNumber={1}
            />
          </PageWrapper>
        }
      />
      <Route
        path="/setup"
        element={
          <PageWrapper>
            <SetupOrganization
              onNext={() => navigate("/integration")}
              onUserData={handleUserData}
              stepNumber={2}
            />
          </PageWrapper>
        }
      />
      <Route
        path="/integration"
        element={
          <PageWrapper>
            <ChatbotIntegration stepNumber={3} />
          </PageWrapper>
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default App;
