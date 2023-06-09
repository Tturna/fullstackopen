import { useState, useEffect } from 'react'
import DBAccess from './services/DBAccess'

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

const DeleteButton = (props) => {
  const {name, _, id} = props.person
  const [persons, setPersons] = props.hook

  const deleteEntry = () => {
    if (!window.confirm(`Delete ${name}?`)) return;

    DBAccess.deleteEntry(id)
      .then(() => {
        // console.log(data)
        setPersons(persons.filter(p => p.id !== id))
      })
  }
  return(
    <button onClick={() => deleteEntry()}>Delete</button>
  )
}

const PersonEntry = (props) => {
  const {name, number, _} = props.person

  return(
    <p>
      {name} {number} <DeleteButton person={props.person} hook={props.hook} />
    </p>
  )
}

const Content = ({visiblePersons, hook}) => {
  return(
    <div>
      <h2>Numbers</h2>
      {visiblePersons.map(person => <PersonEntry key={person.name} person={person} hook={hook} />)}
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
    DBAccess.readAll()
      .then(data => {
        setPersons(data)
      })
  }, [])

  const addName = (event) => {
    event.preventDefault()
    const nameEntry = {
      name: newName,
      number: newNumber
    }

    const existing = persons.find(element => element.name === nameEntry.name)
    if(existing !== undefined) {
      if (!window.confirm(`${existing.name} is already added to phonebook. Replace the old number with a new one?`)) return

      DBAccess.update(existing.id, nameEntry)
        .then(data => {
          console.log(data)
          setPersons(persons.map(p => p.id === data.id ? data : p))
      })
    }
    else {
      DBAccess.create(nameEntry)
        .then(data => {
          setPersons(persons.concat(data))
      })
    }
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

      <Content visiblePersons={visiblePersons} hook={[persons, setPersons]} />

    </div>
  )
}

export default App