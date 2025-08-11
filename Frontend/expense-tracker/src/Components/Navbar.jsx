import React, { useContext, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaTimes, FaBars } from "react-icons/fa";
import SideMenu from './SideMenu';
import { userDataContext } from '../Context/UserContext';
import { serverDataContext } from '../Context/ServerContext';

// Main Navbar Component
const Navbar = () => {
  // ✅ Destructure loading state from context
  const { userData, loading } = useContext(userDataContext);
  const { serverUrl } = useContext(serverDataContext);
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white p-4 shadow-lg rounded-b-xl border-b border-gray-200">
      <div className="container mx-auto flex justify-between items-center">

        {/* Left side: Burger Menu and Expense Tracker Heading */}
        <div className="flex items-center">
          <button
            onClick={toggleMenu}
            className="text-gray-600 hover:text-gray-800 focus:outline-none mr-4"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
          <Link to="/dashboard" className="text-gray-800 text-xl md:text-2xl font-bold tracking-wide cursor-pointer">
            Expense Tracker
          </Link>
        </div>

        {/* Right side: User Avatar */}
        <div className="flex items-center">
          {/* Avatar Circle Wrapper with relative positioning for the tooltip */}
          <div className="relative group">
            {/* ✅ UPDATED: Switched to explicit loading state check */}
            {loading ? (
              // Skeleton Loader while userData is being fetched
              <div className="w-10 h-10 rounded-full bg-gray-200 animate-pulse"></div>
            ) : userData ? (
              // Actual Avatar once userData is available
              <>
                <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-white font-bold text-lg cursor-pointer overflow-hidden">
                  {userData.avatar ? (
                    <img 
                      src={`${serverUrl}/${userData.avatar.replace('public/', '')}`} 
                      alt={userData.name} 
                      className="w-full h-full object-cover"
                      onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/40x40/8B5CF6/FFFFFF?text=U"; }}
                    />
                  ) : (
                    <span className="text-purple-600">
                      {userData.name ? userData.name.charAt(0).toUpperCase() : 'U'}
                    </span>
                  )}
                </div>
                {/* Tooltip that appears on hover */}
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-max px-3 py-1.5 bg-gray-800 text-white text-sm rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                  {userData.name || 'User'}
                  {/* Tooltip Arrow */}
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 w-0 h-0 border-x-4 border-x-transparent border-b-4 border-b-gray-800"></div>
                </div>
              </>
            ) : (
              // Fallback for when not loading and no user (logged out)
              <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 font-bold text-lg">
                U
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Side Menu */}
      <SideMenu isOpen={isMenuOpen} onClose={toggleMenu} />

      {/* Overlay to close menu when clicking outside */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-opacity-20 z-40 backdrop-blur-sm"
          onClick={toggleMenu}
        ></div>
      )}
    </nav>
  );
};

export default Navbar;
