const mongoose = require('mongoose')

const subSectionSchema = new mongoose.Schema({
    title : {
        type : String,
        require : true,
    },

    description : {
        type : String,
        require : true,
    },
    
    video : {
        type : String,
    },

    duration : {
        type : String
    },

    additionalurl : {
        type : String
    }
})
    
module.exports = mongoose.model("Sub-section", subSectionSchema )