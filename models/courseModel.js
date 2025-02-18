const mongoose = require('mongoose')

const courseSchema = new mongoose.Schema({
    courseName : {
        type : String,
        require : true,
        trim : true
    },

    courseDiscription : {
        type : String,
        require : true,
        trim : true
    },

    price : {
        type : Number,
        require : true
    },

    instructor : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User" 
    },

    whatwillyoulearn : {
        type : String,
        require : true
    },

    tumbnail : {
        type : String,
        require : true 
    },

    students : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : "User"
        }
    ],

    courseContent : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : "Section" 
        }
    ],

    reviewsandrating : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : "R&R" 
        }
    ],

    tags : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : "Tag" 
        }
    ]

})

module.exports = mongoose.model("Course", courseSchema )