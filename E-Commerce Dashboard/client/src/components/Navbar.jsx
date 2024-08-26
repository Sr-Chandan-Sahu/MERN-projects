import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const auth = localStorage.getItem('user');
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <nav className="w-full bg-blue-500 text-white">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        <div className="text-2xl font-bold">
          <Link to="/" className="hover:text-gray-200">
            E-commerce Dashboard
          </Link>
        </div>
        {auth ? (
          <ul className="flex space-x-6">
            <li>
              <Link to="/" className="hover:text-gray-200">
                Products
              </Link>
            </li>
            <li>
              <Link to="/add" className="hover:text-gray-200">
                Add Products
              </Link>
            </li>
            <li>
              <Link to="/profile" className="hover:text-gray-200">
                Profile
              </Link>
            </li>
            <li>
              <Link to="/login" onClick={logout} className="hover:text-red-500">
                Logout
              </Link>
            </li>
          </ul>
        ) : (
          <ul className="flex space-x-6">
            <li>
              <Link to="/signup" className="hover:text-gray-200">
                SignUp here
              </Link>
            </li>
          </ul>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
