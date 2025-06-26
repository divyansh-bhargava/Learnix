const express = require("express")
const router = express.Router()

const {deleteProfile , updateProfile ,updatePassword , updatePicture} = require("../controllers/profile")
const {isAuth} = require("../middleware/Auth")

router.post("/deleteAccount" ,isAuth , deleteProfile)
router.put("/updateProfile" , isAuth , updateProfile)
router.put("/updatePassword" , isAuth , updatePassword)
router.put("/updateProfilePicture" , isAuth , updatePicture )

module.exports = router