const User = require("../models/userModel")
const OTP = require("../models/otpModel")
const otpGenerator = require('otp-generator')
const bcrypt = require("bcrypt")
const Profile = require("../models/profileModel")
const jwt = require("jsonwebtoken")
const mailSender = require("../utils/mailSender")
const passwordUpdated = require("../mails/resetPasswordEmail")

exports.sendOTP = async (req, res) => {
    try {

        const email = req.body.email

        if (!email) {
            return res.status(404).json({
                success: false,
                message: "email not found"
            })
        }

        const user = await User.findOne({ email: email })
        if (user) {
            return res.status(404).json({
                success: false,
                message: "already signup with this email"
            })
        }

        // otp generate
        let otp = otpGenerator.generate(6, {
            lowerCaseAlphabets: false,
            upperCaseAlphabets: false,
            specialChars: false
        });

        let result = await OTP.findOne({ otp: otp })

        while (result) {
            otp = otpGenerator.generate(6, {
                lowerCaseAlphabets: false,
                upperCaseAlphabets: false,
                specialChars: false
            });

            result = await OTP.findOne({ otp: otp })
        }

        //save in db
        try {
            const newotp = await OTP.create({ email, otp })

            console.log(newotp);

            if(!newotp){
                return res.status(404).json({
                    success: false,
                    message: "already signup with this email"
                })
            }

            return res.status(200).json({
                success: true,
                data: newotp,
                message: "otp send successfully"
            })

        } catch (error) {
            console.error('Error creating otp:', error);
        }



    } catch (err) {
        console.log("error in sending otp")
        console.error(err)
        res.status(200).json({
            success: false,
            message: "something went wwrong in otp sending"
        })
    }
}



exports.signUp = async (req, res) => {
    try {
        //fetch data from req body
        const { fname, lname, email, password, confirmPassword, contactNumber, accountType, otp } = req.body

        //validation
        if (!fname || !lname || !email || !password || !confirmPassword || !otp) {
            return res.status(400).json({
                success: false,
                message: "please fill all details correctly in  signIn "
            })
        }

        if (password !== confirmPassword) {
            return res.status(400).json({
                success: false,
                message: "confirm paassword in not matched"
            })
        }

        //check user not present in db
        const user = await User.findOne({ email: email })
        console.log(user);
        if (user) {
            return res.status(404).json({
                success: false,
                message: "account created already"
            })
        }

        // recent opt in db
        const otpdb = await OTP.findOne({ email: email }).sort({ createdAt: -1 }).limit(1)
        console.log(otpdb);
        //validate otp
        if (otp !== otpdb.otp) {
            return res.status(400).json({
                success: false,
                message: "invalid otp , try again"
            })
        }

        //password hassed
        const hashed = await bcrypt.hash(password, 10)
        console.log(hashed);

        const profile = await Profile.create({
            gender: null,
            dob: null,
            about: null
        })

        //save data in db
        const newuser = await User.create({
            fname, lname, email, contactNumber, accountType,
            profile: profile._id,
            password: hashed

        })

        res.status(200).json({
            success: true,
            newuser,
            message: "account created successfull"
        })


    } catch (err) {
        console.log("error in sign in ")
        console.error(err)
        res.status(200).json({
            success: false,
            message: "You are already signed in."
        })
    }
}


exports.signIn = async (req, res) => {
    try {
        //fetch data 
        const { email, password } = req.body

        //find user in db
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "account not found"
            })
        }

        //check password
        if (! await bcrypt.compare(password, user.password)) {
            return res.status(400).json({
                success: false,
                message: " password does not match "
            })
        }

        //if true create token
        const payload = {
            email: user.email,
            Id: user._id,
            accountType: user.accountType
        }

        const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: '5h' })

        user.password = undefined
        user.token = token

        const option = {
            expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
            httponly: true
        }

        res.cookie("token", token, option).status(200).json({
            success: true,
            user,
            message: "user looged in successfully"
        })


    } catch (err) {
        console.log("error in sending otp")
        console.error(err)
        res.status(500).json({
            success: false,
            message: "something went wrong in login "
        })
    }
}

exports.changePassword = async (req, res) => {
    try {
        //fetch data from req
        const { password, newPassword, confirmNewPassword } = req.body

        const { email } = req.user

        //validation
        if (newPassword !== confirmNewPassword) {
            return res.status(400).json({
                success: true,
                message: "both password does not match "

            })
        }

        //get user from db 
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "account not found"
            })
        }

        //check password is coorect 
        if (!bcrypt.compare(password, user.password)) {
            return res.status(400).json({
                success: true,
                message: " password does not match "
            })
        }

        //hased password
        const hashed = await bcrypt.hash(newPassword, 10)

        //save in db
        const newuser = await User.findOneAndUpdate({ _id: user._id }, { password: hashed })


        //send email

        try {
            const mail = await mailSender(user.email,
                "Password Changed Successfully",
                passwordUpdated(email, `${user.fname} ${user.lname}`)
            )
        }
        catch (err) {
            console.log(err);
            return res.status(500).json({
                success: false,
                message: "err in reset password mail "
            })
        }

        res.status(200).json({
            success: true,
            data: newuser,
            message: "password changed successfully"
        })


    } catch (error) {
        console.log("error in changing password")
        console.error(error)
        res.status(500).json({
            success: false,
            message: "something went wrong password changing"
        })
    }
}

