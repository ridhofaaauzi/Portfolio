import React from "react";
import { motion } from "framer-motion";
import { ReactTyped } from "react-typed";
import cv from "../assets/CurriculumVitae.pdf";

const Hero = () => {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 to-black text-white px-4">
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center max-w-2xl">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Hi, I'm{" "}
          <ReactTyped
            strings={["Ridho Fauzi Grafika"]}
            typeSpeed={50}
            backSpeed={30}
            loop
            className="text-blue-500"
          />
        </h1>

        <p className="text-lg md:text-xl text-gray-300 mb-6">
          Web Developer & Tech Enthusiast
        </p>

        <div className="flex justify-center gap-4">
          <a
            href={cv}
            download
            className="border border-white px-6 py-2 rounded-md hover:bg-white hover:text-black transition duration-300">
            Download CV
          </a>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
