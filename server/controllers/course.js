const Course = require('../models/courseModel');
const User = require('../models/userModel');
const Category = require('../models/categoryModel');
const uplodeImageTOCloudinary  = require('../utils/cloudinary');
require("dotenv").config();


exports.createCourse = async (req, res) => {

    const { courseName, courseDescription, whatWillYouLearn, price, tag, category, instructions } = req.body

    const thumbnail = req.files.thumbnailImage

    console.log(thumbnail)

    if (!courseName || !courseDescription || !whatWillYouLearn || !price || !tag || !category || !thumbnail) {
        return res.status(400).json({
            success: false,
            message: "fill all details"
        })
    }

    const image = await uplodeImageTOCloudinary (thumbnail, process.env.FOLDER_NAME)
    console.log(image);

    const instructorId = req.user.Id
    console.log(req.user);

    const categorydb = await Category.findOne({ _id : category })

    if (!categorydb) {
        return res.status(400).json({
            success: false,
            message: "invalid category"
        })
    }

    const course = await Course.create({
        courseName,
        courseDescription,
        whatWillYouLearn,
        price,
        tag,
        instructions,
        instructor: instructorId,
        tumbnail: image.url,
        category: categorydb._id
    })

    const user = await User.findByIdAndUpdate(
        { _id : instructorId},
        {
            $push : {
                courses: course._id
            }
        }, 
        { new: true }
    )

    const newcategory = await Category.findByIdAndUpdate(
        { _id : categorydb._id},
        {
            $push : {
                courses: course._id
            }
        }, 
        { new: true }
    )

    res.status(400).json({
        success: true,
        data: course,
        message: "course created successfully"
    })

}


exports.getAllCourse = async (req, res) => {

    const courses = await Course.find({}, {
        coursename: true,
        courseDescription: true,
        price: true,
        tag: true,
        whatWillYouLearn: true,
        instructor: true,
        category: true
    }).populate("instructor").exec()

    if (!courses) {
        return res.status(404).json({
            success: false,
            message: "courses not found"
        })
    }

    res.status(400).json({
        success: true,
        data: courses,
        message: "all corses fetched succesfully"
    })
}


exports.getCourseAllDetails = async (req, res) => {
    try {
        //fetch
        const courseId = req.body.courseId

        //find course
        const details = await Course.findById(courseId)
            .populate({
                path: "instructor",
                populate: {
                    path: "profile"
                }
            })
            .populate({
                path: "courseContent",
                populate: {
                    path: "subSection"
                }
            })
            .populate({
                path: "reviewsandrating"
            })
            .populate("category")
            .exec()

        let timeInSecond = 0;
        
        details.courseContent.forEach( (section) => {
            section.subSection
        })


        return res.status(200).json({
            success: true,
            data: details,
            message: "all details of course fetched succesfully"
        })
    }
    catch (err) {
        console.log(err);
        return res.status(400).json({
            success: false,
            message: " err in fectcing details of course "
        })
    }
}