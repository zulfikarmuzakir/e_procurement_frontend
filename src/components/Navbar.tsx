import { Link } from 'react-router-dom';
import { useContext, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';

const Navbar = () => {
  const { user } = useContext(AuthContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <>
      <nav className="bg-white shadow-md">
        <div className="container mx-auto px-6 py-3">
          <div className="flex justify-between items-center">
            <div className="text-xl font-semibold text-gray-700">My App</div>
            <div className="flex space-x-4 items-center">
              <Link to="/" className="text-gray-800 hover:text-blue-600">
                Home
              </Link>
              {user ? (
                <>
                  <Link
                    to={user.role === 'admin' ? '/admin-dashboard' : '/vendor-dashboard'}
                    className="text-gray-800 hover:text-blue-600"
                  >
                    Dashboard
                  </Link>
                  <div className="relative">
                    <button
                      onClick={() => setDropdownOpen(!dropdownOpen)}
                      className="flex items-center space-x-1 text-gray-800 hover:text-blue-600"
                    >
                      <span>{user.name}</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>
                    {dropdownOpen && (
                      <div className="absolute right-0 w-48 mt-2 py-2 bg-white border rounded shadow-xl">
                        <div className="px-4 py-2 text-sm text-gray-700">
                          <div>@{user.username}</div>
                          <div className="font-semibold">{user.role}</div>
                        </div>
                        <hr className="border-t mx-2" />
                        <Link
                          to="/logout"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          Logout
                        </Link>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <>
                  <Link
                    to="/register"
                    className="text-gray-800 hover:text-blue-600 mr-4"
                  >
                    Register
                  </Link>
                  <Link
                    to="/login"
                    className="text-gray-800 hover:text-blue-600"
                  >
                    Login
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
