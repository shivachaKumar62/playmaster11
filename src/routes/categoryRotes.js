import express from 'express';
import { categorCreate, getAllCategories, getCategoryById, updateCategory, deleteCategory } from '../controllers/categoryController.js';

const router = express.Router();

router.post('/create',categorCreate);

router.get('/', getAllCategories);
router.get('/:id', getCategoryById);
router.put('/:id', updateCategory);
router.delete('/:id', deleteCategory);


export default router;