const { instance } = require("../config/razorpay")
const Course = require("../models/courseModel")
const User = require("../models/userModel")


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

        const options = {
            amount: totalAmount * 100,
            currency: "INR",
            receipt: Math.random(Date.now()).toString(),
            options : {
                userId : userId,
                courseId : courseId
            }
        }

        try{
            const paymentResponse = await instance.create.order(options)

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

    });


}