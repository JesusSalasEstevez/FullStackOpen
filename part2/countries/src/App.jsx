import { useState } from 'react'
import countryService from './services/countries'

const SearchBox = ({searchField, searchFunction}) => {
  return (
    <form>
      find countries <input value={searchField} onChange={searchFunction}></input>
    </form>
  )
}

const Country = ({country}) =>{
  console.log('Country', country)
  const languages = []
  Object.keys(country.languages).forEach(language => {
    languages.push(country.languages[language])
  })
  return(
    <div>
      <h1>{country.name.common}</h1>
      <p>Capital: {country.capital}</p>
      <p>Area: {country.area}</p>
      <br/>
      <h3>Languages</h3>
      <ul>
        {languages.map(language => <li key={language}>{language}</li>)}
      </ul>
      <img src={country.flags.png} alt="Flag"/>
    </div>
  )
}

const QueryCountries = ({query, showFunction}) => {
  if(query){
    console.log('QueryCountries', query)
    if(!query.length){
      return (
        <Country country={query}/>
      )
    }else if(query.length <= 10){
      return (
        query.map(c => <p key={c.name.common}>{c.name.common} <button onClick={() => showFunction(c.name.common)}>show</button></p>)
      )
    }else{
      return (
        <p>Too many matches, specify another filter</p>
      )
    }
  }
}

const App = () => {
  
  const [searchField, setSearchField] = useState('')
  const [query, setQuery] = useState(null)

  const searchFunction = event => {
    event.preventDefault()
    setSearchField(event.target.value)
    countryService
    .get()
    .then(countries => {
      const array = []
      countries.map(c => {
        if(c.name.common.includes(event.target.value)){
          array.push(c)
        }
      })
      if (array.length === 1)
        setQuery(array[0])
      else 
        setQuery(array)
    })
  }

  const showFunction = name => {
    console.log('showFunction called')
    countryService
      .getbyname(name)
      .then(countrie =>{
        countrie.name.common = name
        setQuery(countrie)
        console.log(countrie)
      })
  }

  return (
    <>
    <SearchBox searchField={searchField} searchFunction={searchFunction} />
    <QueryCountries query={query} showFunction={showFunction}/>
    </>
  )
}

export default App