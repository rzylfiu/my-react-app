import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function Product({ cart, handleAddToCart }) {
  const { id } = useParams();
  const [product, setProduct] = useState(null);


  useEffect(() => {

    fetch(`/my-react-app/api/products/${id}.json`)
      .then((res) => {

        return res.json();
      })
      .then((data) => {
        setProduct(data);
      })

  }, [id]);



  const isProductInCart = cart.some((item) => item.id === product?.id);

  const addToCart = () => {
    handleAddToCart(product);
  };

  return (
    <div className="bg-gray-900 p-20">
      <div className="max-w-sm mx-auto bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-xl hover:bg-yellow-50">
        {product && (
          <>
            <img
              src={`/my-react-app/images/${product.imageUrl}`}
              alt={product.name}
              className="w-full h-64 object-cover"
            />
            <div className="flex flex-col p-6 bg-gray-800 text-white">
              <h2 className="text-2xl font-bold text-gray-100">{product.name}</h2>
              <p className="text-xl text-yellow-500 mt-2">${product.price}</p>
              <p className="text-gray-400 mt-4">{product.description}</p>

              <button
                onClick={addToCart}
                className={`px-4 py-2 border-2 rounded-md text-white transition duration-300 ${isProductInCart
                  ? "bg-yellow-500 cursor-not-allowed"
                  : "border-yellow-500 text-yellow-500"
                  }`}
                disabled={isProductInCart}
              >
                {isProductInCart ? "Added to Cart" : "Add to Cart"}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Product;
