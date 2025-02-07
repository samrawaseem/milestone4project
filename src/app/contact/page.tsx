"use client";

import { useState } from "react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("Sending...");

    // Simulate form submission
    setTimeout(() => {
      setStatus("Message sent successfully!");
      setFormData({ name: "", email: "", message: "" });
    }, 2000);
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-4 text-center">Contact Us</h1>
      <p className="text-gray-600 text-center mb-6">Feel free to reach out to us!</p>

      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6 space-y-4">
        {/* Name Input */}
        <div>
          <label className="block text-gray-700 font-semibold">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full mt-2 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="Enter your name"
          />
        </div>

        {/* Email Input */}
        <div>
          <label className="block text-gray-700 font-semibold">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full mt-2 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="Enter your email"
          />
        </div>

        {/* Message Input */}
        <div>
          <label className="block text-gray-700 font-semibold">Message</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows={5}
            className="w-full mt-2 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="Enter your message"
          ></textarea>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-semibold p-3 rounded-lg hover:bg-blue-700 transition"
        >
          Send Message
        </button>

        {/* Status Message */}
        {status && <p className="text-center text-green-600 mt-2">{status}</p>}
      </form>
    </div>
  );
}
