import mongoose from "mongoose";

const kysSchema = new mongoose.Schema({
    PA_number: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['verify', 'pending', 'failed'],
        default: 'pending' // Set a default status if none is provided
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {
    timestamps: true  // Adds createdAt and updatedAt timestamps
});

const KYS = mongoose.model('KYS', kysSchema);

export default KYS;
