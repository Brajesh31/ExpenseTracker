import React, { useContext } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom'; // Import useLocation
import { FaTimes, FaHome, FaMoneyBillWave, FaWallet, FaSignInAlt, FaSignOutAlt } from 'react-icons/fa'; // Import icons
import { userDataContext } from '../Context/UserContext';
import axios from 'axios';
import toast from 'react-hot-toast'; // Import toast for notifications
import { serverDataContext } from '../Context/ServerContext';


// SideMenu Component
const SideMenu = ({ isOpen, onClose }) => { // Removed userData and navigate from props, will use useContext and useNavigate directly
  const { userData , getCurrentUser , setUserData } = useContext(userDataContext); // Get userData from context
  const { serverUrl } = useContext(serverDataContext);
  const navigate = useNavigate(); // Get navigate from react-router-dom
  const location = useLocation(); // Get current location

  // Handle logout (placeholder for now)
  const handleLogout = async () => {
    // In a real app, you'd call your Firebase/backend logout function here
    // e.g., auth.signOut();
    // Then clear user data from context and redirect
    try{
        const response = await axios.get(`${serverUrl}/api/user/logout` , {
            withCredentials : true
        })
        getCurrentUser();
        navigate('/login');
        toast.success("LogOut Successfully....");
    }catch(err){
        console.error("Logout Done ✅");
        toast.error("LogOut Failed..");
    }
    onClose();
    // You'd also clear userData from your context here
  };

  // Helper function to determine if a link is active
  const isActiveLink = (path) => {
    return location.pathname === path;
  };

  const menuItems = [
    { path: '/dashboard', label: 'Dashboard', icon: FaHome, authRequired: true },
    { path: '/income', label: 'Income', icon: FaWallet, authRequired: true },
    { path: '/expense', label: 'Expense', icon: FaMoneyBillWave, authRequired: true },
  ];

  return (
    <div
      className={`fixed top-0 left-0 h-full w-64 bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
    >
      <div className="p-6 flex flex-col h-full">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-xl font-bold text-gray-800">Expense Tracker</h2> {/* Changed to match image */}
          <button onClick={onClose} className="text-gray-600 hover:text-gray-800 focus:outline-none">
            <FaTimes size={24} />
          </button>
        </div>

        <nav className="flex-grow">
          <ul className="space-y-2"> {/* Reduced space-y for tighter links */}
            {menuItems.map((item) => (
              // Only render if authRequired is met or not specified
              (item.authRequired && userData) || !item.authRequired ? (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    onClick={onClose}
                    className={`flex items-center p-3 rounded-lg font-medium text-lg transition duration-200
                      ${isActiveLink(item.path)
                        ? 'bg-violet-600 text-white shadow-md'
                        : 'text-gray-700 hover:bg-gray-100 hover:text-violet-600'
                      }`}
                  >
                    <item.icon className={`mr-3 ${isActiveLink(item.path) ? 'text-white' : 'text-violet-600'}`} size={20} />
                    {item.label}
                  </Link>
                </li>
              ) : null
            ))}

            {/* Login/Logout button */}
            {userData ? (
              <li>
                <button
                  onClick={handleLogout}
                  className="flex items-center p-3 rounded-lg text-gray-700 hover:bg-gray-100 hover:text-red-600 font-medium text-lg transition duration-200 w-full text-left"
                >
                  <FaSignOutAlt className="mr-3 text-red-600" size={20} /> Logout
                </button>
              </li>
            ) : (
              <li>
                <Link to="/login" onClick={onClose} className="flex items-center p-3 rounded-lg text-gray-700 hover:bg-gray-100 hover:text-violet-600 font-medium text-lg transition duration-200">
                  <FaSignInAlt className="mr-3 text-violet-600" size={20} /> Login
                </Link>
              </li>
            )}
          </ul>
        </nav>

        <div className="mt-auto text-center text-sm text-gray-500">
          Expense Tracker App
        </div>
      </div>
    </div>
  );
};

export default SideMenu;
