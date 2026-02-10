const mongoose = require('mongoose')
const { type } = require('os')

const userSchema = new mongoose.Schema({
    name: {type:String,required:true},
    email: {type:String},
    profilePicture: {type:String},
    isVerfied:{type:Boolean,required:true}
}, {timestamps:true})

module.exports = mongoose.model.User || mongoose.model('User', userSchema)