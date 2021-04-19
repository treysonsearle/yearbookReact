import axios from "axios"
import React, { useState, useEffect } from "react";
import './App.css';

const YearbookManager = () => {
  const [input, setInput] = useState({
    schoolName: '',
    year: '',
    order: false,
    id: ''
  })
  let [allYearbooks, setAllYearbooks] = useState([])
  let [getYearbook, setGetYearbook] = useState(null)

  const fetchYearBooks = () => {
    axios.get("http://localhost:8080/api/yearbooks/")
      .then(res => {
        setAllYearbooks([allYearbooks] = res.data)
      })
  }

  const fetchYearBook = (id) => {
    axios.get(`http://localhost:8080/api/yearbooks/${id}`)
      .then(res => {
        setGetYearbook(getYearbook = res.data)
      })
  }

  const orderYearBook = (id) => {
    axios.put(`http://localhost:8080/api/yearbooks/${id}`, { ordered: "true", schoolName: getYearbook.schoolName, year: getYearbook.year, id: getYearbook.id })
    setGetYearbook(getYearbook = null)
  }

  const deleteYearBook = (id) => {
    axios.delete(`http://localhost:8080/api/yearbooks/${id}`)

  }

  const handleDelete = (e) => {
    deleteYearBook(input.id)
    setGetYearbook(getYearbook = null)
    fetchYearBooks()
  }


  const handleOrder = (e) => {
    orderYearBook(input.id)
    setGetYearbook(getYearbook = null)
    fetchYearBooks()
  }

  const handleSelect = (e) => {
    e.preventDefault()
    fetchYearBook(input.id)
    console.log(getYearbook)
  }

  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    axios.post("http://localhost:8080/api/yearbooks/", { schoolName: input.schoolName, year: input.year, ordered: false })

  }


  useEffect(() => {
    fetchYearBooks()
  }, [allYearbooks])



  return (
    <div>
      <h1>All Year Books</h1>
      <div className="yearbooks">

        {allYearbooks.map((e, i) => (
          <div key={i}>
            <h3>{e.schoolName}</h3>
            <h3>{e.year}</h3>
            <h3>{e.id}</h3>
            {console.log(e.ordered)}
            <h3>Ordered: {e.ordered ? "true" : "false"}</h3>
            <img src="https://www.svgrepo.com/show/66922/book-cover.svg" />
          </div>
        ))}
      </div>
      <div>
        <h1>Make a YearBook</h1>
        <form onSubmit={handleSubmit}>
          <label>School Name</label>
          <input type="text" name="schoolName" value={input.schoolName} onChange={handleChange}></input>
          <label>Year</label>
          <input type="text" name="year" value={input.year} onChange={handleChange}></input>
          <button type='submit'>Create</button>
        </form>
      </div>
      <div>
        <form onSubmit={handleSelect}>
          <label>Select Yearbook</label>
          <input type="text" name="id" value={input.id} onChange={handleChange}></input>
          <button type='submit'>Select</button>
        </form>
      </div>
      {getYearbook ?
        (<>
          <h3>{getYearbook.schoolName}</h3>
          <h3>{getYearbook.year}</h3>
          <h3>{getYearbook.id}</h3>
          <h3>{getYearbook.ordered ? "true" : "false"}</h3>
          <button onClick={handleOrder}>Order</button>
          <button onClick={handleDelete}>Delete</button>
        </>

        ) :
        (
          <>
            <h2>No Year Book Selected</h2>
          </>
        )
      }


    </div >
  )
}





function App() {
  return (
    <div className="App">
      <YearbookManager />
    </div>
  );
}

export default App;
