import express from "express";
import { createBonus,getAllBonuses,getBonusById,updateBonusById,deleteBonusById} from '../controllers/bonusController.js'; // Adjust the path to your bonusController file
const router = express.Router();

// Create a new bonus
router.post('/', createBonus);

// Get all bonuses
router.get('/', getAllBonuses);

// Get a bonus by name
router.get('/:id', getBonusById);

// Update a bonus by name
router.put('/:id', updateBonusById);

// Delete a bonus by name
router.delete('/:id', deleteBonusById);

export default router;