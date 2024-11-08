import { useState, useEffect } from 'react'
import personsService from './services/persons'

const Filter = ({filter, searchInfo}) => {
  return(
    <form>
    filter shown with <input value={filter} onChange={searchInfo}/>
  </form>
  )
}

const PersonFrom = ({addPerson, newName, newNumber, setNewName, setNewNumber}) => {
  return (
    <form onSubmit={addPerson}>
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

const Persons = ({persons, handleClick}) => {
  return (
    persons.map(person => <p key={person.id}>{person.name} {person.number} <button onClick={() => handleClick(person.id)}>erase</button></p>)
  )
}

const App = () => {
  
  useEffect(() => {
      personsService
        .getAll()
        .then(initialPersons => {
          setPersons(initialPersons)
        })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    if(persons.find(p => p.name == newName)){
      window.alert(`${newName} is already added to phonebook`)
    }else{
      const newPerson ={name: newName, number: newNumber}
      personsService
        .create(newPerson)
        .then(newPerson => {
          setPersons(persons.concat(newPerson))
          setNewName('')
          setNewNumber('')
        })
    }
  }

  const erasePerson = id => {
    if(window.confirm(`Delete ${persons.filter(p => p.id == id)[0].name} ?`))
      personsService
        .erase(persons.filter(p => p.id == id)[0])
        .then(erasedPerson => setPersons(persons.filter(p => p.id != erasedPerson.id)))
  }

  const searchInfo = (event) => {
    setNewFilter(event.target.value)
  }

  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setNewFilter] = useState('')

  const personsToShow = filter == '' ? persons : persons.filter(p => p.name.toLowerCase().includes(filter.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} searchInfo={searchInfo}/>
      <h2>Add a new</h2>
      <PersonFrom addPerson={addPerson} newName={newName} newNumber={newNumber} setNewName={setNewName} setNewNumber={setNewNumber} />
      <h2>Numbers</h2>
      <Persons persons={personsToShow} handleClick={erasePerson}/>
    </div>
  )
}

export default App