import  Transaction  from "../models/transacationModel.js"// Assuming your model is in the models directory
import Bonus from "../models/bounsModel.js"; // Assuming your model is in the models directory


export async function createTransaction(userSave, bonusName) {
    try {
        // Find the bonus by name
        const signBonus = await Bonus.findBonusByName(bonusName);

        // If the bonus is not found, throw an error
        if (!signBonus) {
            throw new Error('Sign-up bonus not found');
        }

        // Create a new transaction with the custom fields
        const transaction = new Transaction({
            user_id: userSave.id, // Ensure this correctly accesses the user ID
            status: "success", // Custom field for status
            amount: signBonus, // Custom field for amount
            payment_type: "bonus", // Custom field for payment type
            transaction_mode: "sign up bonus", // Custom field for transaction mode
            transaction_vi: "playmaster11", // Custom field
            withdraw_request_status: "reject" // Custom field for withdraw request status
        });

        // Save the transaction to the database
        await transaction.save();

        // Return success status
        return { status: "success" };
    } catch (error) {
        // Return failure status and error message
        return { status: "failure", error: error.message };
    }
}

export async function createTransactionByReference(userSave, existingReferCode) {


    try {
        // Find the bonuses by name
        const referenceBonus = await Bonus.findBonusByName("reference_bonus");
        const referredBonus = await Bonus.findBonusByName("refered_bonus");
        const signUpBonus = await Bonus.findBonusByName("sign_up_bonus");



        // Check if all bonuses are found
        if (!referenceBonus || !referredBonus || !signUpBonus) {
            throw new Error('One or more bonuses not found');
        }
        
       
        // Create transactions for the user and the existing refer code
        await transactionFunction(
            userSave.id,
            "success",
            "bonus",
            "reference bonus",
            "playmaster11",
            "reject",
            referenceBonus + signUpBonus
        );

        
        await transactionFunction(
            existingReferCode.id,
            "success",
            "bonus",
            "refered bonus",
            "playmaster11",
            "reject",
            referredBonus
        );

        // Return success status
        return { status: "success" };
    } catch (error) {
        // Return failure status and error message
        return { status: "failure", error: error.message };
    }
}

async function transactionFunction(id, status, paymentType, transactionMode, transactionVi, withdrawRequestStatus, amount) {
    try {

        const transaction = new Transaction({
            user_id: id, // Ensure this correctly accesses the user ID
            status: status, // Custom field for status
            amount: amount, // Custom field for amount
            payment_type: paymentType, // Custom field for payment type
            transaction_mode: transactionMode, // Custom field for transaction mode
            transaction_vi: transactionVi, // Custom field
            withdraw_request_status: withdrawRequestStatus // Custom field for withdraw request status
        });
        console.log(transaction);

        // Save the transaction to the database
        await transaction.save();
    } catch (error) {
        throw new Error(`Failed to create transaction: ${error.message}`);
    }
}


