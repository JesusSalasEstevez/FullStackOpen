import { useState, useEffect } from 'react'
import axios from 'axios'

const Filter = ({filter, searchInfo}) => {
  return(
    <form>
    filter shown with <input value={filter} onChange={searchInfo}/>
  </form>
  )
}

const PersonFrom = ({addName, newName, newNumber, setNewName, setNewNumber}) => {
  return (
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
  )
}

const Persons = ({contacts}) => {
  return (
    contacts.map(person => <p key={person.id}>{person.name} {person.number}</p>)
  )
}

const App = () => {

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setNewContacts(response.data)
      })
  }, [])

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

  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setNewFilter] = useState('')
  const [contacts, setNewContacts] = useState(persons)

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} searchInfo={searchInfo}/>
      <h2>Add a new</h2>
      <PersonFrom addName={addName} newName={newName} newNumber={newNumber} setNewName={setNewName} setNewNumber={setNewNumber} />
      <h2>Numbers</h2>
      <Persons contacts={contacts}/>
    </div>
  )
}

export default App