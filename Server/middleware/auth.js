// NOTE-> middleware is used only when user is login

const jwt = require('jsonwebtoken');
const path = require('path');
// in this jwt token and payload is already added in the login controller
const User = require('../models/User');
require('dotenv').config({ path: path.join(__dirname, '../.env'), quiet: true });

exports.auth = async(req , res , next)=>{
    try{
        const cookieToken = req.headers.cookie
            ?.split(';')
            .map((cookie) => cookie.trim())
            .find((cookie) => cookie.startsWith('token='))
            ?.split('=')[1];

        const token = cookieToken || req.header("Authorization")?.replace("Bearer " , "");

        if(!token){
            return res.status(401).json({
                success : false,
                message : "Unauthorized access. No token provided."
            });
        }

        // verify the token
        try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user = decoded;
    } catch (err) {
        console.error("Error during authentication:", err);
        return res.status(401).json({
            success: false,
            message: "Invalid or expired token."
        });
    }
    next(); // this help to go to the next middleware
} catch(err){
    console.log("Error during authentication:", err);
    return res.status(500).json({
        success: false,
        message :"Invalid or expired token."
        });
    }
};

// Role based authentication forr the user
exports.isUser = async(req , res , next)=>{
    try{
        if(req.user.accountType !== "User"){
            return res.status(403).json({
                success : false,
                message : "Invalid access. You do not have the required permissions to access this resource."
            });
        }
        next();

    }catch(err){
        return res.status(500).json({
            success : false,
            message : "Error during validation of user role. Please try again later."
        });
    }
};

exports.isAdmin = async(req , res , next)=>{
    try{
        if(req.user.accountType !== "Admin"){
            return res.status(403).json({
                success : false,
                message : "Invalid access. You do not have the required permissions to access this resource."
            });
        }
        next();

    }catch(err){
        return res.status(500).json({
            success : false,
            message : "Error during validation of admin role. Please try again later."
        });
    }
}
