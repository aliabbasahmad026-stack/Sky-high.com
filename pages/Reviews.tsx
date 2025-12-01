import React from 'react';
import { useRestaurant } from '../context/RestaurantContext';
import { Star, User, MessageSquare, Quote } from 'lucide-react';

const Reviews: React.FC = () => {
  const { reviews, info } = useRestaurant();

  // Calculate average rating
  const avgRating = (reviews.reduce((acc, curr) => acc + curr.rating, 0) / reviews.length).toFixed(1);

  return (
    <div className="min-h-screen bg-black pt-24 pb-16">
       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
         <div className="text-center mb-16 space-y-4">
           <h1 className="text-5xl font-serif font-bold text-white">Guest Reviews</h1>
           <div className="flex items-center justify-center gap-2 text-gold-500 text-2xl">
             <span className="font-bold text-white text-4xl">{avgRating}</span>
             <div className="flex"><Star fill="currentColor" /><Star fill="currentColor" /><Star fill="currentColor" /><Star fill="currentColor" /><Star fill="currentColor" className="opacity-50" /></div>
           </div>
           <p className="text-gray-400">Trusted by Haridwar locals and travelers alike</p>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {reviews.map((review) => (
               <div key={review.id} className="bg-white/5 backdrop-blur-sm border border-white/10 p-8 rounded-lg hover:border-gold-500/30 transition-all relative group">
                  <Quote className="absolute top-6 right-6 text-gold-500/20 w-12 h-12" />
                  <div className="flex justify-between items-start mb-6">
                     <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-neutral-800 rounded-full flex items-center justify-center text-gold-500">
                          <User size={24} />
                        </div>
                        <div>
                          <h4 className="text-white font-bold">{review.name}</h4>
                          <span className="text-xs text-gray-500">{review.date}</span>
                        </div>
                     </div>
                     <div className="flex text-gold-500 text-sm">
                       {[...Array(5)].map((_, i) => (
                         <Star key={i} size={16} fill={i < review.rating ? "currentColor" : "none"} />
                       ))}
                     </div>
                  </div>
                  <p className="text-gray-300 italic leading-relaxed">"{review.text}"</p>
               </div>
            ))}
         </div>

         {/* Call to Action */}
         <div className="bg-neutral-900 border border-white/5 rounded-xl p-12 text-center max-w-2xl mx-auto">
            <MessageSquare className="w-12 h-12 text-gold-500 mx-auto mb-6" />
            <h3 className="text-2xl font-serif text-white mb-4">Have you dined with us?</h3>
            <p className="text-gray-400 mb-8">We would love to hear about your experience. Your feedback helps us maintain our high standards of service.</p>
            <a 
              href={info.mapLink} 
              target="_blank" 
              rel="noreferrer"
              className="inline-block px-8 py-3 bg-white text-black font-bold uppercase tracking-wider hover:bg-gold-500 hover:text-black transition-colors rounded-sm"
            >
              Write a Review on Google
            </a>
         </div>
       </div>
    </div>
  );
};

export default Reviews;