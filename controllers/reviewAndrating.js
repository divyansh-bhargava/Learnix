const ReviewAndRating = require("../models/reviewAndRatingModel")
const User = require("../models/userModel")
const Course = require("../models/courseModel")
const { default: mongoose } = require("mongoose")


//createRatingandReview

exports.createRating = async (req, res) => {
    try {
        //fetch data
        const { review, rating, courseId } = req.body
        const userId = req.user.Id

        //validation
        if (!userId || !review || !rating || !courseId) {
            return res.status(400).json({
                success: false,
                message: " details are missing"
            })
        }

        //check user is enrolled in course
        const course = await Course.findone({ _id: courseId, students: { $eleMatch: { $eq: userId } } })

        if (!course) {
            return res.status(404).json({
                success: false,
                meassage: "user is not enrolled in course"
            })
        }

        //way 1
        // const courseDetails = await Course.findOne({ _id: courseId });
        // if (courseDetails && courseDetails.studentsEnrolled.includes(userId)) {
        //     // User is enrolled in the course
        //   } else {
        //     // User is not enrolled
        //   }

        //way2
        // const students = course.students.find((student) => student == userId )


        const alreadyReviewed = await RatingAndReview.findOne({
            user: userId,
            course: courseId,
        })

        if (alreadyReviewed) {
            return res.status(403).json({
                success: false,
                message: 'Course is already reviewed by the user',
            });
        }

        //save data in db
        const rAr = await ReviewAndRating.create({
            review,
            rating,
            user: userId,
            course: courseId
        })

        //update course 
        const newcourse = await Course.findByIdAndUpdate(userId, {
            $push: { reviewsandrating: rAr._id }
        })


        res.status(500).json({
            success: true,
            data: rAr,
            message: "review submited succesfully "
        })


    }
    catch (err) {
        return res.status(500).json({
            success: false,
            message: "error in review submition "
        })
    }
}


exports.getAverageRating = async (req, res) => {
    //fetch 
    const { courseId } = req.body

    const ratings = await RatingAndReview.Aggregate([
        {
            $match : {course : mongoose.Types.ObjectId(courseId)}
        },
        {
            $group : {_id : null, averageRating : {$avg : "$rating"}}
        }
    ])

    if(ratings.length > 0 ){
        return res.status(500).json({
            success : true ,
            data : ratings[0].averageRating,
            message : "average rating geting succesfully"
        })
    }

    // //allcourse
    // const ratings = await ReviewAndRating.find({course : courseId})

    // if(!ratings){
    //     return   res.status(404).json({
    //         success: false,
    //         message: "revies not found "
    //     })
    // }

    // const total = null

    // ratings.foreach((review)=>{
    //     total += review.rating 
    // })

    // const avg = (total/ratings.length()).toFixed(1)

    res.status(200).json({
        success : true,
        data : 0,
        message : "no review so av rating is 0"
    })
}


exports.getAllCourseReview = async (req, res) => {
    try {
        //fetch data
        const { courseId } = req.body

        if (!courseId) {
            return res.status(400).json({
                success: false,
                message: " details are missing"
            })
        }

        //data
        const reviews = await ReviewAndRating.find({ course: courseId }).sort({rating: "desc"})
            .populate({
                path:"user",
                select:"fName lName email image",
            })
            .populate({
                path : "course",
                select : "courseName"
            })
            .exec()

        //return
        res.status(500).json({
            success: true,
            data: reviews,
            message: "get all review succesfully "
        })
    }
    catch (err) {

        return res.status(500).json({
            success: false,
            message: "error in get all review "
        })
    }

}

exports.getAllRating = async (req, res) => {
    try{
            const allReviews = await RatingAndReview.find({})
                                    .sort({rating: "desc"})
                                    .populate({
                                        path:"user",
                                        select:"firstName lastName email image",
                                    })
                                    .populate({
                                        path:"course",
                                        select: "courseName",
                                    })
                                    .exec();
            return res.status(200).json({
                success:true,
                message:"All reviews fetched successfully",
                data:allReviews,
            });
    }   
    catch(error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message,
        })
    } 
}