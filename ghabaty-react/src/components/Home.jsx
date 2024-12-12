import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Typed from "typed.js";
import backgroundImage from "../images/reports-bg.jpg"; // Path to the background image

const Home = () => {
  const [hoveredLink, setHoveredLink] = useState(null);
  const typedRef = useRef(null);

  useEffect(() => {
    const options = {
      strings: ["Alert", "Safe", "Prepared", "Informed"],
      typeSpeed: 100,
      backSpeed: 80,
      backDelay: 1500,
      loop: true,
    };
    typedRef.current = new Typed(".typed-element", options);

    return () => {
      if (typedRef.current) {
        typedRef.current.destroy();
      }
    };
  }, []);

  return (
    <div
      className="min-h-screen bg-cover bg-center text-white flex flex-col justify-between"
      style={{
        backgroundImage: `url(${backgroundImage})`,
      }}
    >
      {/* Navigation Bar */}
      <nav className="w-full flex justify-between items-center px-8 py-4 bg-gradient-to-b from-black to-transparent">
        <h1 className="text-4xl font-extrabold cursor-pointer transform transition duration-200 hover:scale-110 hover:text-red-400">
          <Link to="/">GHABATY</Link>
        </h1>
        <ul className="flex gap-8 text-lg">
          {["Home", "Alerts", "Reports", "Contact", "About Us"].map((link) => (
            <li
              key={link}
              className={`p-1 ${
                hoveredLink === null && link === "Home"
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
        <button className="px-5 py-2 bg-gradient-to-r from-red-400 to-red-600 rounded-full text-lg font-medium hover:from-red-500 hover:to-red-700 hover:shadow-lg transform hover:-translate-y-1 transition-all duration-200">
          Sign Up
        </button>
      </nav>

      {/* Hero Section */}
      <div className="flex-1 flex flex-col justify-center items-center text-center px-6">
        <div className="bg-black bg-opacity-70 p-10 rounded-xl drop-shadow-lg max-w-3xl">
          <h1 className="text-4xl font-extrabold mb-4">
            Stay{" "}
            <span
              className="typed-element"
              style={{
                fontSize: "2rem",
                color: "#F87171",
                fontWeight: "800",
              }}
            ></span>
          </h1>
          <p className="text-lg mb-8 leading-relaxed text-gray-300">
            Get real-time updates and insights to help protect your communities
            from wildfires. Together, we can make a difference.
          </p>
          <button className="px-8 py-3 bg-gradient-to-r from-red-400 to-red-600 rounded-full text-lg font-medium hover:from-red-500 hover:to-red-700 hover:shadow-lg transform hover:-translate-y-1 transition-all duration-200">
            Get Started
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="w-full py-6 bg-black bg-opacity-80 text-center text-sm">
        <ul className="flex justify-center gap-6 mb-4">
          {["Privacy Policy", "Terms of Service", "Help"].map((footerLink) => (
            <li
              key={footerLink}
              className="hover:text-red-400 hover:underline transition-all duration-200"
            >
              <a href={`#${footerLink.toLowerCase().replace(/\s+/g, "-")}`}>
                {footerLink}
              </a>
            </li>
          ))}
        </ul>
        <p className="text-gray-400">© 2024 Ghabaty. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
