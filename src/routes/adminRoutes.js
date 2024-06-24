import express from 'express';
import {
    registerAdmin,
    loginAdmin,
    updateAdminById,
    deleteAdminById,
    getAllAdmins,
    getAdminById
} from '../controllers/adminController.js'; // Adjust the path as necessary

import { authenticateToken } from '../middlewares/authMiddleware.js'; // Adjust the path as necessary

const router = express.Router();

// Public routes
router.post('/register', registerAdmin);
router.post('/login', loginAdmin);

// Protected routes
router.put('/:id', authenticateToken, updateAdminById);
router.delete('/:id', authenticateToken, deleteAdminById);
router.get('/', authenticateToken, getAllAdmins);
router.get('/:id', authenticateToken, getAdminById);

export default router;
