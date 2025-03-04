// Import the required modules
const express = require("express")
const router = express.Router()

const { capturePayment, verifyPayment } = require("../controllers/payment")
const { isAuth, isStudent } = require("../middleware/Auth")


router.post("/capturePayment", isAuth, isStudent, capturePayment)
router.post("/verifyPayment",isAuth, isStudent, verifyPayment)

module.exports = router