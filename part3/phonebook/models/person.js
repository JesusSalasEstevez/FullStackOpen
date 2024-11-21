const mongoose = require('mongoose')

if(process.argv.length < 3){
    console.log('give password as argument')
    process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://fullstack:${password}@phonebook.qxbi3.mongodb.net/?retryWrites=true&w=majority&appName=Phonebook`

mongoose.set('strictQuery', false)

mongoose.connect(url)
    .then(result => {console.log('connected to MongoDB')})
    .catch(error => {console.log('error connecting to mongoDB:', error.message)})

const personSchema = new mongoose.Schema({
    name: {
        type: String,
        minLength: 3,
    },
    number: {
        type: String,
        minLength: 8,
        match: [/\d{2,3}-\d{5,}/]
    }
})

personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

const Person = mongoose.model('person', personSchema)

module.exports = mongoose.model('Person', personSchema)