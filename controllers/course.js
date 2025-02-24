const Course = require('../models/courseModel');
const User = require('../models/userModel');
const Category = require('../models/categoryModel');
const {uploadImageToCloudinary}  = require('../utils/cloudinary');
const { populate } = require('../models/reviewAndRatingModel');
require("dotenv").config();


exports.createCourse = async (req , res) => {

    const { courseName ,courseDescription ,whatWillYouLearn , price , tag , category  } = req.body

    const thumbnail = req.file.thumbnail

    if(!courseName || !courseDescription || !whatWillYouLearn || !price || !tag || !category || !thumbnail ){
        return res.status(400).json({
            success : false,
            message : "fill all details"
        })
    }

    const image =  await uploadImageToCloudinary( thumbnail, process.env.FOLDER_NAME )

    const instructorId = req.user.Id

    const categorydb = await Category.findOne({ name : category })

    if(!categorydb){
        return res.status(400).json({
            success : false,
            message : "invalid category"
        })
    }

    const course = await Course.create({
        courseName,
        courseDescription,
        whatWillYouLearn,
        price,
        tag,
        instructor : instructorId,
        thumbnail : image,
        category : category 
    })

    const user = await User.findByIdAndUpdate(instructorId,{
        course : course._id
    },{new : true})

    const newcategory = await Category.findByIdAndUpdate(category,{
        course : course._id
    },{new : true})

    res.status(400).json({
        success : true ,
        data : course ,
        message : "course created successfully"
    })

}


exports.getAllCourse = async (req , res) => {
    
    const courses = await Course.find({},{
        coursename : true,
        courseDescription : true,
        price: true,
        tag : true,
        whatWillYouLearn : true,
        instructor : true,
        category : true
    }).populate("instructor").exec()

    if(!courses){
        return res.status(404).json({
            success : false,
            message : "courses not found"
        }) 
    }

    res.status(400).json({
        success : true,
        data : courses,
        message : "all corses fetched succesfully"
    })
}


exports.getCourseAllDetails = async (req ,res ) => {
    try{
        //fetch
        const courseId = req.body.courseId

        //find course
        const details = Course.findById(courseId)
                        .populate({
                            path : "instructor",
                            populate : {
                                path : "profile"
                            }
                        })
                        .populate({
                            path : "courseContent",
                            populate : {
                                path : "subSection"
                            }
                        })
                        .populate({
                            path : "reviewsandrating"
                        })
                        .populate("category")
                        .exec()

        return res.status(500).json({
            success : true ,
            data : details,
            message : "all details of course fetched succesfully"
        })
    }
    catch(err){
        console.log(err);
        return res.status(500).json({
            success : false,
            message :" err in fectcing details of course "
        })
    }
}