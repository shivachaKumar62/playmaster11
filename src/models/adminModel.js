import mongoose from 'mongoose';

const adminSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: [true, "Email address is required"],
            match: [/.+\@.+\..+/, "Please enter a valid email address"]
        },
        password: {
            type: String,
            required: [true, "Password is required"]
        }
    },
    {
        timestamps: true,
    }
);

const Admin = mongoose.model('Admin', adminSchema);

export default Admin;
