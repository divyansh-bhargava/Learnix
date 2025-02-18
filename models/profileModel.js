const mongoose = require('mongoose')

const profileSchema = new mongoose.Schema({
    gender : {
        type : String,
        enum : [male, female, other]
    },

    address : {
        type : String,
        trim : true
    },

    pincode : {
        type : String,
        length : 6
    },

    dob : {
        type : date
    },

    about : {
        type : String
    }


})

module.exports = mongoose.model("Profile", userSchema )