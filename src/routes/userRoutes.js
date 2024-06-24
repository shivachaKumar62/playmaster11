import express from "express";
import {userRegister,otpVerification,userUpdate,getUserList} from "../controllers/userController.js";

const router = express.Router();

router.post("/",userRegister);
router.post("/verify-otp",otpVerification);
router.put("/update",userUpdate);
router.get("/",getUserList);

export default router;

