import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { AppState, MenuItem, Review, GalleryItem, RestaurantInfo } from '../types';
import { INITIAL_MENU, INITIAL_REVIEWS, INITIAL_GALLERY, INITIAL_INFO } from '../constants';

const RestaurantContext = createContext<AppState | undefined>(undefined);

export const RestaurantProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [menu, setMenu] = useState<MenuItem[]>(() => {
    const saved = localStorage.getItem('skyhigh_menu');
    return saved ? JSON.parse(saved) : INITIAL_MENU;
  });

  const [reviews, setReviews] = useState<Review[]>(() => {
    const saved = localStorage.getItem('skyhigh_reviews');
    return saved ? JSON.parse(saved) : INITIAL_REVIEWS;
  });

  const [gallery, setGallery] = useState<GalleryItem[]>(() => {
    const saved = localStorage.getItem('skyhigh_gallery');
    return saved ? JSON.parse(saved) : INITIAL_GALLERY;
  });

  const [info, setInfo] = useState<RestaurantInfo>(() => {
    const saved = localStorage.getItem('skyhigh_info');
    return saved ? JSON.parse(saved) : INITIAL_INFO;
  });

  // Persistence
  useEffect(() => localStorage.setItem('skyhigh_menu', JSON.stringify(menu)), [menu]);
  useEffect(() => localStorage.setItem('skyhigh_reviews', JSON.stringify(reviews)), [reviews]);
  useEffect(() => localStorage.setItem('skyhigh_gallery', JSON.stringify(gallery)), [gallery]);
  useEffect(() => localStorage.setItem('skyhigh_info', JSON.stringify(info)), [info]);

  return (
    <RestaurantContext.Provider value={{
      menu, setMenu,
      reviews, setReviews,
      gallery, setGallery,
      info, setInfo
    }}>
      {children}
    </RestaurantContext.Provider>
  );
};

export const useRestaurant = () => {
  const context = useContext(RestaurantContext);
  if (!context) {
    throw new Error('useRestaurant must be used within a RestaurantProvider');
  }
  return context;
};
