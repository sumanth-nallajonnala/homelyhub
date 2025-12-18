import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import api from '../utils/api';
import { FaUser, FaEnvelope, FaPhone } from 'react-icons/fa';

const Profile = () => {
  const { user, loadUser } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handlePasswordChange = (e) => {
    setPasswordData({
      ...passwordData,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    try {
      await api.put('/users/profile', formData);
      setMessage('Profile updated successfully!');
      loadUser();
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to update profile');
    }
  };

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    try {
      await api.put('/users/password', passwordData);
      setMessage('Password updated successfully!');
      setPasswordData({ currentPassword: '', newPassword: '' });
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to update password');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4 max-w-2xl">
        <h1 className="text-3xl font-bold mb-8">My Profile</h1>

        {message && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
            {message}
          </div>
        )}

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-2xl font-bold mb-4">Update Profile</h2>
          <form onSubmit={handleUpdateProfile}>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Name</label>
              <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2">
                <FaUser className="text-gray-400 mr-2" />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="flex-1 outline-none"
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Email</label>
              <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2">
                <FaEnvelope className="text-gray-400 mr-2" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="flex-1 outline-none"
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Phone</label>
              <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2">
                <FaPhone className="text-gray-400 mr-2" />
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="flex-1 outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
            >
              Update Profile
            </button>
          </form>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-4">Change Password</h2>
          <form onSubmit={handleUpdatePassword}>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Current Password</label>
              <input
                type="password"
                name="currentPassword"
                value={passwordData.currentPassword}
                onChange={handlePasswordChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 mb-2">New Password</label>
              <input
                type="password"
                name="newPassword"
                value={passwordData.newPassword}
                onChange={handlePasswordChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
                required
                minLength="6"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
            >
              Change Password
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;