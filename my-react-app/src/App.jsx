import react, {useState} from "react";
import "./App.css";


 function App() {
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
          <input type= "text" placeholder="Enter your Name" value={spaceName} onChange = {handleInputChange}/>
          <input type= "text" placeholder="Enter Room ID" value={spaceName} onChange = {handleInputChange}/>
          <div className="button-container"> <button className="join-button2"> GO</button> </div>
        </div>
      )}   
    </div>
  );
 }

 export default App;
