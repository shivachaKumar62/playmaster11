import express from 'express';
import './config/connection.js'; 
import {getStorage} from './components/file.js';
import adminRoutes from './routes/adminRoutes.js';
import bannerRoutes from './routes/bannerRoutes.js';
import categoryRoutes from './routes/categoryRotes.js';
import pageRoutes from './routes/websiteRoutes.js';
import settingsRoutes from './routes/settingRoutes.js';
import userRoutes from "./routes/userRoutes.js";
import bonusRoutes from "./routes/bonusRoutes.js";
import scretKeyRoutes from "./routes/generateScretKeyRoutes.js";
import addressRoutes from "./routes/userAddressRoutes.js";

import dotenv from 'dotenv';

// Configure dotenv to load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

const upload = (destination) => multer({ storage: getStorage(destination) });

app.get("/", (req, res) => {
    res.send({ message: "We are on the home page" });
});


// Use the admin routes
app.use('/admin', adminRoutes);

// banner Routes
app.use('/banners', bannerRoutes);

// category Routes
app.use('/category', categoryRoutes);

//pages route
app.use('/page',pageRoutes);

//website setting route
app.use('/setting',settingsRoutes);

//user routes
app.use('/user',userRoutes);

//boues routes
app.use('/bonus',bonusRoutes);

//screte key 
app.use('/scret',scretKeyRoutes);

//user address routes
app.use('/address',addressRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
