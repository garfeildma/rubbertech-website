export interface Product {
  id: string;
  name: string;
  category: string;
  size?: string;
  image: string;
  thumbnail?: string;
  url?: string;
  description?: string;
  specifications?: {
    size?: string;
    material?: string;
    weight?: string;
    loadCapacity?: string;
    [key: string]: string | undefined;
  };
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  publishDate: string;
  slug: string;
  image?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  company?: string;
  content: string;
  rating?: number;
  location?: string;
  avatar?: string;
}

export interface CompanyInfo {
  name: string;
  address: string;
  phone: string;
  email: string;
  establishedYear: number;
  landArea: string;
  buildingArea: string;
  dailyCapacity: string;
  brand: string;
}

export interface Milestone {
  year: number;
  month: string;
  description: string;
}

export interface NavItem {
  name: string;
  href: string;
  children?: NavItem[];
}