import { useState } from 'react'

const App = () => {

  const input = (event) => {
    setNewName(event.target.value)
  }

  const addName = (event) => {
    event.preventDefault()
    if(persons.find(p => p.name == newName)){
      window.alert(`${newName} is already added to phonebook`)
    }else{
      const newPerson ={name: newName}
      const newPersons = persons.concat(newPerson)
      setNewName('')
      setPersons(newPersons)
    }
  }

  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ])
  const [newName, setNewName] = useState('')

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={input}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(person => <p key={person.name}>{person.name}</p>)}
    </div>
  )
}

export default App