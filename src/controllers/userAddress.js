import Address from "../models/userAddressModel.js";
import Setting from "../models/settingModel.js";
import jwt from 'jsonwebtoken';

export const updateAddress = async (req, res) => {
    const jwtToken = req.header('jwt_token'); // Assuming JWT token is passed in Authorization header

    if (!jwtToken) {
        return res.status(401).json({ success: false, message: 'Authorization token missing' });
    }

    try {
        // Get the JWT secret key
        const ACCESS_TOKEN = await Setting.findValueByKey("ACCESS_TOKEN"); // Replace with your JWT secret key

        // Verify JWT token
        const decoded = jwt.verify(jwtToken, ACCESS_TOKEN);

        // Extract user ID from decoded JWT payload
        const userId = decoded.existingUser._id;

        // Address data from request body
        const addressData = req.body;

        // Find address by user ID
        let address = await Address.findOne({ user_id: userId });

        if (address) {
            // Update existing address
            address = await Address.findOneAndUpdate(
                { user_id: userId },
                { $set: addressData },
                { new: true, runValidators: true }
            );
            return res.json({ success: true, message: 'Address updated successfully', data: address });
        } else {
            // Create new address
            address = new Address({ user_id: userId, ...addressData });
            await address.save();
            return res.json({ success: true, message: 'Address created successfully', data: address });
        }
    } catch (error) {
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ success: false, message: 'Invalid JWT token' });
        }
        res.status(500).json({ success: false, message: error.message });
    }
};

