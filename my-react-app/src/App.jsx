import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'


function App() {
  let [items, setItems] = useState([]);
  let [ourInput, setOurInput] = useState("");
  let [output, setOutput] = useState("");
  
  const segColors = ["#EE4040", "#F0CF50", "#815CD1", "#3DA5E0", "#34A24F"];
  const onFinished = (winner) => {
    console.log(winner);
  };
  function addToList(item) {
    // Copy the array and add the item to the end
    setItems([...items, item]);
    setSegments([...segments, item]);
  }
  console.log(segments)
  return (
    <><div>
      <label>
        Enter an item <input onChange={(e) => setOurInput(e.target.value)} />
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
