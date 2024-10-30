import jwt from 'jsonwebtoken'
require('dotenv').config()

export const validate = {
    auth: (req: any, res: any, next: any) => {
        try {
            //extract JWT token
            const token = req.body.token || req.cookies.token
            if (!token) {
                return res.status(401).json({
                    success: false,
                    message: "Token Missing"
                })
            }
    
            //verify the token
            try {
                const decode = jwt.verify(token, process.env.JWT_SECRET || "")
                req.user = decode
                console.log(req.user)
            } catch (error) {
                return res.status(401).json({
                    success: false,
                    message: "invalid Token ⚠️"
                })
            }
    
            next()
    
        } catch (error) {
            return res.status(401).json({
                success: false,
                message: "Error Occured in Authentication ⚠️"
            })
        }
    },

    isUser: (req: any, res: any, next: any) => {
        try {
            console.log(req.user)
            if (req.user.role !== "user") {
                return res.status(401).json({
                    success: false,
                    message: "You are not authorized user⚠️"
                })
            }
    
            next()
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: "Something error occured⚠️: " + error
            })
        }
    },

    isAdmin: (req: any, res: any, next: any) => {
        try {
            if (req.user.role !== "admin") {
                return res.status(401).json({
                    success: false,
                    message: "You are not authorized admin⚠️"
                })
            }
    
            next()
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: "Something error occured⚠️: " + error
            })
        }
    }
}