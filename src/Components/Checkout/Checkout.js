import { Link } from 'react-router-dom';

function Checkout({ cart, clearCart }) {
  const calculateTotal = () => cart.reduce((acc, item) => acc + item.price * item.quantity, 0) + 20;

  const handleBackToShop = () => {
    clearCart();
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-800">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-lg">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-yellow-500 mb-4">Thank You for Your Order!</h2>
          <p className="text-xl text-gray-700 mb-6">Your order has been successfully placed. We're processing it and will notify you once it's on the way.</p>

          <div className="bg-gray-100 p-6 rounded-lg shadow-md mb-6">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">Order Details</h3>
            <ul className="space-y-3 text-gray-600">
              {cart.map(({ id, name, price, quantity }) => (
                <li key={id} className="flex justify-between">
                  <span>{name} x {quantity}</span>
                  <span>{price * quantity}€</span>
                </li>
              ))}
              <li className="flex justify-between font-semibold">
                <span>Total</span>
                <span>{calculateTotal()}€</span>
              </li>
            </ul>
          </div>

          <p className="text-lg text-gray-700 mb-6">We’ll send you an email confirmation with your shipping details shortly.</p>


          <Link to="/" onClick={handleBackToShop} className="px-6 py-3 bg-yellow-500 text-white rounded-md hover:bg-yellow-400 transition-all duration-300">
            Back to Shop
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
