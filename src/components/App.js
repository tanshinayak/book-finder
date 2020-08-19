import React, { useState, useEffect } from 'react';
import {Card,Button} from 'react-bootstrap';
import axios from "axios";
import './App.css';
const Content=({books})=>{
   return(
     <div className="container">
         {books.map(book=><Card className="card">
  <Card.Img variant="top" src={book.volumeInfo.imageLinks.smallThumbnail} style={{height:"120px",width:"100px"}}/>
  <Card.Body>
   <Card.Title className="heading" style={{height:"50px"}}>{book.volumeInfo.title}</Card.Title>
    <Card.Text style={{height:"105px",overflow:"auto"}}>
    {book.volumeInfo.description}
    </Card.Text>
         <footer style={{height:"50px"}}>Publisher: {book.volumeInfo.publisher}</footer>
   <a href={book.volumeInfo.infoLink}><Button className="button">MORE</Button></a>
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
