const Hello = () => {
  return (
    <div>
      <p>Hellow world</p>
    </div>
  )
}

const App = () => {
  return(
    <div>
      <h1>Greeting</h1>
      <Hello />
      <Hello />
      <Hello />
    </div>
  )
}

export default App