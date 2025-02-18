const express = require("express")
const app = express()

require("dotenv").config()
const port = process.env.PORT || 3000

app.use(express.json())

const routes = require("")

const db = require("./config/database")
db()

app.listen(port ,()=>{
    console.log(`server start at port no ${port}`);  
})
