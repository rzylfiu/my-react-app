import { Link } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import basket from '../Assets/basket.svg';

function Header({ cartCount, categories, handleCategoryClick, handleSubCategoryClick }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState(null);
  const menuRef = useRef(null);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleCategory = (categoryId) => {

    setActiveCategory(activeCategory === categoryId ? null : categoryId);
  };


  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setActiveCategory(null);
      }
    };


    document.addEventListener('click', handleClickOutside);


    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div className="flex justify-between items-center p-4 bg-gray-800 shadow-md relative">
      <Link to="/">
        <h1 className="text-3xl font-bold text-yellow-500">Store</h1>
      </Link>
      <div className="flex gap-8 categories hidden md:flex" ref={menuRef}>
        {categories
          .filter(category => category.parent === null)
          .map((category) => (
            <div key={category.id} className="group relative">
              <h3
                className="text-white text-xl font-semibold hover:text-yellow-500 hover:scale-105 transition-all duration-300 transform hover:text-shadow-md cursor-pointer"
                onClick={() => {
                  handleCategoryClick(category.id);
                  toggleCategory(category.id);
                }}
              >
                {category.name}
              </h3>

              {activeCategory === category.id && (
                <div className="absolute left-0 top-full mt-2 visible opacity-100 transition-all duration-300 flex flex-col space-y-2 z-10">
                  {categories
                    .filter(subCategory => subCategory.parent === category.id)
                    .map((subCategory) => (
                      <h4
                        key={subCategory.id}
                        className="bg-gray-700 bg-opacity-60 text-white text-lg font-semibold hover:text-yellow-500 hover:bg-gray-700 hover:scale-105 transition-all duration-300 transform rounded-lg py-1 px-2 cursor-pointer"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSubCategoryClick(subCategory.id);
                        }}
                      >
                        {subCategory.name}
                      </h4>
                    ))}
                </div>
              )}
            </div>
          ))}
      </div>


      <div className="md:hidden">
        <button onClick={toggleMobileMenu} className="text-yellow-500 hover:text-yellow-300 p-2">

          <span className="block w-6 h-1 bg-yellow-500 my-1"></span>
          <span className="block w-6 h-1 bg-yellow-500 my-1"></span>
          <span className="block w-6 h-1 bg-yellow-500 my-1"></span>
        </button>
      </div>


      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 w-full bg-gray-800 p-4 flex flex-col space-y-4 z-10">
          {categories
            .filter(category => category.parent === null)
            .map((category) => (
              <div key={category.id} className="group relative">
                <h3
                  className="text-white text-xl font-semibold hover:text-yellow-500 hover:scale-105 transition-all duration-300 transform cursor-pointer"
                  onClick={() => {
                    handleCategoryClick(category.id);
                    toggleCategory(category.id);
                  }}
                >
                  {category.name}
                </h3>

                {activeCategory === category.id && (
                  <div className="flex flex-col pl-4 space-y-2">
                    {categories
                      .filter(subCategory => subCategory.parent === category.id)
                      .map((subCategory) => (
                        <h4
                          key={subCategory.id}
                          className="bg-gray-700 bg-opacity-60 text-white text-lg font-semibold hover:text-yellow-500 hover:bg-gray-700 hover:scale-105 transition-all duration-300 transform rounded-lg py-1 px-2 cursor-pointer"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleSubCategoryClick(subCategory.id);
                          }}
                        >
                          {subCategory.name}
                        </h4>
                      ))}
                  </div>
                )}
              </div>
            ))}
        </div>
      )}

      <div className="flex gap-6 items-center">
        <Link
          to="/login"
          className="text-yellow-500 hover:text-yellow-300 border border-yellow-500 hover:border-yellow-300 px-4 py-2 rounded-md transition duration-300"
        >
          Login
        </Link>
        <Link to="/addtocart" className="relative text-yellow-500 hover:text-yellow-300">
          <img src={basket} alt="Cart" className="w-6 h-6" />
          {cartCount > 0 && (
            <div className="absolute top-0 right-0 bg-red-500 text-white text-xs font-semibold rounded-full w-4 h-4 flex items-center justify-center">
              {cartCount}
            </div>
          )}
        </Link>
      </div>
    </div>
  );
}

export default Header;
