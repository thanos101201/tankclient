import logo from './logo.svg';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Login from './Components/Login';
import Home from './Components/Home';
import Join from './Components/Join';
import Sign from './Components/Sign';
function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route path='/home' element={<Home />} />
        <Route path='/join' element={<Join />} />
        <Route path='/sign' element={<Sign />} />
      </Routes>
    </div>
  );
}

export default App;
