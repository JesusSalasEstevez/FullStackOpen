import { useState, useEffect } from 'react'
import axios from 'axios'

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

const Persons = ({persons}) => {
  console.log(persons)
  return (
    persons.map(person =><p key={person.id}>{person.name} {person.number}</p>)
  )
}

const App = () => {

  const dataUrl = 'http://localhost:3001/persons'
  
  useEffect(() => {
    axios
      .get(dataUrl)
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    if(persons.find(p => p.name == newName)){
      window.alert(`${newName} is already added to phonebook`)
    }else{
      const newPerson ={name: newName, number: newNumber}
      const newPersons = persons.concat(newPerson)
      axios
        .post(dataUrl, newPerson)
        .then(() => {
          setPersons(persons.concat(newPerson))
          setNewName('')
          setNewNumber('')
        })
    }
  }

  const searchInfo = (event) => {
    console.log(event.target.value == '' ? 'true' : 'false')
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
      <Persons persons={personsToShow}/>
    </div>
  )
}

export default App