import React, { useState, useEffect } from 'react';
import {Card,Button} from 'react-bootstrap';
import axios from "axios";
import './App.css';
const Content=({books})=>{
   return(
     <div className="container">
         {books.map(book=><Card>
  <Card.Img variant="top" src={book.volumeInfo.imageLinks.smallThumbnail}/>
  <Card.Body>
   <Card.Title>{book.volumeInfo.title}</Card.Title>
    <Card.Text>
      Some quick example text to build on the card title and make up the bulk of
      the card's content.
    </Card.Text>
         <footer>Publisher: {book.volumeInfo.publisher}</footer>
    <Button className="button">MORE</Button>
  </Card.Body>
  </Card>
)}
     </div>
   )
}
const App=()=>{
    const [value,setValue]=useState("");
    const [finalvalue,setfinalValue]=useState("");
    const [books,setBooks]=useState([]);
    useEffect(()=>{
      axios.get(`https://www.googleapis.com/books/v1/volumes?q=${finalvalue}`)
      .then((response)=>{
          setBooks(response.data.items)
      })
      .catch(err=>console.log(err))
    },[finalvalue]);
    const handlesubmit=(event)=>{
        event.preventDefault();
        setfinalValue(value);
    }
    const handlechange=(event)=>{
        setValue(event.target.value);
    }
    return(
        <div className="div">
            <h1>Book Finder</h1>
            <form onSubmit={handlesubmit}>
                <input type="text" value={value} onChange={handlechange} className="form"/><br/>
                <button onClick={handlesubmit} className="button1">Search</button>
                {console.log(books)}
            </form>
            <Content books={books}/>
        </div>
    )
}

export default App;
