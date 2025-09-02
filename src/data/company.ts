import { CompanyInfo, Milestone, Testimonial } from '@/types';

export const companyInfo: CompanyInfo = {
  name: "Qingdao RubberTech Industry Co., Ltd",
  address: "LinGang Industrial Park, HuangDao district, QingDao City, ShanDong Province, PR. China",
  phone: "+86-532-86727169",
  email: "md@rubbertechchina.com",
  establishedYear: 2012,
  landArea: "over 40,000 square meters",
  buildingArea: "exceeds 10,000 square meters",
  dailyCapacity: "15,000 sets",
  brand: "RT"
};

export const companyMission = "We will be passionate about supplying the best product lines, supporting our distribution channels, and providing superior customer service.";

export const milestones: Milestone[] = [
  {
    year: 2012,
    month: "January",
    description: "Factory founded, started producing pneumatic rubber wheels and wheelbarrows"
  },
  {
    year: 2014,
    month: "March", 
    description: "Added PU and solid wheel production"
  },
  {
    year: 2017,
    month: "January",
    description: "Registered own brand \"RT\""
  },
  {
    year: 2018,
    month: "February",
    description: "Established export department"
  },
  {
    year: 2018,
    month: "November",
    description: "Installed hand trolley production line"
  },
  {
    year: 2018,
    month: "December", 
    description: "Reached daily production capacity of 15,000 sets"
  }
];

export const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Jim",
    company: "Business Owner",
    content: "Communication is everything in business relationship. RubberTech provides excellent customer support and quality products.",
    rating: 5,
    location: "USA",
    avatar: "/testimonials/jim-avatar.jpg"
  },
  {
    id: "2", 
    name: "Shubham",
    company: "Project Manager",
    content: "Outstanding quality and reliability. Their wheels have exceeded our expectations in all industrial applications.",
    rating: 5,
    location: "India",
    avatar: "/testimonials/shubham-avatar.jpg"
  },
  {
    id: "3",
    name: "Bruno", 
    company: "Operations Director",
    content: "We've been partners with RubberTech for years. Their consistency in quality and on-time delivery is remarkable.",
    rating: 5,
    location: "Brazil",
    avatar: "/testimonials/bruno-avatar.jpg"
  }
];

export const whyChooseUs = [
  {
    title: "Customer-focused",
    description: "We prioritize customer satisfaction and provide personalized service to meet your specific needs."
  },
  {
    title: "Innovative",
    description: "Continuously improving our products and processes with the latest technology and manufacturing techniques."
  },
  {
    title: "Quality Assured", 
    description: "Rigorous quality control ensures every product meets international standards and customer expectations."
  },
  {
    title: "Strong Relationships",
    description: "We build lasting partnerships with customers, suppliers, employees, shareholders, and our community."
  }
];