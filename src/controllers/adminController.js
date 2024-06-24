import Admin from '../models/adminModel.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

// Register a new admin
export const registerAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        const admin = new Admin({ email, password: hashedPassword });
        const savedAdmin = await admin.save();

        res.status(201).json(savedAdmin);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Login an admin
export const loginAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;

        const admin = await Admin.findOne({ email });
        if (!admin) {
            return res.status(404).json({ message: "Admin not found" });
        }

        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // Generate JWT token
        const token = jwt.sign({ id: admin._id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });

        res.json({ message: "Login successful", token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update an admin
export const updateAdminById = async (req, res) => {
    try {
        const { id } = req.params;
        const { email, password } = req.body;

        const admin = await Admin.findById(id);
        if (!admin) {
            return res.status(404).json({ message: "Admin not found" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        admin.email = email;
        admin.password = hashedPassword;

        const updatedAdmin = await admin.save();

        res.json({ message: "Admin updated successfully", admin: updatedAdmin });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete an admin
export const deleteAdminById = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedAdmin = await Admin.findByIdAndDelete(id);

        if (!deletedAdmin) {
            return res.status(404).json({ message: "Admin not found" });
        }

        res.json({ message: "Admin deleted successfully", admin: deletedAdmin });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all admins
export const getAllAdmins = async (req, res) => {
    try {
        const admins = await Admin.find();
        res.json(admins);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get admin by id
export const getAdminById = async (req, res) => {
    try {
        const { id } = req.params;
        const admin = await Admin.findById(id);
        if (!admin) {
            return res.status(404).json({ message: "Admin not found" });
        }
        res.json(admin);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
