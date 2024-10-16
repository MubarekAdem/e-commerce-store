import React from "react";

const About = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-12 px-6 md:px-16">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
          About Us
        </h1>
        <p className="text-center text-lg text-gray-600 max-w-2xl mx-auto mb-12">
          Welcome to our store! We are dedicated to providing you with the best
          quality products and services. Our team is passionate about delivering
          an exceptional shopping experience with a wide selection of items
          catered to meet your needs.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Mission Section */}
          <div className="flex flex-col justify-center items-center bg-white shadow-lg rounded-lg p-8 transform transition duration-500 hover:scale-105 hover:shadow-xl">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDJcxbRwfg-z1Kc4pqouaUU-IjiQn8CiVqIQ&s"
              alt="Mission"
              className="w-48 h-48 object-cover rounded-full mb-6 animate-pulse"
            />
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">
              Our Mission
            </h2>
            <p className="text-gray-600 text-center">
              Our mission is to provide top-quality products at affordable
              prices while ensuring excellent customer service. We strive to
              exceed your expectations with every purchase.
            </p>
          </div>

          {/* Values Section */}
          <div className="flex flex-col justify-center items-center bg-white shadow-lg rounded-lg p-8 transform transition duration-500 hover:scale-105 hover:shadow-xl">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5EZMD8xsuDwXoTbHf0k4mWaoqf3cuCYWe-w&s"
              alt="Values"
              className="w-48 h-48 object-cover rounded-full mb-6 animate-pulse"
            />
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">
              Our Values
            </h2>
            <p className="text-gray-600 text-center">
              Integrity, innovation, and customer satisfaction are at the core
              of everything we do. We believe in building trust and delivering
              value with every transaction.
            </p>
          </div>

          {/* Team Section */}
          <div className="flex flex-col justify-center items-center bg-white shadow-lg rounded-lg p-8 transform transition duration-500 hover:scale-105 hover:shadow-xl">
            <img
              src="https://static.vecteezy.com/system/resources/previews/009/663/166/non_2x/people-user-team-transparent-free-png.png"
              alt="Team"
              className="w-48 h-48 object-cover rounded-full mb-6 animate-pulse"
            />
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">
              Meet Our Team
            </h2>
            <p className="text-gray-600 text-center">
              Our team is made up of dedicated professionals who are committed
              to ensuring that your shopping experience is seamless and
              enjoyable. We are here to help every step of the way.
            </p>
          </div>

          {/* Vision Section */}
          <div className="flex flex-col justify-center items-center bg-white shadow-lg rounded-lg p-8 transform transition duration-500 hover:scale-105 hover:shadow-xl">
            <img
              src="https://png.pngtree.com/png-vector/20221221/ourmid/pngtree-realistic-best-quality-badge-with-round-shape-gold-color-png-image_6532360.png"
              alt="Vision"
              className="w-48 h-48 object-cover rounded-full mb-6 animate-pulse"
            />
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">
              Our Vision
            </h2>
            <p className="text-gray-600 text-center">
              Our vision is to become a leading online store, known for our
              exceptional product range and customer-centric approach. We aim to
              build lasting relationships with our customers.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
