const express = require("express")
const app = express()

require("dotenv").config()
const db = require("./config/database")
const cookieParser = require("cookie-parser")
const user = require("./routes/user")



const port = process.env.PORT || 3000

app.use(express.json())
app.use(cookieParser())


app.use("/api/v1/auth", user);


db()

app.listen(port ,()=>{
    console.log(`server start at port no ${port}`);  
})
