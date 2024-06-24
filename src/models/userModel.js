import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true
    },
    country_code: {
        type: Number,
        required: [true, 'Country code is required']
    },
    phone: {
        type: Number,
        unique: true,
        required: [true, 'Phone number is required'],
        validate: {
            validator: function(v) {
                return /\d{10}/.test(v);
            },
            message: props => `${props.value} is not a valid phone number!`
        }
    },
    email: {
        type: String,
        lowercase: true,
        trim: true,
        validate: {
            validator: function(v) {
                return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v);
            },
            message: props => `${props.value} is not a valid email!`
        }
    },
    generate_refer_code: {
        type: String,
        unique:true,
        trim: true
    },
    image: {
        type: String,
        trim: true
    },
    user_type: {
        type: String,
        enum: ['normal', 'referral'],
        required: [true, 'Type is required']
    },
    username: {
        type: String,
        unique: true,
        sparse: true,  // Allowing null values to be unique
        trim: true
    },
    dob: {
        type: Date
    },
    gender: {
        type: String,
        enum: ['male', 'female', 'other']
    },
    fcm_token: {
        type: String,
        trim: true
    },
    status: {
        type: String,
        enum: ['active', 'de-active'],
        default: 'active'
    }
}, {
    timestamps: true  // Adds createdAt and updatedAt timestamps
});

userSchema.index({ phone: 1 });
userSchema.index({ username: 1 });

const User = mongoose.model('User', userSchema);

export default User;
