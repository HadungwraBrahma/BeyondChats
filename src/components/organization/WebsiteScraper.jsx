import { useState, useEffect } from "react";
import "../../styles/components/organization/WebsiteScraper.css";

const WebsiteScraper = ({ onScrapingComplete }) => {
  const [scraping, setScraping] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate scraping process
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setScraping(false);
          // Send dummy scraped data
          onScrapingComplete(generateDummyScrapedData());
          return 100;
        }
        return prev + 10;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const generateDummyScrapedData = () => {
    return [
      { url: "/home", status: "completed", chunks: 15 },
      { url: "/about", status: "completed", chunks: 8 },
      { url: "/services", status: "pending", chunks: 0 },
      { url: "/contact", status: "completed", chunks: 5 },
      { url: "/blog", status: "in-progress", chunks: 3 },
    ];
  };

  return (
    <div className="website-scraper">
      <h3>Website Scraping Status</h3>
      <div className="scraping-progress">
        <div className="progress-bar" style={{ width: `${progress}%` }}></div>
      </div>
      <p className="status-text">
        {scraping
          ? `Scraping website: ${progress}% complete`
          : "Scraping completed!"}
      </p>
    </div>
  );
};

export default WebsiteScraper;
