import mongoose from "mongoose";

const bonusSchema = new mongoose.Schema({
      name:{
        type:String,
        unique:true,
        required:[true,"Name is required"]
      },
      points:{
        type:Number,
        required:[true,"Bouns is required"]
      }
})


// Static method to find value by key
bonusSchema.statics.findBonusByName = async function(name) {
    const Bonus = await this.findOne({ name });
    if (!Bonus) {
        throw new Error('Setting not found');
    }
    return Bonus.points;
};

const Bonus = mongoose.model('Bonus', bonusSchema);

export default Bonus;