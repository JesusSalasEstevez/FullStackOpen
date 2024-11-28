const mongoose = require('mongoose')

const userShcema = new mongoose.Schema({
    username: String,
    name: String,
    passwordHash: String,
    /*notes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Note'
    }]*/
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