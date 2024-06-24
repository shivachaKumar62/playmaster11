// routes/bannerRoutes.js
import express from 'express';
import {
    createBanner,
    getAllBanners,
    getBannerById,
    updateBanner,
    deleteBanner,
    dynamicUpload
} from '../controllers/bannerController.js';

const router = express.Router();

// Route to create a new banner with dynamic file upload
router.post('/', dynamicUpload, createBanner);

// Route to get all banners
router.get('/', getAllBanners);

// Route to get a banner by ID
router.get('/:id', getBannerById);

// Route to update a banner by ID with dynamic file upload
router.put('/:id', dynamicUpload, updateBanner);

// Route to delete a banner by ID
router.delete('/:id', deleteBanner);


export default router;

