import React, { useState } from 'react';
import { useRestaurant } from '../context/RestaurantContext';
import { X } from 'lucide-react';

const Gallery: React.FC = () => {
  const { gallery } = useRestaurant();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-black pt-24 pb-16">
       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
         <div className="text-center mb-16">
           <h1 className="text-5xl font-serif font-bold text-white mb-4">Gallery</h1>
           <p className="text-gray-400">A glimpse into our world</p>
         </div>

         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
           {gallery.map((item, index) => (
             <div 
               key={item.id} 
               className={`relative group cursor-pointer overflow-hidden rounded-lg ${index % 4 === 0 ? 'md:col-span-2 md:row-span-2' : ''}`}
               onClick={() => setSelectedImage(item.url)}
             >
                <img 
                  src={item.url} 
                  alt={item.caption} 
                  className="w-full h-full object-cover min-h-[300px] transform group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                   <div className="text-center transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                     <p className="text-gold-400 tracking-widest text-xs uppercase mb-2">{item.category}</p>
                     <h3 className="text-2xl font-serif text-white">{item.caption}</h3>
                   </div>
                </div>
             </div>
           ))}
         </div>
       </div>

       {/* Lightbox Modal */}
       {selectedImage && (
         <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4" onClick={() => setSelectedImage(null)}>
           <button className="absolute top-4 right-4 text-white hover:text-gold-400">
             <X size={32} />
           </button>
           <img 
             src={selectedImage} 
             alt="Preview" 
             className="max-w-full max-h-[90vh] rounded-lg shadow-2xl border border-white/10"
             onClick={(e) => e.stopPropagation()} 
            />
         </div>
       )}
    </div>
  );
};

export default Gallery;
