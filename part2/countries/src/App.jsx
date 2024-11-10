import { useState, useEffect } from 'react'
import countryService from './services/countries'

const SearchBox = ({searchField, searchFunction}) => {
  return (
    <form>
      find countries <input value={searchField} onChange={searchFunction}></input>
    </form>
  )
}

const Country = ({country}) =>{
  const languages = []
  Object.keys(country[0].languages).forEach(language => {
    languages.push(country[0].languages[language])
  })
  return(
    <div>
      <h1>{country[0].name.common}</h1>
      <p>Capital: {country[0].capital}</p>
      <p>Area: {country[0].area}</p>
      <br/>
      <h3>Languages</h3>
      <ul>
        {languages.map(language => <li key={language}>{language}</li>)}
      </ul>
      <img src={country[0].flags.png} alt="Flag"/>
    </div>
  )
}

const QueryCountries = ({query}) => {
  if(query){
    if(query.length === 1){
      return (
        <Country country={query}/>
      )
    }else if(query.length <= 10){
      return (
        query.map(c => <p key={c.name.common}>{c.name.common}</p>)
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
  }

  useEffect(() => {
    if(searchField)
      countryService
        .get()
        .then(countries => {
          const array = []
          countries.map(c => {
            if(c.name.common.includes(searchField)){
              array.push(c)
            }
          }),
          setQuery(array)
        })
  },[searchField])

  return (
    <>
    <SearchBox searchField={searchField} searchFunction={searchFunction} />
    <QueryCountries query={query} />
    </>
  )
}

export default App