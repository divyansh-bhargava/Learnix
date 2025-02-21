const { mailSender } = require("../utils/mailSender")
const User = require("../models/userModel")
const bcrypt = require("bcrypt")

exports.resetPasswordLink = async (req, res) => {
    try {
        const { email } = req.body

        if (!email) {
            return res.status(401).json({
                success: false,
                message: "fill email correctly"
            })
        }

        const token = crypto.randomUUID()

        const tokendb = await User.findOneAndUpdate({ email: email }, {
            token: token,
            tokenExpiresIn: Date.now() + 5 * 60 * 1000,
        }, { new: true })

        if (!tokendb) {
            return res.status(401).json({
                success: false,
                message: "error in saving in db"
            })
        }

        const url = `https://localhost:3000/resetpassword/${token}`
        const body = <h2>click , the link to change the password do not share with anyone and expires in 5 min</h2>

        await mailSender(email, url, body)

    } catch (error) {
        console.log("error in resent link send");
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "error in sending reset password link "
        })
    }
}


exports.resetPassword = async (req, res) => {
    try {

        const { email, password, confirmPassword, token } = req.body

        if(password !== confirmPassword){
            return res.status(400).json({
                success : false,
                message : "confirm paassword in not matched"
            }) 
        }

        const user = await User.findOne({ email: email })
        if (user) {
            return res.status(404).json({
                success: false,
                message: "account not found"
            })
        }

        if(user.token !== token || user.tokenExpiresIn < Date.now() ){
            return res.status(500).json({
                success: false,
                message: "token was expired genarate, new link"
            })
        }

        //password hassed
        const hashed =  await bcrypt.hash(password,10)

        const newUser = await User.findOneAndUpdate({email},{
            password : hashed
        },{new : true})

        res.status(200).json({
            success: true,
            newUser,
            message: 'Password changed successfully'
        });

    }
    catch (err) {
        console.log("error in reset the password")
        console.error(err)
        res.status(409).json({
            success : false,
            message : "error in reset the password"
        })
    }
}