
import React from 'react';
import { Link } from 'react-router-dom';
import { useRestaurant } from '../context/RestaurantContext';
import { MapPin, ArrowRight, Star, Coffee, Utensils, Moon, MessageCircle, Quote, ChevronRight } from 'lucide-react';

const Home: React.FC = () => {
  const { info, menu, reviews } = useRestaurant();

  // Get first 6 items to display as featured
  const featuredItems = menu.slice(0, 6);
  
  // Map query for embed
  const mapQuery = "3rd Floor, S 40, S Block, S Cluster, Shivalik Nagar, Haridwar, Uttarakhand 249403";

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={info.bannerImage || "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=1920"} 
            alt="Hero Background" 
            className="w-full h-full object-cover opacity-50"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto space-y-8 animate-fade-in-up">
          <h2 className="text-gold-400 text-sm md:text-base tracking-[0.3em] uppercase">Welcome to</h2>
          <h1 className="text-5xl md:text-8xl font-serif font-bold text-white leading-tight">
            {info.name}
          </h1>
          <p className="text-lg md:text-2xl text-gray-200 font-light italic">
            "{info.tagline}"
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
            <Link to="/menu" className="px-8 py-3 bg-gold-500 hover:bg-gold-400 text-black font-bold tracking-wider uppercase transition-all transform hover:scale-105 rounded-sm">
              View Menu
            </Link>
            <a href={`tel:${info.phone}`} className="px-8 py-3 border border-white hover:bg-white hover:text-black text-white font-bold tracking-wider uppercase transition-all rounded-sm">
              Call Now
            </a>
            <a href={`https://wa.me/${info.whatsapp}`} target="_blank" rel="noopener noreferrer" className="px-8 py-3 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold tracking-wider uppercase transition-all rounded-sm flex items-center justify-center gap-2">
              <MessageCircle size={20} /> WhatsApp
            </a>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce text-gold-400/50">
          <ArrowRight className="rotate-90" />
        </div>
      </section>

      {/* Info Strip */}
      <div className="bg-neutral-900 border-b border-white/5 py-6">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center text-sm gap-4 text-center md:text-left">
           <div className="flex items-center gap-2 text-gray-400 hover:text-gold-400 transition-colors justify-center md:justify-start">
              <MapPin size={16} className="shrink-0" />
              <a href={info.mapLink} target="_blank" rel="noreferrer">{info.address}</a>
           </div>
           <div className="flex gap-2">
             <span className="text-gold-500">Open Today:</span>
             <span className="text-gray-300">11:00 AM – 12:30 AM</span>
           </div>
        </div>
      </div>

      {/* Introduction */}
      <section className="py-24 bg-black">
        <div className="max-w-3xl mx-auto px-4 text-center space-y-6">
          <Star className="w-8 h-8 text-gold-500 mx-auto" />
          <h2 className="text-3xl md:text-4xl font-serif text-white">Experience Sky High</h2>
          <p className="text-gray-400 leading-relaxed text-lg">
            {info.description}
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-12">
            <div className="p-6 border border-white/5 rounded bg-white/5 hover:border-gold-500/30 transition-colors">
              <Utensils className="w-8 h-8 text-gold-500 mx-auto mb-4" />
              <h3 className="text-white font-serif text-lg mb-2">Rooftop Dining</h3>
              <p className="text-gray-500 text-sm">Enjoy your meal with a breathtaking view of Haridwar's skyline.</p>
            </div>
            <div className="p-6 border border-white/5 rounded bg-white/5 hover:border-gold-500/30 transition-colors">
              <Coffee className="w-8 h-8 text-gold-500 mx-auto mb-4" />
              <h3 className="text-white font-serif text-lg mb-2">Great Coffee</h3>
              <p className="text-gray-500 text-sm">Premium blends and artisan teas for the perfect conversation.</p>
            </div>
            <div className="p-6 border border-white/5 rounded bg-white/5 hover:border-gold-500/30 transition-colors">
              <Moon className="w-8 h-8 text-gold-500 mx-auto mb-4" />
              <h3 className="text-white font-serif text-lg mb-2">Late Night</h3>
              <p className="text-gray-500 text-sm">Open until 12:30 AM for your late-night cravings.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Menu Preview */}
      <section className="py-24 bg-neutral-900 relative">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
             <h3 className="text-gold-500 tracking-widest text-sm uppercase mb-2">Our Selection</h3>
             <h2 className="text-4xl font-serif text-white">Featured Delicacies</h2>
             <div className="w-24 h-0.5 bg-gold-500 mx-auto mt-6"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {featuredItems.map(item => (
              <div key={item.id} className="group relative overflow-hidden rounded-lg bg-black border border-white/5 hover:border-gold-500/30 transition-all duration-300">
                <div className="h-64 overflow-hidden">
                   <img src={item.image} alt={item.name} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" />
                </div>
                <div className="p-6 relative">
                   <div className="flex justify-between items-start mb-2">
                     <h3 className="text-xl font-serif text-white group-hover:text-gold-400 transition-colors">{item.name}</h3>
                     <span className="text-gold-500 font-bold">{item.price}</span>
                   </div>
                   <p className="text-gray-500 text-sm line-clamp-2">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center">
             <Link to="/menu" className="inline-flex items-center gap-3 px-8 py-3 bg-transparent border border-gold-500 text-gold-500 hover:bg-gold-500 hover:text-black font-bold uppercase tracking-wider transition-all rounded-sm group">
               View All Menu
               <ChevronRight size={18} className="transform group-hover:translate-x-1 transition-transform" />
             </Link>
          </div>
        </div>
      </section>

      {/* Reviews Auto Animation Section */}
      <section className="py-24 bg-black border-t border-white/5 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 mb-12 text-center">
           <h2 className="text-3xl md:text-4xl font-serif text-white mb-2">Guest Stories</h2>
           <p className="text-gold-500 italic">"Hear what our guests have to say"</p>
        </div>
        
        <div className="relative w-full">
           <div className="flex gap-8 animate-marquee pl-4">
              {/* Duplicate reviews to create infinite scroll effect */}
              {[...reviews, ...reviews, ...reviews].map((review, i) => (
                 <div key={`${review.id}-${i}`} className="flex-shrink-0 w-80 md:w-96 bg-neutral-900 border border-white/10 p-6 rounded-lg hover:border-gold-500/50 transition-colors">
                    <div className="flex text-gold-500 mb-3 gap-1">
                      {[...Array(5)].map((_, idx) => (
                        <Star key={idx} size={14} fill={idx < review.rating ? "currentColor" : "none"} />
                      ))}
                    </div>
                    <div className="relative">
                      <Quote className="absolute -top-2 -left-2 text-white/10 w-8 h-8 transform -scale-x-100" />
                      <p className="text-gray-300 text-sm italic leading-relaxed mb-4 pl-4 relative z-10">"{review.text}"</p>
                    </div>
                    <div className="flex items-center gap-3 border-t border-white/5 pt-4 mt-auto">
                       <div className="w-8 h-8 rounded-full bg-gold-500/20 text-gold-500 flex items-center justify-center text-xs font-bold">
                         {review.name.charAt(0)}
                       </div>
                       <div>
                         <p className="text-white font-serif text-sm">{review.name}</p>
                         <p className="text-gray-600 text-xs">{review.date}</p>
                       </div>
                    </div>
                 </div>
              ))}
           </div>
           
           {/* Gradients to fade edges */}
           <div className="absolute inset-y-0 left-0 w-8 md:w-32 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none"></div>
           <div className="absolute inset-y-0 right-0 w-8 md:w-32 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none"></div>
        </div>
      </section>

       {/* Map Preview Section */}
       <section className="h-96 w-full relative group border-t border-white/5">
          <iframe 
            width="100%" 
            height="100%" 
            style={{ border: 0, filter: 'grayscale(100%) invert(90%)' }}
            loading="lazy" 
            allowFullScreen
            title="Map"
            src={`https://maps.google.com/maps?q=${encodeURIComponent(mapQuery)}&t=&z=15&ie=UTF8&iwloc=&output=embed`}>
          </iframe>
          <div className="absolute inset-0 bg-black/20 pointer-events-none group-hover:bg-transparent transition-colors"></div>
          <div className="absolute bottom-8 left-8 bg-black/80 backdrop-blur p-6 border-l-4 border-gold-500 max-w-sm pointer-events-none">
             <h4 className="text-xl font-serif text-white mb-1">Visit Us in Haridwar</h4>
             <p className="text-gray-300 text-sm">{info.address}</p>
          </div>
       </section>
    </div>
  );
};

export default Home;
