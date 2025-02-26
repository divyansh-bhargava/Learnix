const { instance } = require("../config/razorpay")
const Course = require("../models/courseModel")
const User = require("../models/userModel")
const CourseProgress = require("../models/couseProgressModel")
const mailSender = require("../utils/mailSender")
const courseEnrollmentEmail = require("../mails/courseEnrollmentEmail")
require("dotenv").config()


exports.capturePayment = async (req, res) => {
    //fetch 
    const { courses } = req.body
    const userId = req.user.Id

    if (courses.length === 0) {
        return res.json(
            {
                success: false,
                message: "Please Provide Course ID"
            }
        )
    }


    let totalAmount = 0

    courses.forEach( async (courseId) => {

        try {
            console.log(courseId)

            //validation
            if (!courseId) {
                return res.status(404).json({
                    success: false,
                    message: "course not found"
                })
            }

            const alreadybuy = User.find({ _id: userId }, { course: { $eleMatch: { $eq: courseId } } })
            if (alreadybuy) {
                return res.status(500).json({
                    success: false,
                    message: "already purchesed "
                })
            }

            //options 
            const course = Course.findById(courseId)

            totalAmount += course.price

        }
        catch (err) {
            console.log(err);
            return res.status(200).json({
                success : false,
                message : err.message
            })
        }


    })

    const options = {
        amount: totalAmount * 100,
        currency: "INR",
        receipt: Math.random(Date.now()).toString(),
        notes : {
            userId : userId,
            courses : courses
        }
    }

    try{
        const paymentResponse = await instance.orders.create(options)

        return res.status(400).json({
            success : true,
            data: paymentResponse,
            message : "ordered created fully"
        })

    }
    catch(err){

        return res.status(400).json({
            success : false,
            message : "error in intitiate a order"
        })
    }
}


exports.verifyPayment = async ( req,res ) => {
   try {
         const key_secret = process.env.RAZORPAY_KEY_SECRET

        //fetch 
        const {razorpay_order_id , razorpay_payment_id } = req.body
        const razorpay_signature =  req.headers['x-razorpay-signature']

        const {userId , courses} = req.body.paylod.notes  // check karna

        //validation
        if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature){
            return res.status(200).json({
                success : false ,
                message : "payment details are missing"
            })
        }

        const signature = crypto
                            .createHmac('sha256', key_secret)
                            .update(`${razorpay_order_id} | ${razorpay_payment_id}`)
                            .digest("hex")

       if(signature === razorpay_signature) {
            await enrolledStudent( courses , userId , res )

            res.status(500).json({
                success  : true ,
                message : "payment verifed"
            })
       }

       return res.status(300).json({
            success : false,
            message : "payment failed"
       })


   }
   catch(err){
        return res.status(300).json({
            success : false,
            message : "payment verifaction failed"
        }) 
   } 

}



const enrolledStudent = async (courses , userId , res) => {

    if(!userId || !courses ){
        return res.status(404).json({
            success : false,
            message : "details are not found for user enrollem"
        })
    }

    courses.forEach(async (courseId) => {

        
        const updateCourse = await Course.findByIdAndUpdate(courseId , {
            $push : {
               students : userId 
            }
        }, {new : true})

        if(!updateCourse){
            return res.status(404).json({
                success : false,
                message : "invalid courseId err in user enrollment"
            })
        }

        const courseProgress = CourseProgress.create({
            userId : userId,
            course : courseId,
            completedss : []
        })


        const updateUser = await User.findByIdAndUpdate(
            userId , 
            {   
                $push : {
                    course : courseId,
                    courseProgress : courseProgress._id ,
                }
            },
            {new : true}
        )

        await mailSender(
            updateUser.email,
            `Successfully Enrolled in ${updateCourse.courseName} course`,
            courseEnrollmentEmail(
                enrolledCourse.courseName,
                `${enrolledStudent.firstName} ${enrolledStudent.lastName}`
              )
        )

        return res.status(500).json({
            success : true ,
            data : {
                updateUser ,
                updateCourse,
            },
            message : "student enrolled success fully"
        })

    })

    

}




