'use client';
import Contact from "@/app/components/Contact";
import ContactModel from "@/app/components/ContactModel";
import Footer from "@/app/components/Footer";
import Navigation from "@/app/components/Navigation";
import { useRouter } from "next/navigation";
import React, { useState } from 'react'

const Blog1 = () => {
    const [showContactModel, setShowContactModel] = useState(false);
    const [navSelection, setNavSelection] = useState('Blogs');
    const [showMessageSuccess, setShowMessageSuccess] = useState(false);
    
    const onMessageSuccess = () => {
        setShowMessageSuccess(true);
        setTimeout(() => {
            setShowMessageSuccess(false);
        }, 3000);
    };
        
    const onContactClick = () => {
        setShowContactModel(!showContactModel);
    }

    const router = useRouter();

    return (
        <div className="relative">
            <Navigation navSelection={navSelection} onContactClick={onContactClick}/>
            <ContactModel onMessageSuccess={onMessageSuccess} showContactModel={showContactModel} onContactClick={onContactClick}/>
            
            {/* Hero Section */}
            <div className="min-h-[80vh] sm:min-h-[100vh] flex items-end justify-center  px-4 pb-[20px] sm:px-6 lg:px-8">
                <div className="w-full max-w-6xl flex  flex-col justify-end  py-10 sm:py-7 ">
                    <h1 className="text-3xl sm:text-4xl md:text-xl lg:text-6xl w-full sm:w-[90%] lg:leading-[67px] font-bold">
                        How to improve your UI design skills: Quickly develop an "eye" for great design
                    </h1>
                    <p className="text-base sm:text-lg md:text-xl w-full sm:w-[80%] mt-4 sm:mt-2">
                        The design industry is constantly evolving, but design is timeless. Learn how to quickly develop an "eye" for UI design and improve your design skills in 2023.
                    </p>
                    <div className="flex flex-row flex-wrap gap-4 sm:gap-6 ml-2 sm:ml-4 mt-6 sm:mt-8 w-full sm:w-[60%] lg:w-[60%]">
                        <div className="bg-white text-black px-4 py-1.5 rounded text-sm sm:text-base">
                            <p>Design</p>
                        </div>
                        <div className="bg-white text-black px-4 py-1.5 rounded text-sm sm:text-base">
                            <p>Product</p>
                        </div>
                        <div className="ring-1 ring-white text-white px-4 py-1.5 rounded text-sm sm:text-base">
                            <p>12 min read</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <div className="min-h-screen bg-[#101010] flex items-center justify-center px-4 sm:px-6 lg:px-8">
                <div className="w-full max-w-5xl flex flex-col lg:flex-row justify-between py-10 sm:py-16 lg:py-20 gap-8">
                    <div className="w-full lg:hidden sm:flex sm:flex-col px-[20px] lg:w-[20%]">
                        <h2 className="text-3xl sm:text-2xl font-semibold">Content</h2>
                        <div className="mt-4 ml-[20px] text-base sm:text-lg space-y-1.5">
                            <p className="cursor-pointer hover:text-white">1. Topic number 01</p>
                            <p className="cursor-pointer hover:text-white">2. Topic number 02</p>
                            <p className="cursor-pointer hover:text-white">3. Topic number 03</p>
                            <p className="cursor-pointer hover:text-white">4. Topic number 04</p>
                            <p className="cursor-pointer hover:text-white">5. Topic number 05</p>
                            <p className="cursor-pointer hover:text-white">6. Topic number 06</p>
                        </div>
                    </div>
                    <div className="w-full lg:w-[75%] text-[#A19F9F] flex flex-col space-y-6 sm:space-y-8 px-4 sm:px-8">
                        <p className="text-sm sm:text-base leading-relaxed">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus saepe quidem consectetur accusantium praesentium vel quam animi, voluptates similique est porro quia dignissimos doloribus, ex error. Nam velit harum fuga! 
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus saepe quidem consectetur accusantium praesentium vel quam animi, voluptates similique est porro quia dignissimos doloribus, ex error. Nam velit harum fuga!
                        </p>
                        <p className="text-sm sm:text-base leading-relaxed">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus saepe quidem consectetur accusantium praesentium vel quam animi, voluptates similique est porro quia dignissimos doloribus, ex error. Nam velit harum fuga! 
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus saepe quidem consectetur accusantium praesentium vel quam animi, voluptates similique est porro quia dignissimos doloribus, ex error. Nam velit harum fuga!
                        </p>
                        <p className="text-sm sm:text-base leading-relaxed">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus saepe quidem consectetur accusantium praesentium vel quam animi, voluptates similique est porro quia dignissimos doloribus, ex error. Nam velit harum fuga! 
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus saepe quidem consectetur accusantium praesentium vel quam animi, voluptates similique est porro quia dignissimos doloribus, ex error. Nam velit harum fuga!
                        </p>
                        <div className="h-64 sm:h-80 md:h-96 rounded-2xl my-6 bg-white"></div>
                        <p className="mx-4 sm:mx-8 text-xl sm:text-2xl md:text-3xl italic text-center">
                            "When something is important enough, you do it even if the odds are not in your favour"
                        </p>
                        <p className="text-sm sm:text-base leading-relaxed">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus saepe quidem consectetur accusantium praesentium vel quam animi, voluptates similique est porro quia dignissimos doloribus, ex error. Nam velit harum fuga! 
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus saepe quidem consectetur accusantium praesentium vel quam animi, voluptates similique est porro quia dignissimos doloribus, ex error. Nam velit harum fuga!
                        </p>
                    </div>
                    <div className="w-full hidden lg:flex lg:flex-col lg:w-[20%]">
                        <h2 className="text-xl sm:text-3xl font-semibold">Content</h2>
                        <div className="mt-4 text-base ml-[20px] sm:text-lg space-y-1">
                            <p className="cursor-pointer hover:text-white">1. Topic number 01</p>
                            <p className="cursor-pointer hover:text-white">2. Topic number 02</p>
                            <p className="cursor-pointer hover:text-white">3. Topic number 03</p>
                            <p className="cursor-pointer hover:text-white">4. Topic number 04</p>
                            <p className="cursor-pointer hover:text-white">5. Topic number 05</p>
                            <p className="cursor-pointer hover:text-white">6. Topic number 06</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer Section */}
            <div>
                <Contact onContactClick={onContactClick}/>
                <Footer/>
            </div>

            {/* Success Message */}
            {showMessageSuccess && (
                <div className="bg-[#101010] z-40 w-64 sm:w-72 fixed text-xs sm:text-sm mb-6 ml-4 sm:ml-6 px-4 sm:px-6 py-4 sm:py-6 ring-1 ring-white rounded-lg text-white left-0 bottom-0">
                    <p>Message saved successfully. Will get back to you soon:)</p>
                </div>
            )}
        </div>
    )
}

export default Blog1;