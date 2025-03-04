const mongoose = require('mongoose')

const sectionSchema = new mongoose.Schema({
    title : {
        type : String,
        require : true,
    },
    
    subsection : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : "Sub-section"
        }
    ]
})
    
module.exports = mongoose.model("Section", sectionSchema )