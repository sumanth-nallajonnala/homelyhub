import React, { useState } from 'react';
import { FaSearch, FaRedoAlt } from 'react-icons/fa';

const Filter = ({ onFilter }) => {
  const [filters, setFilters] = useState({
    city: '',
    propertyType: '',
    minPrice: '',
    maxPrice: '',
    bedrooms: '',
    guests: '',
  });

  const handleChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onFilter(filters);
  };

  const handleReset = () => {
    setFilters({
      city: '',
      propertyType: '',
      minPrice: '',
      maxPrice: '',
      bedrooms: '',
      guests: '',
    });
    onFilter({});
  };

  return (
    <div className="relative bg-white p-8 rounded-2xl shadow-xl mb-12 border border-gray-100 overflow-hidden">
      {/* Subtle background pattern */}
      <div 
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'blur(5px)',
        }}
      ></div>

      {/* Content */}
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Search Properties</h2>
          <button
            type="button"
            onClick={handleReset}
            className="text-blue-600 hover:text-blue-700 flex items-center gap-2 font-semibold transition"
          >
            <FaRedoAlt />
            Reset
          </button>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            <input
              type="text"
              name="city"
              placeholder="Enter city name"
              value={filters.city}
              onChange={handleChange}
              className="border-2 border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500 transition bg-white"
            />

            <select
              name="propertyType"
              value={filters.propertyType}
              onChange={handleChange}
              className="border-2 border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500 transition bg-white"
            >
              <option value="">All Property Types</option>
              <option value="house">🏠 House</option>
              <option value="apartment">🏢 Apartment</option>
              <option value="villa">🏰 Villa</option>
              <option value="room">🚪 Room</option>
              <option value="cottage">🏡 Cottage</option>
            </select>

            <input
              type="number"
              name="bedrooms"
              placeholder="Bedrooms"
              value={filters.bedrooms}
              onChange={handleChange}
              className="border-2 border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500 transition bg-white"
            />

            <input
              type="number"
              name="minPrice"
              placeholder="Min Price (₹)"
              value={filters.minPrice}
              onChange={handleChange}
              className="border-2 border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500 transition bg-white"
            />

            <input
              type="number"
              name="maxPrice"
              placeholder="Max Price (₹)"
              value={filters.maxPrice}
              onChange={handleChange}
              className="border-2 border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500 transition bg-white"
            />

            <input
              type="number"
              name="guests"
              placeholder="Number of Guests"
              value={filters.guests}
              onChange={handleChange}
              className="border-2 border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500 transition bg-white"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 flex items-center justify-center gap-3 text-lg font-semibold shadow-lg hover:shadow-xl"
          >
            <FaSearch />
            Search Properties
          </button>
        </form>
      </div>
    </div>
  );
};

export default Filter;