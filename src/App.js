import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter, Routes,Route } from 'react-router-dom';
import Product from './components/Product';

function App() {
  return (
    <div className="">
      <BrowserRouter>
      <Navbar/>
      <Routes>
      <Route path="/" element={<Product/>}></Route>
      </Routes>
      </BrowserRouter>
  
    </div>
  );
}

export default App;
