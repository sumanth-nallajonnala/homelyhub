import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import api from '../utils/api';
import { FaBed, FaBath, FaUsers, FaMapMarkerAlt } from 'react-icons/fa';

const PropertyDetails = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bookingData, setBookingData] = useState({
    checkInDate: '',
    checkOutDate: '',
    numberOfGuests: 1,
  });

  useEffect(() => {
    fetchProperty();
  }, [id]);

  const fetchProperty = async () => {
    try {
      const response = await api.get(`/properties/${id}`);
      setProperty(response.data.property);
    } catch (error) {
      console.error('Error fetching property:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleBooking = async () => {
    if (!user) {
      navigate('/login');
      return;
    }

    if (!bookingData.checkInDate || !bookingData.checkOutDate) {
      alert('Please select check-in and check-out dates');
      return;
    }

    const days = Math.ceil(
      (new Date(bookingData.checkOutDate) - new Date(bookingData.checkInDate)) / (1000 * 60 * 60 * 24)
    );

    const totalPrice = days * property.price;

    try {
      const response = await api.post('/bookings', {
        propertyId: property._id,
        ...bookingData,
        totalPrice,
      });

      alert('Booking created successfully!');
      navigate('/my-bookings');
    } catch (error) {
      console.error('Error creating booking:', error);
      alert('Failed to create booking');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl">Loading...</div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl">Property not found</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 p-6">
            <div>
              <img
                src={property.images?.[0] || 'https://via.placeholder.com/600x400'}
                alt={property.title}
                className="w-full h-96 object-cover rounded-lg"
              />
            </div>

            <div>
              <h1 className="text-3xl font-bold mb-4">{property.title}</h1>

              <div className="mb-4">
                <div className="flex items-center text-gray-600 mb-2">
                  <FaMapMarkerAlt className="mr-2" />
                  <span>
                    {property.location?.address}, {property.location?.city}, {property.location?.country}
                  </span>
                </div>
                
                <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                    `${property.location?.address}, ${property.location?.city}, ${property.location?.state}, ${property.location?.country}`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold text-sm"
                >
                  <FaMapMarkerAlt />
                  View on Google Maps
                </a>
              </div>

              <div className="flex gap-6 mb-6 text-gray-700">
                <div className="flex items-center gap-2">
                  <FaBed className="text-xl" />
                  <span>{property.bedrooms} Bedrooms</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaBath className="text-xl" />
                  <span>{property.bathrooms} Bathrooms</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaUsers className="text-xl" />
                  <span>{property.maxGuests} Guests</span>
                </div>
              </div>

              <div className="mb-6">
                <span className="text-4xl font-bold text-blue-600">₹{property.price}</span>
                <span className="text-gray-600"> / night</span>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg mb-6">
                <h3 className="font-bold mb-3">Book This Property</h3>
                <div className="space-y-3">
                  <input
                    type="date"
                    value={bookingData.checkInDate}
                    onChange={(e) => setBookingData({ ...bookingData, checkInDate: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                    min={new Date().toISOString().split('T')[0]}
                  />
                  <input
                    type="date"
                    value={bookingData.checkOutDate}
                    onChange={(e) => setBookingData({ ...bookingData, checkOutDate: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                    min={bookingData.checkInDate}
                  />
                  <input
                    type="number"
                    value={bookingData.numberOfGuests}
                    onChange={(e) => setBookingData({ ...bookingData, numberOfGuests: e.target.value })}
                    placeholder="Number of guests"
                    min="1"
                    max={property.maxGuests}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  />
                  <button
                    onClick={handleBooking}
                    className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
                  >
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 border-t">
            <h2 className="text-2xl font-bold mb-4">About This Property</h2>
            <p className="text-gray-700 mb-6">{property.description}</p>

            <h3 className="text-xl font-bold mb-3">Amenities</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {property.amenities?.map((amenity, index) => (
                <div key={index} className="bg-gray-100 px-4 py-2 rounded-lg">
                  {amenity}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;