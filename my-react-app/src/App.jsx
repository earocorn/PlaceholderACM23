import {useState} from "react";
import "./App.css";
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import WheelComponent from "react-wheel-of-prizes";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB8lrBr6zfiu5LG4Ggsh_PXIHfJK8hcZPg",
  authDomain: "placeholderacm23.firebaseapp.com",
  projectId: "placeholderacm23",
  storageBucket: "placeholderacm23.appspot.com",
  messagingSenderId: "961028238132",
  appId: "1:961028238132:web:90bc66a80f2ae9102bd361",
  measurementId: "G-S0504S9PHZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app)

// import "react-wheel-of-prizes/dist/index.css";

function Room(props) {
  let [items, setItems] = useState([]);
  let [ourInput, setOurInput] = useState("");
  let [output, setOutput] = useState("");

  if (props.userName === "") {
    console.log("No empty usernames")
  }

  const segColors = ["#EE4040", "#F0CF50", "#815CD1", "#3DA5E0", "#34A24F"];
  const onFinished = (winner) => {
    console.log(winner);
  };
  function addToList(item) {
    // Copy the array and add the item to the end
    setItems([...items, item]);
  }
  return (
    <div>
      <label>
        Enter an item <input onChange={(e) => setOurInput(e.target.value)} />
      </label>
      <button onClick = {() => addToList(ourInput)}>Add to list</button>
      <button onClick = {() => setOutput}>Spin!</button>
      {items.map((item) => {
        return <h2>{item}</h2>
      })}
      <h1>Your next event is:</h1>
      <h1>{output}</h1>
      <WheelComponent
          key={Math.random()}
          segments={items}
          segColors={segColors}
          onFinished={(winner) => onFinished(winner)}
          primaryColor="black"
          contrastColor="white"
          buttonText="Spin"
          isOnlyOnce={false}
          size={190}
          upDuration={500}
          downDuration={600}
          fontFamily="Arial"
        />
    </div>
  )
}

function App() {

  let [activities, setActivities] = useState([])
  let [activityInput, setActivityInput] = useState("")
  
  //console.log(activityInput)
  //test
  const [spaceName, setSpaceName] = useState("");
  const [isFormVisible, seIsFormVisible] =useState(false);
  const [isFormVisible2, seIsFormVisible2] =useState(false);
  function handleCreateClick () {
    seIsFormVisible2(false);
    seIsFormVisible(true);
 }

  function handleCreateClick2 () {
    seIsFormVisible(false);
    seIsFormVisible2(true);
    }
  function handleInputChange(event) {
    setSpaceName(event.target.value);
  }


  function listActivities() {
    let list = [...activities]
    const listActs =  list.map(activity => <div>{activity}</div>);
    return(
      { listActs }
    )
  } 

  // function buildRoom() {
  //   return <Room />
  // }

  return (
    // <div className="app-container">
    //   <h1 className="app-title"> Welcome to cure boredom App</h1>
    //   <div className="button-container">
    //     <button className="create-button" onClick={handleCreateClick}> Create Room</button>
    //     <button className="join-button" onClick={handleCreateClick2}>Join Room</button>
    //   </div>
    //   {isFormVisible && (
    //     <div className="form-container">
    //       <input type="text" placeholder="Enter your Name" value={spaceName} onChange={handleInputChange} />
    //       <button onClick={() => <Room />} className="create-button2"> GO </button>
    //     </div>
    //   )}
    //   {isFormVisible2 && (
    //     <div className="form-container">
    //       <input type="text" placeholder="Enter your Name" onChange={handleInputChange} />
    //       <input type="text" placeholder="Enter Room ID" onChange={handleInputChange} />
    //       <div className="button-container"> <button className="join-button2"> GO</button> </div>
    //     </div>
    //   )}
    // </div>
    <Room />
  );
 }

export default App;
