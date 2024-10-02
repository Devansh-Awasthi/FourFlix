import { useState } from 'react'

import './App.css'
import { Route, Router, Routes } from 'react-router-dom'
import Home from './Component/Home'
import Trending from './Component/Trending'
import Popular from './Component/Popular'
import Movies from './Component/Movies'
import Show from './Component/Show'
import People from './Component/People'
function App() {
  return (
    <div className='bg-[#181818] h-screen w-full'>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/trending' element={<Trending/>}></Route>
        <Route path='/popular' element={<Popular/>}></Route>
        <Route path='/movies' element={<Movies/>}></Route>
        <Route path='/show' element={<Show/>}></Route>
        <Route path='/people' element={<People/>}></Route>
      </Routes>





    </div>
        
    
  )
}

export default App
