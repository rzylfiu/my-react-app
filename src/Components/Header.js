import { Link } from 'react-router-dom';
import basket from '../Assets/basket.svg';

function Header() {
  return (
    <div className="flex justify-between items-center p-4 bg-gray-800">
      <Link to="/"><h1 className="text-3xl font-bold text-yellow-500">Store</h1>
      </Link>
      <div className="flex gap-6">
        <select className="bg-gray-700 text-white p-2 rounded-md">
          <option className="text-yellow-500">Electronics</option>
          <option className="text-yellow-500">Laptops</option>
          <option className="text-yellow-500">Smartphones</option>
        </select>

        <select className="bg-gray-700 text-white p-2 rounded-md">
          <option className="text-yellow-500">Clothing</option>
          <option className="text-yellow-500">Mens Clothing</option>
          <option className="text-yellow-500">Womens Clothing</option>
        </select>

        <select className="bg-gray-700 text-white p-2 rounded-md">
          <option className="text-yellow-500">Accessories</option>
          <option className="text-yellow-500">Jewelry</option>
          <option className="text-yellow-500">Watches</option>
        </select>
      </div>

      <div className="flex gap-6 items-center">
        <Link
          to="/login"
          className="text-yellow-500 hover:text-yellow-300 border border-yellow-500 hover:border-yellow-300 px-4 py-2 rounded-md"
        >
          Login
        </Link>
        <button className="text-yellow-500 hover:text-yellow-300">
          <img src={basket} alt="Cart" className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}

export default Header;
