const moogoose = require('mongoose');
const validator = require('validator');

const User = moogoose.model('User', {
    iduser : {
        type: Number,
        required: true
    },
    name : {
        type: String,
        required: true
    },
    email : {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Email is invalid')
            }
        }
    },
    password : {
        type: String,
        minlength: 7,
        trim: true,
        validate(value){
            if(value.toLowerCase().includes('password')){
                throw new Error('password cannot contain "password"')
            }
        }
    }
})

module.exports = User
