import User from "../models/userModel.js";
import Setting from "../models/settingModel.js";
import UseReferralCode from "../models/userReferalCodemodel.js";
import { createTransaction,createTransactionByReference } from "./transactionController.js";
import axios from 'axios';
import jwt from 'jsonwebtoken';


export const userRegister = async (req, res) => {
  try {
    const { country_code, phone } = req.body;
    // Call function to send OTP asynchronously
    await sendTwoFactorOTP(country_code, phone);
    res.status(200).json({ message: "OTP sent successfully" });
  } catch (error) {
    res.status(400).json({ message: "Failed to send OTP" });
  }
};

// export const otpVerification = async (req, res) => {
//   try {
//     const { phone, otp, country_code, type,refer_code } = req.body;
//     const api_key = await Setting.findValueByKey("2Factor");
    
//     const url = `https://2factor.in/API/V1/${api_key}/SMS/VERIFY3/${country_code}${phone}/${otp}`;
    
//     const response = await axios.get(url);

//     if (response.data.Status == "Success") {
        
//         const existingUser = await User.findOne({ phone });
        
//         if (existingUser) { 
//           res.status(200).json({ message: "Successfully logged in" });
//         } 
//         else {
//             const referralCode = generateReferralCode();
//             if (type == "normal") {
//               // Generate a unique referral code 
//               const storeUser = new User({
//                 phone,
//                 country_code,
//                 user_type: type,
//                 generate_refer_code: referralCode,
//               });
//               const userSave = await storeUser.save();
//               const transection = await createTransaction(userSave,"sign_up_bonus");
//               if (transection.status === "success") {
//                 res.status(200).json({ message: "You are successfully registered" });
//               } else {
//                 res.status(500).json({message: "Failed to create transaction",error: transection.error,});
//               }
//             } else {
//                 const existingrefercode = await User.findOne({ generate_refer_code:refer_code });
//                 if(!existingrefercode){
//                     res.status(400).json({ message: "This refer code is invalid" });
//                 }
//                 else{
//                   const storeUser = new User({
//                     phone,
//                     country_code,
//                     user_type: type,
//                     generate_refer_code: referralCode,
//                   });
//                   const userSave = await storeUser.save();
//                   const transaction = await createTransactionByReference(userSave,existingrefercode);
//                   if (transection.status === "success") {
//                     res.status(200).json({ message: "You are successfully registered" });
//                   } else {
//                     res.status(500).json({message: "Failed to create transaction",error: transection.error,});
//                   }
//                 }
              
              
//             }
//           }
//       } 
//       else{
//         res.status(400).json(response.data);
//       }
//   } catch (error) {
//     res.status(500).json({ message: "Failed to verify OTP" });
//   }
// };

export const otpVerification = async (req, res) => {
  try {
    const { phone, otp, country_code, type, refer_code } = req.body;
    const api_key = await Setting.findValueByKey("2Factor");
    const url = `https://2factor.in/API/V1/${api_key}/SMS/VERIFY3/${country_code}${phone}/${otp}`;
    
    const response = await axios.get(url);
    if (response.data.Status !== "Success") {
      return res.status(400).json(response.data);
    }
    const ACCESS_TOKEN = await Setting.findValueByKey("ACCESS_TOKEN");
    const existingUser = await User.findOne({ phone });
    if (existingUser) {
      // Generate JWT token
      const token = jwt.sign({ existingUser}, ACCESS_TOKEN, { expiresIn: '1h' });
      return res.status(200).json({ message: "Successfully logged in" ,token});
    }

    const referralCode = generateReferralCode();
    const storeUser = new User({
      phone,
      country_code,
      user_type: type,
      generate_refer_code: referralCode,
    });

    if (type === "normal") {
      await registerNormalUser(storeUser, res);
    } else {
      await registerReferredUser(storeUser,refer_code, res);
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to verify OTP", error: error.message });
  }
};

const registerNormalUser = async (user, res) => {

  try {
    const userSave = await user.save();
    const transaction = await createTransaction(userSave, "sign_up_bonus");

    if (transaction.status === "success") {
      res.status(200).json({ message: "You are successfully registered" });
    } else {
      res.status(500).json({ message: "Failed to create transaction", error: transaction.error });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to register user", error: error.message });
  }
};

const registerReferredUser = async (user,refer_code, res) => {
  try {
    const existingReferCode = await User.findOne({ generate_refer_code: refer_code });
    if (!existingReferCode) {
      return res.status(400).json({ message: "This refer code is invalid" });
    }

    const userSave = await user.save();

    const usedReferenceData = new UseReferralCode({code:refer_code,used_by:userSave.id});

    await usedReferenceData.save();

    const transaction = await createTransactionByReference(userSave, existingReferCode);

    if (transaction.status === "success") {
      res.status(200).json({ message: "You are successfully registered" });
    } else {
      res.status(500).json({ message: "Failed to create transaction", error: transaction.error });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to register user", error: error.message });
  }
};

async function sendTwoFactorOTP(country_code, mobile_number) {
  try {
    const api_key = await Setting.findValueByKey("2Factor");

    const template_name = "OTP1";
    const url = `https://2factor.in/API/V1/${api_key}/SMS/+${country_code}${mobile_number}/AUTOGEN2/${template_name}`;

    const response = await axios.get(url);

    return response.data;
  } catch (error) {
    throw new Error("An error occurred while sending the OTP");
  }
}

// Function to generate a random alphanumeric referral code
function generateReferralCode() {
  const length = 8; // Adjust the length of the referral code as needed
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let referralCode = "";

  for (let i = 0; i < length; i++) {
    referralCode += characters.charAt(
      Math.floor(Math.random() * characters.length)
    );
  }

  return referralCode;
}
//get the used data and address
export const getUserList = async (req, res) => {
  try {
    const users = await User.aggregate([
      {
        $lookup: {
          from: "user_addresses",  // The collection to join with
          localField: "_id",       // Field from the User collection
          foreignField: "user_id", // Field from the user_addresses collection
          as: "address"            // Output array field
        }
      }
    ]);

    res.status(200).json(users); // Send the users as the response with a 200 OK status
  } catch (error) {
   
    res.status(500).json({ error: error.message }); // Handle any errors
  }
};


export const userUpdate = async (req, res) => {
  const jwtToken = req.header('jwt_token');

  if (!jwtToken) {
      return res.status(401).json({ success: false, message: 'Authorization token missing' });
  }

  try {
      const ACCESS_TOKEN = await Setting.findValueByKey("ACCESS_TOKEN");
      const decoded = jwt.verify(jwtToken, ACCESS_TOKEN);

      const userId = decoded.existingUser;
      const updateData = req.body;

      const updatedUser = await User.findByIdAndUpdate(
          userId,
          { $set: updateData },
          { new: true, runValidators: true }
      );

      if (!updatedUser) {
          return res.status(404).json({ success: false, message: 'User not found' });
      }

      res.json({ success: true, data: updatedUser });
  } catch (error) {
      if (error.name === 'JsonWebTokenError') {
          return res.status(401).json({ success: false, message: 'Invalid JWT token' });
      }
      res.status(500).json({ success: false, message: error.message });
  }
};
