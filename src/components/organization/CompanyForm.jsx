import { useState } from "react";
import "../../styles/components/organization/CompanyForm.css";

const CompanyForm = ({ onSubmit, onBack, initialData }) => {
  const [formData, setFormData] = useState({
    companyName: initialData?.companyName || "",
    websiteUrl: initialData?.websiteUrl || "",
    description: initialData?.description || "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchMetaDescription = async (url) => {
    setLoading(true);
    try {
      // Simulating dummy API call to fetch meta description
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const dummyDescription = `This is an auto-fetched description for ${url}`;
      setFormData((prev) => ({
        ...prev,
        description: dummyDescription,
      }));
    } catch (err) {
      setError("Failed to fetch website description", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleUrlChange = (e) => {
    const url = e.target.value;
    setFormData((prev) => ({
      ...prev,
      websiteUrl: url,
    }));
    if (url && url.startsWith("http")) {
      fetchMetaDescription(url);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="company-form">
      <div className="form-group">
        <label htmlFor="companyName">Company Name</label>
        <input
          type="text"
          id="companyName"
          value={formData.companyName}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              companyName: e.target.value,
            }))
          }
          required
          className="input"
        />
      </div>

      <div className="form-group">
        <label htmlFor="websiteUrl">Website URL</label>
        <input
          type="url"
          id="websiteUrl"
          value={formData.websiteUrl}
          onChange={handleUrlChange}
          required
          className="input"
        />
      </div>

      <div className="form-group">
        <label htmlFor="description">Company Description</label>
        <textarea
          id="description"
          value={formData.description}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              description: e.target.value,
            }))
          }
          className="input textarea"
          rows="4"
        />
        {loading && (
          <span className="loading-text">Fetching description...</span>
        )}
        {error && <span className="error-text">{error}</span>}
      </div>

      <div className="form-actions">
        <button
          type="button"
          onClick={onBack}
          className="button button-secondary"
        >
          Back
        </button>
        <button type="submit" className="button button-primary">
          Continue
        </button>
      </div>
    </form>
  );
};

export default CompanyForm;
