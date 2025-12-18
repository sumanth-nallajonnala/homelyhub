import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../utils/api';
import { FaBed, FaBath, FaUsers, FaEdit, FaTrash } from 'react-icons/fa';

const MyProperties = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMyProperties();
  }, []);

  const fetchMyProperties = async () => {
    try {
      const response = await api.get('/properties/host/my-properties');
      setProperties(response.data.properties);
    } catch (error) {
      console.error('Error fetching properties:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (propertyId) => {
    if (window.confirm('Are you sure you want to delete this property?')) {
      try {
        await api.delete(`/properties/${propertyId}`);
        alert('Property deleted successfully!');
        fetchMyProperties();
      } catch (error) {
        console.error('Error deleting property:', error);
        alert('Failed to delete property');
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl">Loading properties...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">My Properties</h1>
          <Link
            to="/create-property"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
          >
            Add New Property
          </Link>
        </div>

        {properties.length === 0 ? (
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <p className="text-xl text-gray-600 mb-4">You haven't listed any properties yet.</p>
            <Link
              to="/create-property"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition inline-block"
            >
              List Your First Property
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties.map((property) => (
              <div key={property._id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="h-48 overflow-hidden">
                  <img
                    src={property.images?.[0] || 'https://via.placeholder.com/400x300'}
                    alt={property.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="p-4">
                  <h3 className="text-xl font-semibold mb-2 truncate">{property.title}</h3>

                  <p className="text-gray-600 mb-3 line-clamp-2">{property.description}</p>

                  <div className="flex items-center gap-4 text-gray-600 mb-3 text-sm">
                    <div className="flex items-center gap-1">
                      <FaBed />
                      <span>{property.bedrooms}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <FaBath />
                      <span>{property.bathrooms}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <FaUsers />
                      <span>{property.maxGuests}</span>
                    </div>
                  </div>

                  <div className="mb-4">
                    <span className="text-2xl font-bold text-blue-600">₹{property.price}</span>
                    <span className="text-gray-600 text-sm"> / night</span>
                  </div>

                  <div className="flex gap-2">
                    <Link
                      to={`/property/${property._id}`}
                      className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition text-center"
                    >
                      View
                    </Link>
                    <button
                      onClick={() => handleDelete(property._id)}
                      className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyProperties;