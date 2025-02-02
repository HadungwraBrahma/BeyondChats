import { useState } from "react";
import "../../styles/components/integration/IntegrationGuide.css";

const IntegrationGuide = ({ onClose }) => {
  const [method, setMethod] = useState("code");
  const [email, setEmail] = useState("");
  const [copied, setCopied] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  // Dummy integration Code
  const integrationCode = `<script>
  (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'chatbot':i});
  var f=d.getElementsByTagName(s)[0],
  j=d.createElement(s);j.async=true;
  j.src='https://cdn.beyondchats.com/widget.js';
  f.parentNode.insertBefore(j,f);
  })(window,document,'script','bc','YOUR_CHATBOT_ID');
</script>`;

  const handleCopyCode = () => {
    navigator.clipboard.writeText(integrationCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSendEmail = () => {
    setEmailSent(true);
    setTimeout(() => {
      setEmailSent(false);
      setEmail("");
    }, 3000);
  };

  return (
    <div className="integration-guide">
      <div className="guide-header">
        <h2>Integrate on Your Website</h2>
        <button className="close-button" onClick={onClose}>
          ×
        </button>
      </div>

      <div className="integration-methods">
        <button
          className={`method-button ${method === "code" ? "active" : ""}`}
          onClick={() => setMethod("code")}
        >
          Copy Code
        </button>
        <button
          className={`method-button ${method === "email" ? "active" : ""}`}
          onClick={() => setMethod("email")}
        >
          Email Developer
        </button>
      </div>

      <div className="integration-content">
        {method === "code" ? (
          <div className="code-section">
            <p className="instruction-text">
              Add this code to your website&apos;s &lt;head&gt; section to
              integrate the chatbot:
            </p>
            <div className="code-container">
              <pre className="code-container-child">
                <code>{integrationCode}</code>
              </pre>
              <button className="copy-button" onClick={handleCopyCode}>
                {copied ? "Copied!" : "Copy Code"}
              </button>
            </div>
          </div>
        ) : (
          <div className="email-section">
            <p className="instruction-text">
              We&apos;ll send the integration instructions to your developer:
            </p>
            <div className="email-form">
              <input
                type="email"
                placeholder="developer@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="email-input"
              />
              <button
                className="send-button"
                onClick={handleSendEmail}
                disabled={!email || emailSent}
              >
                {emailSent ? "Sent!" : "Send Instructions"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default IntegrationGuide;
