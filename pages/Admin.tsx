
import React, { useState, useRef } from 'react';
import { useRestaurant } from '../context/RestaurantContext';
import { MenuItem, GalleryItem } from '../types';
import { Plus, Trash2, Save, Edit, Upload, Image as ImageIcon, Layout, Type } from 'lucide-react';

const Admin: React.FC = () => {
  const { menu, setMenu, info, setInfo, gallery, setGallery } = useRestaurant();
  const [activeTab, setActiveTab] = useState<'menu' | 'info' | 'gallery'>('menu');
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [activeUploadId, setActiveUploadId] = useState<string | null>(null);
  const [activeUploadType, setActiveUploadType] = useState<'menu' | 'gallery' | 'banner'>('menu');

  // Temporary Login
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'admin123') setIsAuthenticated(true);
    else alert('Invalid password');
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4">
        <form onSubmit={handleLogin} className="bg-neutral-900 p-8 rounded-lg border border-white/10 w-full max-w-md space-y-6">
          <div className="text-center">
             <h2 className="text-2xl text-white font-serif mb-2">Admin Dashboard</h2>
             <p className="text-gray-500 text-sm">Sign in to manage content</p>
          </div>
          <input 
            type="password" 
            placeholder="Enter Password" 
            className="w-full bg-black border border-white/20 p-3 text-white rounded focus:border-gold-500 outline-none transition-colors"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" className="w-full bg-gold-500 text-black font-bold py-3 rounded hover:bg-gold-400 transition-colors uppercase tracking-widest text-sm">Login</button>
        </form>
      </div>
    );
  }

  // --- Handlers ---
  const handleUpdateInfo = (field: keyof typeof info, value: any) => {
    setInfo({ ...info, [field]: value });
  };

  const addMenuItem = () => {
    const newItem: MenuItem = {
      id: Date.now().toString(),
      name: 'New Dish Name',
      category: 'Starters',
      price: '₹0',
      description: 'Enter a delicious description for this item...',
      image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=800'
    };
    setMenu([newItem, ...menu]);
  };

  const updateMenuItem = (id: string, field: keyof MenuItem, value: string) => {
    setMenu(menu.map(m => m.id === id ? { ...m, [field]: value } : m));
  };

  const deleteMenuItem = (id: string) => {
    if (confirm('Are you sure you want to delete this item?')) setMenu(menu.filter(m => m.id !== id));
  };

  // Image Upload Logic
  const triggerImageUpload = (id: string, type: 'menu' | 'gallery' | 'banner') => {
    setActiveUploadId(id);
    setActiveUploadType(type);
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Check file size (limit to ~2MB for localStorage safety)
      if (file.size > 2000000) {
        alert("File is too large! Please upload an image under 2MB.");
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        
        if (activeUploadType === 'menu' && activeUploadId) {
          updateMenuItem(activeUploadId, 'image', base64String);
        } else if (activeUploadType === 'gallery' && activeUploadId) {
          const newGallery = gallery.map(g => g.id === activeUploadId ? { ...g, url: base64String } : g);
          setGallery(newGallery);
        } else if (activeUploadType === 'banner') {
           setInfo({ ...info, bannerImage: base64String });
        }
      };
      reader.readAsDataURL(file);
    }
    // Reset file input
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="min-h-screen bg-black pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-10 pb-6 border-b border-white/10">
          <div>
            <h1 className="text-3xl text-white font-serif font-bold">Admin Dashboard</h1>
            <p className="text-gray-500 text-sm mt-1">Manage your website content securely</p>
          </div>
          <button onClick={() => setIsAuthenticated(false)} className="px-4 py-2 border border-red-500/30 text-red-500 hover:bg-red-500/10 rounded transition-colors text-sm">
            Logout
          </button>
        </div>

        {/* Hidden File Input */}
        <input 
          type="file" 
          ref={fileInputRef} 
          className="hidden" 
          accept="image/*"
          onChange={handleFileChange}
        />

        {/* Navigation Tabs */}
        <div className="flex gap-2 mb-8 bg-neutral-900/50 p-1 rounded-lg inline-flex">
           {[
             { id: 'menu', icon: <UtensilsIcon size={16} />, label: 'Menu' },
             { id: 'info', icon: <Layout size={16} />, label: 'Details' },
             { id: 'gallery', icon: <ImageIcon size={16} />, label: 'Gallery' }
           ].map(tab => (
             <button
               key={tab.id}
               onClick={() => setActiveTab(tab.id as any)}
               className={`flex items-center gap-2 px-6 py-2 rounded-md text-sm font-bold tracking-wide transition-all ${
                 activeTab === tab.id 
                 ? 'bg-gold-500 text-black shadow-lg' 
                 : 'text-gray-400 hover:text-white hover:bg-white/5'
               }`}
             >
               {tab.icon}
               {tab.label}
             </button>
           ))}
        </div>

        {/* Content Area */}
        <div className="bg-neutral-900 border border-white/5 rounded-xl p-6 md:p-8 shadow-2xl">
          
          {/* MENU EDITOR */}
          {activeTab === 'menu' && (
            <div className="space-y-8">
              <div className="flex justify-between items-center">
                <h3 className="text-xl text-white font-serif">Menu Items</h3>
                <button 
                  onClick={addMenuItem} 
                  className="flex items-center gap-2 bg-gold-500 text-black px-5 py-2.5 rounded hover:bg-gold-400 font-bold text-sm transition-transform active:scale-95"
                >
                  <Plus size={18} /> Add New Dish
                </button>
              </div>

              <div className="grid gap-6">
                {menu.map(item => (
                  <div key={item.id} className="group bg-black/50 p-6 rounded-lg border border-white/10 hover:border-gold-500/30 transition-all flex flex-col md:flex-row gap-6">
                    
                    {/* Image Section */}
                    <div className="w-full md:w-48 shrink-0 space-y-2">
                       <div 
                         className="relative w-full h-32 md:h-40 rounded-lg overflow-hidden border border-white/10 cursor-pointer group/img"
                         onClick={() => triggerImageUpload(item.id, 'menu')}
                       >
                         <img src={item.image} alt="preview" className="w-full h-full object-cover transition-opacity group-hover/img:opacity-50" />
                         <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover/img:opacity-100 transition-opacity">
                            <Upload className="text-gold-500 mb-1" size={24} />
                            <span className="text-xs text-white font-bold uppercase tracking-wider">Click to Upload</span>
                         </div>
                       </div>
                       <input 
                         className="w-full bg-transparent text-[10px] text-gray-500 border-b border-white/5 py-1 focus:border-gold-500 outline-none"
                         value={item.image}
                         placeholder="Or paste image URL"
                         onChange={(e) => updateMenuItem(item.id, 'image', e.target.value)}
                       />
                    </div>

                    {/* Details Section */}
                    <div className="flex-1 space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1">
                           <label className="text-xs text-gold-500 uppercase tracking-wider font-bold">Item Name</label>
                           <input 
                             className="w-full bg-neutral-800 text-white p-3 rounded border border-white/10 focus:border-gold-500 outline-none font-serif text-lg"
                             value={item.name}
                             onChange={(e) => updateMenuItem(item.id, 'name', e.target.value)}
                             placeholder="E.g. Butter Chicken"
                           />
                        </div>
                        <div className="space-y-1">
                           <label className="text-xs text-gold-500 uppercase tracking-wider font-bold">Category</label>
                           <select 
                             className="w-full bg-neutral-800 text-white p-3 rounded border border-white/10 focus:border-gold-500 outline-none"
                             value={item.category}
                             onChange={(e) => updateMenuItem(item.id, 'category', e.target.value as any)}
                           >
                              {['Starters', 'Main Course', 'Bread & Rice', 'Drinks & Beverages', 'Specials'].map(c => <option key={c} value={c}>{c}</option>)}
                           </select>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div className="md:col-span-3 space-y-1">
                           <label className="text-xs text-gray-500 uppercase tracking-wider">Description</label>
                           <textarea 
                             className="w-full bg-neutral-800 text-gray-300 p-3 rounded border border-white/10 focus:border-gold-500 outline-none resize-none"
                             value={item.description}
                             onChange={(e) => updateMenuItem(item.id, 'description', e.target.value)}
                             rows={2}
                             placeholder="Describe the ingredients and taste..."
                           />
                        </div>
                        <div className="space-y-1">
                           <label className="text-xs text-gold-500 uppercase tracking-wider font-bold">Price</label>
                           <input 
                             className="w-full bg-neutral-800 text-gold-500 font-bold text-xl p-3 rounded border border-white/10 focus:border-gold-500 outline-none"
                             value={item.price}
                             onChange={(e) => updateMenuItem(item.id, 'price', e.target.value)}
                             placeholder="₹"
                           />
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex md:flex-col justify-end">
                      <button 
                        onClick={() => deleteMenuItem(item.id)} 
                        className="p-3 bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white rounded transition-colors"
                        title="Delete Item"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>

                  </div>
                ))}
              </div>
            </div>
          )}

          {/* INFO EDITOR */}
          {activeTab === 'info' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
               <div className="space-y-6">
                  <h3 className="text-xl text-white font-serif border-b border-white/10 pb-2">Basic Information</h3>
                  
                  {/* Banner Upload */}
                  <div className="space-y-2">
                    <label className="text-gold-500 text-sm font-bold uppercase tracking-wider">Main Banner Image</label>
                    <div 
                      className="relative h-48 w-full rounded-lg overflow-hidden border border-white/10 cursor-pointer group"
                      onClick={() => triggerImageUpload('banner', 'banner')}
                    >
                      <img src={info.bannerImage || "https://via.placeholder.com/1200x600"} alt="Banner" className="w-full h-full object-cover group-hover:opacity-50 transition-opacity" />
                       <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <Upload className="text-gold-500 mb-1" size={32} />
                            <span className="text-sm text-white font-bold uppercase tracking-wider">Click to Update Banner</span>
                         </div>
                    </div>
                  </div>

                  <InputField label="Restaurant Name" value={info.name} onChange={(v) => handleUpdateInfo('name', v)} icon={<Type size={16} />} />
                  <InputField label="Tagline" value={info.tagline} onChange={(v) => handleUpdateInfo('tagline', v)} />
                  <div className="flex flex-col gap-2">
                    <label className="text-gold-500 text-sm font-bold uppercase tracking-wider">Description</label>
                    <textarea 
                       className="bg-black text-white p-4 rounded border border-white/10 focus:border-gold-500 outline-none leading-relaxed"
                       rows={6}
                       value={info.description}
                       onChange={(e) => handleUpdateInfo('description', e.target.value)}
                    />
                 </div>
               </div>

               <div className="space-y-6">
                  <h3 className="text-xl text-white font-serif border-b border-white/10 pb-2">Contact & Location</h3>
                  <InputField label="Phone Number" value={info.phone} onChange={(v) => handleUpdateInfo('phone', v)} />
                  <InputField label="WhatsApp Number (No spaces/dashes)" value={info.whatsapp} onChange={(v) => handleUpdateInfo('whatsapp', v)} />
                  <InputField label="Full Address" value={info.address} onChange={(v) => handleUpdateInfo('address', v)} />
                  <InputField label="Google Maps Link" value={info.mapLink} onChange={(v) => handleUpdateInfo('mapLink', v)} />
                  
                  <div className="flex flex-col gap-2 mt-8">
                    <label className="text-gold-500 text-sm font-bold uppercase tracking-wider">Features & Highlights</label>
                    <p className="text-xs text-gray-500">Comma separated list (e.g. Rooftop, WiFi, Parking)</p>
                    <textarea 
                       className="bg-black text-white p-4 rounded border border-white/10 focus:border-gold-500 outline-none"
                       rows={4}
                       value={info.highlights?.join(', ')}
                       onChange={(e) => handleUpdateInfo('highlights', e.target.value.split(',').map(s => s.trim()))}
                    />
                 </div>
               </div>
            </div>
          )}

          {/* GALLERY EDITOR */}
          {activeTab === 'gallery' && (
             <div className="space-y-8">
                <div className="flex justify-between items-center">
                   <h3 className="text-xl text-white font-serif">Gallery Management</h3>
                   <button 
                     onClick={() => setGallery([...gallery, { id: Date.now().toString(), url: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=600', caption: 'New Moment', category: 'Interior' }])} 
                     className="flex items-center gap-2 bg-gold-500 text-black px-5 py-2.5 rounded hover:bg-gold-400 font-bold text-sm"
                   >
                     <Plus size={18} /> Add Photo
                   </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                   {gallery.map((img, idx) => (
                      <div key={img.id} className="bg-black p-4 rounded-lg border border-white/10 group">
                         <div 
                           className="relative h-48 w-full rounded mb-4 overflow-hidden cursor-pointer bg-neutral-900 border border-white/5"
                           onClick={() => triggerImageUpload(img.id, 'gallery')}
                         >
                            <img src={img.url} alt="admin prev" className="w-full h-full object-cover group-hover:opacity-50 transition-opacity" />
                            <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                <Upload className="text-gold-500 mb-1" size={24} />
                                <span className="text-xs text-white font-bold">Change Photo</span>
                             </div>
                         </div>
                         
                         <div className="space-y-3">
                            <input 
                               className="w-full bg-neutral-900 text-white text-sm p-2 rounded border border-white/10 focus:border-gold-500 outline-none"
                               value={img.caption}
                               placeholder="Caption"
                               onChange={(e) => {
                                 const newGallery = [...gallery];
                                 newGallery[idx].caption = e.target.value;
                                 setGallery(newGallery);
                               }}
                            />
                            <div className="flex gap-2">
                               <select
                                 className="flex-1 bg-neutral-900 text-gray-400 text-xs p-2 rounded border border-white/10 outline-none"
                                 value={img.category}
                                 onChange={(e) => {
                                   const newGallery = [...gallery];
                                   newGallery[idx].category = e.target.value as any;
                                   setGallery(newGallery);
                                 }}
                               >
                                 <option value="Interior">Interior</option>
                                 <option value="Food">Food</option>
                                 <option value="Events">Events</option>
                               </select>
                               <button 
                                 onClick={() => setGallery(gallery.filter(g => g.id !== img.id))} 
                                 className="p-2 bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white rounded transition-colors"
                               >
                                 <Trash2 size={16} />
                               </button>
                            </div>
                         </div>
                      </div>
                   ))}
                </div>
             </div>
          )}

        </div>
      </div>
    </div>
  );
};

// Helper Components
const UtensilsIcon = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/><path d="M7 2v20"/><path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"/></svg>
);

const InputField: React.FC<{ label: string, value: string, onChange: (v: string) => void, icon?: React.ReactNode }> = ({ label, value, onChange, icon }) => (
  <div className="flex flex-col gap-2">
    <label className="text-gold-500 text-sm font-bold uppercase tracking-wider flex items-center gap-2">
      {icon} {label}
    </label>
    <input 
      className="bg-black text-white p-3 rounded border border-white/10 focus:border-gold-500 outline-none transition-colors"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  </div>
);

export default Admin;
