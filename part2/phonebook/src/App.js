import { useState, useEffect } from 'react'
import DBAccess from './services/DBAccess'
import './index.css'

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

const Notification = ({message}) => {
  if (message[0] === null) return null;
  
  const style = message[1] ? 'error' : 'notification'
  return(
    <p className={style}>{message}</p>
  )
}

const DeleteButton = ({deleteFunction, person: {id}}) => {
  return(
    <button onClick={() => deleteFunction(id)}>Delete</button>
  )
}

// Nested destructuring
const PersonEntry = ({person: {name, number}}) => <>{name} {number} </>

const Content = ({visiblePersons, deleteFunction}) => {
  return(
    <div>
      <h2>Numbers</h2>
      {
        visiblePersons.map(person => {
          return(
            <p key={person.name}>
              <PersonEntry person={person} />
              <DeleteButton person={person} deleteFunction={deleteFunction} />
            </p>
          )
        })
      }
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [notification, setNotification] = useState([null, false])

  // An effect hook takes two parameters. The first parameter is a function, which React will call,
  // when the component is rendered for the first time. The second parameter is an array of variables,
  // which controls when the effect is called. Whenever a variable in the array changes value,
  // the effect is executed again.
  useEffect(() => {
    DBAccess.readAll()
      .then(data => {
        setPersons(data)
      })
  }, [])

  const notify = (notification, time) => {
    setNotification(notification)

    setTimeout(() => {
      setNotification([null, false])
    }, time);
  }

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
          // console.log(data)
          setPersons(persons.map(p => p.id === data.id ? data : p));
          notify([`Updated number for ${existing.name}`, false], 5000);
      })
      .catch(e => {
        console.log(e);
        notify([e.response.data.error, true], 5000);
      });
    }
    else {
      DBAccess.create(nameEntry)
        .then(data => {
          setPersons(persons.concat(data))
          notify([`Added ${nameEntry.name}`, false], 5000)
      })
      .catch(e => {
        console.log(e);
        notify([e.response.data.error, true], 5000);
      });
    }
  }

  const deleteName = (id) => {
    const name = persons.find(p => p.id === id).name
    if (!window.confirm(`Delete ${name}?`)) return;

    DBAccess.deleteEntry(id)
      .then(() => {
        setPersons(persons.filter(p => p.id !== id))
        notify([`Deleted ${name}`, false], 5000)
      })
      .catch(error => {
        console.log(error)
        notify([`Data for ${name} doesn't exist. Please refresh the page.`, true], 5000)
      })
  }
  
  const visiblePersons = persons.filter(p => p.name.toLowerCase().includes(filter.toLowerCase()))
  
  return (
    <div>
      <h2>Phonebook</h2>

      <Notification message={notification} />
      <Filter filterString={filter} filterChangeCallback={event => setFilter(event.target.value)} />

      <AddForm
        newName={newName}
        newNumber={newNumber}
        nameChangeCallback={event => setNewName(event.target.value)}
        numberChangeCallback={event => setNewNumber(event.target.value)}
        submitFunction={addName}
      />

      <Content visiblePersons={visiblePersons} deleteFunction={deleteName} />

    </div>
  )
}

export default App