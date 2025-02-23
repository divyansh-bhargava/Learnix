const Profile = require("../models/profileModel")
const User = require("../models/userModel")
const Course = require("../models/courseModel")
const CourseProgress = require("../models/couseProgressModel")
const { default: mongoose } = require("mongoose")

exports.updateProfile = async (req, res) => {
    try {
        const { fname = "", lname = "", about = "", gender = "", dob = "" } = req.body
        const userId = req.user.Id

        if (!gender || !dob) {
            return res.status(400).json({
                success: false,
                message: " details are missing"
            })
        }

        const user = User.findById(userId)

        if (fname || lname) {
            const newuser = await User.findByIdAndUpdate(userId, { fname, lname })
        }

        const profile = await Profile.findbyid(user.profile)

        profile.gender = gender
        profile.dob = dob
        profile.about = about

        await profile.save()

        const updatedUser = await User.findById(userId).populate("profile").exec()

        return res.json({
            success: true,
            message: "Profile updated successfully",
            updatedUser,
        })

    } catch (err) {

        return res.json({
            success: false,
            message: " error in Profile updated process",
        })
    }

}


exports.DeleteProfile = async (req, res) => {
    try {
        //fetch
        const { Id } = req.user

        //user find 
        const user = await User.findById(Id)

        // delete profile first
        const profile = await Profile.findByIdAndDelete(user.profile)

        //delete user from enrolled corsese 
        user.courses.forEach(async (course) => {
            const courseId = mongoose.Types.ObjectId(course)
            const student = await Course.findByIdAndUpdate(courseId, {
                $pull: {
                    students: Id 
                }
            },
            {new : true})

           //delete course progress
           const courseprogress = await CourseProgress.findOneAndDelete({course : courseId})

        })

        return res.json({
            success : true,
            message : "account deleted succesfully"
        })
        

    }
    catch (err) {
    return res.json({
        success: false,
        message: " error in Account delete process",
    })
}
}