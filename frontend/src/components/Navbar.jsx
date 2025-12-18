import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { FaHome, FaUser, FaSignOutAlt, FaSignInAlt, FaUserPlus, FaBuilding, FaCalendarAlt } from 'react-icons/fa';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <Link to="/home" className="hover:scale-105 transition-transform">
            <div className="flex items-center gap-3 text-3xl font-bold">
              <div className="bg-white text-blue-600 p-2 rounded-lg">
                <FaHome />
              </div>
              <span className="bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
                HomelyHub
              </span>
            </div>
            <div className="text-sm text-white/90 mt-1">Comfort &amp; Care You Can Trust...</div>
          </Link>

          <div className="flex items-center gap-6">
            <Link to="/home" className="hover:text-blue-200 transition font-semibold flex items-center gap-2">
              <FaBuilding />
              <span className="hidden md:inline">Properties</span>
            </Link>

            {user ? (
              <>
                <Link to="/profile" className="hover:text-blue-200 transition font-semibold flex items-center gap-2">
                  <FaUser />
                  <span className="hidden md:inline">Profile</span>
                </Link>

                {user.role === 'host' && (
                  <>
                    <Link to="/my-properties" className="hover:text-blue-200 transition font-semibold hidden lg:flex items-center gap-2">
                      <FaBuilding />
                      My Properties
                    </Link>
                    <Link to="/create-property" className="bg-white text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-50 transition font-semibold shadow-md">
                      + Add Property
                    </Link>
                  </>
                )}

                <Link to="/my-bookings" className="hover:text-blue-200 transition font-semibold flex items-center gap-2">
                  <FaCalendarAlt />
                  <span className="hidden md:inline">Bookings</span>
                </Link>

                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 hover:text-blue-200 transition font-semibold"
                >
                  <FaSignOutAlt />
                  <span className="hidden md:inline">Logout</span>
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="flex items-center gap-2 hover:text-blue-200 transition font-semibold">
                  <FaSignInAlt />
                  <span className="hidden md:inline">Login</span>
                </Link>
                <Link to="/register" className="bg-white text-blue-600 px-6 py-3 rounded-lg hover:bg-blue-50 transition flex items-center gap-2 font-bold shadow-md">
                  <FaUserPlus />
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;