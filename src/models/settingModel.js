import mongoose from "mongoose";

const apiSetting = new mongoose.Schema({
    api_key:{
        type:String,
        unique:true,
        required:[true,"Api key is required"]
    },
    api_value:{
        type:String,
        required:[true,"Api value is required"]
    }
},{

   timestamps:true  
})


// Static method to find value by key
apiSetting.statics.findValueByKey = async function(api_key) {
    const setting = await this.findOne({ api_key });
    if (!setting) {
        throw new Error('Setting not found');
    }
    return setting.api_value;
};

const Setting = mongoose.model('api_settings', apiSetting);

export default Setting;