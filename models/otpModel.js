const mongoose = require('mongoose')

const otpSchema = new mongoose.Schema({
    otp : {
        type : String,
        require : true,
    },
    
    createdAt : {
        type : Date,
        default : Date.now(),
        expires : 5*60
    }
})
    
module.exports = mongoose.model("OTP", otpSchema )