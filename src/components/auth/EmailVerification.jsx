import { useState } from "react";
import "../../styles/components/auth/EmailVerification.css";

const EmailVerification = ({ email, onVerificationComplete }) => {
  const [verificationCode, setVerificationCode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Simulate dummy verification API call
    setTimeout(() => {
      if (verificationCode === "123456") {
        onVerificationComplete();
      } else {
        setError("Invalid verification code");
      }
      setLoading(false);
    }, 1000);
  };

  // Simulate resending code
  const handleResendCode = () => {
    alert("New verification code sent!");
  };

  return (
    <div className="verification-container">
      <h2>Verify your email</h2>
      <p>
        We&apos;ve sent a verification code to <strong>{email}</strong>
      </p>
      <p>
        For now, please enter 123456 number as Verification code.
        <br />
        Since, there is no backend implementation.
      </p>

      <form onSubmit={handleSubmit} className="verification-form">
        <div className="verification-input-group">
          <input
            type="text"
            maxLength="6"
            value={verificationCode}
            onChange={(e) =>
              setVerificationCode(e.target.value.replace(/\D/g, ""))
            }
            placeholder="Enter 6-digit code"
          />
          {error && <span className="error-message">{error}</span>}
        </div>

        <button
          type="submit"
          className="verify-button"
          disabled={loading || verificationCode.length !== 6}
        >
          {loading ? "Verifying..." : "Verify Email"}
        </button>
      </form>

      <button onClick={handleResendCode} className="resend-button">
        Resend verification code
      </button>
    </div>
  );
};

export default EmailVerification;
