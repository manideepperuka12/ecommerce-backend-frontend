import express from 'express';
import { registerUser, loginUser } from '../controllers/authController.js';
const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);

// Ensure this exact default export syntax is at the bottom:
export default router; 
