import React from "react";
import { motion } from "framer-motion";
import {
  FaHtml5,
  FaCss3Alt,
  FaReact,
  FaBootstrap,
  FaNodeJs,
  FaPhp,
  FaLaravel,
} from "react-icons/fa";
import {
  SiJavascript,
  SiTailwindcss,
  SiExpress,
  SiJquery,
  SiMysql,
} from "react-icons/si";
import Profile from "../assets/profile.webp";

const About = () => {
  const skills = [
    { icon: <FaHtml5 />, label: "HTML", color: "text-orange-500" },
    { icon: <FaCss3Alt />, label: "CSS", color: "text-blue-500" },
    { icon: <SiJavascript />, label: "JavaScript", color: "text-yellow-400" },
    { icon: <FaReact />, label: "React", color: "text-cyan-400" },
    { icon: <SiTailwindcss />, label: "Tailwind", color: "text-sky-400" },
    { icon: <FaBootstrap />, label: "Bootstrap", color: "text-purple-500" },
    { icon: <FaNodeJs />, label: "Node JS", color: "text-green-500" },
    { icon: <SiExpress />, label: "Express", color: "text-gray-300" },
    { icon: <FaPhp />, label: "PHP", color: "text-indigo-400" },
    { icon: <FaLaravel />, label: "Laravel", color: "text-red-500" },
    { icon: <SiMysql />, label: "MySQL", color: "text-blue-400" },
  ];

  return (
    <section className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-b from-gray-900 to-black text-white px-4 py-20">
      <motion.section
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="w-full max-w-6xl">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">
          About Me
        </h2>
        <div className="flex flex-col md:flex-row items-center md:items-start gap-10 mb-10">
          <div className="flex-shrink-0 w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden shadow-lg border-4 border-blue-800">
            <img
              src={Profile}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex-1">
            <p className="text-white text-center md:text-left leading-relaxed">
              I'm Ridho Fauzi Grafika, a Computer Engineering graduate from STT
              Terpadu Nurul Fikri with a strong passion for Web Development. I
              have hands-on experience with various web technologies.
              <br />
              <br />
              In addition to my technical skills, I'm used to working
              collaboratively in teams, communicating effectively, and solving
              problems with responsibility. I'm eager to continue growing in the
              tech industry and contribute meaningfully as a Web Developer.
            </p>
            <div className="flex flex-wrap gap-4 mt-5">
              {skills.map((skill, index) => (
                <div key={index} className="relative group">
                  <div className="flex items-center justify-center w-14 h-14 rounded-lg bg-blue-800 text-white text-2xl shadow-lg hover:scale-110 transition-transform">
                    <span className={skill.color}>{skill.icon}</span>
                  </div>
                  <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 bg-gray-800 text-white text-sm rounded px-2 py-1 pointer-events-none transition-opacity whitespace-nowrap">
                    {skill.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.section>
    </section>
  );
};

export default About;
