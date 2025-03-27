const mongoose = require('mongoose')
const mailSender = require("../utils/mailSender")
const otpTemplate = require('../mails/emailVerificationMail')

const otpSchema = new mongoose.Schema({
    email : {
        type : String,
        require : true,
    },

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

otpSchema.pre("save", async function(){
    
    if (this.isNew){
        await mailSender(this.email, this.otp, otpTemplate(this.otp))
        console.log(`email sent succesfully at ${this.email}`) 
    }
    
})
    
module.exports = mongoose.model("OTP", otpSchema)