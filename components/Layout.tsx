
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useRestaurant } from '../context/RestaurantContext';
import { Menu, X, MapPin, Phone, Instagram, Facebook, Settings, Clock, Mail, ChevronRight } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { info } = useRestaurant();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => setIsOpen(false), [location]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Menu', path: '/menu' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'About', path: '/about' },
    { name: 'Reviews', path: '/reviews' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-black/90 backdrop-blur-lg border-b border-white/10 py-3' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <Link to="/" className="text-2xl font-serif font-bold tracking-widest text-gold-400 hover:text-white transition-colors">
          {info.name.toUpperCase()}
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex space-x-8 items-center">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              to={link.path} 
              className={`text-sm tracking-widest uppercase hover:text-gold-400 transition-colors ${location.pathname === link.path ? 'text-gold-400' : 'text-gray-300'}`}
            >
              {link.name}
            </Link>
          ))}
          <Link to="/admin" className="text-gray-600 hover:text-gold-500">
            <Settings size={18} />
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Nav */}
      <div className={`md:hidden fixed inset-0 bg-black/95 backdrop-blur-xl z-40 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'} flex flex-col justify-center items-center space-y-8`}>
        {navLinks.map((link) => (
          <Link 
            key={link.name} 
            to={link.path} 
            className="text-2xl font-serif text-white hover:text-gold-400 transition-colors"
          >
            {link.name}
          </Link>
        ))}
         <Link to="/admin" className="text-gray-500 mt-8 flex items-center gap-2">
            <Settings size={18} /> Admin Panel
          </Link>
      </div>
    </nav>
  );
};

export const Footer: React.FC = () => {
  const { info } = useRestaurant();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-neutral-900 border-t border-gold-500/20 relative overflow-hidden">
      {/* Decorative background element */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gold-500 to-transparent opacity-50"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          
          {/* Brand Section */}
          <div className="space-y-6">
            <div>
              <h2 className="text-4xl font-serif font-bold text-white tracking-wide">
                Sky <span className="text-gold-500">High</span>
              </h2>
              <p className="text-gold-400 italic font-serif mt-2 tracking-wide text-lg">
                "{info.tagline}"
              </p>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
              Experience the pinnacle of dining in Haridwar. A perfect blend of ambiance, taste, and hospitality awaiting your arrival.
            </p>
            <div className="flex space-x-4 pt-2">
              <SocialIcon href={info.socials.instagram} icon={<Instagram size={20} />} />
              <SocialIcon href={info.socials.facebook} icon={<Facebook size={20} />} />
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h4 className="text-lg font-bold text-white uppercase tracking-widest border-l-2 border-gold-500 pl-3">Explore</h4>
            <ul className="space-y-3">
              <FooterLink to="/" label="Home" />
              <FooterLink to="/menu" label="Our Menu" />
              <FooterLink to="/gallery" label="Gallery" />
              <FooterLink to="/about" label="Our Story" />
              <FooterLink to="/contact" label="Contact Us" />
              <FooterLink to="/admin" label="Admin Login" />
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <h4 className="text-lg font-bold text-white uppercase tracking-widest border-l-2 border-gold-500 pl-3">Contact</h4>
            <div className="space-y-4 text-gray-400 text-sm">
              <div className="flex items-start gap-3 group">
                <MapPin size={18} className="mt-1 text-gold-500 shrink-0 group-hover:text-white transition-colors" />
                <a href={info.mapLink} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors leading-relaxed">
                  {info.address}
                </a>
              </div>
              <div className="flex items-center gap-3 group">
                <Phone size={18} className="text-gold-500 shrink-0 group-hover:text-white transition-colors" />
                <a href={`tel:${info.phone}`} className="hover:text-white transition-colors tracking-wide">
                  {info.phone}
                </a>
              </div>
               <div className="flex items-center gap-3 group">
                <Mail size={18} className="text-gold-500 shrink-0 group-hover:text-white transition-colors" />
                <a href={`mailto:${info.email}`} className="hover:text-white transition-colors">
                  {info.email}
                </a>
              </div>
            </div>
          </div>

          {/* Opening Hours */}
          <div className="space-y-6">
            <h4 className="text-lg font-bold text-white uppercase tracking-widest border-l-2 border-gold-500 pl-3">Opening Hours</h4>
            <div className="bg-black/30 p-4 rounded-lg border border-white/5 backdrop-blur-sm">
              <ul className="space-y-3 text-sm">
                {info.openingHours.map((hour, idx) => {
                  const [day, time] = hour.split(': ');
                  return (
                    <li key={idx} className="flex justify-between items-center text-gray-400 border-b border-white/5 last:border-0 pb-2 last:pb-0">
                      <span className="text-gold-500 font-medium w-12">{day}</span>
                      <span className="text-white text-xs tracking-wide">{time}</span>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-xs text-gray-600 gap-4">
          <p>&copy; {currentYear} Sky High Dining. All Rights Reserved.</p>
          <div className="flex gap-6">
            <span className="hover:text-gold-500 cursor-pointer transition-colors">Privacy Policy</span>
            <span className="hover:text-gold-500 cursor-pointer transition-colors">Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

// Helper Components for Footer
const SocialIcon: React.FC<{ href: string; icon: React.ReactNode }> = ({ href, icon }) => (
  <a 
    href={href} 
    target="_blank" 
    rel="noopener noreferrer" 
    className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-gold-500 hover:text-black transition-all duration-300 transform hover:scale-110"
  >
    {icon}
  </a>
);

const FooterLink: React.FC<{ to: string; label: string }> = ({ to, label }) => (
  <li>
    <Link to={to} className="flex items-center gap-2 text-gray-400 hover:text-gold-400 transition-colors group">
      <ChevronRight size={14} className="text-gold-500/50 group-hover:text-gold-500 transition-colors" />
      {label}
    </Link>
  </li>
);
