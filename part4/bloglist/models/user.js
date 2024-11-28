const mongoose = require('mongoose')

const userShcema = new mongoose.Schema({
    username: {
        type: String,
        minLength: 3,
        required: true,
        unique: true
    },
    name: String,
    passwordHash: {
        type: String,
        minLength: 3,
    },
    blogs:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Blog'
    }]

})

userShcema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
        delete returnedObject.passwordHash
    }
})

const User = mongoose.model('User', userShcema)

module.exports = User