import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import PropertyCard from '../components/PropertyCard';
import Filter from '../components/Filter';
import api from '../utils/api';

const Home = () => {
  const { user } = useContext(AuthContext);
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({});

  useEffect(() => {
    fetchProperties();
  }, [filters]);

  const fetchProperties = async () => {
    try {
      setLoading(true);
      const queryParams = new URLSearchParams(filters).toString();
      const response = await api.get(`/properties?${queryParams}`);
      setProperties(response.data.properties);
    } catch (error) {
      console.error('Error fetching properties:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilter = (newFilters) => {
    setFilters(newFilters);
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Welcome Banner with Blurry Background */}
      <div className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white overflow-hidden">
        {/* Blurry Background Image */}
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1920')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'blur(8px)',
          }}
        ></div>

        {/* Overlay for better text visibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/50 via-purple-900/50 to-pink-900/50"></div>

        {/* Content */}
        <div className="relative container mx-auto px-4 py-16">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-6 md:mb-0">
              <h1 className="text-4xl md:text-6xl font-bold mb-3 drop-shadow-lg">
                {getGreeting()}, {user?.name || 'Guest'}! 👋
              </h1>
              <p className="text-xl md:text-2xl opacity-90 drop-shadow-md">
                Ready to find your perfect stay?
              </p>
              <p className="text-lg mt-2 opacity-80">
                Explore amazing properties across India
              </p>
            </div>
            <div className="hidden md:block">
              <div className="bg-white/20 backdrop-blur-xl rounded-2xl p-8 text-center border border-white/30 shadow-2xl">
                <div className="text-5xl font-bold mb-2">{properties.length}</div>
                <div className="text-sm uppercase tracking-wider">Properties Available</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <Filter onFilter={handleFilter} />

        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600"></div>
            <p className="text-xl text-gray-600 mt-4">Loading amazing properties...</p>
          </div>
        ) : properties.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl shadow-md">
            <div className="relative w-64 h-64 mx-auto mb-6">
              <div 
                className="absolute inset-0 rounded-full opacity-20"
                style={{
                  backgroundImage: "url('https://images.unsplash.com/photo-1595433707802-6b2626ef1c91?w=400')",
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  filter: 'blur(3px)',
                }}
              ></div>
              <img 
                src="https://images.unsplash.com/photo-1595433707802-6b2626ef1c91?w=400" 
                alt="No results" 
                className="relative w-full h-full object-cover rounded-full opacity-60"
              />
            </div>
            <p className="text-2xl font-semibold text-gray-700 mb-2">No properties found</p>
            <p className="text-gray-600">Try adjusting your filters to see more results</p>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-gray-800">
                Explore Properties
              </h2>
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-full font-semibold shadow-lg">
                {properties.length} Result{properties.length !== 1 ? 's' : ''}
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {properties.map((property) => (
                <PropertyCard key={property._id} property={property} />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Features Section with Background */}
      <div className="relative bg-gradient-to-br from-blue-50 to-purple-50 py-20 mt-16">
        {/* Subtle background pattern */}
        <div 
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1920')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        ></div>

        <div className="relative container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">
            Why Choose HomelyHub?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-8 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all hover:-translate-y-2">
              <div className="bg-gradient-to-r from-blue-500 to-purple-500 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-4xl">🏠</span>
              </div>
              <h3 className="text-xl font-bold mb-3">Unique Properties</h3>
              <p className="text-gray-600">
                From cozy cottages to luxury villas across India's most beautiful destinations
              </p>
            </div>

            <div className="text-center p-8 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all hover:-translate-y-2">
              <div className="bg-gradient-to-r from-green-500 to-teal-500 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-4xl">✓</span>
              </div>
              <h3 className="text-xl font-bold mb-3">Verified Hosts</h3>
              <p className="text-gray-600">
                All our hosts are verified to ensure your safety and comfort during your stay
              </p>
            </div>

            <div className="text-center p-8 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all hover:-translate-y-2">
              <div className="bg-gradient-to-r from-pink-500 to-red-500 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-4xl">💳</span>
              </div>
              <h3 className="text-xl font-bold mb-3">Secure Payments</h3>
              <p className="text-gray-600">
                Book with confidence using our secure payment system and easy cancellation
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;