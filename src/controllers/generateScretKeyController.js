import Setting from "../models/settingModel.js";
import crypto from "crypto";


// export const generateScretKey = async (req, res) => {
//     try {
//         const secretKey = crypto.randomBytes(64).toString('hex');
        
//         // Save the secret key to the database
//         const keydata = new Setting({ api_key: "ACCESS_TOKEN", api_value: secretKey });
//         await keydata.save();

//         res.status(200).json({ message: "Secret key generated and saved successfully." });
//     } catch (error) {
       
//         res.status(500).json({ error: "Internal server error" });
//     }
// };



export const generateSecretKey = async (req, res) => {
    try {
        const secretKey = crypto.randomBytes(64).toString('hex');

        // Check if the key already exists in the database
        const existingKey = await Setting.findOne({ api_key: "ACCESS_TOKEN" });

        if (existingKey) {
            // Update the existing key
            existingKey.api_value = secretKey;
            await existingKey.save();
            res.status(200).json({ message: "Secret key updated successfully." });
        } else {
            // Save the new secret key to the database
            const keydata = new Setting({ api_key: "ACCESS_TOKEN", api_value: secretKey });
            await keydata.save();
            res.status(200).json({ message: "Secret key generated and saved successfully." });
        }
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
};

export const updateSecretKey = async (req, res) => {
    try {
        const { newSecretKey } = req.body; // Assuming newSecretKey is passed in the request body
        
        // Update the secret key in the database
        const setting = await Setting.findOneAndUpdate(
            { api_key: "ACCESS_TOKEN" },
            { $set: { api_value: newSecretKey } },
            { new: true }
        );

        if (!setting) {
            return res.status(404).json({ error: "Setting not found" });
        }

        res.status(200).json({ message: "Secret key updated successfully." });
    } catch (error) {
        console.error("Error updating secret key:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

export const deleteSecretKey = async (req, res) => {
    try {
        // Delete the secret key from the database
        const setting = await Setting.findOneAndDelete({ api_key: "ACCESS_TOKEN" });

        if (!setting) {
            return res.status(404).json({ error: "Setting not found" });
        }

        res.status(200).json({ message: "Secret key deleted successfully." });
    } catch (error) {
        console.error("Error deleting secret key:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};


export const getSecretKey = async (req, res) => {
    try {
        // Retrieve the secret key from the database
        const setting = await Setting.findOne({ api_key: "ACCESS_TOKEN" });

        if (!setting) {
            return res.status(404).json({ error: "Setting not found" });
        }

        res.status(200).json({ secretKey: setting.api_value });
    } catch (error) {
        console.error("Error retrieving secret key:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};
