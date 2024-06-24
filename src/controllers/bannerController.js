import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import Banner from '../models/bannerModel.js';
import { imagePath as configImagePath } from '../config/config.js';
import multer from 'multer'; 
import { getStorage } from '../components/file.js';




// Get the current file path and directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware for handling file upload with dynamic destination
const dynamicUpload = (req, res, next) => {
    const destination = `./uploads/banner`; 

    
    fs.mkdirSync(destination, { recursive: true });

    
    const storage = getStorage(destination);
    const uploadMiddleware = multer({ storage }).single('image');

    uploadMiddleware(req, res, (err) => {
        if (err) {
            return res.status(400).json({ message: err.message });
        }
        next();
    });
};

// Controller to handle creating a new banner
export const createBanner = async (req, res) => {
    try {
        const baseUrl = process.env.BASE_URL;
        const imagePath = `${baseUrl}/${req.file.path}`;
        
        // Save the image path to the database
        const newBanner = new Banner({ image: imagePath});
        await newBanner.save();

        res.status(201).json(newBanner);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Controller to get all banners
export const getAllBanners = async (req, res) => {
    try {
        const banners = await Banner.find();
        res.status(200).json(banners);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Controller to get a banner by ID
export const getBannerById = async (req, res) => {
    try {
        const banner = await Banner.findById(req.params.id);
        if (!banner) {
            return res.status(404).json({ message: 'Banner not found' });
        }
        res.status(200).json(banner);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Controller to update a banner by ID
export const updateBanner = async (req, res) => {
    try {
        const banner = await Banner.findById(req.params.id);
        if (!banner) {
            return res.status(404).json({ message: 'Banner not found' });
        }

        if (req.file) {
            const baseUrl = process.env.BASE_URL;
            banner.image = `${baseUrl}/${req.file.path}`;
        }

        await banner.save();
        res.status(200).json(banner);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Controller to delete a banner by ID

export const deleteBanner = async (req, res) => {
    try {
        const banner = await Banner.findById(req.params.id);
        if (!banner) {
            return res.status(404).json({ message: 'Banner not found' });
        }

        // Remove the base URL from the image path
        let imagePath = banner.image.replace('http://localhost:8000/uploads', '');

        // Replace backslashes with forward slashes if needed
        imagePath = imagePath.replace(/\\/g, '/');

        const filePath = path.join(__dirname, '..', configImagePath, imagePath);
        
       
        fs.unlink(filePath, async (err) => {
            if (err) {
                console.error('Error deleting the file:', err);
                return res.status(500).json({ message: 'Error deleting the file', error: err });
            }

            // If file deletion was successful, delete the banner from the database
            await Banner.findByIdAndDelete(req.params.id);

            res.status(200).json({ message: 'Banner deleted successfully' });
        });
    } catch (error) {
        console.error('Error deleting banner:', error);
        res.status(400).json({ message: error.message });
    }
};



// Export the middleware
export { dynamicUpload };


