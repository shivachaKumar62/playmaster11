import mongoose from "mongoose";

const addressSchema = new mongoose.Schema({
    local_address:{
        type: String,
        trim: true
    },
    city: {
        type: String,
        trim: true
    },
    zipcode: {
        type: Number,
        validate: {
            validator: function(v) {
                return /^\d{5}(-\d{4})?$/.test(v); // US ZIP code format validation
            },
            message: props => `${props.value} is not a valid ZIP code!`
        }
    },
    state: {
        type: String,
        trim: true
    },
    country: {
        type: String,
        trim: true
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {
    timestamps: true  // Adds createdAt and updatedAt timestamps
});

const Address = mongoose.model('user_address', addressSchema);

export default Address;
