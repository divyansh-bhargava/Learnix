const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    fname : {
        type : String,
        require : true,
        trim : true
    },

    lname : {
        type : String,
        require : true,
        trim : true
    },

    contactNumber : {
        type : String,
        require : true,
        length : 10
    },

    email : {
        type : String,
        require : true,
    },

    password : {
        type : String,
        require : true,
    },

    accountType : {
        type : String,
        enum : [student , instructor , admin]
    },

    token : {
        type : String
    },

    tokenexpireIn : {
        type : String
    },

    courses : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : "Course"
        }
    ],

    courseProgress : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : "CourseProgress"
        }
    ],

    profile : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Profile"
    }


})

module.exports = mongoose.model("User", userSchema )