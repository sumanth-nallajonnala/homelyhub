const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Import models
const User = require('./models/User');
const Property = require('./models/Property');

const sampleProperties = [
  // GOA Properties (5)
  {
    title: 'Luxury Beach Villa - North Goa',
    description: 'Stunning beachfront villa in North Goa with private pool, direct beach access, and panoramic sea views. Perfect for families seeking luxury and relaxation by the Arabian Sea.',
    propertyType: 'villa',
    price: 12000,
    location: {
      address: 'Calangute Beach Road',
      city: 'Goa',
      state: 'Goa',
      country: 'India',
      zipCode: '403516'
    },
    amenities: ['WiFi', 'Pool', 'Beach Access', 'Kitchen', 'Air Conditioning', 'Parking', 'BBQ Area', 'Sea View'],
    images: [
      'https://images.unsplash.com/photo-1602343168117-bb8ffe3e2e9f?w=800',
      'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800'
    ],
    bedrooms: 4,
    bathrooms: 3,
    maxGuests: 8,
    rating: 4.9,
    numReviews: 145
  },
  {
    title: 'Beach House - Palolem Goa',
    description: 'Charming beach house on South Goa\'s most beautiful beach. Perfect for water sports, beach parties, and relaxation. Quiet and peaceful atmosphere.',
    propertyType: 'house',
    price: 6000,
    location: {
      address: 'Palolem Beach Road',
      city: 'Goa',
      state: 'Goa',
      country: 'India',
      zipCode: '403702'
    },
    amenities: ['WiFi', 'Beach Access', 'Kitchen', 'Air Conditioning', 'Sea View', 'Parking', 'Garden'],
    images: [
      'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800',
      'https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=800'
    ],
    bedrooms: 3,
    bathrooms: 2,
    maxGuests: 6,
    rating: 4.7,
    numReviews: 134
  },
  {
    title: 'Portuguese Villa - Old Goa',
    description: 'Heritage Portuguese-style villa with antique furniture and modern amenities. Experience old-world charm near churches and historical sites.',
    propertyType: 'villa',
    price: 8500,
    location: {
      address: 'Old Goa Heritage Area',
      city: 'Goa',
      state: 'Goa',
      country: 'India',
      zipCode: '403402'
    },
    amenities: ['WiFi', 'Air Conditioning', 'Kitchen', 'Garden', 'Parking', 'Historic Architecture'],
    images: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800',
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800'
    ],
    bedrooms: 4,
    bathrooms: 3,
    maxGuests: 8,
    rating: 4.8,
    numReviews: 98
  },
  {
    title: 'Budget Beach Room - Anjuna Goa',
    description: 'Affordable room near famous Anjuna Beach and flea market. Perfect for backpackers and solo travelers. Walking distance to beach clubs.',
    propertyType: 'room',
    price: 1800,
    location: {
      address: 'Anjuna Beach Road',
      city: 'Goa',
      state: 'Goa',
      country: 'India',
      zipCode: '403509'
    },
    amenities: ['WiFi', 'Beach Access', 'Shared Kitchen', 'Air Conditioning', 'Parking'],
    images: [
      'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800',
      'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?w=800'
    ],
    bedrooms: 1,
    bathrooms: 1,
    maxGuests: 2,
    rating: 4.5,
    numReviews: 76
  },
  {
    title: 'Luxury Apartment - Panaji Goa',
    description: 'Modern apartment in Goa\'s capital city with city views. Close to shopping, restaurants, and cultural attractions. Perfect for city explorers.',
    propertyType: 'apartment',
    price: 4500,
    location: {
      address: 'MG Road, Panaji',
      city: 'Goa',
      state: 'Goa',
      country: 'India',
      zipCode: '403001'
    },
    amenities: ['WiFi', 'Air Conditioning', 'Kitchen', 'Balcony', 'City View', 'Parking', 'Elevator'],
    images: [
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800'
    ],
    bedrooms: 2,
    bathrooms: 2,
    maxGuests: 4,
    rating: 4.6,
    numReviews: 112
  },

  // MUNNAR Properties (3)
  {
    title: 'Tea Estate Cottage - Munnar',
    description: 'Cozy cottage surrounded by lush tea plantations in Munnar. Wake up to misty mountains and enjoy fresh tea. Perfect for nature lovers and peace seekers.',
    propertyType: 'cottage',
    price: 4500,
    location: {
      address: 'Tea Estate Road, Pothamedu',
      city: 'Munnar',
      state: 'Kerala',
      country: 'India',
      zipCode: '685612'
    },
    amenities: ['WiFi', 'Mountain View', 'Fireplace', 'Kitchen', 'Garden', 'Parking', 'Tea Plantation Tour'],
    images: [
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800',
      'https://images.unsplash.com/photo-1523217582562-09d0def993a6?w=800'
    ],
    bedrooms: 2,
    bathrooms: 2,
    maxGuests: 4,
    rating: 4.8,
    numReviews: 98
  },
  {
    title: 'Hilltop Resort - Munnar',
    description: 'Luxury resort perched on a hilltop with panoramic valley views. Enjoy tea factory tours, trekking, and stunning sunsets over tea gardens.',
    propertyType: 'villa',
    price: 9500,
    location: {
      address: 'Top Station Road',
      city: 'Munnar',
      state: 'Kerala',
      country: 'India',
      zipCode: '685565'
    },
    amenities: ['WiFi', 'Mountain View', 'Restaurant', 'Room Service', 'Garden', 'Trekking', 'Bonfire'],
    images: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800',
      'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800'
    ],
    bedrooms: 3,
    bathrooms: 3,
    maxGuests: 6,
    rating: 4.9,
    numReviews: 156
  },
  {
    title: 'Budget Homestay - Munnar Town',
    description: 'Affordable homestay in Munnar town center. Experience local Kerala hospitality with home-cooked meals. Great base for exploring attractions.',
    propertyType: 'room',
    price: 2200,
    location: {
      address: 'Main Bazaar Road',
      city: 'Munnar',
      state: 'Kerala',
      country: 'India',
      zipCode: '685612'
    },
    amenities: ['WiFi', 'Breakfast Included', 'Shared Kitchen', 'Mountain View', 'Parking'],
    images: [
      'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800',
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800'
    ],
    bedrooms: 1,
    bathrooms: 1,
    maxGuests: 2,
    rating: 4.5,
    numReviews: 67
  },

  // KOCHI Properties (3)
  {
    title: 'Modern Fort View Apartment - Kochi',
    description: 'Stylish apartment near Fort Kochi with views of historic sites. Walking distance to Chinese fishing nets, spice markets, and cafes. Perfect for culture enthusiasts.',
    propertyType: 'apartment',
    price: 3500,
    location: {
      address: 'Princess Street, Fort Kochi',
      city: 'Kochi',
      state: 'Kerala',
      country: 'India',
      zipCode: '682001'
    },
    amenities: ['WiFi', 'Air Conditioning', 'Kitchen', 'Balcony', 'City View', 'Parking'],
    images: [
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800'
    ],
    bedrooms: 2,
    bathrooms: 2,
    maxGuests: 4,
    rating: 4.7,
    numReviews: 112
  },
  {
    title: 'Heritage Home - Mattancherry Kochi',
    description: 'Traditional Kerala home in Mattancherry\'s heritage area. Experience authentic architecture near synagogue and spice markets.',
    propertyType: 'house',
    price: 5500,
    location: {
      address: 'Jew Town Road, Mattancherry',
      city: 'Kochi',
      state: 'Kerala',
      country: 'India',
      zipCode: '682002'
    },
    amenities: ['WiFi', 'Air Conditioning', 'Kitchen', 'Courtyard', 'Traditional Decor', 'Parking'],
    images: [
      'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800',
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800'
    ],
    bedrooms: 3,
    bathrooms: 2,
    maxGuests: 6,
    rating: 4.8,
    numReviews: 134
  },
  {
    title: 'Marine Drive Apartment - Kochi',
    description: 'Modern apartment on Marine Drive with stunning backwater views. Watch sunset over the harbor from your balcony. Close to shopping and dining.',
    propertyType: 'apartment',
    price: 4800,
    location: {
      address: 'Marine Drive, Ernakulam',
      city: 'Kochi',
      state: 'Kerala',
      country: 'India',
      zipCode: '682031'
    },
    amenities: ['WiFi', 'Air Conditioning', 'Kitchen', 'Balcony', 'Sea View', 'Parking', 'Gym'],
    images: [
      'https://images.unsplash.com/photo-1536376072261-38c75010e6c9?w=800',
      'https://images.unsplash.com/photo-1484101403633-562f891dc89a?w=800'
    ],
    bedrooms: 2,
    bathrooms: 2,
    maxGuests: 4,
    rating: 4.7,
    numReviews: 98
  },

  // ALLEPPEY Properties (3)
  {
    title: 'Heritage Houseboat - Alleppey',
    description: 'Traditional Kerala houseboat experience in the famous Alleppey backwaters. Cruise through serene canals with chef-prepared meals and stunning sunset views.',
    propertyType: 'house',
    price: 8500,
    location: {
      address: 'Finishing Point, Backwater',
      city: 'Alappuzha',
      state: 'Kerala',
      country: 'India',
      zipCode: '688013'
    },
    amenities: ['WiFi', 'Kitchen', 'Air Conditioning', 'Backwater View', 'Chef Service', 'Boat Cruise'],
    images: [
      'https://images.unsplash.com/photo-1605640840605-14ac1855827b?w=800',
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800'
    ],
    bedrooms: 3,
    bathrooms: 2,
    maxGuests: 6,
    rating: 4.9,
    numReviews: 187
  },
  {
    title: 'Lakeside Villa - Alleppey',
    description: 'Beautiful villa on the edge of Vembanad Lake. Enjoy kayaking, fishing, and bird watching. Perfect for peaceful family getaways.',
    propertyType: 'villa',
    price: 7500,
    location: {
      address: 'Punnamada Lake Road',
      city: 'Alappuzha',
      state: 'Kerala',
      country: 'India',
      zipCode: '688006'
    },
    amenities: ['WiFi', 'Lake View', 'Kitchen', 'Garden', 'Kayaking', 'Fishing', 'Parking'],
    images: [
      'https://images.unsplash.com/photo-1499696010180-025ef6e1a8f9?w=800',
      'https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=800'
    ],
    bedrooms: 4,
    bathrooms: 3,
    maxGuests: 8,
    rating: 4.8,
    numReviews: 143
  },
  {
    title: 'Beach Cottage - Alleppey',
    description: 'Cozy cottage near Alleppey Beach with ocean breeze and sunset views. Short walk to beach and local seafood restaurants.',
    propertyType: 'cottage',
    price: 3800,
    location: {
      address: 'Alleppey Beach Road',
      city: 'Alappuzha',
      state: 'Kerala',
      country: 'India',
      zipCode: '688012'
    },
    amenities: ['WiFi', 'Beach Access', 'Kitchen', 'Garden', 'Sea Breeze', 'Parking'],
    images: [
      'https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800',
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800'
    ],
    bedrooms: 2,
    bathrooms: 1,
    maxGuests: 4,
    rating: 4.6,
    numReviews: 89
  },

  // JAIPUR Properties (4)
  {
    title: 'Heritage Haveli - Jaipur',
    description: 'Traditional Rajasthani haveli converted into luxury accommodation. Experience royal living with modern comforts near City Palace and Hawa Mahal.',
    propertyType: 'house',
    price: 10000,
    location: {
      address: 'MI Road, Near City Palace',
      city: 'Jaipur',
      state: 'Rajasthan',
      country: 'India',
      zipCode: '302002'
    },
    amenities: ['WiFi', 'Air Conditioning', 'Kitchen', 'Courtyard', 'Traditional Decor', 'Parking', 'Rooftop'],
    images: [
      'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800',
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800'
    ],
    bedrooms: 5,
    bathrooms: 4,
    maxGuests: 10,
    rating: 4.9,
    numReviews: 178
  },
  {
    title: 'Modern Apartment - Jaipur',
    description: 'Contemporary apartment in C-Scheme area with all modern amenities. Close to shopping malls, restaurants, and business district.',
    propertyType: 'apartment',
    price: 4200,
    location: {
      address: 'C-Scheme, Ashok Nagar',
      city: 'Jaipur',
      state: 'Rajasthan',
      country: 'India',
      zipCode: '302001'
    },
    amenities: ['WiFi', 'Air Conditioning', 'Kitchen', 'Elevator', 'Parking', 'Security'],
    images: [
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800',
      'https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=800'
    ],
    bedrooms: 2,
    bathrooms: 2,
    maxGuests: 4,
    rating: 4.6,
    numReviews: 102
  },
  {
    title: 'Budget Room - Jaipur Old City',
    description: 'Affordable room in the heart of Pink City. Walking distance to Hawa Mahal, City Palace, and local markets. Perfect for budget travelers.',
    propertyType: 'room',
    price: 1500,
    location: {
      address: 'Johari Bazaar, Old City',
      city: 'Jaipur',
      state: 'Rajasthan',
      country: 'India',
      zipCode: '302003'
    },
    amenities: ['WiFi', 'Air Conditioning', 'Shared Kitchen', 'Rooftop', 'City View'],
    images: [
      'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800',
      'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?w=800'
    ],
    bedrooms: 1,
    bathrooms: 1,
    maxGuests: 2,
    rating: 4.4,
    numReviews: 87
  },
  {
    title: 'Luxury Villa - Jaipur Outskirts',
    description: 'Spacious villa with private pool on the outskirts of Jaipur. Enjoy peaceful surroundings while being close to major attractions.',
    propertyType: 'villa',
    price: 12000,
    location: {
      address: 'Ajmer Road, Near Jawahar Circle',
      city: 'Jaipur',
      state: 'Rajasthan',
      country: 'India',
      zipCode: '302006'
    },
    amenities: ['WiFi', 'Pool', 'Garden', 'Kitchen', 'Air Conditioning', 'Parking', 'Security'],
    images: [
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800'
    ],
    bedrooms: 5,
    bathrooms: 4,
    maxGuests: 10,
    rating: 4.9,
    numReviews: 167
  },

  // UDAIPUR Properties (3)
  {
    title: 'Palace View Villa - Udaipur',
    description: 'Luxurious villa with stunning Lake Pichola and City Palace views. Experience royal Rajasthani hospitality with modern amenities and rooftop dining.',
    propertyType: 'villa',
    price: 15000,
    location: {
      address: 'Lake Palace Road, Pichola',
      city: 'Udaipur',
      state: 'Rajasthan',
      country: 'India',
      zipCode: '313001'
    },
    amenities: ['WiFi', 'Pool', 'Lake View', 'Kitchen', 'Air Conditioning', 'Rooftop Terrace', 'Butler Service'],
    images: [
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800',
      'https://images.unsplash.com/photo-1615880484746-a134be9a6ecf?w=800'
    ],
    bedrooms: 5,
    bathrooms: 4,
    maxGuests: 10,
    rating: 5.0,
    numReviews: 201
  },
  {
    title: 'Lakeside Hotel Room - Udaipur',
    description: 'Comfortable hotel room with Lake Fateh Sagar views. Rooftop restaurant, swimming pool, and easy access to tourist attractions.',
    propertyType: 'room',
    price: 3500,
    location: {
      address: 'Fateh Sagar Lake Road',
      city: 'Udaipur',
      state: 'Rajasthan',
      country: 'India',
      zipCode: '313001'
    },
    amenities: ['WiFi', 'Lake View', 'Restaurant', 'Pool', 'Room Service', 'Parking'],
    images: [
      'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800',
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800'
    ],
    bedrooms: 1,
    bathrooms: 1,
    maxGuests: 2,
    rating: 4.7,
    numReviews: 134
  },
  {
    title: 'Heritage Haveli - Udaipur Old City',
    description: 'Restored haveli in the old city with traditional Rajasthani architecture. Courtyard, fountain, and authentic cultural experience.',
    propertyType: 'house',
    price: 8500,
    location: {
      address: 'Old City, Near Jagdish Temple',
      city: 'Udaipur',
      state: 'Rajasthan',
      country: 'India',
      zipCode: '313001'
    },
    amenities: ['WiFi', 'Air Conditioning', 'Courtyard', 'Traditional Decor', 'Rooftop', 'Breakfast Included'],
    images: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800',
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800'
    ],
    bedrooms: 4,
    bathrooms: 3,
    maxGuests: 8,
    rating: 4.8,
    numReviews: 156
  },

  // MANALI Properties (3)
  {
    title: 'Mountain View Room - Old Manali',
    description: 'Cozy room with breathtaking Himalayan views in Old Manali. Close to cafes, adventure activities, and shopping. Budget-friendly option for solo travelers.',
    propertyType: 'room',
    price: 2000,
    location: {
      address: 'Old Manali Road',
      city: 'Manali',
      state: 'Himachal Pradesh',
      country: 'India',
      zipCode: '175131'
    },
    amenities: ['WiFi', 'Mountain View', 'Shared Kitchen', 'Heating', 'Hot Water'],
    images: [
      'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800',
      'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800'
    ],
    bedrooms: 1,
    bathrooms: 1,
    maxGuests: 2,
    rating: 4.6,
    numReviews: 89
  },
  {
    title: 'Riverside Cottage - Manali',
    description: 'Charming cottage by the Beas River with apple orchards. Perfect for couples and families seeking tranquility and nature.',
    propertyType: 'cottage',
    price: 5500,
    location: {
      address: 'Naggar Road, Near Beas River',
      city: 'Manali',
      state: 'Himachal Pradesh',
      country: 'India',
      zipCode: '175143'
    },
    amenities: ['WiFi', 'River View', 'Kitchen', 'Garden', 'Bonfire', 'Parking', 'Heating'],
    images: [
      'https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800',
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800'
    ],
    bedrooms: 2,
    bathrooms: 2,
    maxGuests: 4,
    rating: 4.8,
    numReviews: 145
  },
  {
    title: 'Luxury Snow View Villa - Manali',
    description: 'Premium villa with panoramic snow-capped mountain views. Private garden, modern amenities, and close to Solang Valley.',
    propertyType: 'villa',
    price: 10000,
    location: {
      address: 'Solang Valley Road',
      city: 'Manali',
      state: 'Himachal Pradesh',
      country: 'India',
      zipCode: '175103'
    },
    amenities: ['WiFi', 'Mountain View', 'Kitchen', 'Fireplace', 'Garden', 'Parking', 'Heating', 'Valley View'],
    images: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800'
    ],
    bedrooms: 4,
    bathrooms: 3,
    maxGuests: 8,
    rating: 4.9,
    numReviews: 178
  },

  // RISHIKESH Properties (3)
  {
    title: 'Riverside Cottage - Rishikesh',
    description: 'Peaceful cottage on the banks of the Ganges River. Perfect for yoga retreats, meditation, and adventure sports. Wake up to the sound of flowing water.',
    propertyType: 'cottage',
    price: 5000,
    location: {
      address: 'Laxman Jhula Road',
      city: 'Rishikesh',
      state: 'Uttarakhand',
      country: 'India',
      zipCode: '249302'
    },
    amenities: ['WiFi', 'River View', 'Yoga Space', 'Garden', 'Kitchen', 'Bonfire Area', 'Parking'],
    images: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800',
      'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800'
    ],
    bedrooms: 3,
    bathrooms: 2,
    maxGuests: 6,
    rating: 4.8,
    numReviews: 134
  },
  {
    title: 'Yoga Retreat Villa - Rishikesh',
    description: 'Dedicated yoga retreat property with meditation hall, organic meals, and Ganga views. Perfect for spiritual seekers and wellness enthusiasts.',
    propertyType: 'villa',
    price: 8500,
    location: {
      address: 'Tapovan, Near Ram Jhula',
      city: 'Rishikesh',
      state: 'Uttarakhand',
      country: 'India',
      zipCode: '249192'
    },
    amenities: ['WiFi', 'Yoga Hall', 'Organic Meals', 'River View', 'Garden', 'Meditation Space', 'Parking'],
    images: [
      'https://images.unsplash.com/photo-1588416936097-41850ab3d86d?w=800',
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800'
    ],
    bedrooms: 6,
    bathrooms: 5,
    maxGuests: 12,
    rating: 4.9,
    numReviews: 201
  },
  {
    title: 'Budget Hostel Room - Rishikesh',
    description: 'Affordable hostel near Laxman Jhula bridge. Meet fellow travelers, join group activities, and explore Rishikesh on a budget.',
    propertyType: 'room',
    price: 800,
    location: {
      address: 'Laxman Jhula Market',
      city: 'Rishikesh',
      state: 'Uttarakhand',
      country: 'India',
      zipCode: '249302'
    },
    amenities: ['WiFi', 'Shared Kitchen', 'Common Area', 'River View', 'Lockers'],
    images: [
      'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800',
      'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?w=800'
    ],
    bedrooms: 1,
    bathrooms: 1,
    maxGuests: 2,
    rating: 4.4,
    numReviews: 98
  },

  // SHIMLA Properties (2)
  {
    title: 'Hilltop Villa - Shimla',
    description: 'Colonial-era villa with panoramic Himalayan views. Close to Mall Road, Ridge, and historic sites. Experience British-era charm with modern amenities.',
    propertyType: 'villa',
    price: 8000,
    location: {
      address: 'Jakhu Hill Road',
      city: 'Shimla',
      state: 'Himachal Pradesh',
      country: 'India',
      zipCode: '171001'
    },
    amenities: ['WiFi', 'Mountain View', 'Fireplace', 'Kitchen', 'Heating', 'Garden', 'Parking'],
    images: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800'
    ],
    bedrooms: 4,
    bathrooms: 3,
    maxGuests: 8,
    rating: 4.9,
    numReviews: 189
  },
  {
    title: 'Mall Road Apartment - Shimla',
    description: 'Centrally located apartment on Mall Road with mountain views. Walk to shops, restaurants, and the Ridge. Perfect for shoppers and food lovers.',
    propertyType: 'apartment',
    price: 4500,
    location: {
      address: 'The Mall, Near Christ Church',
      city: 'Shimla',
      state: 'Himachal Pradesh',
      country: 'India',
      zipCode: '171001'
    },
    amenities: ['WiFi', 'Mountain View', 'Kitchen', 'Heating', 'Central Location', 'Parking'],
    images: [
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800'
    ],
    bedrooms: 2,
    bathrooms: 2,
    maxGuests: 4,
    rating: 4.7,
    numReviews: 123
  },

  // COORG Properties (2)
  {
    title: 'Valley View Cottage - Coorg',
    description: 'Serene cottage amidst coffee plantations in Scotland of India. Perfect for couples seeking romance, nature walks, and coffee tasting experiences.',
    propertyType: 'cottage',
    price: 5500,
    location: {
      address: 'Madikeri-Somwarpet Road',
      city: 'Coorg',
      state: 'Karnataka',
      country: 'India',
      zipCode: '571201'
    },
    amenities: ['WiFi', 'Valley View', 'Garden', 'Kitchen', 'Bonfire', 'Coffee Plantation Tour', 'Parking'],
    images: [
      'https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800',
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800'
    ],
    bedrooms: 2,
    bathrooms: 2,
    maxGuests: 4,
    rating: 4.8,
    numReviews: 119
  },
  {
    title: 'Coffee Estate Villa - Coorg',
    description: 'Luxury villa in the heart of coffee plantations with private pool. Experience plantation life with guided tours and fresh coffee.',
    propertyType: 'villa',
    price: 11000,
    location: {
      address: 'Pollibetta Coffee Estate',
      city: 'Coorg',
      state: 'Karnataka',
      country: 'India',
      zipCode: '571215'
    },
    amenities: ['WiFi', 'Pool', 'Coffee Plantation', 'Kitchen', 'Garden', 'Plantation Tour', 'Parking'],
    images: [
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800'
    ],
    bedrooms: 4,
    bathrooms: 3,
    maxGuests: 8,
    rating: 4.9,
    numReviews: 187
  },

  // OOTY Properties (2)
  {
    title: 'Colonial Bungalow - Ooty',
    description: 'Charming colonial-era bungalow surrounded by tea gardens and eucalyptus forests. Enjoy cool weather, beautiful gardens, and old-world charm.',
    propertyType: 'house',
    price: 6500,
    location: {
      address: 'Fern Hill, Upper Ooty',
      city: 'Ooty',
      state: 'Tamil Nadu',
      country: 'India',
      zipCode: '643004'
    },
    amenities: ['WiFi', 'Garden', 'Fireplace', 'Kitchen', 'Valley View', 'Parking', 'Heating'],
    images: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800'
    ],
    bedrooms: 4,
    bathrooms: 3,
    maxGuests: 8,
    rating: 4.7,
    numReviews: 123
  },
  {
    title: 'Lake View Cottage - Ooty',
    description: 'Cozy cottage overlooking Ooty Lake with mountain backdrop. Perfect for honeymooners and families. Walking distance to boat house.',
    propertyType: 'cottage',
    price: 4800,
    location: {
      address: 'Ooty Lake Road',
      city: 'Ooty',
      state: 'Tamil Nadu',
      country: 'India',
      zipCode: '643001'
    },
    amenities: ['WiFi', 'Lake View', 'Fireplace', 'Kitchen', 'Garden', 'Parking', 'Heating'],
    images: [
      'https://images.unsplash.com/photo-1499696010180-025ef6e1a8f9?w=800',
      'https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=800'
    ],
    bedrooms: 2,
    bathrooms: 2,
    maxGuests: 4,
    rating: 4.6,
    numReviews: 98
  },

  // PONDICHERRY Properties (2)
  {
    title: 'Luxury Apartment - Pondicherry',
    description: 'French colonial-style apartment in White Town. Experience the unique blend of French and Tamil culture. Walking distance to Promenade Beach and cafes.',
    propertyType: 'apartment',
    price: 4500,
    location: {
      address: 'Rue Suffren, White Town',
      city: 'Pondicherry',
      state: 'Puducherry',
      country: 'India',
      zipCode: '605001'
    },
    amenities: ['WiFi', 'Air Conditioning', 'Kitchen', 'Balcony', 'Beach Access', 'Parking'],
    images: [
      'https://images.unsplash.com/photo-1536376072261-38c75010e6c9?w=800',
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800'
    ],
    bedrooms: 2,
    bathrooms: 2,
    maxGuests: 4,
    rating: 4.8,
    numReviews: 156
  },
  {
    title: 'Beach Villa - Pondicherry',
    description: 'Private villa near Auroville with beach access. Perfect for meditation, yoga, and beach lovers. Quiet and peaceful atmosphere.',
    propertyType: 'villa',
    price: 9500,
    location: {
      address: 'Auroville Beach Road',
      city: 'Pondicherry',
      state: 'Puducherry',
      country: 'India',
      zipCode: '605101'
    },
    amenities: ['WiFi', 'Beach Access', 'Pool', 'Kitchen', 'Garden', 'Yoga Space', 'Parking'],
    images: [
      'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800',
      'https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=800'
    ],
    bedrooms: 3,
    bathrooms: 3,
    maxGuests: 6,
    rating: 4.9,
    numReviews: 176
  },

  // KODAIKANAL Properties (2)
  {
    title: 'Lakeside Resort - Kodaikanal',
    description: 'Beautiful resort overlooking Kodaikanal Lake. Enjoy boating, eucalyptus forest walks, and cool mountain weather. Perfect for family vacations.',
    propertyType: 'house',
    price: 7000,
    location: {
      address: 'Lake View Road',
      city: 'Kodaikanal',
      state: 'Tamil Nadu',
      country: 'India',
      zipCode: '624101'
    },
    amenities: ['WiFi', 'Lake View', 'Garden', 'Kitchen', 'Fireplace', 'Parking', 'Valley View'],
    images: [
      'https://images.unsplash.com/photo-1499696010180-025ef6e1a8f9?w=800',
      'https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=800'
    ],
    bedrooms: 4,
    bathrooms: 3,
    maxGuests: 8,
    rating: 4.7,
    numReviews: 145
  },
  {
    title: 'Forest Cottage - Kodaikanal',
    description: 'Secluded cottage in pine forest with mountain views. Perfect for nature lovers seeking peace and tranquility. Great for bird watching.',
    propertyType: 'cottage',
    price: 5200,
    location: {
      address: 'Coaker Walk',
      city: 'Kodaikanal',
      state: 'Tamil Nadu',
      country: 'India',
      zipCode: '624101'
    },
    amenities: ['WiFi', 'Forest View', 'Fireplace', 'Kitchen', 'Garden', 'Parking', 'Heating'],
    images: [
      'https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800',
      'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800'
    ],
    bedrooms: 2,
    bathrooms: 2,
    maxGuests: 4,
    rating: 4.8,
    numReviews: 102
  },

  // LEH Properties (2)
  {
    title: 'Monastery View Room - Leh',
    description: 'Cozy room with stunning views of ancient monasteries and snow-capped mountains. Experience Ladakhi culture and hospitality at its best.',
    propertyType: 'room',
    price: 2500,
    location: {
      address: 'Old Leh Road',
      city: 'Leh',
      state: 'Ladakh',
      country: 'India',
      zipCode: '194101'
    },
    amenities: ['WiFi', 'Mountain View', 'Heating', 'Shared Kitchen', 'Hot Water', 'Parking'],
    images: [
      'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800',
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800'
    ],
    bedrooms: 1,
    bathrooms: 1,
    maxGuests: 2,
    rating: 4.8,
    numReviews: 201
  },
  {
    title: 'Luxury Hotel - Leh',
    description: 'Premium hotel with modern amenities and traditional Ladakhi architecture. Oxygen supply in rooms, restaurant, and tour desk.',
    propertyType: 'apartment',
    price: 7500,
    location: {
      address: 'Fort Road, Near Leh Palace',
      city: 'Leh',
      state: 'Ladakh',
      country: 'India',
      zipCode: '194101'
    },
    amenities: ['WiFi', 'Mountain View', 'Restaurant', 'Oxygen Supply', 'Heating', 'Tour Desk', 'Parking'],
    images: [
      'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800',
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800'
    ],
    bedrooms: 2,
    bathrooms: 2,
    maxGuests: 4,
    rating: 4.9,
    numReviews: 234
  },

  // JAISALMER Properties (2)
  {
    title: 'Desert Camp Villa - Jaisalmer',
    description: 'Luxury desert camp with traditional Rajasthani architecture. Experience camel safaris, cultural performances, and starlit dinners in the Thar Desert.',
    propertyType: 'villa',
    price: 9000,
    location: {
      address: 'Sam Sand Dunes',
      city: 'Jaisalmer',
      state: 'Rajasthan',
      country: 'India',
      zipCode: '345001'
    },
    amenities: ['WiFi', 'Desert View', 'Cultural Shows', 'Kitchen', 'Air Conditioning', 'Camel Safari', 'Bonfire'],
    images: [
      'https://images.unsplash.com/photo-1609137144813-7d9921338f24?w=800',
      'https://images.unsplash.com/photo-1545158535-c3f7168c28b6?w=800'
    ],
    bedrooms: 4,
    bathrooms: 3,
    maxGuests: 8,
    rating: 4.9,
    numReviews: 156
  },
  {
    title: 'Fort View Haveli - Jaisalmer',
    description: 'Traditional haveli with views of Jaisalmer Fort. Rooftop restaurant, traditional decor, and cultural performances. Walking distance to fort.',
    propertyType: 'house',
    price: 6500,
    location: {
      address: 'Near Fort Gate, Old City',
      city: 'Jaisalmer',
      state: 'Rajasthan',
      country: 'India',
      zipCode: '345001'
    },
    amenities: ['WiFi', 'Fort View', 'Rooftop Restaurant', 'Traditional Decor', 'Air Conditioning', 'Cultural Shows'],
    images: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800',
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800'
    ],
    bedrooms: 3,
    bathrooms: 2,
    maxGuests: 6,
    rating: 4.8,
    numReviews: 143
  },

  // VARKALA Properties (2)
  {
    title: 'Beachfront Villa - Varkala',
    description: 'Stunning cliffside villa overlooking Varkala Beach. Watch surfers, enjoy Ayurvedic spas nearby, and experience Kerala beach culture.',
    propertyType: 'villa',
    price: 11000,
    location: {
      address: 'North Cliff, Varkala Beach',
      city: 'Varkala',
      state: 'Kerala',
      country: 'India',
      zipCode: '695141'
    },
    amenities: ['WiFi', 'Sea View', 'Pool', 'Kitchen', 'Air Conditioning', 'Cliff View', 'Yoga Space'],
    images: [
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800'
    ],
    bedrooms: 4,
    bathrooms: 3,
    maxGuests: 8,
    rating: 4.9,
    numReviews: 143
  },
  {
    title: 'Beach Cottage - Varkala',
    description: 'Simple beach cottage on the cliff with direct beach access. Watch stunning sunsets and enjoy fresh seafood from cliff restaurants.',
    propertyType: 'cottage',
    price: 4200,
    location: {
      address: 'South Cliff, Varkala',
      city: 'Varkala',
      state: 'Kerala',
      country: 'India',
      zipCode: '695141'
    },
    amenities: ['WiFi', 'Beach Access', 'Sea View', 'Kitchen', 'Garden', 'Cliff View'],
    images: [
      'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800',
      'https://images.unsplash.com/photo-1540541338287-41700207dee6?w=800'
    ],
    bedrooms: 2,
    bathrooms: 1,
    maxGuests: 4,
    rating: 4.6,
    numReviews: 98
  },

  // GOKARNA Properties (2)
  {
    title: 'Beach Shack - Gokarna',
    description: 'Rustic beach shack on peaceful Om Beach. Perfect for backpackers and beach lovers. Fall asleep to the sound of waves and enjoy stunning sunsets.',
    propertyType: 'cottage',
    price: 3000,
    location: {
      address: 'Om Beach Road',
      city: 'Gokarna',
      state: 'Karnataka',
      country: 'India',
      zipCode: '581326'
    },
    amenities: ['WiFi', 'Beach Access', 'Sea View', 'Shared Kitchen', 'Hammocks', 'Bonfire Area'],
    images: [
      'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800',
      'https://images.unsplash.com/photo-1540541338287-41700207dee6?w=800'
    ],
    bedrooms: 2,
    bathrooms: 1,
    maxGuests: 4,
    rating: 4.5,
    numReviews: 92
  },
  {
    title: 'Beachfront Cottage - Gokarna',
    description: 'Private cottage on Kudle Beach with panoramic sea views. Perfect for couples and yoga enthusiasts. Peaceful and serene atmosphere.',
    propertyType: 'cottage',
    price: 5500,
    location: {
      address: 'Kudle Beach Road',
      city: 'Gokarna',
      state: 'Karnataka',
      country: 'India',
      zipCode: '581326'
    },
    amenities: ['WiFi', 'Beach Access', 'Sea View', 'Kitchen', 'Garden', 'Yoga Space', 'Parking'],
    images: [
      'https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800',
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800'
    ],
    bedrooms: 2,
    bathrooms: 2,
    maxGuests: 4,
    rating: 4.7,
    numReviews: 123
  },

  // NAINITAL Properties (2)
  {
    title: 'Lake View Apartment - Nainital',
    description: 'Modern apartment overlooking Naini Lake in the heart of town. Mall Road shopping, boating, and mountain views. Ideal for families and couples.',
    propertyType: 'apartment',
    price: 4000,
    location: {
      address: 'The Mall Road',
      city: 'Nainital',
      state: 'Uttarakhand',
      country: 'India',
      zipCode: '263001'
    },
    amenities: ['WiFi', 'Lake View', 'Kitchen', 'Heating', 'Balcony', 'Parking'],
    images: [
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800',
      'https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=800'
    ],
    bedrooms: 3,
    bathrooms: 2,
    maxGuests: 6,
    rating: 4.8,
    numReviews: 167
  },
  {
    title: 'Hilltop Villa - Nainital',
    description: 'Spacious villa on a hilltop with 360-degree mountain views. Private garden, bonfire area, and close to Naina Peak. Perfect for large groups.',
    propertyType: 'villa',
    price: 9000,
    location: {
      address: 'Ayarpatta Slopes',
      city: 'Nainital',
      state: 'Uttarakhand',
      country: 'India',
      zipCode: '263002'
    },
    amenities: ['WiFi', 'Mountain View', 'Garden', 'Kitchen', 'Bonfire', 'Parking', 'Heating'],
    images: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800'
    ],
    bedrooms: 5,
    bathrooms: 4,
    maxGuests: 10,
    rating: 4.9,
    numReviews: 187
  },

  // ATHIRAPPILLY Property (1)
  {
    title: 'Waterfall Villa - Athirappilly',
    description: 'Luxury villa near the spectacular Athirappilly Waterfalls. Wake up to the sound of cascading water surrounded by lush rainforest. Nature lover\'s paradise.',
    propertyType: 'villa',
    price: 13000,
    location: {
      address: 'Athirappilly Waterfalls Road',
      city: 'Thrissur',
      state: 'Kerala',
      country: 'India',
      zipCode: '680721'
    },
    amenities: ['WiFi', 'Waterfall View', 'Pool', 'Kitchen', 'Air Conditioning', 'Garden', 'Nature Trails'],
    images: [
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800'
    ],
    bedrooms: 5,
    bathrooms: 4,
    maxGuests: 10,
    rating: 5.0,
    numReviews: 167
  }
];

const seedDatabase = async () => {
  try {
    console.log('Attempting to connect to MongoDB...');
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ MongoDB Connected Successfully!');

    // Find or create a host user
    console.log('Looking for demo host...');
    let host = await User.findOne({ email: 'host@homelyhub.com' });
    
    if (!host) {
      console.log('Creating demo host...');
      host = await User.create({
        name: 'Demo Host',
        email: 'host@homelyhub.com',
        password: 'password123',
        phone: '1234567890',
        role: 'host'
      });
      console.log('✅ Demo host created successfully!');
    } else {
      console.log('✅ Demo host already exists!');
    }

    // Clear existing properties
    console.log('Clearing existing properties...');
    const deleteResult = await Property.deleteMany({});
    console.log(`✅ Deleted ${deleteResult.deletedCount} existing properties`);

    // Add host ID to all properties and insert
    console.log('Adding sample properties...');
    const propertiesWithHost = sampleProperties.map(prop => ({
      ...prop,
      host: host._id
    }));

    const insertedProperties = await Property.insertMany(propertiesWithHost);
    console.log(`✅ ${insertedProperties.length} sample properties added successfully!`);

    console.log('\n🎉 Seed script completed successfully!');
    console.log(`Total properties in database: ${insertedProperties.length}`);
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    console.error('Error details:', error.message);
    process.exit(1);
  }
};

console.log('Starting seed script...');
seedDatabase();