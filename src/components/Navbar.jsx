import { motion } from "framer-motion";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <motion.nav
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="shadow-md fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
        <div className="text-2xl font-bold text-white">Ridhofaauzi</div>

        <div className="hidden md:flex space-x-6 text-white font-medium">
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/projects">Project</Link>
          <Link to="/certificate">Certificate</Link>
          <Link to="/experience">Experience</Link>
        </div>
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="text-white focus:outline-none">
            {isOpen ? "✖" : "☰"}
          </button>
        </div>
      </div>
      {isOpen && (
        <motion.div
          initial={{ height: 0 }}
          animate={{ height: "auto" }}
          transition={{ duration: 0.3 }}
          className="md:hidden px-4 pb-4">
          <Link to="/" className="block py-2 text-white">
            Home
          </Link>
          <Link to="/about" className="block py-2 text-white">
            About
          </Link>
          <Link to="/projects" className="block py-2 text-white">
            Project
          </Link>
          <Link to="/certificate" className="block py-2 text-white">
            Certificate
          </Link>
          <Link to="/experience" className="block py-2 text-white">
            Experience
          </Link>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;
