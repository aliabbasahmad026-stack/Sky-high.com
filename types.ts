
export interface MenuItem {
  id: string;
  category: 'Starters' | 'Main Course' | 'Bread & Rice' | 'Drinks & Beverages' | 'Specials';
  name: string;
  description: string;
  price: string;
  image: string;
}

export interface Review {
  id: string;
  name: string;
  text: string;
  rating: number;
  date: string;
}

export interface GalleryItem {
  id: string;
  url: string;
  caption: string;
  category: 'Interior' | 'Food' | 'Events';
}

export interface RestaurantInfo {
  name: string;
  tagline: string;
  description: string;
  address: string;
  phone: string;
  email: string;
  mapLink: string;
  whatsapp: string;
  openingHours: string[];
  socials: {
    instagram: string;
    facebook: string;
  };
  highlights: string[];
  bannerImage?: string;
}

export interface AppState {
  menu: MenuItem[];
  reviews: Review[];
  gallery: GalleryItem[];
  info: RestaurantInfo;
  setMenu: (menu: MenuItem[]) => void;
  setReviews: (reviews: Review[]) => void;
  setGallery: (gallery: GalleryItem[]) => void;
  setInfo: (info: RestaurantInfo) => void;
}
