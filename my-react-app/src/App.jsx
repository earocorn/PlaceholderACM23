import {useState} from "react";
import "./App.css";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { collection, getDoc, doc, setDoc } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

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
const analytics = getAnalytics(app);
const db = getFirestore(app);

function App() {

  let [activities, setActivities] = useState([])
  let [activityInput, setActivityInput] = useState("")
  let [createErrorMessage, setCreateErrorMessage] = useState("")
  let [joinErrorMessage, setJoinErrorMessage] = useState("")
  let [roomID, setRoomID] = useState(Math.floor(Math.random()*90000) + 10000)

  const startTime = Date.now()

  const inputError = "Incorrect name input."
  const roomInputError = "Please enter 5 digit room ID."
  const roomNotExistsError = "Room does not exist."
  const roomExistsError = "Room already exists."
  
  //console.log(activityInput)
  //test
  const [createSpaceName, setCreateSpaceName] = useState("");
  const [joinSpaceName, setJoinSpaceName] = useState("");
  const [isFormVisible, seIsFormVisible] =useState(false);
  const [isFormVisible2, seIsFormVisible2] =useState(false);

  function handleCreateClick () {
    seIsFormVisible2(false);
    seIsFormVisible(true);
    setRoomID(Math.floor(Math.random()*90000) + 10000)
  }

  function handleCreateClick2 () {
    seIsFormVisible(false);
    seIsFormVisible2(true);
    setRoomID(Math.floor(Math.random()*90000) + 10000)
  }

  function handleJoinInputChange(event) {
    setJoinSpaceName(event.target.value);
    setJoinErrorMessage("");
  }

  function handleCreateInputChange(event) {
    setCreateSpaceName(event.target.value);
    setCreateErrorMessage("");
  }

  function handleInputIDChange(event) {
    setRoomID(event.target.value);
    setJoinErrorMessage("");
  }

  async function joinRoomClick() {
    let name = joinSpaceName
    let id = roomID
    if(name.length === 0) {
      setJoinErrorMessage(inputError)
      return
    }
    //reference rooms/(roomID) document
    const roomRef = doc(db, "rooms", roomID.toString());
    //get doc asynchronously
    const snapshot = await getDoc(roomRef);
    //check if roomID document in rooms exists
    if(roomID.length!=5 || roomID.length === 0) {
      setJoinErrorMessage(roomInputError)
      return
    }
    if(!snapshot.exists()) {
      setJoinErrorMessage(roomNotExistsError)
      return
    }
    console.log("Joining room " + roomID)
    await setDoc(doc(db, 'rooms/'+roomID.toString()+'/users', name), {
      name: name
    });
    //TODO:
    //handle join room event
    //include code to go to room webpage of roomID
  }

  async function createRoomClick() {
    let name = createSpaceName
    if(name.length === 0) {
        setCreateErrorMessage(inputError)
        return
    }
    //reference rooms/(roomID) document
    const roomRef = doc(db, "rooms", roomID.toString());
    //get doc asynchronously
    const snapshot = await getDoc(roomRef);
    //check if roomID document in rooms exists
    if(snapshot.exists()) {
      setCreateErrorMessage(roomExistsError)
      return
    }
    //set values in new roomID doc
    await setDoc(doc(db, 'rooms', roomID.toString()), {
      name: "Room " + roomID,
      id: roomID,
      creator: name
    });
    //add room creator to list of room members
    await setDoc(doc(db, 'rooms/'+roomID.toString()+'/users', name), {
      name: name
    });
    //add template of 6 activities in the roomID documeht in wheelactivities/activities document
    await setDoc(doc(db, 'rooms/'+roomID.toString()+'/wheelActivities', "activities"), {
      a1: "",
      a2: "",
      a3: "",
      a4: "",
      a5: "",
      a6: ""
    });
    //TODO:
    //include code to go to room webpage of roomID
    console.log(name + " has successfully created room " + roomID)
  }

/*
  function listActivities() {
    let list = [...activities]
    const listActs =  list.map(activity => <div>{activity}</div>);
    return(
      { listActs }
    )
  } 
*/

  return (
    <div className="app-container">
      <h1 className="app-title"> Welcome to cure boredom App</h1>
      <div className="button-container">
        <button className="create-button" onClick={handleCreateClick}> Create Room</button>
        <button className="join-button" onClick={handleCreateClick2}>Join Room</button>
      </div>
      {isFormVisible && (
        <div className="form-container">
          <label className="createError">{createErrorMessage}</label>
          <input type= "text" placeholder="Enter your Name" value={createSpaceName} onChange = {handleCreateInputChange}/>
          <button className="create-button2" onClick={createRoomClick}> GO </button>
        </div>
      )}
      {isFormVisible2 && (
        <div className="form-container">
          <label className="joinError">{joinErrorMessage}</label>
          <input type= "text" placeholder="Enter your Name" value={joinSpaceName} onChange = {handleJoinInputChange}/>
          <input type= "text" placeholder="Enter Room ID" value={roomID} onChange = {handleInputIDChange}/>
          <div className="button-container"> <button className="join-button2" onClick={joinRoomClick}> GO</button> </div>
        </div>
      )}   
    </div>
  );
 }

 export default App;
