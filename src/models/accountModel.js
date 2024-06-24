import mongoose from "mongoose";

const accountSchema = new mongoose.Schema({
    acc_name: {
        type: String,
        required: true,
        trim: true
    },
    acc_no: {
        type: Number,
        required: true,
        unique: true
    },
    ifsc_no: {
        type: String,
        required: true,
        trim: true
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {
    timestamps: true  // Adds createdAt and updatedAt timestamps
});

const Account = mongoose.model('acount', accountSchema);

export default Account;
