import express from "express";

import {updateAddress} from "../controllers/userAddress.js"

const router = express.Router();

router.post('/',updateAddress);

export default router;