import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from './models/Product.js';

// Load environmental credentials configurations
dotenv.config();

const storefrontProducts = [
  {
    name: "Apple iPhone 15 Pro Max",
    description: "Natural Titanium, 256GB. Pro camera system with a 5x Telephoto lens and the groundbreaking A17 Pro chip.",
    price: 1199,
    stock: 45,
    imageUrl: "https://unsplash.com"
  },
  {
    name: "Apple MacBook Pro 14-inch",
    description: "M3 chip, 8-core CPU, 10-core GPU, 14.2-inch Liquid Retina XDR Display, 512GB ultra-fast SSD storage.",
    price: 1599,
    stock: 20,
    imageUrl: "https://unsplash.com"
  },
  {
    name: "Sony WH-1000XM5 Headphones",
    description: "Wireless industry-leading noise-canceling over-ear headphones with premium microphone array for clear calling.",
    price: 398,
    stock: 65,
    imageUrl: "https://unsplash.com"
  },
  {
    name: "Apple Watch Series 9",
    description: "Midnight Aluminum Case with Midnight Sport Band. Smartwatch featuring advanced health metrics and crash detection.",
    price: 399,
    stock: 50,
    imageUrl: "https://unsplash.com"
  },
  {
    name: "Keychron Mechanical Keyboard",
    description: "Wireless Bluetooth custom mechanical keyboard with hot-swappable tactile switches and solid aluminum frame setup.",
    price: 189,
    stock: 30,
    imageUrl: "https://unsplash.com"
  }
];

const injectData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("⚡ Connected to MongoDB cluster for data injection...");
    
    // Clear out empty state placeholders
    await Product.deleteMany();
    console.log("🧹 Previous collections wiped clean.");

    // Bulk insert the tech items catalog array documents
    await Product.insertMany(storefrontProducts);
    console.log("🎉 SUCCESS! Products populated with images and prices successfully!");
    
    process.exit(0);
  } catch (error) {
    console.error(`❌ Data seeding failed error: ${error.message}`);
    process.exit(1);
  }
};

injectData();
