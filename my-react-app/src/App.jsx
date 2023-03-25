import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import WheelComponent from "react-wheel-of-prizes";



function App() {
  let [items, setItems] = useState([]);
  let [ourInput, setOurInput] = useState("");
  let [output, setOutput] = useState("");
  let [segments, setSegments] = useState([]);
  
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
      <button onClick={() => addToList(ourInput)}>Add to list</button>
      <button onClick={() => setOutput("theOutput")}>Spin!</button>
      {segments.map((item) => <h2>{item}</h2>)}
      <h1>Your next event is:</h1>
      <h1>{output}</h1>

    </div><WheelComponent
        key={Math.random()}
        segments = {segments}
        segColors = {segColors}
        onFinished = {(winner) => onFinished(winner)}
        primaryColor = "black"
        contrastColor = "white"
        buttonText = "Spin"
        isOnlyOnce = {false}
        size = {190}
        upDuration = {500}
        downDuration = {600}
        fontFamily = "Arial" /></>
  )
}

export default App