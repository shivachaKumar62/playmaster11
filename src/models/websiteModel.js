import mongoose from "mongoose";


const websiteSchema = new mongoose.Schema({
    page_name:{
      type:String,
      unique:true,
      required:[true,"Page Name is required"]
    },
    content:{
        type:String,
        required:false
    }
},
{
    timestamps: true // Enabling timestamps   
})

const WebPage = mongoose.model('web_pages', websiteSchema);

export default WebPage;