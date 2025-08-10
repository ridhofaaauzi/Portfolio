import React from "react";
import { motion } from "framer-motion";
import Codelamp from "../assets/Codelamp.png";
import KuninganTour from "../assets/KuninganTour.png";
import WasteCycle from "../assets/WasteCycle.png";

const Projects = () => {
  const projects = [
    {
      title: "Codelamp",
      image: Codelamp,
    },
    {
      title: "Kuningan Tour",
      image: KuninganTour,
    },
    {
      title: "WasteCycle",
      image: WasteCycle,
    },
  ];

  return (
    <section className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white px-4 py-20">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}>
        <h2 className="text-4xl font-bold mb-4 grid md:grid-cols-2 gap-5 max-w-7xl mx-auto mt-10">
          Projects
        </h2>
        <div className="grid md:grid-cols-2 gap-5 max-w-7xl mx-auto mt-10">
          {projects.map((project, index) => (
            <div
              key={index}
              className="relative group h-[450px] overflow-hidden">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gray-950 bg-opacity-60 flex flex-col items-center justify-center text-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <h3 className="text-2xl font-bold">{project.title}</h3>
                <span className="text-gray-300">{project.year}</span>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Projects;
