import { useState } from "react";
import "../../styles/components/integration/TestIntegration.css";

const TestIntegration = ({ onResult, onBack }) => {
  const [url, setUrl] = useState("");
  const [status, setStatus] = useState("idle");
  const [testResults, setTestResults] = useState(null);

  const runTests = async () => {
    if (!url) return;

    setStatus("testing");
    setTestResults(null);

    // Simulate API calls to test integration
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const results = {
      scriptPresent: Math.random() > 0.3,
      widgetLoaded: Math.random() > 0.3,
      apiConnected: Math.random() > 0.3,
    };

    setTestResults(results);
    setStatus("complete");

    const success = Object.values(results).every(Boolean);
    onResult(success);
  };

  const SuccessView = () => (
    <div className="success-view">
      <div className="confetti">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="confetti-piece"
            style={{
              "--delay": `${Math.random() * 3}s`,
              "--rotation": `${Math.random() * 360}deg`,
              "--position": `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>
      <div className="success-content">
        <h2>Integration Successful!</h2>
        <p>Your chatbot is now ready to use</p>
        <div className="action-buttons">
          <button className="primary-button">Explore Admin Panel</button>
          <button className="primary-button">
            Start talking to your chatbot
          </button>
        </div>
        <div className="social-share">
          <h3>Share your achievement</h3>
          <div className="social-buttons">
            <button className="social-button twitter">Twitter</button>
            <button className="social-button linkedin">LinkedIn</button>
            <button className="social-button facebook">Facebook</button>
          </div>
        </div>
      </div>
    </div>
  );

  const FailureView = () => (
    <div className="failure-view">
      <div className="failure-content">
        <h2>Integration Not Detected</h2>
        <p>
          We couldn&apos;t verify your chatbot integration. Please check the
          following:
        </p>
        <ul>
          <li>Ensure the integration code is properly added to your website</li>
          <li>Check if your website is accessible</li>
          <li>Verify that you&apos;re using the correct URL</li>
        </ul>
        <button className="primary-button" onClick={() => setStatus("idle")}>
          Try Again
        </button>
      </div>
    </div>
  );

  return (
    <div className="test-integration">
      <div className="header-with-back">
        <button className="back-button" onClick={onBack}>
          ← Back
        </button>
        {status !== "complete" && (
          <div className="test-header">
            <h2>Test Your Integration</h2>
            <p>
              Verify that your chatbot is properly installed on your website
            </p>
          </div>
        )}
      </div>

      {status !== "complete" && (
        <div className="url-input-container">
          <div className="input-wrapper">
            <span className="globe-icon">🌐</span>
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Enter your website URL"
              className="url-input"
            />
          </div>
          <button
            onClick={runTests}
            disabled={status === "testing" || !url}
            className="test-button"
          >
            {status === "testing" ? (
              <span className="loading-text">
                <span className="spinner"></span>
                Testing...
              </span>
            ) : (
              "Run Test"
            )}
          </button>
        </div>
      )}

      {status === "complete" && testResults && (
        <>
          {Object.values(testResults).every(Boolean) ? (
            <SuccessView />
          ) : (
            <FailureView />
          )}
        </>
      )}
    </div>
  );
};

export default TestIntegration;
