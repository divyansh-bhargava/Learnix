const mongoose = require('mongoose')

const profileSchema = new mongoose.Schema({
    gender : {
        type : String,
        enum : [male, female, other]
    },

    dob : {
        type : date
    },

    about : {
        type : String
    }


})

module.exports = mongoose.model("Profile", userSchema )