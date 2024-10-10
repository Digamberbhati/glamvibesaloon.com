import React from 'react'
import  Navbar  from './components/utils/Navbar'
import Home from './components/home/Home' 
import { Route, Routes } from 'react-router-dom'

const App = () => {
  return (
    <div className=''>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
      </Routes>
    </div>
  )
}

export default App