import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter, Routes,Route } from 'react-router-dom';
import Product from './components/Product';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Checkout from './components/Checkout';



function App() {
  return (
    <div className="">
      <ToastContainer
      position="top-center"
      autoClose={1000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover/>
      <BrowserRouter>
      <Navbar/>
      <Routes>
      <Route path="/" element={<Product/>}></Route>
      <Route path="/product/:categoryId" element={<Product/>}></Route>
      <Route path='/checkout' element={<Checkout/>}></Route>
      </Routes>
      </BrowserRouter>

  
    </div>
  );
}

export default App;
