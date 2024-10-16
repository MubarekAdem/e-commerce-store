import React, { useState } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, message } = formData;

    // Construct the mailto URL
    const mailtoLink = `mailto:info@ecommerce.com?subject=New message from ${name}&body=${encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
    )}`;

    window.location.href = mailtoLink;
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-6 md:px-16">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
          Contact Us
        </h1>
        <p className="text-center text-lg text-gray-600 max-w-2xl mx-auto mb-12">
          We would love to hear from you! Whether you have questions about our
          products, need assistance, or just want to give feedback, feel free to
          reach out. Our team is ready to help.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white shadow-lg rounded-lg p-8 transform transition duration-500 hover:scale-105 hover:shadow-xl">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">
              Get in Touch
            </h2>
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="name"
                  className="block text-gray-600 mb-2 font-medium"
                >
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition duration-300"
                  placeholder="Enter your name"
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-gray-600 mb-2 font-medium"
                >
                  Your Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition duration-300"
                  placeholder="Enter your email"
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-gray-600 mb-2 font-medium"
                >
                  Your Message
                </label>
                <textarea
                  id="message"
                  rows="5"
                  className="w-full border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition duration-300"
                  placeholder="Enter your message"
                  onChange={handleChange}
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-indigo-500 text-white py-3 rounded-lg hover:bg-indigo-600 transition duration-300"
              >
                Send Message
              </button>
            </form>
          </div>

          <div className="bg-white shadow-lg rounded-lg p-8 transform transition duration-500 hover:scale-105 hover:shadow-xl">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">
              Contact Information
            </h2>
            <p className="text-gray-600 mb-4">
              If you prefer, you can also reach us directly through the
              following contact details:
            </p>
            <ul className="space-y-4 text-gray-600">
              <li className="flex items-center">
                <svg
                  className="w-6 h-6 mr-3 text-indigo-500"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16 7c0 2.21-.89 4.21-2.34 5.66C12.21 14.11 10.21 15 8 15m0-8a4 4 0 014-4m0 0a4 4 0 014 4m0 0v.5a10.03 10.03 0 01-3.02 7.11c-.4.42-.92.83-1.46 1.2C8.91 17.58 6.97 18 5 18"
                  />
                </svg>
                +251-918-00-72-37
              </li>
              <li className="flex items-center">
                <svg
                  className="w-6 h-6 mr-3 text-indigo-500"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16 8V6a4 4 0 00-8 0v2m1 8h6m2 0a4 4 0 11-8 0h8z"
                  />
                </svg>
                mubarekaddem001@gmail.com
              </li>
              <li className="flex items-center">
                <svg
                  className="w-6 h-6 mr-3 text-indigo-500"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 10c0-2.385-1.438-5.69-6-7-2.304 0-4 2-6 2s-3.697-2-6-2c-4.562 1.31-6 4.615-6 7 0 6.627 7.875 12 12 12s12-5.373 12-12z"
                  />
                </svg>
                22 Megenagna St, Addis Abeba, Ethiopia
              </li>
            </ul>

            <img
              src="https://via.placeholder.com/300x200"
              alt="Map"
              className="w-full h-48 object-cover rounded-lg mt-6"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
