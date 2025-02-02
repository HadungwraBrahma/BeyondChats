import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CompanyForm from "../components/organization/CompanyForm";
import WebsiteScraper from "../components/organization/WebsiteScraper";
import ScrapingStatus from "../components/organization/ScrapingStatus";
import "../styles/pages/SetupOrganization.css";

const SetupOrganization = ({ onNext, onUserData }) => {
  const navigate = useNavigate();
  const [step, setStep] = useState("company-info");
  const [organizationData, setOrganizationData] = useState({
    companyName: "",
    websiteUrl: "",
    description: "",
    scrapedPages: [],
  });

  const handleCompanySubmit = (data) => {
    setOrganizationData((prev) => ({
      ...prev,
      ...data,
    }));
    setStep("website-scraping");
    onUserData({ organization: data });
  };

  const handleScrapingComplete = (scrapedData) => {
    const updatedData = {
      ...organizationData,
      scrapedPages: scrapedData,
    };
    setOrganizationData(updatedData);
    onUserData({ scrapedPages: scrapedData });
  };

  const handleBack = () => {
    if (step === "company-info") {
      navigate("/");
    } else {
      setStep("company-info");
    }
  };

  const handleContinue = () => {
    onNext();
  };

  return (
    <div className="setup-organization">
      <h2 className="page-title">Setup Organization</h2>
      <p>
        For now, please enter any random dummy Company name, Website URL (URL
        must begin with &quot;http&quot;) and Description. Since, there is no
        backend implementation.
      </p>
      <br />

      {step === "company-info" && (
        <CompanyForm
          onSubmit={handleCompanySubmit}
          onBack={handleBack}
          initialData={organizationData}
        />
      )}

      {step === "website-scraping" && (
        <div className="scraping-container">
          <WebsiteScraper onScrapingComplete={handleScrapingComplete} />
          <ScrapingStatus scrapedPages={organizationData.scrapedPages} />
          <div className="action-buttons">
            <button className="button button-secondary" onClick={handleBack}>
              Back
            </button>
            <button className="button button-primary" onClick={handleContinue}>
              Continue to Integration
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SetupOrganization;
