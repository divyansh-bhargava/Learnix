const express = require("express")
const app = express()

require("dotenv").config()
const db = require("./config/database")
const cookieParser = require("cookie-parser")
const user = require("./routes/user")
const fileUpload = require("express-fileupload");
const { cloudinaryConnect } = require("./config/cloudinary");
const course = require("./routes/course");




const port = process.env.PORT || 3000

app.use(express.json())
app.use(cookieParser())
app.use(
	fileUpload({
		useTempFiles:true,
		tempFileDir:"/tmp",
	})
)


app.use("/api/v1/auth", user);
app.use("/api/v1/course",  course);



cloudinaryConnect();

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
