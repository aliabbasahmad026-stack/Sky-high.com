
import { MenuItem, Review, GalleryItem, RestaurantInfo } from './types';

export const INITIAL_INFO: RestaurantInfo = {
  name: "Sky High",
  tagline: "Where Taste Meets Tradition.",
  description: "Experience the pinnacle of dining in Haridwar. Sky High combines a luxurious rooftop atmosphere with a menu that celebrates authentic flavors and modern culinary artistry. Located in Shivalik Nagar, we offer a perfect blend of ambiance, taste, and hospitality.",
  address: "3rd Floor, S 40, S Block, S Cluster, Shivalik Nagar, Haridwar, Bharat Heavy Electrical Limited Ran, Uttarakhand 249403",
  phone: "078400 47736",
  email: "contact@skyhigh-haridwar.com",
  mapLink: "https://maps.app.goo.gl/LGrhqGD6AdGa8S417",
  whatsapp: "917840047736",
  openingHours: [
    "Mon: 11:00 AM – 12:30 AM",
    "Tue: 11:00 AM – 12:30 AM",
    "Wed: 11:00 AM – 12:30 AM",
    "Thu: 11:00 AM – 12:30 AM",
    "Fri: 11:00 AM – 12:30 AM",
    "Sat: 11:00 AM – 12:30 AM",
    "Sun: 11:00 AM – 12:30 AM"
  ],
  socials: {
    instagram: "https://www.instagram.com/parieventsharidwar?igsh=YXlidmF4ZXA4bmZ6",
    facebook: "https://www.facebook.com/paricaterershwr"
  },
  highlights: [
    "Rooftop Seating",
    "Outdoor Dining",
    "Great Coffee & Tea",
    "Private Dining Room",
    "Vegetarian & Vegan Options",
    "Free Parking",
    "Late-night Food",
    "Family Friendly"
  ],
  bannerImage: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=1920"
};

export const INITIAL_MENU: MenuItem[] = [
  {
    id: '1',
    category: 'Specials',
    name: 'Sky High Platter',
    description: 'A chef\'s selection of our finest kebabs and appetizers, perfect for sharing.',
    price: '₹1200',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '2',
    category: 'Starters',
    name: 'Tandoori Paneer Tikka',
    description: 'Cottage cheese marinated in spiced yogurt and grilled to perfection in a clay oven.',
    price: '₹350',
    image: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '3',
    category: 'Starters',
    name: 'Crispy Corn & Spinach',
    description: 'Fresh spinach and golden corn kernels tossed in aromatic spices.',
    price: '₹280',
    image: 'https://images.unsplash.com/photo-1594221708779-94832f4320d1?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '4',
    category: 'Main Course',
    name: 'Dal Makhani',
    description: 'Black lentils simmered overnight with butter and cream, a true classic.',
    price: '₹400',
    image: 'https://images.unsplash.com/photo-1585937421612-70a008356f36?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '5',
    category: 'Main Course',
    name: 'Butter Chicken',
    description: 'Tender chicken pieces in a rich, creamy tomato and cashew gravy.',
    price: '₹480',
    image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '6',
    category: 'Drinks & Beverages',
    name: 'Artisan Cappuccino',
    description: 'Expertly brewed espresso with steamed milk and foam art.',
    price: '₹180',
    image: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '7',
    category: 'Bread & Rice',
    name: 'Garlic Naan',
    description: 'Soft indian bread topped with chopped garlic and coriander.',
    price: '₹60',
    image: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&q=80&w=800'
  }
];

export const INITIAL_REVIEWS: Review[] = [
  {
    id: '1',
    name: "Amit Patel",
    text: "Beautiful rooftop dining, delicious food, great service!",
    rating: 5,
    date: "2023-11-15"
  },
  {
    id: '2',
    name: "Priya Sharma",
    text: "Best place for family dinner. Coffee and desserts are next level.",
    rating: 5,
    date: "2023-12-02"
  },
  {
    id: '3',
    name: "Rahul Verma",
    text: "Ambience is perfect. Must try their signature platters!",
    rating: 5,
    date: "2024-01-10"
  },
  {
    id: '4',
    name: "Sneha Gupta",
    text: "Loved the vegetarian options and the late-night vibe.",
    rating: 4.5,
    date: "2024-01-25"
  }
];

export const INITIAL_GALLERY: GalleryItem[] = [
  { id: '1', url: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=1200', caption: 'Rooftop Ambiance', category: 'Interior' },
  { id: '2', url: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=1200', caption: 'Signature Platter', category: 'Food' },
  { id: '3', url: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&q=80&w=1200', caption: 'Evening Vibes', category: 'Interior' },
  { id: '4', url: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=1200', caption: 'Perfect Coffee', category: 'Food' },
  { id: '5', url: 'https://images.unsplash.com/photo-1560624052-449f5ddf0c31?auto=format&fit=crop&q=80&w=1200', caption: 'Private Dining', category: 'Interior' },
  { id: '6', url: 'https://images.unsplash.com/photo-1550966871-3ed3c47e2ce2?auto=format&fit=crop&q=80&w=1200', caption: 'Celebrations', category: 'Events' },
];
