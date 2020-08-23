import React, { useState, useEffect } from 'react';
import axios from "axios";
import './App.css';
import github from './github.png'
const Content=({books})=>{
   return(
     <div className="container">
         {books.map(book=><div className="card">
  <img variant="top" src={book.volumeInfo.imageLinks.smallThumbnail} style={{height:"120px",width:"100px"}} alt="book"/>
   <h3 className="headingcard" style={{height:"50px"}}>{book.volumeInfo.title}</h3>
    <p style={{height:"105px",overflow:"auto"}}>
    {book.volumeInfo.description}
    </p>
         <footer style={{height:"50px"}}>Publisher: {book.volumeInfo.publisher}</footer>
   <a href={book.volumeInfo.infoLink}><button className="button">MORE</button></a>
  </div>
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
             <Heading/>
            <form onSubmit={handlesubmit}>
                <input type="text" value={value} onChange={handlechange} className="form"/><br/>
                <button onClick={handlesubmit} className="button1">Search</button>
                {console.log(books)}
            </form>
            <Content books={books}/>
        </div>
    )
}
const Heading=()=>{
    return (
        <div className='headingcontainer'>
             <h1 className='heading'>
                    Book Finder
            </h1>
            <a href='https://github.com/tanshinayak'><img src={github} alt='github'className='image'></img></a>
        </div>
    )
    }
export default App;
