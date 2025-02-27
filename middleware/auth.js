// const jwt = require("jsonwebtoken")

export async function isAuth(req, res, next) {
    try {
        //fetch token 
        const token =
            req.cookies.token ||
            req.body.token ||
            req.header("Authorization").replace("Bearer ", "");

        if (!token) {
            return res.status(404).json({
                success: false,
                message: "user token not found"
            })
        }

        //decode token 
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
            req.user = decoded
        } catch (err) {
            return res.status(401).json({
                success: false,
                message: err.message
            })
        }

        next()
    } catch (error) {
        console.log("somthing in while token parsing")
        console.error(err)
        res.status(401).json({
            success: false,
            message: "something went wrong in token parsing"
        })
    }

}

export async function isStudent(req, res, next) {
    try {
        if (req.user.accountType !== "student") {
            return res.status(500).json({
                success: true,
                message: "this is private route for student only"
            })
        }

        next()
    } catch (err) {
        console.log("somthing in while finding routes")
        console.error(err)
        res.status(401).json({
            success: false,
            message: "something went wrong in finding role and path"
        })
    }

}

export async function isAdmin(req, res, next) {
    try {
        if (req.user.accountType !== "admin") {
            return res.status(500).json({
                success: false,
                message: "this is private route for admin only"
            })
        }

        next()
    }
    catch (err) {
        console.log("somthing in while finding routes")
        console.error(err)
        res.status(401).json({
            success: false,
            message: "something went wrong in finding role and path"
        })
    }

}


export async function isInstuctor(req, res, next) {
    try {
        if (req.user.accountType !== "instructor") {
            return res.status(500).json({
                success: false,
                message: "this is private route for instructor only"
            })
        }

        next()
    }
    catch (err) {
        console.log("somthing in while finding routes")
        console.error(err)
        res.status(401).json({
            success: false,
            message: "something went wrong in finding role and path"
        })
    }

}
