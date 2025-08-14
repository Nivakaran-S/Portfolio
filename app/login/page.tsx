'use client'
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const LoginPage = () => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    
    const router = useRouter();

    useEffect(() => {
        const checkAuth = async () => {
            setIsLoading(true);
            try {
                const response = await axios.get(
                    "https://portfolio-backend-new-2.vercel.app/check-cookie",
                    { withCredentials: true }
                );
                
                if (response.status === 200) {
                    router.push('/admin');
                }
            } catch (error) {
                console.log("No valid session found");
            } finally {
                setIsLoading(false);
            }
        };
        
        checkAuth();
    }, [router]);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
        
        try {
            const response = await axios.post(
                'https://portfolio-backend-new-2.vercel.app/api/auth/login', 
                {
                    email: username,
                    password: password
                }, 
                {
                    withCredentials: true,
                }
            );


            if (response.data) {
                if (response.data.token) {
                    localStorage.setItem('token', response.data.token);
                }
                // Force a full page refresh to ensure cookies are properly set
                //window.location.href = '/admin';
                // Alternatively, you could use:
                window.location.reload();
                // router.refresh(); // Next.js 13+ feature
                // Then router.push('/admin');
            } else {
                setError(response.data.message || 'Login failed. Please check your credentials.');
            }
        } catch (error: any) {
            console.error("Error logging in:", error);
            if (error.response) {
                setError(error.response.data.message || 'Invalid username or password');
            } else if (error.request) {
                setError('No response from server. Please try again later.');
            } else {
                setError('Login failed. Please try again.');
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="bg-black h-screen flex">
            {/* Left Section */}
            <div className="w-3/5 flex flex-col items-center justify-center">
                <p className="bg-gradient-to-t text-8xl from-[#433D3A] via-[#C6C4C3] font-bold to-[#CAC8C6] bg-clip-text select-none text-transparent">
                    NivakaranS
                </p>
            </div>
            
            {/* Right Section */}
            <div className="w-2/5 bg-[#101010] flex flex-col items-center justify-center p-8">
                <div className="w-full max-w-md">
                    <h2 className="text-white text-3xl mb-8 text-center">Welcome Back</h2>
                    
                    {error && (
                        <div className="mb-4 p-2 bg-red-100 text-red-700 rounded text-sm">
                            {error}
                        </div>
                    )}
                    
                    <form onSubmit={handleLogin}>
                        <div className="mb-4">
                            <label className="block text-gray-300 text-sm mb-1">Email</label>
                            <input 
                                type="email"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="w-full bg-black text-white px-4 py-2 border border-gray-500 rounded focus:outline-none focus:ring-1 focus:ring-gray-400"
                                required
                                disabled={isLoading}
                            />
                        </div>
                        
                        <div className="mb-6">
                            <label className="block text-gray-300 text-sm mb-1">Password</label>
                            <input 
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-black text-white px-4 py-2 border border-gray-500 rounded focus:outline-none focus:ring-1 focus:ring-gray-400"
                                required
                                disabled={isLoading}
                            />
                        </div>
                        
                        <button 
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-[#433D3A] text-white py-2 px-4 rounded hover:bg-[#534D4A] transition duration-200 flex items-center justify-center"
                        >
                            {isLoading ? (
                                <>
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Processing...
                                </>
                            ) : (
                                'Login'
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;