const Profile = require("../models/profileModel")
const User = require("../models/userModel")
const Course = require("../models/courseModel")
const CourseProgress = require("../models/couseProgressModel")
const { default: mongoose } = require("mongoose")
const bcrypt = require("bcrypt")
const uplodeImageTOCloudinary = require("../utils/cloudinary")


exports.updateProfile = async (req, res) => {
    try {
        const { fname = "", lname = "", about = "", gender = "", dob = "", contactNumber = "" } = req.body
        const userId = req.user.Id

        if (!gender || !dob) {
            return res.status(400).json({
                success: false,
                message: " details are missing"
            })
        }

        const user = await User.findById(userId)

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Session is expired",
            })
        }

        if (fname || lname) {
            const newuser = await User.findByIdAndUpdate(userId, { fname, lname, contactNumber })
        }

        const profile = await Profile.findById(user.profile)

        profile.gender = gender
        profile.dob = dob
        profile.about = about

        await profile.save()

        const updatedUser = await User.findById(userId).populate("profile").exec()

        return res.status(200).json({
            success: true,
            message: "Profile updated successfully",
            data: updatedUser
        })

    } catch (err) {

        return res.status(400).json({
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

        const user = await User.findById(Id)

        if (! await bcrypt.compare(oldPassword, user.password)) {
            return res.status(400).json({
                success: false,
                message: "password does not match "
            })
        }

        const pass = await bcrypt.hash(newPassword, 10)

        user.password = pass

        await user.save()

        return res.status(200).json({
            success: true,
            data: user,
            message: "password changed successfully"
        })


    } catch (error) {

        console.log(error);

        return res.status(400).json({
            success: false,
            message: "err in updatepassword"
        })

    }
}


exports.updatePicture = async (req, res) => {
    try {
        console.log(req.files);
        const img = req.files.displayPicture

        const { Id } = req.user

        // upload image to cloudienary
        const image = await uplodeImageTOCloudinary(img, process.env.FOLDER_NAME, 1000, 1000)

        console.log(image);

        const user = await User.findByIdAndUpdate(Id, { image: image.secure_url }, { new: true })

        console.log(user);

        const updatedUser = await User.findById(user._id).populate("profile").exec()

        return res.status(200).json({
            success: true,
            message: " DP Updateed Successfully",
            data: updatedUser
        })


    } catch (error) {
        console.log(error);

        return res.status(400).json({
            success: false,
            message: "err in update DP"
        })
    }
}

exports.enrolledCourse = async (req, res) => {
    try {
        const { Id } = req.user

        const user = await User.findById(Id)
            .populate({
                path: "courses",
                populate: {
                    path: "courseContent",
                    populate: {
                        path: "subsection"
                    }
                }
            }
            )

        let totaldurationInSec;
        let sectionlength;

        for (let i = 0; i < user.courses.length; i++) {
            totaldurationInSec = 0;
            sectionlength = 0;

            for (let j = 0; j < user.courses[i].courseContent.length; j++) {

                totaldurationInSec = user.courses[i].courseContent[j].subsection.reduce((acc, curr) => (
                    acc + parseInt(curr.duration)
                ), 0)

                sectionlength += user.courses[i].courseContent[j].subsection.length
            }

            user.courses[i].totalDuration = totaldurationInSec;

            let courseProgress = await CourseProgress.findOne({
                course :  user.courses[i]._id ,
                userId : user._id
            }).completedss.length

            if(sectionlength == 0 ){
               user.courses[i].completePercentage = 100 
            }
            else{
                user.courses[i].completePercentage = Math.round( courseProgress/sectionlength * 100 )
            }
        }

        return res.status(200).json({
            success : true,
            data : user.courses,
            message : "all user courses data fetched successfully "
        })

    } catch (error) {

        console.log(error)

        return res.status(400).json({
            success : false,
            message : "all user courses data fetched Unsuccessfully "
        })

    }
}