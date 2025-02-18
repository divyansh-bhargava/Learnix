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
        type : number ,
        enum : [1,2,3,4,5]
    }
})
    
module.exports = mongoose.model("R&R", randrSchema )