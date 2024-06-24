import mongoose from 'mongoose';

const bannerSchema = new mongoose.Schema({
    image: {
        type: String,
        required: [true, "Banner Image is required"]
    }
}, {
    timestamps: true // Enabling timestamps
});
const Banner = mongoose.model('Banner', bannerSchema);

export default Banner;
