import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Products from "./Components/Products/Products";
import Product from "./Components/Product/Product";
import Checkout from "./Components/Checkout/Checkout";
import Login from "./Components/Login/Login";
import Header from "./Components/Header";
import NotFound from "./Components/Notfound/Notfound";
import Footer from "./Components/Footer";
import Addtocart from "./Components/Addtocart/Addtocart";

function App() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });
  const [newItemCount, setNewItemCount] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState(() => {
    const savedCategory = localStorage.getItem("selectedCategory");
    return savedCategory ? JSON.parse(savedCategory) : null;
  });
  const [selectedSubCategory, setSelectedSubCategory] = useState(() => {
    const savedSubCategory = localStorage.getItem("selectedSubCategory");
    return savedSubCategory ? JSON.parse(savedSubCategory) : null;
  });
  const productsPerPage = 6;
  const location = useLocation();
  const navigate = useNavigate();


  useEffect(() => {
    fetch("/my-react-app/api/products.json")
      .then((res) => res.json())
      .then((res) => setProducts(res));

    fetch("/my-react-app/api/categories.json")
      .then((res) => res.json())
      .then((res) => setCategories(res));
  }, []);



  useEffect(() => {
    if (cart.length > 0) {
      localStorage.setItem('cart', JSON.stringify(cart));
    }
  }, [cart]);


  useEffect(() => {
    if (location.pathname === "/addtocart") {
      setNewItemCount(0);

    }
    if (location.pathname === "/") {

      setSelectedCategory(null);
      setSelectedSubCategory(null);
      localStorage.removeItem("selectedCategory");
      localStorage.removeItem("selectedSubCategory");
    }
  }, [location.pathname]);

  useEffect(() => {
    if (selectedCategory !== null) {
      localStorage.setItem("selectedCategory", JSON.stringify(selectedCategory));
    }
    if (selectedSubCategory !== null) {
      localStorage.setItem("selectedSubCategory", JSON.stringify(selectedSubCategory));
    } else {

      localStorage.removeItem("selectedSubCategory");
    }
  }, [selectedCategory, selectedSubCategory]);


  const filteredProducts = location.pathname === "/" || location.pathname === "/addtocart"
    ? products
    : products.filter((product) => {
      const category = categories.find((c) => c.id === selectedCategory);
      const subCategory = categories.find((c) => c.id === selectedSubCategory);

      if (category) {
        if (selectedSubCategory) {
          return product.categoryId === selectedSubCategory;
        }

        return product.categoryId === selectedCategory || categories.some(c => c.parent === selectedCategory && product.categoryId === c.id);
      }
      return true;
    });

  const finalFilteredProducts = selectedSubCategory
    ? filteredProducts.filter(product => product.categoryId === selectedSubCategory)
    : filteredProducts;

  const indexOfFirstProduct = (currentPage - 1) * productsPerPage;
  const currentProducts = finalFilteredProducts.slice(indexOfFirstProduct, indexOfFirstProduct + productsPerPage);
  const totalPages = Math.ceil(finalFilteredProducts.length / productsPerPage);

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  const handleAddToCart = (product) => {
    const existingProduct = cart.find((item) => item.id === product.id);
    if (existingProduct) {
      return;
    }
    const updatedCart = [...cart, { ...product, quantity: 1 }];
    setCart(updatedCart);
    setNewItemCount(newItemCount + 1);
  };

  const handleRemoveItem = (id) => {
    const updatedCart = cart.filter((item) => item.id !== id);
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const handleCategoryClick = (categoryId) => {
    setSelectedCategory(categoryId);
    setSelectedSubCategory(null);
    setCurrentPage(1);
    navigate(`/category/${categoryId}`);
  };

  const handleSubCategoryClick = (subCategoryId) => {
    setSelectedSubCategory(subCategoryId);
    setCurrentPage(1);
    navigate(`/category/${selectedCategory}/${subCategoryId}`);
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("cart");
    setNewItemCount(0);
  };

  return (
    <div className="bg-gray-900 h-screen">
      <Header
        cartCount={newItemCount}
        categories={categories}
        handleCategoryClick={handleCategoryClick}
        handleSubCategoryClick={handleSubCategoryClick}
      />
      <Routes>
        <Route
          path="/"
          element={
            <Products
              products={currentProducts}
              currentPage={currentPage}
              totalPages={totalPages}
              handlePageChange={handlePageChange}
              handleAddToCart={handleAddToCart}
              cart={cart}
            />
          }
        />
        <Route path="/products/:id" element={<Product cart={cart} handleAddToCart={handleAddToCart} />} />
        <Route
          path="/checkout"
          element={<Checkout cart={cart} clearCart={clearCart} />}
        />
        <Route path="/login" element={<Login />} />
        <Route
          path="/addtocart"
          element={<Addtocart cart={cart} handleRemoveItem={handleRemoveItem} />}
        />
        <Route
          path="/category/:categoryId"
          element={<Products
            products={currentProducts}
            currentPage={currentPage}
            totalPages={totalPages}
            handlePageChange={handlePageChange}
            handleAddToCart={handleAddToCart}
            cart={cart}
          />}
        />
        <Route
          path="/category/:categoryId/:subCategoryId"
          element={<Products
            products={currentProducts}
            currentPage={currentPage}
            totalPages={totalPages}
            handlePageChange={handlePageChange}
            handleAddToCart={handleAddToCart}
            cart={cart}
          />}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
