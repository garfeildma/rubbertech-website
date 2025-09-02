import { Product } from '@/types';

export const productCategories = [
  "Pneumatic Rubber Wheel",
  "PU Wheel",
  "Solid Wheel", 
  "Wheelbarrow",
  "Hand Trolley"
];

export const products: Product[] = [
  {
    id: "PR0601",
    name: "PR0601",
    category: "Pneumatic Rubber Wheel",
    size: "6\" x 2\"",
    image: "/products/PR0601.jpg",
    description: "High-quality pneumatic rubber wheel perfect for wheelbarrows and light industrial applications.",
    specifications: {
      size: "6\" x 2\"",
      material: "Rubber with steel rim",
      weight: "1.2 kg",
      loadCapacity: "80 kg"
    }
  },
  {
    id: "PR0801", 
    name: "PR0801",
    category: "Pneumatic Rubber Wheel",
    size: "8\" x 2\"",
    image: "/products/PR0801.jpg", 
    description: "Durable pneumatic rubber wheel for medium-duty applications.",
    specifications: {
      size: "8\" x 2\"",
      material: "Rubber with steel rim",
      weight: "1.8 kg",
      loadCapacity: "120 kg"
    }
  },
  {
    id: "PR0802",
    name: "PR0802", 
    category: "Pneumatic Rubber Wheel",
    size: "8\" x 2.5\"",
    image: "/products/PR0802.jpg",
    description: "Heavy-duty pneumatic rubber wheel with enhanced load capacity.",
    specifications: {
      size: "8\" x 2.5\"", 
      material: "Rubber with reinforced steel rim",
      weight: "2.1 kg",
      loadCapacity: "150 kg"
    }
  },
  {
    id: "PR0803",
    name: "PR0803",
    category: "Pneumatic Rubber Wheel", 
    size: "8\" x 3\"",
    image: "/products/PR0803.jpg",
    description: "Wide pneumatic rubber wheel for better stability and load distribution.",
    specifications: {
      size: "8\" x 3\"",
      material: "Rubber with steel rim",
      weight: "2.4 kg", 
      loadCapacity: "180 kg"
    }
  },
  {
    id: "PR0804",
    name: "PR0804",
    category: "Pneumatic Rubber Wheel",
    size: "8\" x 4\"", 
    image: "/products/PR0804.jpg",
    description: "Extra-wide pneumatic rubber wheel for heavy-duty industrial use.",
    specifications: {
      size: "8\" x 4\"",
      material: "Rubber with reinforced steel rim",
      weight: "3.2 kg",
      loadCapacity: "220 kg"
    }
  },
  {
    id: "PR1001",
    name: "PR1001", 
    category: "Pneumatic Rubber Wheel",
    size: "10\" x 2\"",
    image: "/products/PR1001.jpg",
    description: "Large pneumatic rubber wheel for construction and agricultural applications.",
    specifications: {
      size: "10\" x 2\"",
      material: "Rubber with steel rim", 
      weight: "2.8 kg",
      loadCapacity: "200 kg"
    }
  },
  {
    id: "PU0601",
    name: "PU0601",
    category: "PU Wheel", 
    size: "6\" x 2\"",
    image: "/products/PU0601.jpg",
    description: "Puncture-proof PU wheel with excellent durability and smooth rolling.",
    specifications: {
      size: "6\" x 2\"",
      material: "Polyurethane with steel rim",
      weight: "1.0 kg",
      loadCapacity: "100 kg"
    }
  },
  {
    id: "SO0801",
    name: "SO0801",
    category: "Solid Wheel",
    size: "8\" x 2\"", 
    image: "/products/SO0801.jpg",
    description: "Maintenance-free solid wheel for harsh environments and continuous use.",
    specifications: {
      size: "8\" x 2\"",
      material: "Solid rubber with steel rim",
      weight: "2.5 kg",
      loadCapacity: "300 kg"
    }
  }
];

export const hotSellingProducts = products.slice(0, 6);