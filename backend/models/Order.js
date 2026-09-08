import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  orderItems: [
    {
      name: { type: String, required: true },
      qty: { type: Number, required: true },
      price: { type: Number, required: true },
      product: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Product', 
        required: true 
      }
    }
  ],
  totalPrice: { 
    type: Number, 
    required: true, 
    default: 0.0 
  },
  status: { 
    type: String, 
    enum: ['Pending', 'Processing', 'Shipped', 'Delivered'], 
    default: 'Pending' 
  }
}, { timestamps: true });

// Enforce standard default export mapping layout
export default mongoose.model('Order', orderSchema);
