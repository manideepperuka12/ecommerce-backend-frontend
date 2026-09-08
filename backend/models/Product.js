import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
  },
  description: { 
    type: String, 
    required: true 
  },
  price: { 
    type: Number, 
    required: true 
  },
  stock: { 
    type: Number, 
    required: true, 
    default: 0 
  },
  imageUrl: { 
    type: String, 
    default: 'https://placeholder.com' 
  }
}, { timestamps: true });

// Enforce standard default export mapping layout
export default mongoose.model('Product', productSchema);
