const mongoose = require('mongoose')
const mailSender = require("../utils/mailSender")

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
    const body = <h1>this OTP is for sign in purpose , DONOT SHARE WITH ANYONE</h1>
    await mailSender(this.email, this.otp, body )
})
    
module.exports = mongoose.model("OTP", otpSchema)