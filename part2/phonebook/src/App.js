import { useState, useEffect } from 'react'
import axios from 'axios'

const Filter = ({filterString, filterChangeCallback}) => {
  return(
    <div>
      Filter shown with <input value={filterString} onChange={filterChangeCallback} />
    </div>
  )
}

const AddForm = (props) => {
  return(
    <div>
      <h2>Add New</h2>
      <form>
        <div>
          name: <input value={props.newName} onChange={props.nameChangeCallback} />
        </div>
        <div>
          number: <input value={props.newNumber} onChange={props.numberChangeCallback} />
        </div>
        <div>
          <button type="submit" onClick={props.submitFunction}>add</button>
        </div>
      </form>
    </div>
  )
}

const Content = ({visiblePersons}) => {
  return(
    <div>
      <h2>Numbers</h2>
      {visiblePersons.map(person => <p key={person.name}>{person.name} {person.number}</p>)}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  // An effect hook takes two parameters. The first parameter is a function, which React will call,
  // when the component is rendered for the first time. The second parameter is an array of dependencies,
  // which controls when the effect is called. If the second parameter is an empty array,
  // then the effect is only called along with the first render of the component.
  useEffect(() => {
    axios
      .get("http://localhost:3001/persons")
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const addName = (event) => {
    event.preventDefault()
    const nameEntry = {
      name: newName,
      number: newNumber
    }

    const result = persons.find(element => element.name === nameEntry.name)
    if(result !== undefined) {
      alert(`${newName} is already added to phonebook`)
      return
    }

    setPersons(persons.concat(nameEntry))
  }

  const visiblePersons = persons.filter(p => p.name.toLowerCase().includes(filter.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter filterString={filter} filterChangeCallback={event => setFilter(event.target.value)} />

      <AddForm
        newName={newName}
        newNumber={newNumber}
        nameChangeCallback={event => setNewName(event.target.value)}
        numberChangeCallback={event => setNewNumber(event.target.value)}
        submitFunction={addName}
      />

      <Content visiblePersons={visiblePersons} />

    </div>
  )
}

export default App