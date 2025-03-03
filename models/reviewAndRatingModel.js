const mongoose = require('mongoose')

const randrSchema = new mongoose.Schema({
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User"
    },
    
    review : {
        type : String
    },
    
    rating : {
        type : Number ,
        enum : [1,2,3,4,5]
    },

    course: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: "Course",
		index: true,
	}

})
    
module.exports = mongoose.model("R&R", randrSchema )