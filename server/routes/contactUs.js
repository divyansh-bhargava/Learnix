const express = require("express")
const router = express.Router()
const { countactUs } = require("../controllers/countactUs")

router.post("/contact", countactUs)

module.exports = router