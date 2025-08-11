import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiDollarSign, FiEye, FiEyeOff, FiCamera } from 'react-icons/fi';
import user from "../../assets/user.jpeg"; // Default user image
import { serverDataContext } from '../../Context/ServerContext';
import axios from "axios";
import toast from 'react-hot-toast';
import imageCompression from 'browser-image-compression';
import { userDataContext } from '../../Context/UserContext';

const SignUpForm = () => {
    const { serverUrl } = useContext(serverDataContext);
    const { setUserData } = useContext(userDataContext);
    const navigate = useNavigate();
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [formError, setFormError] = useState("");
    const [avatar, setAvatar] = useState(null);
    const [avatarPreview, setAvatarPreview] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/.test(password)) {
            setFormError("Password must be 8+ characters and include an uppercase letter, a number, and a special character (@ $ ! % * ? & #).");
            return;
        }
        setFormError("");
        setIsLoading(true);

        const formData = new FormData();
        formData.append('fullName', fullName);
        formData.append('email', email);
        formData.append('password', password);

        try {
            if (avatar) {
                formData.append('avatar', avatar);
            } else {
                const response = await fetch(user);
                const blob = await response.blob();
                const defaultFile = new File([blob], 'default-avatar.jpeg', { type: blob.type });
                formData.append('avatar', defaultFile);
            }

            const response = await axios.post(`${serverUrl}/api/user/signup`, formData, {
                withCredentials: true
            });

            toast.success("Account created successfully! Redirecting...");
            setUserData(response.data.user);
            navigate('/dashboard');

        } catch (error) {
            const errorMessage = error.response?.data?.message || "An unknown error occurred.";
            console.error("Signup failed:", errorMessage);
            toast.error(errorMessage);
            setFormError(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    const handleAvatarChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const options = { maxSizeMB: 1, maxWidthOrHeight: 800, useWebWorker: true };
        toast.loading('Compressing image...');
        try {
            const compressedFile = await imageCompression(file, options);
            setAvatar(compressedFile);
            setAvatarPreview(URL.createObjectURL(compressedFile));
            toast.dismiss();
            toast.success('Image ready!');
        } catch (error) {
            console.error("Image compression error:", error);
            toast.dismiss();
            toast.error("Failed to process image.");
        }
    };

    return (
        <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-6 sm:p-12">
            <div className="w-full max-w-md">
                <h1 className="text-2xl font-bold mb-8 self-start text-gray-800">Expense Tracker</h1>

                <div className="mb-6 text-left">
                    <h2 className="text-3xl font-bold text-gray-900">Create an Account</h2>
                    <p className="text-gray-500 mt-2">Join us today by entering your details below.</p>
                </div>

                <div className="mb-8">
                    <div className="relative w-24 h-24 mx-auto">
                        <label htmlFor="avatarInput" className="cursor-pointer group">
                            <img
                                src={avatarPreview || user}
                                alt="Avatar"
                                className="w-full h-full rounded-full object-cover border-2 border-gray-200 group-hover:border-purple-400 transition"
                            />
                        </label>
                        <input type="file" id="avatarInput" onChange={handleAvatarChange} className="hidden" accept="image/*" />
                        <label
                            htmlFor="avatarInput"
                            className="absolute bottom-0 right-0 bg-purple-600 rounded-full p-2 cursor-pointer hover:bg-purple-700 transition"
                            title="Upload new image"
                        >
                            <FiCamera size={16} className="text-white" />
                        </label>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                        <input type="text" id="fullName" value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="John Doe" className="w-full px-4 py-3 bg-gray-100 border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500" required />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                        <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="john@example.com" className="w-full px-4 py-3 bg-gray-100 border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500" required />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                        <div className="relative">
                            <input type={showPassword ? 'text' : 'password'} id="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Min 8 Characters" className="w-full px-4 py-3 bg-gray-100 border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500" required />
                            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 px-4 flex items-center text-gray-500">
                                {showPassword ? <FiEyeOff /> : <FiEye />}
                            </button>
                        </div>
                        {formError && <p className="text-red-500 text-xs mt-2">{formError}</p>}
                    </div>
                    <button type="submit" className="w-full bg-purple-600 text-white font-bold py-3 rounded-lg hover:bg-purple-700 transition-colors shadow-lg shadow-purple-200" disabled={isLoading}>
                        {isLoading ? 'SIGNING UP...' : 'SIGN UP'}
                    </button>
                </form>
                <p className="mt-8 text-center text-sm text-gray-600">
                    Already have an account?{' '}
                    <Link to="/login" className="font-semibold text-purple-600 hover:underline">
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
};

const DecorativePanel = () => {
    return (
        <div className="hidden lg:flex w-1/2 bg-purple-50 p-12 relative items-center justify-center overflow-hidden">
            <div className="absolute -top-24 -right-24 w-72 h-72 bg-purple-200 rounded-full opacity-50"></div>
            <div className="absolute -bottom-24 -left-12 w-80 h-80 bg-purple-200 rounded-full opacity-50"></div>

            <div className="relative z-10 w-full max-w-md space-y-8">
                <div className="bg-white/70 backdrop-blur-xl p-6 rounded-2xl shadow-lg border border-white">
                    <div className="flex items-center space-x-4">
                        <div className="bg-purple-100 p-3 rounded-full">
                            <FiDollarSign size={24} className="text-purple-600" />
                        </div>
                        <div>
                            <p className="text-gray-500 text-sm">Track Your Income & Expenses</p>
                            <p className="text-2xl font-bold text-gray-800">$430,000</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white/70 backdrop-blur-xl p-6 rounded-2xl shadow-lg border border-white">
                    <div className="flex justify-between items-center mb-4">
                        <div>
                            <p className="text-lg font-bold text-gray-800">All Transactions</p>
                            <p className="text-sm text-gray-500">2nd Jan to 21st Dec</p>
                        </div>
                        <a href="#" className="text-sm font-semibold text-purple-600 hover:underline">View More</a>
                    </div>
                    <div className="flex items-end h-32 space-x-2">
                        <div className="flex-1 h-[45%] bg-purple-300 rounded-t-md" title="Jan"></div>
                        <div className="flex-1 h-[65%] bg-purple-500 rounded-t-md" title="Feb"></div>
                        <div className="flex-1 h-[75%] bg-purple-300 rounded-t-md" title="Mar"></div>
                        <div className="flex-1 h-[30%] bg-purple-500 rounded-t-md" title="Apr"></div>
                        <div className="flex-1 h-[55%] bg-purple-300 rounded-t-md" title="May"></div>
                        <div className="flex-1 h-[90%] bg-purple-500 rounded-t-md" title="Jun"></div>
                        <div className="flex-1 h-[65%] bg-purple-300 rounded-t-md" title="Jul"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default function SignUp() {
    return (
        <main className="flex min-h-screen bg-white text-gray-800" style={{ fontFamily: "'Inter', sans-serif" }}>
            <SignUpForm />
            <DecorativePanel />
        </main>
    );
}