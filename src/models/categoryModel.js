import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Categor name is required"],
        unique:true
    }
}, {
    timestamps: true // Enabling timestamps
});
const category = mongoose.model('category', categorySchema);

export default category;