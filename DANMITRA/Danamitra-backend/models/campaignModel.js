const mongoose = require('mongoose');

const campaignSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true
      },
      goalAmount : {
        type: Number,
        required : [true, 'Amount is required'],
      },
      moneyCollected:{
        type:Number,
        default:0
      },
      description: {
        type: String,
        trim: true,
      },
      createdAt: {
        type: Date,
        default: Date.now,
      }
})

module.exports = mongoose.model("Campaign" , campaignSchema);