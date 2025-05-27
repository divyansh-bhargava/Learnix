const express = require("express")
const router = express.Router()

const {isAuth ,isAdmin ,isStudent , isInstructor} = require("../middleware/Auth")

const {getAllCourse , createCourse , getCourseAllDetails} = require("../controllers/course")

const {createSection , updateSection , deleteSection} = require("../controllers/section")

const {updateSubSection , deleteSubSection , createSubSection} = require("../controllers/subSection")

const {createCategory , getAllCategory , categoryPageDetails} = require("../controllers/category")

const {createRating , getAverageRating ,getAllCourseReview , getAllRating} = require("../controllers/reviewAndrating")



//------------------------------------------
//            course   
//------------------------------------------


router.post("/createCourse" , isAuth, isInstructor, createCourse )
router.get("/getAllCourse" , getAllCourse)
router.get("/getCourseAllDetails" , getCourseAllDetails)


// -----------section-------------

router.post("/addSection", isAuth, isInstructor, createSection)
router.put("/updateSection", isAuth, isInstructor, updateSection)
router.post("/deleteSection", isAuth, isInstructor, deleteSection)


// ----------sub-section----------

router.post("/updateSubSection", isAuth, isInstructor, updateSubSection)
router.post("/deleteSubSection", isAuth, isInstructor, deleteSubSection)
router.post("/addSubSection", isAuth, isInstructor, createSubSection)



//------------------------------------------
//               category
//------------------------------------------

router.post("/createCategory", isAuth, isAdmin, createCategory)
router.get("/showAllCategories", getAllCategory)
router.post("/getCategoryPageDetails", categoryPageDetails)


//------------------------------------------
//           rating and review
//------------------------------------------

router.post("/createRating", isAuth, isStudent, createRating)
router.get("/getAverageRating", getAverageRating)
router.get("/getReviews", getAllRating)
router.get("/getAllCourseRating" , getAllCourseReview)

module.exports = router;
