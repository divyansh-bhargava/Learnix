const mongoose = require("mongoose")

const tagSchema = new mongoose.schema({
    name : {
        type : String,
        require : true,
        trim : true
    },

    description : {
        type : String,
    },

    courses : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref  : "Course"
        }
    ]
})

module.exports = mongoose.model("Tag",tagSchema)
