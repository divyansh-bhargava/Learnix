require("dotenv").config()

export async function isauth(req , res , next) {
    //fetch token 
    const {token} = req.body || req.cookies 

    if(!token){
        return res.status(404).json({
            success : true,
            message : "user token not found"
        })
    }

    //decode token 
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)

    req.user = decoded

    next()

}

export async function isStudent(req , res , next) {
    if(req.user.accountType !== "student"){
        return res.status(500).json({
            success : true,
            message : "this is private route for student only"
        })
    }

    next()

}

export async function isAdmin(req , res , next) {
    if(req.user.accountType !== "admin"){
        return res.status(500).json({
            success : true,
            message : "this is private route for admin only"
        })
    }

    next()

}


export async function isInstuctor(req , res , next) {
    if(req.user.accountType !== "instructor"){
        return res.status(500).json({
            success : true,
            message : "this is private route for instructor only"
        })
    }

    next()

}
