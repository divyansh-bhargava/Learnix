const mailSender = require("../utils/mailSender")
const countactUsEmail = require("../mails/contactUsEmail")

exports.countactUs = async(req , res ) => {
    const { email, firstname, lastname, message, phoneNo } = req.body

    if(!email || !firstname || !lastname || !message || !phoneNo){
        return res.status(404).json({
            success : false,
            message : " all the details are not found "
        })
    }

    try{

        const mail = await mailSender(
            email,
            "Your Data send successfully",
            countactUsEmail(email , firstname , lastname , message , phoneNo)
        )

        return res.status(200).json({
            success : true,
            mail,
            message : "mail send succesfully"
        })

    }
    catch(error){

        console.log("Error", error)
        return res.status(200).json({
            success : false,
            message : "err in sending countact us mail"
        })
        
    }
} 