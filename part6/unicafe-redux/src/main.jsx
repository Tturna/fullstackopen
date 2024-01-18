import React from 'react'
import ReactDOM from 'react-dom/client'

import { createStore } from 'redux'
import reducer from './reducer'

const store = createStore(reducer)

const createDispatcher = (actionType) => {
  const dispatch = () => {
    store.dispatch({
      type: actionType
    })
  }

  return dispatch
}

const App = () => {
  return (
    <div>
      <button onClick={createDispatcher('GOOD')}>good</button> 
      <button onClick={createDispatcher('OK')}>ok</button> 
      <button onClick={createDispatcher('BAD')}>bad</button>
      <button onClick={createDispatcher('ZERO')}>reset stats</button>
      <div>good {store.getState().good}</div>
      <div>ok {store.getState().ok}</div>
      <div>bad {store.getState().bad}</div>
    </div>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'))

const renderApp = () => {
  root.render(<App />)
}

renderApp()
store.subscribe(renderApp)
