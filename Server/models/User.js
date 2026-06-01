const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        trim : true,
        lowercase : true,
        unique : true,
    },
    password: {
        type: String,
        required: true,
        select : false,
    },
    accountType: {
        type: String,
        enum: ['Admin', 'User'],
        required: true,
        default : 'User',
    },
    contactNumber: {
        type: String, 
        required: true,
    },
    image: {
        type: String,
    },
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);