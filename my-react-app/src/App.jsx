import react, {useState} from "react";
import "./App.css";


 function App() {
  const [showForm, setSHowForm] = useState(false);
   function handleCreateClick () {
    setSHowForm(true);
   }
  return (
    <div className="app-container">
      <h1 className="app-title"> Welcome to cure boredom App</h1>
      {showForm ? (
        <div className="form-container">
          <input type= "text" placeholder="Enter your Name" />
          <button> Create Room</button>
        </div>
      ):(
        <div className="button-container">
        <button className="create-button" onClick={handleCreateClick}> Create Room</button>
        <button className="join-button">Join Room</button>
      </div>
      )}  
    </div>
  );
 }

 export default App;
