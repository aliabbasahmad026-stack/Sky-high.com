import React from 'react';
import { useRestaurant } from '../context/RestaurantContext';
import { Award, ShieldCheck, Heart, ChefHat, CheckCircle2 } from 'lucide-react';

const About: React.FC = () => {
  const { info } = useRestaurant();

  const features = [
    { icon: <Award size={32} />, title: "Authentic Taste", desc: "Recipes passed down through generations." },
    { icon: <ShieldCheck size={32} />, title: "Impeccable Hygiene", desc: "Highest standards of cleanliness and safety." },
    { icon: <Heart size={32} />, title: "Service with Love", desc: "Hospitality that makes you feel at home." },
    { icon: <ChefHat size={32} />, title: "Master Chefs", desc: "World-class culinary experts in the kitchen." }
  ];

  const amenities = [
    { 
      title: "Service Options", 
      items: ["Outdoor Seating", "Rooftop Dining", "No-contact Delivery", "Delivery", "Takeaway", "Dine-in"] 
    },
    { 
      title: "Offerings", 
      items: ["All you can eat", "Halal Food", "Private Dining Room", "Small Plates", "Vegetarian Options", "Vegan Options", "Quick Bite", "Coffee", "Late-night Food"] 
    },
    { 
      title: "Dining Options", 
      items: ["Breakfast", "Brunch", "Lunch", "Dinner", "Dessert", "Catering", "Seating", "Table Service"] 
    },
    { 
      title: "Atmosphere", 
      items: ["Casual", "Quiet", "Cozy", "Romantic", "Trendy", "Upmarket"] 
    },
    { 
      title: "Amenities", 
      items: ["Restroom", "Free Parking Lot", "Free Street Parking", "High Chairs", "Wi-Fi"] 
    },
    { 
      title: "Payments", 
      items: ["Credit Cards", "Debit Cards", "NFC Mobile Payments"] 
    }
  ];

  return (
    <div className="min-h-screen bg-black pt-24 pb-16">
       
       {/* Hero Split */}
       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
         <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <h1 className="text-5xl md:text-6xl font-serif font-bold text-white leading-tight">
                Our Story <span className="text-gold-500">.</span>
              </h1>
              <div className="w-20 h-1 bg-gold-500"></div>
              <p className="text-gray-300 text-lg leading-relaxed">
                {info.description}
                <br /><br />
                Established with a vision to redefine luxury dining in Shivalik Nagar, {info.name} brings together the finest ingredients and a passion for culinary art. Our rooftop location offers a unique perspective of Haridwar, designed to elevate your spirit as you dine.
              </p>
              <div className="pt-4">
                 <img src="https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&q=80&w=200&h=100" className="opacity-80 grayscale hover:grayscale-0 transition-all rounded" alt="Signature" />
              </div>
            </div>
            <div className="relative">
               <div className="absolute -inset-4 border border-gold-500/30 z-0"></div>
               <img 
                 src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=800" 
                 alt="Restaurant Interior" 
                 className="relative z-10 w-full h-[600px] object-cover rounded-sm shadow-2xl grayscale hover:grayscale-0 transition-all duration-700" 
               />
            </div>
         </div>
       </div>

       {/* Why Choose Us */}
       <div className="bg-neutral-900 py-24">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-gold-500 tracking-widest text-sm uppercase mb-3">Excellence</h2>
              <h3 className="text-4xl font-serif text-white">Why People Love Us</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-24">
               {features.map((feature, idx) => (
                 <div key={idx} className="p-8 border border-white/5 hover:border-gold-500/50 bg-black/50 hover:bg-black transition-all duration-300 group text-center">
                    <div className="inline-block p-4 bg-neutral-900 rounded-full text-gold-500 mb-6 group-hover:scale-110 transition-transform">
                      {feature.icon}
                    </div>
                    <h4 className="text-xl font-serif text-white mb-3">{feature.title}</h4>
                    <p className="text-gray-500 text-sm leading-relaxed">{feature.desc}</p>
                 </div>
               ))}
            </div>

            {/* Detailed Amenities */}
            <div className="border-t border-white/10 pt-16">
               <h3 className="text-3xl font-serif text-white mb-12 text-center">Amenities & Features</h3>
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {amenities.map((category, idx) => (
                    <div key={idx} className="bg-black border border-white/5 p-6 rounded-lg hover:border-gold-500/30 transition-colors">
                      <h4 className="text-gold-400 font-bold uppercase tracking-wider mb-4 border-b border-white/10 pb-2">{category.title}</h4>
                      <ul className="space-y-2">
                        {category.items.map((item, i) => (
                          <li key={i} className="flex items-center gap-2 text-gray-400 text-sm">
                            <CheckCircle2 size={14} className="text-gold-500 shrink-0" /> {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
               </div>
            </div>
         </div>
       </div>
    </div>
  );
};

export default About;