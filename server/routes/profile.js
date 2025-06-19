const express = require("express")
const router = express.Router()

const {deleteProfile , updateProfile ,updatePassword} = require("../controllers/profile")
const {isAuth} = require("../middleware/Auth")

router.post("/deleteAccount" ,isAuth , deleteProfile)
router.post("/updateProfile" , isAuth , updateProfile)
router.post("/updatePassword" , isAuth , updatePassword)

module.exports = router