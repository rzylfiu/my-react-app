import { Link } from 'react-router-dom';
import { useState, useEffect } from "react";

function Products() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 6;

  useEffect(() => {
    fetch("/my-react-app/api/products.json")
      .then((res) => res.json())
      .then((res) => setProducts(res));
  }, []);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(products.length / productsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="bg-gray-900 p-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {currentProducts.map((p) => (
          <div
            key={p.id}
            className="flex flex-col max-w-sm bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-xl hover:bg-yellow-50"
          >
            <Link to={`/products/${p.id}`}>
              <img
                src={`/my-react-app/images/${p.imageUrl}`}
                alt={p.name}
                className="w-full h-64 object-cover"
              />
              <div className="flex flex-col p-6 bg-gray-800 text-white flex-grow">
                <h3 className="text-xl font-semibold mb-2">{p.name}</h3>
                <p className="text-gray-400 mb-4 flex-grow">{p.description}</p>
                <div className="flex items-center justify-between">
                  <p className="text-xl font-bold text-yellow-500">{p.price}$</p>
                  <button
                
                    className="px-4 py-2 border-2 border-yellow-500 text-yellow-500 rounded-md transition duration-300 hover:bg-yellow-500 hover:text-white ml-auto"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>


      <div className="flex justify-center mt-8">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-600 text-white rounded-md mr-2 disabled:opacity-50"
        >
          Prev
        </button>
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            className={`px-4 py-2 bg-gray-600 text-white rounded-md mx-1 ${
              currentPage === index + 1 ? "bg-yellow-500" : ""
            }`}
          >
            {index + 1}
          </button>
        ))}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-600 text-white rounded-md ml-2 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Products;
