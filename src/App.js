import { Routes, Route } from "react-router-dom";
import Products from "./Components/Products/Products";
import Product from "./Components/Product/Product";
import Checkout from "./Components/Checkout/Checkout";
import Login from "./Components/Login/Login";
import Header from "./Components/Header";

function App() {
  return (
    <div>

      <Header />


      <Routes>

        <Route path="/" element={<Products />} />


        <Route path="/products/:id" element={<Product />} />


        <Route path="/checkout" element={<Checkout />} />


        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
