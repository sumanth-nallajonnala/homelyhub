import React from 'react';
import { Link } from 'react-router-dom';
import { FaBed, FaBath, FaUsers, FaMapMarkerAlt, FaStar } from 'react-icons/fa';

const PropertyCard = ({ property }) => {
  const imageUrl = property.images && property.images.length > 0
    ? property.images[0]
    : 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=500';

  return (
    <Link to={`/property/${property._id}`} className="group">
      <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
        {/* Image with overlay effect */}
        <div className="relative h-56 overflow-hidden">
          <img 
            src={imageUrl} 
            alt={property.title} 
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" 
          />
          <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full shadow-lg">
            <span className="text-blue-600 font-bold capitalize">{property.propertyType}</span>
          </div>
          {property.rating > 0 && (
            <div className="absolute top-4 left-4 bg-white px-3 py-1 rounded-full shadow-lg flex items-center gap-1">
              <FaStar className="text-yellow-500" />
              <span className="font-bold">{property.rating}</span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-5">
          <h3 className="text-xl font-bold mb-2 truncate group-hover:text-blue-600 transition">
            {property.title}
          </h3>

          <div className="flex items-center text-gray-500 mb-3 text-sm">
            <FaMapMarkerAlt className="mr-2 text-blue-600" />
            <span className="truncate">
              {property.location?.city}, {property.location?.country}
            </span>
          </div>

          <div className="flex items-center justify-between text-gray-600 mb-4 text-sm border-t border-gray-100 pt-3">
            <div className="flex items-center gap-1">
              <FaBed className="text-blue-600" />
              <span>{property.bedrooms}</span>
            </div>
            <div className="flex items-center gap-1">
              <FaBath className="text-blue-600" />
              <span>{property.bathrooms}</span>
            </div>
            <div className="flex items-center gap-1">
              <FaUsers className="text-blue-600" />
              <span>{property.maxGuests}</span>
            </div>
          </div>

          <div className="flex items-center justify-between border-t border-gray-100 pt-3">
            <div>
              <span className="text-3xl font-bold text-blue-600">₹{property.price}</span>
              <span className="text-gray-500 text-sm"> / night</span>
            </div>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition text-sm font-semibold">
              View Details
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PropertyCard;