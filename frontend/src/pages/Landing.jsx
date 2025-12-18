import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaSearch, FaHeart, FaShieldAlt } from 'react-icons/fa';

const Landing = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section with Enhanced Blur */}
      <div className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image with Multiple Blur Layers */}
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1920')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute inset-0 bg-black opacity-60"></div>
          {/* Additional blur layer */}
          <div 
            className="absolute inset-0"
            style={{
              backgroundImage: "url('https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1920')",
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              filter: 'blur(10px)',
              opacity: 0.3
            }}
          ></div>
        </div>

        {/* Content */}
        <div className="relative z-10 text-center text-white px-4">
          <div className="mb-8">
            <FaHome className="text-7xl mx-auto mb-6 animate-bounce" />
          </div>
          <h1 className="text-6xl md:text-7xl font-bold mb-6 drop-shadow-2xl">
            Welcome to HomelyHub
          </h1>
          <p className="text-2xl md:text-3xl mb-12 drop-shadow-lg">
            Discover unique homes, villas, and rooms around the world
          </p>

          <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
            <Link
              to="/login"
              className="bg-white text-blue-600 px-12 py-4 rounded-full text-xl font-bold hover:bg-blue-50 transition-all duration-300 shadow-2xl hover:scale-110 transform"
            >
              Sign In
            </Link>
            <Link
              to="/register"
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-12 py-4 rounded-full text-xl font-bold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-2xl hover:scale-110 transform"
            >
              Get Started
            </Link>
          </div>

          <p className="mt-8 text-lg opacity-90">
            Already have an account? <Link to="/login" className="underline font-bold hover:text-blue-300">Sign in here</Link>
          </p>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="text-white text-sm">Scroll Down</div>
          <div className="text-white text-2xl">↓</div>
        </div>
      </div>

      {/* Features Section with Background */}
      <div className="relative py-20 bg-gray-50 overflow-hidden">
        {/* Background pattern */}
        <div 
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1920')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        ></div>

        <div className="relative container mx-auto px-4">
          <h2 className="text-5xl font-bold text-center mb-16 text-gray-800">
            Why Choose HomelyHub?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center p-8 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all hover:-translate-y-2">
              <div className="bg-gradient-to-r from-blue-500 to-purple-500 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
                <FaSearch className="text-4xl text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Easy Search</h3>
              <p className="text-gray-600 text-lg">
                Find your perfect accommodation with our powerful search and filter options
              </p>
            </div>

            <div className="text-center p-8 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all hover:-translate-y-2">
              <div className="bg-gradient-to-r from-green-500 to-teal-500 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
                <FaShieldAlt className="text-4xl text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Secure Booking</h3>
              <p className="text-gray-600 text-lg">
                Your payments and personal information are always protected
              </p>
            </div>

            <div className="text-center p-8 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all hover:-translate-y-2">
              <div className="bg-gradient-to-r from-pink-500 to-red-500 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
                <FaHeart className="text-4xl text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Trusted Hosts</h3>
              <p className="text-gray-600 text-lg">
                All our hosts are verified to ensure quality and safety
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section with Gradient Background */}
      <div className="relative py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white overflow-hidden">
        {/* Animated background */}
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1920')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'blur(5px)',
          }}
        ></div>

        <div className="relative container mx-auto px-4 text-center">
          <h2 className="text-5xl font-bold mb-6 drop-shadow-lg">Ready to Start Your Journey?</h2>
          <p className="text-2xl mb-10 drop-shadow-md">Join thousands of travelers finding their perfect stay</p>
          <Link
            to="/register"
            className="bg-white text-blue-600 px-16 py-5 rounded-full text-2xl font-bold hover:bg-blue-50 transition-all duration-300 shadow-2xl inline-block hover:scale-110 transform"
          >
            Create Account Now
          </Link>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-5xl font-bold text-blue-600 mb-2">500+</div>
              <div className="text-xl text-gray-600">Properties</div>
            </div>
            <div>
              <div className="text-5xl font-bold text-purple-600 mb-2">150+</div>
              <div className="text-xl text-gray-600">Cities</div>
            </div>
            <div>
              <div className="text-5xl font-bold text-green-600 mb-2">50+</div>
              <div className="text-xl text-gray-600">Countries</div>
            </div>
            <div>
              <div className="text-5xl font-bold text-pink-600 mb-2">10k+</div>
              <div className="text-xl text-gray-600">Happy Guests</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;