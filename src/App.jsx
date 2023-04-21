import { useState } from 'react'
import {Routes, Route} from 'react-router-dom';
import './App.css'
import Home from './screens/Home';
// import Event from './screens/Create'
import Posts from './screens/Posts'
import NavBar from './screens/NavBar';
function App() {


  return (
    <div className="App">
      <h1><strong>Rate This Movie 🎥🍿</strong></h1>
      <Routes>
          <Route path="/" element={<NavBar />}>
            <Route index path="/" element={<Home />} />
            {/* <Route path="/event/:id" element={<Event />} /> */}
            <Route path="/create" element={<Create />} />
            <Route path="/posts" element={<Posts />} />
            <Route path="*" element={<div>Not Found</div>} /> 
          </Route>
        </Routes>
        
    </div>
  )
}

export default App
