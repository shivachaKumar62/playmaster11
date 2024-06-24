import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId, // Assuming user_id is a reference to a user document
        ref: 'User', // Reference to User model, adjust as necessary
        required: true
    },
    status: {
        type: String,
        enum: ['success', 'failed', 'pending'],
        default:"pending"
    },
    amount: {
        type: Number,
        required:true
    },
    payment_type: {
        type: String,
    },
    transaction_mode: {
        type: String,
    },
    contest_id: {
        type: Number,
    },
    transaction_vi: {
        type: String,
    },
    withdraw_request:{
        type:String,
        enum:['accept','reject'],
        default:"reject"
    }
}, {
    timestamps: true // This option adds `createdAt` and `updatedAt` fields to the schema
});

const Transaction = mongoose.model('Transection', transactionSchema);

export default Transaction;
