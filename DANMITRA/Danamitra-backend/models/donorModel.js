const mongoose = require('mongoose');

const donorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true
      },
      email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        trim: true,
        lowercase: true,
        match: [/.+@.+\..+/, 'Please enter a valid email']
      },
      password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: 6
      },
      donationHistory: [
        {
          campaignId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Campaign',
            required: true
          },
          amount: {
            type: Number,
            required: true
          },
          donationDate: {
            type: Date,
            default: Date.now
          }
        }
      ],
      createdAt: {
        type: Date,
        default: Date.now
      }
});

module.exports = mongoose.model('Donor', donorSchema);
 
