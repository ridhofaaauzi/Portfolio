import React from "react";
import { motion } from "framer-motion";
import bsnp from "../assets/Sertifikasi BNSP.jpg";
import cloud from "../assets/Sertifikat Cloud Practitioner Essentials.jpg";
import javascript from "../assets/Sertifikat Javascript.jpg";
import magang from "../assets/Sertifikat Magang.jpg";
import cloudInstan from "../assets/Sertifikat Cloud Web Instan.jpg";
import mentor from "../assets/Sertifikat Celerates.png";

const Certificate = () => {
  const certificates = [
    {
      title: "Sertifikat Junior Web Developer",
      image: bsnp,
    },
    {
      title: "Sertifikat Cloud Practitioner Essentials",
      image: cloud,
    },
    {
      title: "Sertifikat Belajar Dasar Pemrograman Javascript",
      image: javascript,
    },
    {
      title: "Sertifikat Magang Web Developer",
      image: magang,
    },
    {
      title: "Sertifikat Cloud Web Instan",
      image: cloudInstan,
    },
    {
      title: "Sertifikat Mentor",
      image: mentor,
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
          Certificates
        </h2>
        <div className="grid md:grid-cols-2 gap-5 max-w-7xl mx-auto mt-10">
          {certificates.map((certificate, index) => (
            <div
              key={index}
              className="relative group h-[450px] overflow-hidden">
              <img
                src={certificate.image}
                alt={certificate.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gray-950 bg-opacity-60 flex flex-col items-center justify-center text-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <h3 className="text-2xl font-bold">{certificate.title}</h3>
                <span className="text-gray-300">{certificate.year}</span>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Certificate;
