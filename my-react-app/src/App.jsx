import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'


function App() {
  let [items, setItems] = useState([]);
  let [ourInput, setOurInput] = useState("");
  let [output, setOutput] = useState("");
  
  function addToList(item) {
    // Copy the array and add the item to the end
    setItems([...items, item]);
  }

  return (
    <div>
      <label>
        Enter an item <input onChange={(e) => setOurInput(e.target.value)}/>
      </label>
      <button onClick = {() => addToList(ourInput)}>Add to list</button>
      <button onClick = {() => setOutput}>Spin!</button>
      {items.map((item) => {
        return <h2>{item}</h2>
      })}
      <h1>Your next event is:</h1>
      {output.map((output) => {
        return <h1>{output}</h1>
      })}
    </div>
  )
}

export default App