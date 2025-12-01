import React, { useState } from 'react';
import { useRestaurant } from '../context/RestaurantContext';
import { MenuItem } from '../types';

const Menu: React.FC = () => {
  const { menu } = useRestaurant();
  const categories = ['All', 'Specials', 'Starters', 'Main Course', 'Bread & Rice', 'Drinks & Beverages'];
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredMenu = activeCategory === 'All' 
    ? menu 
    : menu.filter(item => item.category === activeCategory);

  return (
    <div className="min-h-screen bg-black pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16 space-y-4">
           <h1 className="text-5xl font-serif font-bold text-white">Our Menu</h1>
           <p className="text-gray-400">Curated flavors for the discerning palate</p>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap justify-center gap-4 mb-12 sticky top-20 z-30 bg-black/80 backdrop-blur py-4 -mx-4 px-4 border-b border-white/5">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2 rounded-full border transition-all text-sm uppercase tracking-wider ${
                activeCategory === cat 
                ? 'bg-gold-500 text-black border-gold-500 font-bold' 
                : 'text-gray-400 border-white/10 hover:border-gold-500 hover:text-gold-400'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Menu Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
          {filteredMenu.map((item) => (
             <MenuItemCard key={item.id} item={item} />
          ))}
        </div>

        {filteredMenu.length === 0 && (
          <div className="text-center text-gray-500 py-12">No items found in this category.</div>
        )}
      </div>
    </div>
  );
};

const MenuItemCard: React.FC<{ item: MenuItem }> = ({ item }) => {
  return (
    <div className="flex gap-4 md:gap-6 group">
       <div className="w-24 h-24 md:w-32 md:h-32 shrink-0 overflow-hidden rounded-lg bg-neutral-900">
         <img 
           src={item.image} 
           alt={item.name} 
           className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 transform group-hover:scale-110"
         />
       </div>
       <div className="flex-1 flex flex-col justify-center border-b border-dashed border-white/10 pb-6">
         <div className="flex justify-between items-baseline mb-2">
           <h3 className="text-xl font-serif text-white group-hover:text-gold-400 transition-colors">{item.name}</h3>
           <span className="text-gold-500 font-bold text-lg">{item.price}</span>
         </div>
         <p className="text-gray-500 text-sm leading-relaxed line-clamp-2">{item.description}</p>
       </div>
    </div>
  );
};

export default Menu;
