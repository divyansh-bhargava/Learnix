const User = require("../models/userModel")
const OTP = require("../models/otpModel")
const otpGenerator = require('otp-generator')
const bcrypt = require("bcrypt")
const Profile = require("../models/profileModel")

exports.sendOTP = async (req,res) => {
    try{ 
        const email = req.body.email

        // otp generate
        let otp = otpGenerator.generate(6, {
            lowerCaseAlphabets : false,
            upperCaseAlphabets: false,
            specialChars: false
        });

        let result =  await OTP.findOne({otp : otp})

        while(result){
            otp = otpGenerator.generate(6, {
                lowerCaseAlphabets : false,
                upperCaseAlphabets: false,
                specialChars: false
            });

            result = await OTP.findOne({otp : otp})
        }

        //save in db
        try {
            const newotp = await OTP.create({email , otpkey});
            
        } catch (error) {
            console.error('Error creating otp:', error);
        }


    }catch(err){
        console.log("error in sending otp")
        console.error(err)
        res.status(200).json({
            success : false,
            message : "something went wwrong in otp sending"
        })
    }
}

exports.signUP = async (req,res) => {
    try{
        //fetch data from req body
        const {name, email, password, confirmPasword, contactNumber, accountType , otp} = req.body

        //validation
        if(!name || !email || !password || !confirmPasword || !otp ){
            return res.status(400).json({
                success : false,
                message : "please fill all details correctly in  signIn "
            })
        }

        if(password !== confirmPasword){
            return res.status(400).json({
                success : false,
                message : "confirm paassword in not matched"
            }) 
        }

        //check user not present in db
        const user = await  User.findOne({email : email}) 
        if(user){
            return res.status(400).json({
                success : false,
                message : "confirm paassword in not matched"
            }) 
        }

        // recent opt in db 
        const otpdb = await User.findOne({email : email}).sort({createdAt : -1}).limit(1)

        //validate otp
        if(otp !== otpdb){
            return res.status(400).json({
                success : false ,
                message : "invalid otp , try again"
            })
        }

        //password hassed
        const hashed =  await bcrypt.hash(password,10)

        const profile = await Profile.create({
            gender : null,
            address : null,
            pincode : null ,
            dob : null,
            about : null
        })

        //save data in db

        const newuser = await User.create({
            name, email,  contactNumber, accountType ,
            password : hashed,
            profile : profile._Id
        })

        res.status(200).json({
            success: true,
            newuser,
            message : "account created successfull"
        })


    }catch(err){
        console.log("error in sign in ")
        console.error(err)
        res.status(409).json({
            success : false,
            message : "You are already signed in."
        })
    }
}


exports.signIn = async (req,res) => {
    try{
        
    }catch(err){
        console.log("error in sending otp")
        console.error(err)
        res.status(500).json({
            success : false,
            message : "something went wrong in login "
        })
    }
}

exports.changePassword = async (req, res) => {
    try {
        //fetch data from req
        const {email , password , newPassword , confirmNewPassword} = req.body

        //validation
        if(newPassword !== confirmNewPassword){
           return res.status(400).json({
                success : true,
                message : "both password does not match "

           })
        }

        //get user from db 
        const user = await User.findOne({email})

        //check password is coorect 
        if(!bcrypt.compare(password,user.password)){
            return res.status(400).json({
                success : true,
                message : " password does not match "
           }) 
        }

        //hased password
        const hashed = await bcrypt.hash(newPassword , 10)

        //save in db
        const newuser = await User.create({
            ...user,
            password : hashed
        })

        res.status(200).json({
            success : true,
            message : "password changed successfully"
        })


        

    } catch (error) {
        console.log("error in changing password")
        console.error(error)
        res.status(500).json({
            success : false,
            message : "something went wrong password changing"
        })
    }
}

