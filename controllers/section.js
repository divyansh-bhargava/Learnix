const Section = require("../models/sectionModel")
const Course = require("../models/courseModel")

exports.createSection = async (req, res) => {
    try {
        //fetch data 
        const { courseId, title } = req.body

        //validation 
        if (!courseId || !title) {
            return res.status(400).json({
                success: false,
                message: "fill all details"
            })
        }

        //create section 
        const section = await Section.create({
            title
        })

        //update course
        const course = await Course.findByIdAndUpdate(courseId, {
            $push: {
                courseContent: section._id
            }
        }).populate("courseContent").exec()  // here populate

        //return
        res.status(400).json({
            success: true,
            data: section,
            message: "section created successfully"
        })

    }
    catch (err) {
        console.log("error in creating the section")
        console.error(err)
        res.status(409).json({
            success: false,
            message: "error in creating the section"
        })
    }
}


exports.updateSection = async (req, res) => {

    try {
        const { title, sectionId } = req.body

        if (!title) {
            return res.status(400).json({
                success: false,
                message: " details are missing"
            })
        }

        const section = await Section.findByIdAndUpdate(sectionId, { title })

        res.status(400).json({
            success: true,
            section,
            message: "section updated successfully"
        })
    }
    catch (err) {
        console.log("error in section updation")
        console.error(err)
        res.status(409).json({
            success: false,
            message: "error in section updation"
        })
    }
}

exports.deleteSection = async (req, res) => {
    try {
        const { sectionId } = req.body

        if (!sectionId) {
            return res.status(400).json({
                success: false,
                message: " details are missing"
            })
        }

        const section = await Section.findByIdAndDelete(sectionId)

        res.status(400).json({
            success: true,
            section,
            message: "section deleted success fully"
        })
    }
    catch(err){
        console.log("error in delation of section")
        console.error(err)
        res.status(409).json({
            success: false,
            message: "error in delation of section"
        })
    }
}   