const mongoose = require("mongoose")
require("dotenv").config()

const port = process.env.DATABASE_URL

const dbconnect = () => {
    mongoose.connect(port,{
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(()=> console.log("db connect success fully"))
    .catch((err)=>{
        console.log("issue in db connection")
        console.error(err);
        process.exit(1)
        
    })
}

module.exports = dbconnect