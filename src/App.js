import { Routes, Route } from "react-router-dom";
import Products from "./Components/Products/Products";
import Product from "./Components/Product/Product";
import Checkout from "./Components/Checkout/Checkout";
import Login from "./Components/Login/Login";
import Header from "./Components/Header";
import NotFound from "./Components/Notfound/Notfound";
import Footer from "./Components/Footer";

function App() {
  return (
    <div className=" bg-gray-900 ">
      <Header />
      <Routes>
        <Route path="/" element={<Products />} />
        <Route path="/products/:id" element={<Product />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NotFound />} /> 
      </Routes>
      <Footer></Footer>
    </div>
  );
}

export default App;
