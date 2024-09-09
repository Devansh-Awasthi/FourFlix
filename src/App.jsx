import { useState } from 'react'

import './App.css'
import { Route, Router, Routes } from 'react-router-dom'
import Home from './Component/Home'

function App() {
  return (
    <div className='bg-[#181818] h-screen w-full'>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
      </Routes>





    </div>
        
    
  )
}

export default App
