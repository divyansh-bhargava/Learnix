const SubSection = require("../models/subSectionModel")
const Section = require("../models/sectionModel")
const { uplodeImageTOCloudinary } = require("../utils/cloudinary")
require("dotenv").config()

exports.createSubSection = async (req, res) => {
    try {
        //fetch data 
        const { sectionId , title, description , video , duration , additionalurl="" } = req.body

        //validation 
        if (!sectionId || !title || !description || !video || !duration ) {
            return res.status(400).json({
                success: false,
                message: "fill all details"
            })
        }

        const file = await uplodeImageTOCloudinary(video , process.env.FOLDER_NAME)

        //create sub-section 
        const subSection = await SubSection.create({
            title,
            description,
            duration,
            additionalurl,
            video : file
        })

        //update section
        const section = await Section.findByIdAndUpdate(sectionId, {
            $push: {
                subsection: subSection._id
            }
        }).populate("subsection").exec()  // here populate

        //return
        res.status(400).json({
            success: true,
            data: subSection,
            message: "sub-section created successfully"
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

exports.updateSubSection = async (req, res) => {

    try {
        const { title, subSectionId , description , video , additionalurl , duration} = req.body

        const subSection = await SubSection.findByIdAndUpdate(subSectionId, { title, description ,video , additionalurl , duration })

        res.status(400).json({
            success: true,
            section,
            message: "sub-section updated successfully"
        })
    }
    catch (err) {
        console.log("error in sub-section updation")
        console.error(err)
        res.status(409).json({
            success: false,
            message: "error in sub-section updation"
        })
    }

}

// take delete before section delete
exports.deleteSubSection = async (req, res) => { 
    try {
        const { subSectionId } = req.body

        if (!subSectionId) {
            return res.status(400).json({
                success: false,
                message: " details are missing"
            })
        }

        const section = await SubSection.findByIdAndDelete(subSectionId)

        res.status(400).json({
            success: true,
            section,
            message: "section deleted success fully"
        })
    }
    catch(err){
        console.log("error in delation of sub-section")
        console.error(err)
        res.status(409).json({
            success: false,
            message: "error in delation of sub-section"
        })
    }
} 