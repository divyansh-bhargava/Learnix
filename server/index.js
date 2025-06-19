const express = require("express")
const app = express()
const cors = require("cors")

require("dotenv").config()

const db = require("./config/database")
const { cloudinaryConnect } = require("./config/cloudinary")

const cookieParser = require("cookie-parser")
const fileUpload = require("express-fileupload")


const user = require("./routes/user")
const course = require("./routes/course")
const profile = require("./routes/profile")


const port = process.env.PORT || 3000

app.use(express.json())
app.use(cookieParser())
app.use(
	fileUpload({
		useTempFiles:true,
		tempFileDir:"/tmp",
	})
)

app.use(cors())

app.use("/api/v1/auth", user);
app.use("/api/v1/course",  course);
app.use("/api/v1/profile",  profile);



cloudinaryConnect()

db()

app.listen(port ,()=>{
    console.log(`server start at port no ${port}`);  
})

app.get("/", (req, res) => {
	return res.json({
		success:true,
		message:'Your server is up and running....'
	});
});
