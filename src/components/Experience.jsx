import React from "react";
import { motion } from "framer-motion";

const Experience = () => {
  const experiences = [
    {
      company: "Celerates",
      date: "May 2024 - Jun 2024",
      desc: "Facilitated and evaluated participant learning by overseeing synchronous sessions, guiding self-directed study, addressing inquiries, validating activity logs, and delivering actionable feedback to drive performance improvement and ensure successful program outcomes.",
      tags: ["Co-Mentor", "Part Time"],
    },
    {
      company: "PT. Amanah Karya Indonesia",
      date: "Aug 2024 - Mar 2025",
      desc: "Contributed to the development of two major products: SIHRIS (Human Resource Information System) and Berbagilink.",
      tags: ["Web Development", "Intership"],
    },
  ];

  return (
    <section className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-b from-gray-900 to-black text-white px-4 py-20">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}>
        <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-12">
          <div>
            <h2 className="text-4xl font-bold mb-4">Experience</h2>
          </div>
        </div>
        <div className="space-y-8">
          {experiences.map((exp, idx) => (
            <div key={idx} className="pb-8 border-b border-gray-700">
              <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-10">
                <div className="mb-4 md:mb-0">
                  <h3 className="text-lg font-semibold">{exp.company}</h3>
                  <p className="text-gray-500 text-sm">{exp.date}</p>
                </div>
                <div className="max-w-2xl">
                  <p className="text-gray-300">{exp.desc}</p>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {exp.tags.map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-3 py-1 text-sm rounded-full bg-gray-800 text-gray-200 border border-gray-600">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Experience;
