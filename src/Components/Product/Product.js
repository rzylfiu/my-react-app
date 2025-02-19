import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function Product() {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true); 
  const { id } = useParams();

  useEffect(() => {
    setLoading(true); 
    fetch(`/my-react-app/api/products/${id}.json`)
      .then(res => res.json())
      .then(data => {
        setProduct(data);
        setLoading(false); 
      })
      .catch((error) => {
        console.error("Error fetching product data:", error);
        setLoading(false); 
      });
  }, [id]);


  if (loading) {
    return <div className="text-center text-xl text-yellow-500">Loading...</div>;
  }

  if (!product) {
    return <div className="text-center text-xl text-red-500">Product not found!</div>;
  }

  return (
    <div className="bg-gray-900 p-20">
      <div className="max-w-sm mx-auto bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-xl hover:bg-yellow-50">
        <img
          src={`/my-react-app/images/${product.imageUrl}`}
          alt={product.name}
          className="w-full h-64 object-cover"
        />
        <div className="flex flex-col p-6 bg-gray-800 text-white">
          <h2 className="text-2xl font-bold text-gray-100">{product.name}</h2>
          <p className="text-xl text-yellow-500 mt-2">${product.price}</p>
          <p className="text-gray-400 mt-4">{product.description}</p>
          <button className="mt-6 px-6 py-2 bg-yellow-500 text-white rounded-md shadow-md hover:bg-yellow-600 transition duration-300">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );

}

export default Product;
