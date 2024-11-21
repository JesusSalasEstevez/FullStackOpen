import { useState, useEffect } from 'react'
import personsService from './services/persons'

const Filter = ({filter, searchInfo}) => {
  return(
    <form>
    filter shown with <input value={filter} onChange={searchInfo}/>
    </form>
  )
}
const Message = ({message, color}) => {
  const messageStyle = {
    color: color,
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    backgroundColor: 'lightgrey',
    margin: 10
  }

  if(message === '')
    return null

  return (
    <div style={messageStyle}>
      <p>
        {message}
      </p>
    </div>
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

  const addPerson = event => {
    event.preventDefault()
    if(persons.find(p => p.name == newName) != undefined ){
      const newPerson = {...persons.find(p => p.name == newName), number: newNumber}
      if (window.confirm(`${newPerson.name} is already added to phonebook, replace the old number with a new one?`)){
        personsService
          .update(newPerson)
          .then(person => {
            setPersons(persons.filter(p => p.name != person.name).concat(newPerson))
            setNewNumber('')
            setNewName('')
            setMessage(`${newPerson.name}'s number changed`)
            setColor('green')
            setTimeout(() => {
              setMessage('')
            }, 5000);
          })
          .catch(() => {
            setMessage(`Information of ${newPerson.name} has already been removed from server`)
            setColor('red')
          })
      }
    }else{
      const newPerson ={name: newName, number: newNumber}
      personsService
        .create(newPerson)
        .then(newPerson => {
          setPersons(persons.concat(newPerson))
          setNewName('')
          setNewNumber('')
          setMessage(`Added ${newPerson.name}`)
          setColor('green')
          setTimeout(() => {
            setMessage('')
          }, 5000);
        }).catch(error => {
          setMessage(`${error.response.data.error}`)
          setColor('red')
          setTimeout(() => {
            setMessage('')
          }, 5000);
          console.log(error.response.data.error)
        })
    }
  }

  const erasePerson = id => {
    const erasedPerson = persons.filter(p => p.id == id)[0]
    if(window.confirm(`Delete ${persons.filter(p => p.id == id)[0].name} ?`))
      personsService
        .erase(erasedPerson)
        .then(() => {
          setPersons(persons.filter(p => p.id !== id))
          setMessage(`Erased ${erasedPerson.name}`)
          setColor('green')
          setTimeout(() => {
            setMessage('')
          }, 5000);
        })
  }

  const searchInfo = (event) => {
    setNewFilter(event.target.value)
  }

  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setNewFilter] = useState('')
  const [message, setMessage] = useState('')
  const [color, setColor] = useState('')

  const personsToShow = filter == '' ? persons : persons.filter(p => p.name.toLowerCase().includes(filter.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <Message message={message} color={color}/>
      <Filter filter={filter} searchInfo={searchInfo}/>
      <h2>Add a new</h2>
      <PersonFrom addPerson={addPerson} newName={newName} newNumber={newNumber} setNewName={setNewName} setNewNumber={setNewNumber} />
      <h2>Numbers</h2>
      <Persons persons={personsToShow} handleClick={erasePerson}/>
    </div>
  )
}

export default App