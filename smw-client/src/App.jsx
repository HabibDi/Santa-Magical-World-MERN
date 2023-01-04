import { Routes, Route } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Toys from './components/Toys';
import DisplayToy from './components/DisplayToy';


import './App.css'


function App() {

  // const [categories, SetCategories] = useState([])

  return (
    <div className="App">

      <Routes>
        <Route path='/' element={<a href="http://localhost:5173/toys">Toys List !</a>} />
        <Route path='/toys' element={<Toys />} />
        <Route path='/toys/:id' element={<DisplayToy />} />
        <Route />
      </Routes>
    </div>
  )
}

export { App }
