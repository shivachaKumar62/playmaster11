import express from 'express';
import { createSetting, getAllSettings, getSettingByKey, updateSetting, deleteSetting } from '../controllers/settingController.js';

const router = express.Router();

router.post('/', createSetting);
router.get('/', getAllSettings);
router.get('/:key', getSettingByKey);
router.put('/:id', updateSetting);
router.delete('/:id', deleteSetting);

export default router;
