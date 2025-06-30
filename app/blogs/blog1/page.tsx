'use client';
import Contact from "@/app/components/Contact";
import ContactModel from "@/app/components/ContactModel";
import Footer from "@/app/components/Footer";
import Navigation from "@/app/components/Navigation";
import {useRouter} from "next/navigation";
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

    return(
        <div>
            <Navigation navSelection={navSelection} onContactClick={onContactClick}/>
            <ContactModel onMessageSuccess={onMessageSuccess} showContactModel={showContactModel} onContactClick={onContactClick}/>
            <div className="min-h-[100vh]  flex items-center justify-center ">
                <div className="h-[100vh] w-[80%]  flex flex-col justify-end py-[80px]  ">
                    <p className="text-[50px] w-[90%] leading-[60px] ">How to improve your UI design skills: Quickly develop an "eye" for great design</p>
                    <p className="text-[19px] w-[80%] mt-[10px]">The design industry is constantly evolving, but design is timeless. Learn how to quickly develop an "eye" for UI design and improve your design skillls in 2023.</p>
                    <div className="flex flex-row justify-between ml-[10px] items-center w-[28%] mt-[20px]">
                        <div className="flex items-center bg-white text-black px-[20px] py-[3px] rounded items-center">
                            <p>Design</p>
                        </div>
                        <div className="flex items-center bg-white text-black px-[20px] py-[3px] rounded items-center">
                            <p>Product</p>
                        </div>
                        <div className="flex items-center ring-[1px] ring-white text-white text-black px-[20px] py-[3px] rounded items-center">
                            <p>12 min read</p>
                        </div>
                    </div>
                </div>
              


            </div>
            <div className="min-h-[100vh] bg-[#101010] flex items-center justify-center ">
                <div className="flex flex-row justify-between py-[40px] w-[80%] min-h-[100vh]">
                    <div className="w-[80%] text-[#A19F9F] flex flex-col px-[40px] space-y-[10px]">
                    <p className="firstLetter">Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus saepe quidem consectetur accusantium praesentium vel quam animi, voluptates similique est porro quia dignissimos doloribus, ex error. Nam velit harum fuga! 
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus saepe quidem consectetur accusantium praesentium vel quam animi, voluptates similique est porro quia dignissimos doloribus, ex error. Nam velit harum fuga!
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus saepe quidem consectetur accusantium praesentium vel quam animi, voluptates similique est porro quia dignissimos doloribus, ex error. Nam velit harum fuga!
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus saepe quidem consectetur accusantium praesentium vel quam animi, voluptates similique est porro quia dignissimos doloribus, ex error. Nam velit harum fuga!
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus saepe quidem consectetur accusantium praesentium vel quam animi, voluptates similique est porro quia dignissimos doloribus, ex error. Nam velit harum fuga!
                        </p>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus saepe quidem consectetur accusantium praesentium vel quam animi, voluptates similique est porro quia dignissimos doloribus, ex error. Nam velit harum fuga! 
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus saepe quidem consectetur accusantium praesentium vel quam animi, voluptates similique est porro quia dignissimos doloribus, ex error. Nam velit harum fuga!
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus saepe quidem consectetur accusantium praesentium vel quam animi, voluptates similique est porro quia dignissimos doloribus, ex error. Nam velit harum fuga!
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus saepe quidem consectetur accusantium praesentium vel quam animi, voluptates similique est porro quia dignissimos doloribus, ex error. Nam velit harum fuga!
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus saepe quidem consectetur accusantium praesentium vel quam animi, voluptates similique est porro quia dignissimos doloribus, ex error. Nam velit harum fuga!
                        </p>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus saepe quidem consectetur accusantium praesentium vel quam animi, voluptates similique est porro quia dignissimos doloribus, ex error. Nam velit harum fuga! 
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus saepe quidem consectetur accusantium praesentium vel quam animi, voluptates similique est porro quia dignissimos doloribus, ex error. Nam velit harum fuga!
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus saepe quidem consectetur accusantium praesentium vel quam animi, voluptates similique est porro quia dignissimos doloribus, ex error. Nam velit harum fuga!
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus saepe quidem consectetur accusantium praesentium vel quam animi, voluptates similique est porro quia dignissimos doloribus, ex error. Nam velit harum fuga!
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus saepe quidem consectetur accusantium praesentium vel quam animi, voluptates similique est porro quia dignissimos doloribus, ex error. Nam velit harum fuga!
                        </p>
                        <div className="h-[70vh] rounded-[20px] my-[20px] bg-white">

                        </div>
                        <p className=" mx-[20px] text-[25px]">"When something is important enough, you do it even if the odds are not in your favour"</p>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus saepe quidem consectetur accusantium praesentium vel quam animi, voluptates similique est porro quia dignissimos doloribus, ex error. Nam velit harum fuga! 
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus saepe quidem consectetur accusantium praesentium vel quam animi, voluptates similique est porro quia dignissimos doloribus, ex error. Nam velit harum fuga!
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus saepe quidem consectetur accusantium praesentium vel quam animi, voluptates similique est porro quia dignissimos doloribus, ex error. Nam velit harum fuga!
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus saepe quidem consectetur accusantium praesentium vel quam animi, voluptates similique est porro quia dignissimos doloribus, ex error. Nam velit harum fuga!
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus saepe quidem consectetur accusantium praesentium vel quam animi, voluptates similique est porro quia dignissimos doloribus, ex error. Nam velit harum fuga!
                        </p>
                    </div>
                    <div className="w-[20%]">
                        <p className="text-[24px]">Content</p>
                        <div className="mt-[10px] text-[20px]">
                            <p className="cursor-pointer">Topic number 01</p>
                            <p className="cursor-pointer">Topic number 02</p>
                            <p className="cursor-pointer">Topic number 03</p>
                            <p className="cursor-pointer">Topic number 04</p>
                            <p className="cursor-pointer">Topic number 05</p>
                            <p className="cursor-pointer">Topic number 06</p>
                        </div>
                        

                    </div>

                
                </div>


            </div>
        
            <div>
                <Contact onContactClick={onContactClick}/>
                <Footer/>
            </div>
            {showMessageSuccess && <div className="bg-[#101010] z-[40] w-[250px] fixed text-[13px] mb-[20px] ml-[30px] px-[20px] py-[20px] ring-white ring-[0.5px] rounded-[10px] text-white absolute left-0 bottom-0">
                <p>Message saved successfully. Will get back to you soon:)</p>
            </div>}
        </div>
    )
}

export default Blog1;