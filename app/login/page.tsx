
'use client'
import React, { useEffect, useState} from "react"
import axios from "axios";
import { useRouter } from "next/navigation";

const LoginPage = () => {
    const [username, setUsername] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    const router = useRouter()

    useEffect(() => {
        const fetchCookies = async () => {
        try {
            

            const response = await axios.get(
                "https://new-portfolio-backend-roan.vercel.app/check-cookie",
            { 
                withCredentials: true,
            })
            
            if (response.status === 200) {
                console.log("Cookies are valid");
                router.push('/admin')
            }
            
        } catch (error) {
            console.log("Error fetching cookies:", error);
            router.push('/login')

        } 
    }
        
    fetchCookies()
    
        
    }, [])

    const handleLogin = async () => {
        console.log("username", username)
        console.log("password", password)
        try {
            const response = await axios.post('https://new-portfolio-backend-roan.vercel.app/api/auth/login', {
                userName: username,
                password: password
            }, {
                withCredentials: true,
            })

            console.log('Login successful', response.data)
            if (response.status === 200 && response.data.token) {
                localStorage.setItem('token', response.data.token)
                router.push('/admin')
            } else {
                console.error('Login failed')
            }

        } catch (error) {
            console.error("Error logging in:", error)
        }
    }



    return(
        <div>
            <div className="bg-[#000]  h-[100vh] flex items-center justify-center w-screen ">
                
                <div className="w-[60vw] h-[100vh] flex flex-col items-center justify-center">
                    <p className="bg-gradient-to-t text-[80px] from-[#433D3A] via-[#C6C4C3] font-bold to-[#CAC8C6] bg-clip-text select-none text-transparent">NivakaranS</p>
                </div>
                <div className="w-[40vw] h-[100vh] flex flex-col items-center justify-center bg-[#101010]">

                    <div className="text-white text-3xl">Welcome Back</div>
                    <div>
                        <div className="mt-[10px]">
                            <p className="text-[16px]">Username</p>
                            <input value={username} onChange={(e) => setUsername(e.currentTarget.value)} className="bg-[#000] w-[120%] px-[18px] ring-gray-500 ring-[1px] mt-[2px] py-[10px] rounded-[5px] outline-none  "/>
                        </div>
                        <div className="mt-[10px]">
                            <p className="text-[16px]">Password</p>
                            <input type="password" value={password} onChange={(e) => setPassword(e.currentTarget.value)} className="bg-[#000] w-[120%] px-[18px] ring-gray-500 ring-[1px] mt-[2px] py-[10px] rounded-[5px] outline-none  "/>
                        </div>
                        <div onClick={handleLogin} className="bg-[#433D3A] w-[120%] select-none px-[18px]  mt-[20px] py-[10px] rounded-[5px] outline-none flex items-center justify-center cursor-pointer">
                            <p className="text-[16px]">Login</p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default LoginPage