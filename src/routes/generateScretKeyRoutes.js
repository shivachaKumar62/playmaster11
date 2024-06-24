import express from "express"
import {generateSecretKey,updateSecretKey,deleteSecretKey,getSecretKey} from "../controllers/generateScretKeyController.js";

const router = express.Router();

router.post('/generate-key', generateSecretKey);
router.put('/update-key', updateSecretKey);
router.delete('/delete-key', deleteSecretKey);
router.get('/get-key', getSecretKey);

export default router;