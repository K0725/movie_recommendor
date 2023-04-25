import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Create from './screens/Create';
import Home from './screens/Home';
import Posts from './components/Posts';
import NavBar from './screens/NavBar';
import Edit from './screens/Edit'; 

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route index path="/" element={<Home />} />
          <Route path="/create" element={<Create />} />
          <Route path="/posts" element={<Posts />} />
          <Route path="/edit/:id" element={<Edit />} /> {/* Change the element to <Edit /> */}
          <Route path="*" element={<div>Not Found</div>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
