import { Link } from "react-router-dom";

function Products({ products, currentPage, totalPages, handlePageChange, handleAddToCart, cart }) {

  const isInCart = (productId) => {
    return cart.some((item) => item.id === productId);
  };

  return (
    <div className="bg-gray-900 p-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product) => (
          <div
            key={product.id}
            className="flex flex-col max-w-sm bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-xl hover:bg-yellow-50"
          >
            <Link to={`/products/${product.id}`}>
              <img
                src={`/my-react-app/images/${product.imageUrl}`}
                alt={product.name}
                className="w-full h-64 object-cover"
              />
            </Link>
            <div className="flex flex-col p-6 bg-gray-800 text-white flex-grow">
              <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
              <p className="text-gray-400 mb-4 flex-grow">{product.description}</p>
              <div className="flex items-center justify-between">
                <p className="text-xl font-bold text-yellow-500">{product.price}$</p>
                <button
                  onClick={() => handleAddToCart(product)}
                  className={`px-4 py-2 border-2 rounded-md transition duration-300 ${isInCart(product.id)
                    ? "bg-yellow-500 text-white"
                    : "border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-white"
                    } ml-auto`}
                  disabled={isInCart(product.id)}
                >
                  {isInCart(product.id) ? "Added to Cart" : "Add to Cart"}
                </button>
              </div>
            </div>

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
            className={`px-4 py-2 bg-gray-600 text-white rounded-md mx-1 ${currentPage === index + 1 ? "bg-yellow-500" : ""
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
