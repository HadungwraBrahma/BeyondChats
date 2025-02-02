import { useState } from "react";
import LoginForm from "../components/auth/LoginForm";
import GoogleSignIn from "../components/auth/GoogleSignIn";
import EmailVerification from "../components/auth/EmailVerification";
import "../styles/pages/Registration.css";

const Registration = ({ onNext, onUserData }) => {
  const [verificationNeeded, setVerificationNeeded] = useState(false);
  const [userEmail, setUserEmail] = useState("");

  const handleRegistrationSuccess = (data) => {
    setUserEmail(data.email);
    setVerificationNeeded(true);
    onUserData(data);
  };

  const handleVerificationSuccess = () => {
    onNext();
  };

  return (
    <div className="registration-container">
      {!verificationNeeded ? (
        <>
          <div className="registration-header">
            <h2>Create your account</h2>
            <h3>Start building your chatbot in minutes.</h3>
            <p>
              For now, enter any dummy random name, email, and password, as
              there is no backend implementation.
            </p>
          </div>

          <LoginForm onSubmit={handleRegistrationSuccess} />

          <div className="divider">
            <span>or</span>
          </div>

          <GoogleSignIn onSuccess={handleRegistrationSuccess} />
        </>
      ) : (
        <EmailVerification
          email={userEmail}
          onVerificationComplete={handleVerificationSuccess}
        />
      )}
    </div>
  );
};

export default Registration;
