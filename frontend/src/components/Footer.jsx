import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">HomelyHub</h3>
            <p className="text-gray-400">
              Find and book unique places to stay around the world.
              Feel at home always with HomelyHub.
              Your home , away from home.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="/" className="text-gray-400 hover:text-white transition">Home</a>
              </li>
              <li>
                <a href="/about" className="text-gray-400 hover:text-white transition">About Us</a>
              </li>
              <li>
                <a href="/contact" className="text-gray-400 hover:text-white transition">Contact</a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Follow Us</h3>
            <div className="flex gap-4 text-2xl">
              <a href="#" className="text-gray-400 hover:text-white transition">
                <FaFacebook />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition">
                <FaTwitter />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition">
                <FaInstagram />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2025 HomelyHub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;