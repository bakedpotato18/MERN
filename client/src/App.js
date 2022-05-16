import './App.css';
import { useState } from 'react';
import Axios from 'axios';

function App() {
  const[name, setName] = useState("");
  const[year, setYear] = useState(0);
  const[rating, setRating] = useState(0);

  const addBook = () => {
    Axios.post('http://localhost:3001/addbook', {name: name, year: year, rating: rating}).then(() => {alert("It worked!";)} .catch(() => {alert("It failed!")}));
  }

  return (
    <div className="App">
      <div className="inputs">
      <input type="text" placeholder="Book Name" onChange={(event) => {setName(event.target.value)}} />
      <input type="number" placeholder="Year Published" onChange={(event) => {setYear(event.target.value)}} />
      <input type="number" placeholder="Rating 1-5" onChange={(event) => {setRating(event.target.value)}} />
      <button onClick={addBook}>Add Book</button>
      </div>
    </div>
  );
}

export default App;
