import {useEffect, useState} from "react";
import "./App.css";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { collection, getDoc, doc, setDoc, updateDoc } from "firebase/firestore";
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
const db = getFirestore(app);

//let [roomName, setRoomName] = useState("")
//let [roomCode, setRoomCode] = useState()

// import "react-wheel-of-prizes/dist/index.css";


//////////////////////////////////////////////////////
/////////////// WEBSITE CODE /////////////////////////
//////////////////////////////////////////////////////


/**
 * Room(props)
 * builds the room page.
 * Called by App()
 * 
 * @param {userName, roomID} props 
 * @returns 
 */
 function Room(props) {
  let [items, setItems] = useState([""]);
  let [ourInput, setOurInput] = useState("");
  let [output, setOutput] = useState("");
  let [count, setCount] = useState(1);

  useEffect(() => {
    getItems();
  }, []);

  if (props.userName === "") {
    console.log("No empty usernames")
  }
  if(props.roomID.length > 5 || props.roomID.length < 5) {
    console.log("Invalid room ID")
  }

  const segColors = ["#EE4040", "#F0CF50", "#815CD1", "#3DA5E0", "#34A24F"];
  const onFinished = (winner) => {
    console.log(winner);
  };

  async function getItems() {
    const activitiesDoc = await getDoc(doc(db, "rooms/"+props.roomID+"/wheelActivities", 'activities'));
    const activitiesData = activitiesDoc.data();
    console.log(JSON.stringify(activitiesData))
    const activitiesList = activitiesData["list"];
    setItems(activitiesList);
  }

  async function addToList(item) {
    // Copy the array and add the item to the end
    if(count>6) {
      console.log("TOO MANY ITEMS O_O")
      return
    }
    
    const activitiesDoc = await getDoc(doc(db, "rooms/"+props.roomID+"/wheelActivities", 'activities'));
    const activitiesData = activitiesDoc.data();
    console.log(JSON.stringify(activitiesData))
    const activitiesList = activitiesData["list"];
    activitiesList.push(item);
    console.log(activitiesList);
    await updateDoc(activitiesDoc.ref, { list: activitiesList })
    setItems(activitiesList);
    // switch (count) {
    //   case 1:
    //     await updateDoc(activitiesDoc, { a1: item })
    //     setCount(count+1)
    //     break;
    //   case 2:
    //     await updateDoc(activitiesDoc, { a2: item })
    //     setCount(count+1)
    //     break;
    //   case 3:
    //     await updateDoc(activitiesDoc, { a3: item })
    //     setCount(count+1)
    //     break;
    //   case 4:
    //     await updateDoc(activitiesDoc, { a4: item })
    //     setCount(count+1)
    //     break;
    //   case 5:
    //     await updateDoc(activitiesDoc, { a5: item })
    //     setCount(count+1)
    //     break;
    //   case 6:
    //     await updateDoc(activitiesDoc, { a6: item })
    //     setCount(count+1)
    //     break;
    //   default:
    //     console.log("ACTIVITIES FULL!")
    //     break;
    // }
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
      <h1>Room Code: {props.roomID}</h1>
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

  let [showRoom, setShowRoom]= useState(false);
  let [createErrorMessage, setCreateErrorMessage] = useState("")
  let [joinErrorMessage, setJoinErrorMessage] = useState("")
  let [roomID, setRoomID] = useState(Math.floor(Math.random()*90000) + 10000)
  let [roomCode, setRoomCode] = useState(0)

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
    setRoomCode(roomID)
    setShowRoom(!showRoom)
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
      list: []
    });

    //TODO:
    //include code to go to room webpage of roomID
    console.log(name + " has successfully created room " + roomID)
    setRoomCode(roomID)
    setShowRoom(!showRoom)
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
      {!showRoom && <>
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
      </>}
      {
        showRoom && <Room roomID={roomCode}/>
      } 
    </div>
  );
 }

 export default App;
