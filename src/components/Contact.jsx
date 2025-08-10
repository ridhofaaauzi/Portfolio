import React from "react";
import { motion } from "framer-motion";

const Contact = () => {
  return (
    <motion.section
      id="contact"
      className="min-h-screen bg-gray-100 px-4 py-20 flex flex-col items-center"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}>
      <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center">
        Hubungi Saya
      </h2>
      <form className="w-full max-w-lg bg-white p-8 rounded-xl shadow-md">
        <input
          type="text"
          placeholder="Nama Anda"
          className="w-full mb-4 p-3 border border-gray-300 rounded"
        />
        <input
          type="email"
          placeholder="Email Anda"
          className="w-full mb-4 p-3 border border-gray-300 rounded"
        />
        <textarea
          placeholder="Pesan Anda"
          className="w-full mb-4 p-3 border border-gray-300 rounded"
          rows="5"
        />
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded w-full">
          Kirim Pesan
        </button>
      </form>
    </motion.section>
  );
};

export default Contact;
