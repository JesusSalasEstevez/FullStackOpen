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

  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '152-1634526'}
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  return (
    <div>
      <h2>Phonebook</h2>
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
      {persons.map(person => <p key={person.name}>{person.name} {person.number}</p>)}
    </div>
  )
}

export default App