import mongoose from 'mongoose';

const useReferralCodeSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
  },
  used_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

const UseReferralCode = mongoose.model('use_referral_code', useReferralCodeSchema);

export default UseReferralCode;
