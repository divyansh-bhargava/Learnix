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

    whatWillYouLearn : {
        type : String,
        require : true
    },

    tumbnail : {
        type : String,
        require : true 
    },

    tag : {
        type : String,
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

    category :{
        type : mongoose.Schema.Types.ObjectId,
        ref : "Category" 
    },

    instructions: {
		type: [String],
	},

	status: {
		type: String,
		enum: ["Draft", "Published"],
	},

	createdAt: {
		type:Date,
		default:Date.now
	}
        

})

module.exports = mongoose.model("Course", courseSchema )