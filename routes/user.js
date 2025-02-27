const express = require("express")
const router = express.Router()

const {signUp , signIn , sendOTP, changePassword} = require("../controllers/auth")
const { resetPassword , resetPasswordLink} = require("../controllers/resetPassword")
const { isAuth } = require("../middleware/auth")


//------Auth--------

router.post("/signUp" , signUp);
router.post("/signIn" , signIn);
router.post("/logIn" , signIn);
router.post("/sendOTP" , sendOTP);
router.post("/changePassword" , isAuth , changePassword);


//------reset password--------

router.post("/resetPasswordLink" , resetPasswordLink)
router.post("/resetPassword" , resetPassword )



module.exports = router