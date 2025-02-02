import { useState } from "react";
import "../../styles/components/organization/ScrapingStatus.css";

const ScrapingStatus = ({ scrapedPages }) => {
  const [selectedPage, setSelectedPage] = useState(null);

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "status-success";
      case "in-progress":
        return "status-warning";
      case "pending":
        return "status-pending";
      default:
        return "";
    }
  };

  return (
    <div className="scraping-status">
      <h3>Scraped Pages</h3>
      <div className="pages-grid">
        {scrapedPages.map((page, index) => (
          <div
            key={index}
            className={`page-card ${getStatusColor(page.status)}`}
            onClick={() => setSelectedPage(page)}
          >
            <h4>{page.url}</h4>
            <div className="page-stats">
              <span className="status">{page.status}</span>
              <span className="chunks">{page.chunks} chunks</span>
            </div>
          </div>
        ))}
      </div>

      {selectedPage && (
        <div className="page-details">
          <h4>Details for {selectedPage.url}</h4>
          <p>Status: {selectedPage.status}</p>
          <p>Data Chunks: {selectedPage.chunks}</p>
          <button
            className="button button-secondary"
            onClick={() => setSelectedPage(null)}
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
};

export default ScrapingStatus;
