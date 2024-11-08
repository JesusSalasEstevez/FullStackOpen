import { useState } from 'react'

const App = () => {


  const addName = (event) => {
    event.preventDefault()
    if(persons.find(p => p.name == newName)){
      window.alert(`${newName} is already added to phonebook`)
    }else{
      const newPerson ={name: newName, number: newNumber}
      const newPersons = persons.concat(newPerson)
      setNewName('')
      setPersons(newPersons)
    }
  }

  const searchInfo = (event) => {
    setNewFilter(event.target.value)
    const personsToShow = filter == '' ? persons : persons.filter(p => p.name.toLowerCase().includes(filter.toLowerCase()))
    setNewContacts(personsToShow)
  }

  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setNewFilter] = useState('')
  const [contacts, setNewContacts] = useState(persons)

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        filter shown with <input value={filter} onChange={searchInfo}/>
      </form>
      <h2>Add a new</h2>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={event => setNewName(event.target.value)}/>
        </div>
        <div>
          number: <input value={newNumber} onChange={event => setNewNumber(event.target.value)}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {contacts.map(person => <p key={person.id}>{person.name} {person.number}</p>)}
    </div>
  )
}

export default App