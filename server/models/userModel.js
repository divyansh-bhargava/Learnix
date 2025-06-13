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
        unique : true
    },

    password : {
        type : String,
        require : true,
    },

    accountType : {
        type : String,
        enum : ["Student" , "Instructor" , "Admin"]
    },

    active: {
        type: Boolean,
        default: true,
    },

    approved: {
        type: Boolean,
        default: true,
    },

    token : {
        type : String
    },

    tokenExpiresIn : {
        type : String
    },

    image: {
        type: String,
        // required: true,
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


},{ timestamps: true })

module.exports = mongoose.model("User", userSchema )