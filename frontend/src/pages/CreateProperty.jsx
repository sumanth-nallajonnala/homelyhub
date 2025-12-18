import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';
import { FaHome, FaDollarSign, FaBed, FaBath, FaUsers } from 'react-icons/fa';

const CreateProperty = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    propertyType: 'house',
    price: '',
    address: '',
    city: '',
    state: '',
    country: '',
    zipCode: '',
    bedrooms: 1,
    bathrooms: 1,
    maxGuests: 1,
    amenities: '',
    images: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const amenitiesArray = formData.amenities.split(',').map((item) => item.trim()).filter(Boolean);
    const imagesArray = formData.images.split(',').map((item) => item.trim()).filter(Boolean);

    const propertyData = {
      title: formData.title,
      description: formData.description,
      propertyType: formData.propertyType,
      price: Number(formData.price),
      location: {
        address: formData.address,
        city: formData.city,
        state: formData.state,
        country: formData.country,
        zipCode: formData.zipCode,
      },
      bedrooms: Number(formData.bedrooms),
      bathrooms: Number(formData.bathrooms),
      maxGuests: Number(formData.maxGuests),
      amenities: amenitiesArray,
      images: imagesArray,
    };

    try {
      await api.post('/properties', propertyData);
      alert('Property created successfully!');
      navigate('/my-properties');
    } catch (error) {
      console.error('Error creating property:', error);
      setError(error.response?.data?.message || 'Failed to create property');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4 max-w-3xl">
        <h1 className="text-3xl font-bold mb-8">List Your Property</h1>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-6">
          <div className="mb-6">
            <h2 className="text-xl font-bold mb-4">Basic Information</h2>

            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Property Title *</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
                placeholder="Beautiful Beach House"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Description *</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows="4"
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
                placeholder="Describe your property..."
              />
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-gray-700 mb-2">Property Type *</label>
                <select
                  name="propertyType"
                  value={formData.propertyType}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                >
                  <option value="house">House</option>
                  <option value="apartment">Apartment</option>
                  <option value="villa">Villa</option>
                  <option value="room">Room</option>
                  <option value="cottage">Cottage</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-700 mb-2">Price per Night ($) *</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  required
                  min="1"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  placeholder="100"
                />
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-bold mb-4">Location</h2>

            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Address *</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
                placeholder="123 Main Street"
              />
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-gray-700 mb-2">City *</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  placeholder="New York"
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2">State</label>
                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  placeholder="NY"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-gray-700 mb-2">Country *</label>
                <input
                  type="text"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  placeholder="USA"
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2">Zip Code</label>
                <input
                  type="text"
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  placeholder="10001"
                />
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-bold mb-4">Property Details</h2>

            <div className="grid grid-cols-3 gap-4 mb-4">
              <div>
                <label className="block text-gray-700 mb-2">Bedrooms *</label>
                <input
                  type="number"
                  name="bedrooms"
                  value={formData.bedrooms}
                  onChange={handleChange}
                  required
                  min="1"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2">Bathrooms *</label>
                <input
                  type="number"
                  name="bathrooms"
                  value={formData.bathrooms}
                  onChange={handleChange}
                  required
                  min="1"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2">Max Guests *</label>
                <input
                  type="number"
                  name="maxGuests"
                  value={formData.maxGuests}
                  onChange={handleChange}
                  required
                  min="1"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Amenities (comma-separated)</label>
              <input
                type="text"
                name="amenities"
                value={formData.amenities}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
                placeholder="WiFi, Pool, Parking, Kitchen, Air Conditioning"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Image URLs (comma-separated)</label>
              <textarea
                name="images"
                value={formData.images}
                onChange={handleChange}
                rows="3"
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
                placeholder="https://example.com/image1.jpg, https://example.com/image2.jpg"
              />
              <p className="text-sm text-gray-500 mt-1">
                Add image URLs separated by commas. You can use free image hosting services like Imgur.
              </p>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition disabled:bg-gray-400"
          >
            {loading ? 'Creating Property...' : 'Create Property'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateProperty;