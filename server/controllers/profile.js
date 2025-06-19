const Profile = require("../models/profileModel")
const User = require("../models/userModel")
const Course = require("../models/courseModel")
const CourseProgress = require("../models/couseProgressModel")
const { default: mongoose } = require("mongoose")
const bcrypt = require("bcrypt")

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

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Session is expired",
            })
        }

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
            data: updatedUser
        })

    } catch (err) {

        return res.json({
            success: false,
            message: " error in Profile updated process",
        })
    }

}


exports.deleteProfile = async (req, res) => {
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
                { new: true })

            //delete course progress
            const courseprogress = await CourseProgress.deleteMany({ userId: Id })

        })

        await User.findByIdAndDelete(Id)

        return res.json({
            success: true,
            message: "account deleted succesfully"
        })


    }
    catch (err) {
        return res.json({
            success: false,
            message: " error in Account delete process",
        })
    }
}


exports.updatePassword = async (req, res) => {
    try {
        const { oldPassword, newPassword } = req.body
        const { Id } = req.user

        if (!oldPassword || !newPassword) {
            return res.status(404).json({
                success: false,
                message: " details are missing"
            })
        }

        const user = User.findById(Id)

        if (! await bcrypt.compare(oldPassword, user.password)) {
            return res.status(400).json({
                success: false,
                message: "password does not match "
            })
        }

        const hash = bcrypt.hash(newPassword , 10)

        user.password = hash

        await user.save()

        return res.status(200).json({
            success : true,
            data : user,
            message : "password changed successfully"
        })


    } catch (error) {

        console.log(error);

        return res.status(400).json({
            success : false,
            message : "err in updatepassword"
        })

    }
} 
