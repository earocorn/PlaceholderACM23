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


  return (
    <div>
      <h1>"TEST HEADER"???</h1>
      <label>TESTING LABEL
        <input onChange={(e) => setActivityInput(e.target.value)}/>
      </label>
      <button onClick={() => addActivity(activityInput)}>Add Activity</button>
      <button onClick={() => removeActivity(activityInput)}>Remove Activity</button>
      <button onClick={() => listActivities()}>List Activities</button>
      {console.log(activities)}
    </div>
  )
}

export default App;
