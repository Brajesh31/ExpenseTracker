// /pages/Login.jsx

import React, { useContext, useState } from 'react';
// Import Link for internal navigation and useNavigate for programmatic navigation
import { Link, useNavigate } from 'react-router-dom';
// Import icons from the 'react-icons/fi' (Feather Icons) set
import { FiDollarSign, FiEye, FiEyeOff } from 'react-icons/fi';
import { serverDataContext } from '../../Context/ServerContext';
import axios from 'axios';
import toast from 'react-hot-toast'; // Import toast for notifications
import { userDataContext } from "../../Context/UserContext";

// --- UI Components ---

const LoginForm = () => {
    // State to manage form inputs and password visibility
    const { serverUrl } = useContext(serverDataContext);
    const { setUserData } = useContext(userDataContext);
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [formError, setFormError] = useState(""); // State for form errors
    const [isLoading, setIsLoading] = useState(false); // Loading state for submit button

    const handleSubmit = async (event) => {
        event.preventDefault(); // Prevent page reload
        setIsLoading(true);
        setFormError(""); 

        try{
            const response = await axios.post(`${serverUrl}/api/user/login`, {
                email,
                password
            } , {withCredentials: true  });
            
            toast.success("Login Successful!");

            // ✅ CRITICAL: Set user data into context BEFORE navigating
            setUserData(response?.data?.user);
            
            // Navigate to dashboard after context is set
            navigate('/dashboard');

        } catch(error) {
            const errorMessage = error.response?.data?.message || "Login failed. Please check your credentials.";
            console.error("Login failed:", errorMessage);
            toast.error(errorMessage);
            setFormError(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-8 lg:p-16">
            <div className="w-full max-w-md">
                <h1 className="text-2xl font-bold mb-12 self-start">Expense Tracker</h1>
                
                <h2 className="text-3xl font-bold mb-2">Welcome Back</h2>
                <p className="text-gray-500 mb-8">Please enter your details to log in</p>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-600 mb-2">Email Address</label>
                        <input 
                            type="email" 
                            id="email" 
                            name="email" 
                            placeholder='Enter your email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-600 mb-2">Password</label>
                        <div className="relative">
                            <input 
                                type={showPassword ? 'text' : 'password'} 
                                id="password" 
                                name="password" 
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter your password" 
                                className="w-full px-4 py-3 border border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all"
                                required
                            />
                            <button 
                                type="button" 
                                onClick={() => setShowPassword(!showPassword)} 
                                className="absolute inset-y-0 right-0 px-4 flex items-center text-gray-500 hover:text-gray-700"
                            >
                                {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                            </button>
                        </div>
                        {formError && <p className="text-red-500 text-xs mt-2">{formError}</p>}
                    </div>

                    <button type="submit" className="w-full bg-purple-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-purple-700 transition-colors duration-300 shadow-md disabled:bg-purple-400" disabled={isLoading}>
                        {isLoading ? 'LOGGING IN...' : 'LOGIN'}
                    </button>
                </form>

                <p className="mt-8 text-center text-gray-500">
                    Don't have an account? <Link to="/signup" className="font-semibold text-purple-600 hover:underline">SignUp</Link>
                </p>
            </div>
        </div>
    );
};

const DecorativePanel = () => {
    return (
        <div className="hidden lg:block w-1/2 bg-purple-50 p-12 relative overflow-hidden">
            {/* Abstract background shapes */}
            <div className="absolute -top-20 -right-20 w-80 h-80 bg-purple-200 rounded-full opacity-50"></div>
            <div className="absolute -bottom-24 -left-12 w-96 h-96 bg-purple-200 rounded-3xl opacity-50 transform rotate-45"></div>
            
            <div className="relative z-10 flex flex-col justify-center h-full space-y-8">
                {/* Card 1: Income & Expenses */}
                <div className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-sm mx-auto">
                    <div className="flex items-center space-x-4">
                        <div className="bg-purple-100 p-3 rounded-xl">
                            <FiDollarSign size={28} className="text-purple-600" />
                        </div>
                        <div>
                            <p className="text-gray-500 text-sm">Track Your Income & Expenses</p>
                            <p className="text-2xl font-bold text-gray-800">$430,000</p>
                        </div>
                    </div>
                </div>

                {/* Card 2: All Transactions */}
                <div className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-sm mx-auto">
                    <div className="flex justify-between items-center mb-4">
                        <div>
                            <p className="text-lg font-bold">All Transactions</p>
                            <p className="text-sm text-gray-500">2nd Jan to 21st Dec</p>
                        </div>
                        <a href="#" className="text-sm font-semibold text-purple-600 hover:underline">View More</a>
                    </div>
                    {/* Bar Chart Placeholder */}
                    <div className="flex items-end h-32 space-x-3">
                        <div className="flex-1 h-16 bg-purple-300 rounded-t-md" title="Jan"></div>
                        <div className="flex-1 h-24 bg-purple-500 rounded-t-md" title="Feb"></div>
                        <div className="flex-1 h-28 bg-purple-300 rounded-t-md" title="Mar"></div>
                        <div className="flex-1 h-12 bg-purple-500 rounded-t-md" title="Apr"></div>
                        <div className="flex-1 h-20 bg-purple-300 rounded-t-md" title="May"></div>
                        <div className="flex-1 h-32 bg-purple-500 rounded-t-md" title="Jun"></div>
                        <div className="flex-1 h-24 bg-purple-300 rounded-t-md" title="Jul"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};


// --- Main Login Page Component ---
export default function Login() {
    return (
        <main className="flex min-h-screen bg-white text-gray-800" style={{ fontFamily: "'Inter', sans-serif" }}>
            <LoginForm />
            <DecorativePanel />
        </main>
    );
}
