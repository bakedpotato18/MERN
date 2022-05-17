import './App.css';
import { useState, useEffect } from 'react';
import Axios from 'axios';

function App() {
  const[name, setName] = useState("");
  const[year, setYear] = useState(0);
  const[rating, setRating] = useState(0);
  const[listOfBooks, setListOfBooks] = useState([]);

  const addBook = () => {
    Axios.post('http://localhost:3001/addbook', {
      name: name, 
      year: year, 
      rating: rating}).then(() => {
    }).then(() => {
      setListOfBooks([...listOfBooks, {name: name, year: year, rating: rating}])
    })
  };

  const updateBook = (id) => {
    const newYear = prompt("Enter new year");

    Axios.put('http://localhost:3001/update', { newYear: newYear, id: id }).then(
      () => {
      setListOfBooks(
        listOfBooks.map((val) => {
        return val._id == id
         ? {_id: id, name: val.name, year: newYear, rating: val.rating} : val;
      }));
  });
};

const deleteBook = (id) => {
  Axios.delete(`http://localhost:3001/delete/${id}`).then(() => {
    setListOfBooks(
      listOfBooks.filter((val) => {
      return val._id != id;
    })
    );
  });
};

  useEffect(() => {
    Axios.get('http://localhost:3001/read')
    .then((response) => {
      setListOfBooks(response.data);
    })
    .catch(() => {
      console.log("ERR");
    });
  }, []);

  return (
    <div className="App">
      <div className="inputs">
      <h2>Add Book</h2>
      <input type="text" placeholder="Book Name" onChange={(event) => {setName(event.target.value)}} />
      <input type="number" placeholder="Year Published" onChange={(event) => {setYear(event.target.value)}} />
      <input type="number" placeholder="Rating 1-5" onChange={(event) => {setRating(event.target.value)}} />
      <button onClick={addBook}>Add Book</button>
      </div>
      
      <div className='container'>
        <table>
          <thead>
            <tr>
              <th colSpan="5">My Books</th>
            </tr>
          </thead>
          <tbody>
      {listOfBooks.map((val) => {
        return <tr>
                <td>{val.name}</td>
                <td>{val.year}</td>
                <td>{val.rating}</td>
                <td><button onClick={() => {updateBook(val._id)}}>Update</button></td>
                <td><button onClick={() => {deleteBook(val._id)}}>Delete</button></td>
              </tr>
      })}
          </tbody>
        </table> 
      </div>
    </div>
  );
}

export default App;
