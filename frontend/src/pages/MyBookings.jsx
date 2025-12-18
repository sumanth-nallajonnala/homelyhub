import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../utils/api';
import { FaCalendar, FaUsers, FaMapMarkerAlt } from 'react-icons/fa';

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await api.get('/bookings/my-bookings');
      setBookings(response.data.bookings);
    } catch (error) {
      console.error('Error fetching bookings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelBooking = async (bookingId) => {
    if (window.confirm('Are you sure you want to cancel this booking?')) {
      try {
        await api.delete(`/bookings/${bookingId}`);
        alert('Booking cancelled successfully!');
        fetchBookings();
      } catch (error) {
        console.error('Error cancelling booking:', error);
        alert('Failed to cancel booking');
      }
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl">Loading bookings...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">My Bookings</h1>

        {bookings.length === 0 ? (
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <p className="text-xl text-gray-600 mb-4">You don't have any bookings yet.</p>
            <Link
              to="/"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition inline-block"
            >
              Browse Properties
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {bookings.map((booking) => (
              <div key={booking._id} className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-6">
                  <div className="md:col-span-1">
                    <img
                      src={booking.property?.images?.[0] || 'https://via.placeholder.com/300x200'}
                      alt={booking.property?.title}
                      className="w-full h-48 object-cover rounded-lg"
                    />
                  </div>

                  <div className="md:col-span-3">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-2xl font-bold mb-2">{booking.property?.title}</h3>
                        <div className="flex items-center text-gray-600 mb-2">
                          <FaMapMarkerAlt className="mr-2" />
                          <span>
                            {booking.property?.location?.city}, {booking.property?.location?.country}
                          </span>
                        </div>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(booking.bookingStatus)}`}>
                        {booking.bookingStatus}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <div className="flex items-center text-gray-700 mb-2">
                          <FaCalendar className="mr-2" />
                          <span className="font-semibold">Check-in:</span>
                        </div>
                        <p className="text-gray-600 ml-6">
                          {new Date(booking.checkInDate).toLocaleDateString()}
                        </p>
                      </div>

                      <div>
                        <div className="flex items-center text-gray-700 mb-2">
                          <FaCalendar className="mr-2" />
                          <span className="font-semibold">Check-out:</span>
                        </div>
                        <p className="text-gray-600 ml-6">
                          {new Date(booking.checkOutDate).toLocaleDateString()}
                        </p>
                      </div>

                      <div>
                        <div className="flex items-center text-gray-700 mb-2">
                          <FaUsers className="mr-2" />
                          <span className="font-semibold">Guests:</span>
                        </div>
                        <p className="text-gray-600 ml-6">{booking.numberOfGuests}</p>
                      </div>

                      <div>
                        <div className="text-gray-700 mb-2 font-semibold">Total Price:</div>
                        <p className="text-2xl font-bold text-blue-600 ml-6">₹{booking.totalPrice}</p>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <Link
                        to={`/property/${booking.property?._id}`}
                        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
                      >
                        View Property
                      </Link>

                      {booking.bookingStatus === 'pending' && (
                        <button
                          onClick={() => handleCancelBooking(booking._id)}
                          className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition"
                        >
                          Cancel Booking
                        </button>
                      )}
                    </div>
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

export default MyBookings;