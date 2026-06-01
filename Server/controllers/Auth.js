const jwt = require('jsonwebtoken');
const path = require('path');
const User = require('../models/User');
const bcrypt = require('bcryptjs');

require('dotenv').config({ path: path.join(__dirname, '../.env'), quiet: true });

exports.signup = async (req, res) => {
    try {
        const {
            firstName,
            lastName,
            email: rawEmail,
            password,
            confirmPassword,
            accountType = 'User',
            contactNumber
        } = req.body;

        const email = rawEmail?.trim()?.toLowerCase();

        if (!firstName || !lastName || !rawEmail || !password || !confirmPassword || !contactNumber) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required'
            });
        }

        if (password !== confirmPassword) {
            return res.status(400).json({
                success: false,
                message: 'Password and confirm password do not match'
            });
        }

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: 'User with this email already exists'
            });
        }

        // Hash the password before saving to the database
        const hashedPassword = await bcrypt.hash(password, 10);

        //  creatng the user profile

        const userProfile = await User.create({
            firstName,
            lastName,
            email,
            contactNumber,
            password: hashedPassword,
            accountType,
            image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`
        });

        return res.status(201).json({
            success: true,
            message: 'User registered successfully',
            userProfile
        });

    } catch (err) {
        console.error('Error during signup:', err);
        return res.status(500).json({
            success: false,
            message: 'An error occurred during signup. Please try again later.'
        });
    }
};
exports.login = async (req, res) => {
    try {
        const { email: rawEmail, password } = req.body;
        const email = rawEmail?.trim()?.toLowerCase();

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Email and password are required'
            });
        }

        const user = await User.findOne({ email }).select('+password');

        if (!user) {
    return res.status(400).json({
        success: false,
        message: 'Invalid email or password'
    });
}

const isPasswordMatched = await bcrypt.compare(
    password,
    user.password
);

if (!isPasswordMatched) {
    return res.status(400).json({
        success: false,
        message: 'Invalid email or password'
    });
}

        if (!process.env.JWT_SECRET_KEY) {
            return res.status(500).json({
                success: false,
                message: 'JWT_SECRET_KEY is not defined in .env file'
            });
        }

        const payload = {
            email: user.email,
            id: user._id,
            accountType: user.accountType
        };

        const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: '3d' });
        user.password = undefined;

        const options = {
            expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
            httpOnly: true
        };

        return res.cookie('token', token, options).status(200).json({
            success: true,
            user,
            token,
            message: 'User logged in successfully'
        });
    } catch (err) {
        console.error('Error during login', err);
        return res.status(500).json({
            success: false,
            message: 'An error occurred during login. Please try again later.'
        });
    }
};

exports.logout = async (req, res) => {
    return res
        .clearCookie('token')
        .status(200)
        .json({
            success: true,
            message: 'User logged out successfully'
        });
};

exports.getMe = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        return res.status(200).json({
            success: true,
            user
        });
    } catch (err) {
        console.error('Error while fetching profile:', err);
        return res.status(500).json({
            success: false,
            message: 'An error occurred while fetching profile'
        });
    }
};
