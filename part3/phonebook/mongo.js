const mongoose = require('mongoose')

if(process.argv.length < 3){
    console.log('give password as argument')
    process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://fullstack:${password}@phonebook.qxbi3.mongodb.net/?retryWrites=true&w=majority&appName=Phonebook`

mongoose.set('strictQuery', false)

mongoose.connect(url)

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
})

const Person = mongoose.model('person', personSchema)

if(process.argv.length === 3){
    Person.find({}).then(persons => {
        persons.forEach(person => {
            console.log(person.name + " " + person.number)
        })
        mongoose.connection.close()
    })
}else{
    const person = new Person({
        name: argv[3],
        number: argv[4],
    })

    person.save().then(result => {
        console.log(`added ${person.name} number ${person.number} to phonebook`)
        mongoose.connection.close()
    })
}