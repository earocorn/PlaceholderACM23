import logo from './logo.svg';
import './App.css';
import { useState } from 'react'
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
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

import react, {useState} from "react";
import "./App.css";
// import firebase from "firebase/app";
// import "firebase/database";
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";

// const firebaseConfig = {
//   apiKey: "AIzaSyB8lrBr6zfiu5LG4Ggsh_PXIHfJK8hcZPg",
//   authDomain: "placeholderacm23.firebaseapp.com",
//   projectId: "placeholderacm23",
//   storageBucket: "placeholderacm23.appspot.com",
//   messagingSenderId: "961028238132",
//   appId: "1:961028238132:web:90bc66a80f2ae9102bd361",
//   measurementId: "G-S0504S9PHZ"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
// const database = firebase.database();

function App() {

  let [activities, setActivities] = useState([])
  let [activityInput, setActivityInput] = useState("")
  
  //console.log(activityInput)
  //test

  function addActivity(activity) {
    setActivities([...activities, activity])
  }


  function removeActivity(activity) {
    if(activities.includes(activity)) {
      let list = [...activities]
      let ind = list.indexOf(activity)
      list = activities.splice(ind, 1)
      setActivities(activities)
      console.log(" removed " + activity)
      return
    }
    console.log(activity + " not found")
  }


  function listActivities() {
    let list = [...activities]
    const listActs =  list.map(activity => <div>{activity}</div>);
    return(
      { listActs }
    )
  }  

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
  return (
    <div className="app-container">
      <h1 className="app-title"> Welcome to cure boredom App</h1>
      <div className="button-container">
        <button className="create-button" onClick={handleCreateClick}> Create Room</button>
        <button className="join-button" onClick={handleCreateClick2}>Join Room</button>
      </div>
      {isFormVisible && (
        <div className="form-container">
          <input type= "text" placeholder="Enter your Name" value={spaceName} onChange = {handleInputChange}/>
          <button className="create-button2"> GO </button>
        </div>
      )}
      {isFormVisible2 && (
        <div className="form-container">
          <input type= "text" placeholder="Enter your Name"  onChange = {handleInputChange}/>
          <input type= "text" placeholder="Enter Room ID"  onChange = {handleInputChange}/>
          <div className="button-container"> <button className="join-button2"> GO</button> </div>
        </div>
      )}   
    </div>
  );
 }

 export default App;
