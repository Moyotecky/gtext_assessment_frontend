import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './Pages/Home';
import Collection from './Pages/Collection';
import Product from './Pages/Product';
import Cart from './Pages/Cart';
// import Login from './Pages/Login';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import SearchBar from './Components/SearchBar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

console.log(toast);

function App() {
  return (
    <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
      <ToastContainer />

      <Navbar />
      <SearchBar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/collection" element={<Collection />} />
        <Route path="/product/:productId" element={<Product />} />
        <Route path="/cart" element={<Cart />} />
        {/* <Route path="/login" element={<Login />} /> */}
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
