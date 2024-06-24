import Bonus from "../models/bounsModel.js";

// Create a new bonus
export const createBonus = async (req, res) => {
    try {
        const bonus = new Bonus(req.body);
        await bonus.save();
        res.status(201).json(bonus);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Get all bonuses
export const getAllBonuses = async (req, res) => {
    try {
        const bonuses = await Bonus.find();
        res.status(200).json(bonuses);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Get a bonus by ID
export const getBonusById = async (req, res) => {
    try {
        const bonus = await Bonus.findById(req.params.id);
        if (!bonus) {
            return res.status(404).json({ error: 'Bonus not found' });
        }
        res.status(200).json(bonus);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Update a bonus by ID
export const updateBonusById = async (req, res) => {
    try {
        const bonus = await Bonus.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!bonus) {
            return res.status(404).json({ error: 'Bonus not found' });
        }
        res.status(200).json(bonus);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Delete a bonus by ID
export const deleteBonusById = async (req, res) => {
    try {
        const bonus = await Bonus.findByIdAndDelete(req.params.id);
        if (!bonus) {
            return res.status(404).json({ error: 'Bonus not found' });
        }
        res.status(200).json({ message: 'Bonus deleted successfully' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};