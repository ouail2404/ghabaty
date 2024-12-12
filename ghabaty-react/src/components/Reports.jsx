import React, { useState, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import backgroundImage from "../images/bg-1.jpg"; // Import the background image

const Reports = () => {
  const [reports, setReports] = useState(
    JSON.parse(localStorage.getItem("reports")) || []
  );
  const [reportText, setReportText] = useState("");
  const [showReports, setShowReports] = useState(false);
  const [hoveredLink, setHoveredLink] = useState(null);
  const location = useLocation();

  const handleReportSubmit = useCallback(
    (e) => {
      e.preventDefault();

      if (reportText.trim() === "") return;

      const newReport = {
        text: reportText,
        date: new Date().toLocaleString(),
      };

      const updatedReports = [newReport, ...reports];
      setReports(updatedReports);
      localStorage.setItem("reports", JSON.stringify(updatedReports));
      setReportText(""); // Clear the textarea
    },
    [reports, reportText]
  ); // Use useCallback to avoid unnecessary re-renders

  const toggleShowReports = useCallback(() => {
    setShowReports((prevState) => !prevState);
  }, []); // Use useCallback for state toggle function

  return (
    <div
      className="min-h-screen bg-cover bg-center text-white flex flex-col"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundOpacity: 0.8 /* Adjust opacity as needed */,
      }}
    >
      {/* Navigation Bar */}
      <nav className="w-full flex justify-between items-center px-8 py-4 bg-black opacity-70">
        {" "}
        <h1 className="text-4xl font-extrabold cursor-pointer transform transition duration-200 hover:scale-110 hover:text-red-400">
          <Link to="/">GHABATY</Link>
        </h1>
        <ul className="flex gap-8 text-lg">
          {["Home", "Alerts", "Reports", "Contact", "About Us"].map((link) => (
            <li
              key={link}
              className={`p-1 ${
                hoveredLink === null && link === "Reports"
                  ? "border-b-4 border-red-400 text-red-400"
                  : hoveredLink === link
                  ? "border-b-4 border-red-400 text-red-400"
                  : "hover:border-b-4 hover:border-red-400 hover:text-red-400"
              } transition-all duration-200`}
              onMouseEnter={() => setHoveredLink(link)}
              onMouseLeave={() => setHoveredLink(null)}
            >
              <Link
                to={
                  link === "Home"
                    ? "/"
                    : `/${link.toLowerCase().replace(/\s+/g, "-")}`
                }
              >
                {link}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Main Section */}
      <section className="container mx-auto mt-12 p-6 flex-grow">
        <div className="flex flex-wrap lg:flex-nowrap gap-12">
          {/* Form Section */}
          <div className="w-full lg:w-5/12 bg-black bg-opacity-80 p-8 rounded-lg shadow-lg">
            <h2 className="text-3xl font-bold mb-6 text-left text-red-400">
              Submit a Report
            </h2>
            <form
              id="report-form"
              onSubmit={handleReportSubmit}
              className="space-y-6"
            >
              <textarea
                id="report-details"
                placeholder="Describe the issue..."
                value={reportText}
                onChange={(e) => setReportText(e.target.value)}
                required
                className="w-full h-48 px-6 py-4 text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-lg"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-gradient-to-r from-red-400 to-red-600 text-white rounded-full text-lg font-medium hover:from-red-500 hover:to-red-700 hover:shadow-lg transition-all duration-200"
              >
                Submit Report
              </button>
            </form>
          </div>

          {/* Latest Reports Section */}
          <div className="w-full lg:w-7/12 bg-black bg-opacity-80 p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-6 text-left text-red-400">
              {showReports ? "Latest Reports" : "View Latest Reports"}
            </h2>
            {showReports ? (
              reports.length === 0 ? (
                <p className="text-gray-300">No reports submitted yet.</p>
              ) : (
                <ul className="space-y-6">
                  {reports.map((report, index) => (
                    <li
                      key={index}
                      className="p-6 bg-gray-900 rounded-lg shadow-sm hover:shadow-md border border-gray-700 transition-transform transform hover:-translate-y-1"
                    >
                      <p className="text-gray-200">{report.text}</p>
                      <p className="text-sm text-gray-400 mt-2">
                        Submitted on: {report.date}
                      </p>
                    </li>
                  ))}
                </ul>
              )
            ) : (
              <button
                onClick={toggleShowReports}
                className="text-red-400 hover:underline text-lg transition-all duration-200 block mx-auto"
              >
                Show Latest Reports
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black bg-opacity-70 text-gray-300 py-6">
        <div className="container mx-auto flex justify-center items-center">
          <p>&copy; 2024 Ghabaty. All rights reserved.</p>
          <ul className="flex gap-6 ml-4">
            <li>
              <Link to="/privacy-policy" className="hover:text-gray-100">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link to="/terms-of-service" className="hover:text-gray-100">
                Terms of Service
              </Link>
            </li>
            <li>
              <Link to="/help" className="hover:text-gray-100">
                Help
              </Link>
            </li>
          </ul>
        </div>
      </footer>
    </div>
  );
};

export default Reports;
