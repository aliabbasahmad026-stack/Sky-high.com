import React from 'react';
import { useRestaurant } from '../context/RestaurantContext';
import { MapPin, Phone, Mail, Clock, MessageCircle } from 'lucide-react';

const Contact: React.FC = () => {
  const { info } = useRestaurant();

  // Address for map query
  const mapQuery = "3rd Floor, S 40, S Block, S Cluster, Shivalik Nagar, Haridwar, Uttarakhand 249403";

  return (
    <div className="min-h-screen bg-black pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-5xl font-serif font-bold text-white text-center mb-16">Contact Us</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Info Side */}
          <div className="space-y-12">
             <div className="space-y-8">
               <div className="flex items-start gap-6">
                 <div className="w-12 h-12 bg-neutral-900 rounded-full flex items-center justify-center text-gold-500 shrink-0">
                   <MapPin />
                 </div>
                 <div>
                   <h3 className="text-xl font-serif text-white mb-2">Location</h3>
                   <p className="text-gray-400 mb-2 max-w-xs">{info.address}</p>
                   <a href={info.mapLink} target="_blank" rel="noreferrer" className="text-gold-400 hover:text-white underline text-sm">Get Directions</a>
                 </div>
               </div>

               <div className="flex items-start gap-6">
                 <div className="w-12 h-12 bg-neutral-900 rounded-full flex items-center justify-center text-gold-500 shrink-0">
                   <Phone />
                 </div>
                 <div>
                   <h3 className="text-xl font-serif text-white mb-2">Phone & WhatsApp</h3>
                   <p className="text-gray-400 mb-2">{info.phone}</p>
                   <div className="flex gap-4">
                     <a href={`tel:${info.phone}`} className="text-sm text-white hover:text-gold-400 border-b border-white/20 pb-1">Call Now</a>
                     <a href={`https://wa.me/${info.whatsapp}`} target="_blank" rel="noopener noreferrer" className="text-sm text-[#25D366] hover:text-white border-b border-white/20 pb-1 flex items-center gap-1">
                        <MessageCircle size={14} /> WhatsApp Us
                     </a>
                   </div>
                 </div>
               </div>

               <div className="flex items-start gap-6">
                 <div className="w-12 h-12 bg-neutral-900 rounded-full flex items-center justify-center text-gold-500 shrink-0">
                   <Mail />
                 </div>
                 <div>
                   <h3 className="text-xl font-serif text-white mb-2">Email</h3>
                   <a href={`mailto:${info.email}`} className="text-gray-400 hover:text-white transition-colors">{info.email}</a>
                 </div>
               </div>
             </div>

             <div className="bg-neutral-900 p-8 rounded-lg border border-white/5">
                <div className="flex items-center gap-3 mb-6">
                  <Clock className="text-gold-500" />
                  <h3 className="text-xl font-serif text-white">Opening Hours</h3>
                </div>
                <div className="space-y-4">
                  {info.openingHours.map((time, idx) => (
                    <div key={idx} className="flex justify-between text-sm border-b border-white/5 pb-2 last:border-0 last:pb-0">
                      <span className="text-gray-400">{time.split(':')[0]}</span>
                      <span className="text-white">{time.split(':').slice(1).join(':')}</span>
                    </div>
                  ))}
                </div>
             </div>
          </div>

          {/* Map Side */}
          <div className="h-[600px] bg-neutral-900 rounded-lg overflow-hidden border border-white/10 relative">
             <iframe 
               width="100%" 
               height="100%" 
               style={{ border: 0, filter: 'grayscale(100%) invert(90%)' }}
               loading="lazy" 
               title="Live Map"
               src={`https://maps.google.com/maps?q=${encodeURIComponent(mapQuery)}&t=&z=15&ie=UTF8&iwloc=&output=embed`}>
             </iframe>
             <div className="absolute bottom-4 left-4 bg-black px-4 py-2 text-xs text-gold-500 rounded">
               * Interactive Google Map
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;