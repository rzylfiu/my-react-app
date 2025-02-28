import { Link } from "react-router-dom";

function Addtocart({ cart, handleRemoveItem }) {
  const calculateTotal = () => cart.reduce((acc, item) => acc + item.price * item.quantity, 0) + 20;

  return (
    <div className="bg-gray-800 p-8 rounded-lg shadow-lg h-screen ">
      {cart.length === 0 ? (
        <p className="text-white text-lg flex justify-center">Your cart is empty.</p>
      ) : (
        <>
          <ul className="space-y-4">
            {cart.map(({ id, name, price, quantity, imageUrl }) => (
              <li key={id} className="flex justify-between items-center bg-gray-700 p-4 rounded-lg">
                <img
                  src={`/my-react-app/images/${imageUrl}`}

                  alt={name}
                  className="w-16 h-16 object-cover rounded-md mr-4"
                />
                <span className="text-white">{name} x {quantity}</span>
                <span className="text-yellow-500">{price * quantity}€</span>
                <button onClick={() => handleRemoveItem(id)} className="text-red-800 border p-2 rounded-md hover:bg-red-400">
                  Remove Item
                </button>
              </li>
            ))}
          </ul>

          <div className="mt-6 flex justify-between text-white">
            <span>Shipping:</span>
            <span>20€</span>
          </div>

          <div className="mt-2 flex justify-between text-white font-semibold">
            <span>Total:</span>
            <span>{calculateTotal()}€</span>
          </div>

          <div className="mt-6 flex justify-center">
            <Link to="/checkout">
              <button className="px-6 py-3 bg-yellow-500 text-white rounded-md hover:bg-yellow-400">
                Order Now
              </button>
            </Link>
          </div>
        </>
      )}
    </div>
  );
}

export default Addtocart;
