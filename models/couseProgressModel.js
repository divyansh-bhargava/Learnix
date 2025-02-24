const mongoose = require('mongoose')

const cpSchema = new mongoose.Schema({
    course : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Course"
    },

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    
    completedss : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : "Sub-section"
        }
    ]
})
    
module.exports = mongoose.model("CourseProgress", cpSchema )