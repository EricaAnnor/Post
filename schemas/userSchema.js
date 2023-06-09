const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    firstName: {
        type:String,
        required:true,
        trim:true,
    },
    lastName: {
        type:String,
        required:true,
        trim:true,
    }, 
    userName: {
        type:String,
        required:true,
        trim:true,
        unique:true,
    },
    email: {
        type:String,
        required:true,
        unique:true,
    },
    password: {  
        type:String,
        required:true
    },
    profilePic: {
        type: String,
        default:"/images/profilePic.jpg"
    }

},{

    timestamps: true,
});

module.exports = mongoose.model('User', userSchema)