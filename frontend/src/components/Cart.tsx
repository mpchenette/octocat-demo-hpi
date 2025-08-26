import { useCart } from '../context/CartContext';
import { useTheme } from '../context/ThemeContext';
import { Link } from 'react-router-dom';

export default function Cart() {
  const { items, updateQuantity, removeFromCart, getTotalPrice, clearCart } = useCart();
  const { darkMode } = useTheme();

  const handleQuantityChange = (productId: number, change: number) => {
    const item = items.find(item => item.productId === productId);
    if (item) {
      const newQuantity = item.quantity + change;
      if (newQuantity > 0) {
        updateQuantity(productId, newQuantity);
      }
    }
  };

  if (items.length === 0) {
    return (
      <div className={`min-h-screen ${darkMode ? 'bg-dark' : 'bg-gray-100'} pt-20 px-4 transition-colors duration-300`}>
        <div className="max-w-4xl mx-auto">
          <h1 className={`text-3xl font-bold ${darkMode ? 'text-light' : 'text-gray-800'} mb-8 transition-colors duration-300`}>
            Shopping Cart
          </h1>
          <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-lg p-8 text-center transition-colors duration-300`}>
            <div className="mb-4">
              <svg className={`mx-auto h-24 w-24 ${darkMode ? 'text-gray-600' : 'text-gray-300'}`} fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m0 0h7M9.5 18v.01M19.5 18v.01"></path>
              </svg>
            </div>
            <h2 className={`text-2xl font-semibold ${darkMode ? 'text-light' : 'text-gray-800'} mb-2 transition-colors duration-300`}>
              Your cart is empty
            </h2>
            <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} mb-6 transition-colors duration-300`}>
              Add some products to get started!
            </p>
            <Link
              to="/products"
              className="bg-primary hover:bg-accent text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-dark' : 'bg-gray-100'} pt-20 px-4 transition-colors duration-300`}>
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className={`text-3xl font-bold ${darkMode ? 'text-light' : 'text-gray-800'} transition-colors duration-300`}>
            Shopping Cart
          </h1>
          {items.length > 0 && (
            <button
              onClick={clearCart}
              className={`px-4 py-2 rounded-lg border ${darkMode ? 'border-gray-600 text-gray-300 hover:bg-gray-700' : 'border-gray-300 text-gray-600 hover:bg-gray-50'} transition-colors`}
            >
              Clear Cart
            </button>
          )}
        </div>

        <div className="space-y-4">
          {items.map((item) => (
            <div
              key={item.productId}
              className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-lg p-6 transition-colors duration-300`}
            >
              <div className="flex items-center space-x-4">
                <img
                  src={`/images/${item.imgName}`}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded-lg"
                  onError={(e) => {
                    e.currentTarget.src = '/images/placeholder.png';
                  }}
                />
                <div className="flex-grow">
                  <h3 className={`text-xl font-semibold ${darkMode ? 'text-light' : 'text-gray-800'} transition-colors duration-300`}>
                    {item.name}
                  </h3>
                  <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} transition-colors duration-300`}>
                    SKU: {item.sku}
                  </p>
                  <p className={`text-lg font-bold ${darkMode ? 'text-primary' : 'text-primary'} transition-colors duration-300`}>
                    ${item.price.toFixed(2)}
                  </p>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleQuantityChange(item.productId, -1)}
                      className={`w-8 h-8 flex items-center justify-center ${darkMode ? 'text-light' : 'text-gray-700'} hover:text-primary transition-colors duration-300`}
                      aria-label={`Decrease quantity of ${item.name}`}
                    >
                      <span aria-hidden="true">-</span>
                    </button>
                    <span 
                      className={`${darkMode ? 'text-light' : 'text-gray-800'} min-w-[2rem] text-center transition-colors duration-300`}
                      aria-label={`Quantity of ${item.name}`}
                    >
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => handleQuantityChange(item.productId, 1)}
                      className={`w-8 h-8 flex items-center justify-center ${darkMode ? 'text-light' : 'text-gray-700'} hover:text-primary transition-colors duration-300`}
                      aria-label={`Increase quantity of ${item.name}`}
                    >
                      <span aria-hidden="true">+</span>
                    </button>
                  </div>
                  <div className={`text-lg font-semibold ${darkMode ? 'text-light' : 'text-gray-800'} min-w-[6rem] text-right transition-colors duration-300`}>
                    ${(item.price * item.quantity).toFixed(2)}
                  </div>
                  <button
                    onClick={() => removeFromCart(item.productId)}
                    className={`p-2 ${darkMode ? 'text-red-400 hover:text-red-300' : 'text-red-600 hover:text-red-500'} transition-colors duration-300`}
                    aria-label={`Remove ${item.name} from cart`}
                  >
                    <svg className="w-5 h-5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                      <path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Cart Summary */}
        <div className={`mt-8 ${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-lg p-6 transition-colors duration-300`}>
          <div className="flex justify-between items-center text-xl font-bold">
            <span className={`${darkMode ? 'text-light' : 'text-gray-800'} transition-colors duration-300`}>
              Total: 
            </span>
            <span className={`${darkMode ? 'text-primary' : 'text-primary'} transition-colors duration-300`}>
              ${getTotalPrice().toFixed(2)}
            </span>
          </div>
          <div className="flex space-x-4 mt-6">
            <Link
              to="/products"
              className={`flex-1 px-6 py-3 rounded-lg border ${darkMode ? 'border-gray-600 text-gray-300 hover:bg-gray-700' : 'border-gray-300 text-gray-600 hover:bg-gray-50'} text-center font-medium transition-colors`}
            >
              Continue Shopping
            </Link>
            <button
              className="flex-1 bg-primary hover:bg-accent text-white px-6 py-3 rounded-lg font-medium transition-colors"
              onClick={() => alert('Checkout functionality would be implemented here!')}
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}