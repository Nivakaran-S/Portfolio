
import React, { useEffect } from 'react';

import Image from 'next/image';
import Certificate1 from '../certificates/UC-0aeb6d1d-dc7b-4ba6-aecf-2cc774b2c29c.jpg';
import Certificate2 from '../certificates/UC-108298ba-2018-4131-b86b-70e6279377e9.jpg';
import Certificate3 from '../certificates/UC-5b27ff0d-fe45-46a9-942c-485d0a13118b.jpg';
import Certificate4 from '../certificates/UC-60242198-5929-47a6-a6c5-718a6e7b121c.jpg';
import Certificate5 from '../certificates/UC-8ba28f0a-d7e2-48dd-882e-87b73fa64021.jpg';
import Certificate6 from '../certificates/UC-da378ead-b16d-407d-b199-9f50a88d90e1.jpg';
import Certificate7 from '../certificates/UC-deb577d6-b72a-4ca6-86fc-b901dd127754.jpg';
import Certificate8 from '../certificates/UC-f40d10df-c93e-4d1e-af98-b8802f58431d.jpg'

import Certificate9 from '../certificates/UC-6c12dce8-1750-4ff2-a4bc-a95f1992f3ea.jpg';
import Certificate10 from '../certificates/UC-435cb559-6d32-4c0b-82ba-92e1d49a7b51.jpg';
import Certificate11 from '../certificates/UC-5e929664-5636-40c0-bebe-9df2ad3a34af.jpg';
import Certificate12 from '../certificates/UC-be4b3936-41fd-41e6-b867-1e358158d79a.jpg';

const Certification = () => {
    useEffect(() => {
        if(typeof window !== 'undefined'){
            import('scrollreveal').then((ScrollReveal) => { 
                ScrollReveal.default().reveal('.certification1', {
                origin: 'bottom',
                distance: '20px',
                duration: 800,
                delay: 200,
                easing: 'ease-in-out',
                reset: false
            })
        })
        }
    }, [])

    useEffect(() => {
        if(typeof window !== 'undefined'){
            import('scrollreveal').then((ScrollReveal) => { 
                ScrollReveal.default().reveal('.certification2', {
                origin: 'right',
                distance: '50px',
                duration: 800,
                delay: 400,
                easing: 'ease-in-out',
                reset: false
            })
        })
        }
    }, [])

    useEffect(() => {
        if(typeof window !== 'undefined'){
            import('scrollreveal').then((ScrollReveal) => { 
                ScrollReveal.default().reveal('.certification3', {
                origin: 'left',
                distance: '50px',
                duration: 800,
                delay: 600,
                easing: 'ease-in-out',
                reset: false
            })
        })
        }
    }, [])

    return(
        <div className="bg-[#101010] min-h-[100vh] py-[80px] w-screen flex items-center justify-center">
            <div className="w-[80%]  flex flex-col ">
                <div className="leading-[60px] sm:leading-[64px] text-center">
                    <p className="text-[50px] sm:text-[55px] certification1 bg-gradient-to-t from-[#433D3A] via-[#C6C4C3] font-bold to-[#CAC8C6] bg-clip-text text-transparent">My Certifications</p>
                    
                </div>

                <div className=" mt-[30px]">
                    <div className=" grid grid-cols-1 sm:grid-cols-2  md:grid-cols-4 gap-[15px] items-center justify-center">
                        

                        <div className="cursor-pointer certification2 relative group bg-[#000] overflow-hidden w-[100%] ring-[0.5px] ring-[#4d4d4d] h-[195px] rounded-[10px] flex items-center justify-center">
                        <div className=' absolute transition-transform duration-500 group-hover:translate-y-0  translate-y-[200%] flex flex-col items-center justify-center'>
                                <Image alt="" src={Certificate12} className='h-[100%] w-[100%]'  />
                            </div>
                            <div className=' transition-transform duration-500 group-hover:scale-0  flex flex-col px-[20px]'>
                                <p>Complete Agentic AI Bootcamp with LangGraph and Langchain</p>
                                <p className='text-[16px]'>Udemy</p>
                                <p className='text-[14px] text-gray-400'>Date: Jun 26, 2025</p>
                                <p className='text-[14px] text-gray-300 '>Instructors: Krish Naik</p>
                            </div>
                        </div>

                        <div className="cursor-pointer certification2 relative group bg-[#000] overflow-hidden w-[100%] ring-[0.5px] ring-[#4d4d4d] h-[195px] rounded-[10px] flex items-center justify-center">
                        <div className=' absolute transition-transform duration-500 group-hover:translate-y-0  translate-y-[200%] flex flex-col items-center justify-center'>
                                <Image alt="" src={Certificate6} className='h-[100%] w-[100%]'  />
                            </div>
                            <div className=' transition-transform duration-500 group-hover:scale-0  flex flex-col px-[20px]'>
                                <p>Complete Generative AI Course With Langchain and Huggingface</p>
                                <p className='text-[16px]'>Udemy</p>
                                <p className='text-[14px] text-gray-400'>Date: Dec 07, 2024</p>
                                <p className='text-[14px] text-gray-300 '>Instructors: Krish Naik</p>
                            </div>
                        </div>

                        <div className="cursor-pointer certification3 relative group bg-[#000] overflow-hidden w-[100%] ring-[0.5px] ring-[#4d4d4d] h-[195px] rounded-[10px] flex items-center justify-center">
                        <div className=' absolute transition-transform duration-500 group-hover:translate-y-0  translate-y-[200%] flex flex-col items-center justify-center'>
                                <Image alt="" src={Certificate9} className='h-[100%] w-[100%]'  />
                            </div>
                            <div className=' transition-transform duration-500 group-hover:scale-0  flex flex-col px-[20px]'>
                                <p>Complete Data Science, Machine Learning, DL, NLP Bootcamp</p>
                                <p className='text-[15px]'>Udemy</p>
                                <p className='text-[14px] text-gray-400'>Date: May 24, 2025</p>
                                <p className='text-[14px] text-gray-300 '>Instructors: Krish Naik</p>
                            </div>
                        </div>

                        <div className="cursor-pointer certification3 relative group bg-[#000] overflow-hidden w-[100%] ring-[0.5px] ring-[#4d4d4d] h-[195px] rounded-[10px] flex items-center justify-center">
                        <div className=' absolute transition-transform duration-500 group-hover:translate-y-0  translate-y-[200%] flex flex-col items-center justify-center'>
                                <Image alt="" src={Certificate10} className='h-[100%] w-[100%]'  />
                            </div>
                            <div className=' transition-transform duration-500 group-hover:scale-0  flex flex-col px-[20px]'>
                                <p>Complete Computer Vision Bootcamp With PyTorch & Tensorflow</p>
                                <p className='text-[15px]'>Udemy</p>
                                <p className='text-[14px] text-gray-400'>Date: April 27, 2025</p>
                                <p className='text-[14px] text-gray-300 '>Instructors: Krish Naik, Monal Kumar, Sourangshu Pal</p>
                            </div>
                        </div>

                        




                        <div className="cursor-pointer certification3 relative group bg-[#000] overflow-hidden w-[100%] ring-[0.5px] ring-[#4d4d4d] h-[195px] rounded-[10px] flex items-center justify-center">
                        <div className=' absolute transition-transform duration-500 group-hover:translate-y-0  translate-y-[200%] flex flex-col items-center justify-center'>
                                <Image alt="" src={Certificate8} className='h-[100%] w-[100%]'  />
                            </div>
                            <div className=' transition-transform duration-500 group-hover:scale-0  flex flex-col px-[20px]'>
                                <p>Complete AI & Machine Learning, Data Science Bootcamp</p>
                                <p className='text-[15px]'>Udemy</p>
                                <p className='text-[14px] text-gray-400'>Date: Feb 28, 2024</p>
                                <p className='text-[14px] text-gray-300 '>Instructors: Andrei Neagoie</p>
                            </div>
                        </div>

                        <div className="cursor-pointer  certification2 relative group bg-[#000] overflow-hidden w-[100%] ring-[0.5px] ring-[#4d4d4d] h-[195px] rounded-[10px] flex items-center justify-center">
                            <div className=' absolute transition-transform duration-500 group-hover:translate-y-0  translate-y-[200%] flex flex-col items-center justify-center'>
                                <Image alt="" src={Certificate1} className='h-[100%] w-[100%]'  />
                            </div>
                            <div className=' transition-transform duration-500 group-hover:scale-0  flex flex-col px-[20px]'>
                                <p>The Complete Web Developer in 2023: Zero to Mastery</p>
                                <p className='text-[15px]'>Udemy</p>
                                <p className='text-[14px] text-gray-400'>Date: Nov 25, 2023</p>
                                <p className='text-[14px] text-gray-300 '>Instructors: Andrei Neagoie</p>
                            </div>
                        </div>

                        <div className="cursor-pointer  certification2 relative group bg-[#000] overflow-hidden w-[100%] ring-[0.5px] ring-[#4d4d4d] h-[195px] rounded-[10px] flex items-center justify-center">
                            <div className=' absolute transition-transform duration-500 group-hover:translate-y-0  translate-y-[200%] flex flex-col items-center justify-center'>
                                <Image alt="" src={Certificate11} className='h-[100%] w-[100%]'  />
                            </div>
                            <div className=' transition-transform duration-500 group-hover:scale-0  flex flex-col px-[20px]'>
                                <p>Complete Web & Mobile Designer in 2023: UI/UX with Figma</p>
                                <p className='text-[15px]'>Udemy</p>
                                <p className='text-[14px] text-gray-400'>Date: Dec 31, 2023</p>
                                <p className='text-[14px] text-gray-300 '>Instructors: Andrei Neagoie, Daniel Schifano</p>
                            </div>
                        </div>

                        <div className="cursor-pointer certification2 relative group bg-[#000] overflow-hidden w-[100%] ring-[0.5px] ring-[#4d4d4d] h-[195px] rounded-[10px] flex items-center justify-center">
                        <div className=' absolute transition-transform duration-500 group-hover:translate-y-0  translate-y-[200%] flex flex-col items-center justify-center'>
                                <Image alt="" src={Certificate2} className='h-[100%] w-[100%]'  />
                            </div>
                            <div className=' transition-transform duration-500 group-hover:scale-0  flex flex-col px-[20px]'>
                                <p>The Complete Data Structures and Algorithms Course in Python</p>
                                <p className='text-[15px]'>Udemy</p>
                                <p className='text-[14px] text-gray-400'>Date: Jan 12, 2025</p>
                                <p className='text-[14px] text-gray-300 '>Instructors: Elshad Karimov</p>
                            </div>
                        </div>

                        <div className="cursor-pointer certification3 relative group bg-[#000] overflow-hidden w-[100%] ring-[0.5px] ring-[#4d4d4d] h-[195px] rounded-[10px] flex items-center justify-center">
                        <div className=' absolute transition-transform duration-500 group-hover:translate-y-0  translate-y-[200%] flex flex-col items-center justify-center'>
                                <Image alt="" src={Certificate3} className='h-[100%] w-[100%]'  />
                            </div>
                            <div className=' transition-transform duration-500 group-hover:scale-0  flex flex-col px-[20px]'>
                                <p>Learn Python & Ethial Hacking from Scratch</p>
                                <p className='text-[15px]'>Udemy</p>
                                <p className='text-[14px] text-gray-400'>Date: April 23, 2024</p>
                                <p className='text-[14px] text-gray-300 '>Instructors: Zaid Sabih</p>
                            </div>
                        </div>

                        <div className="cursor-pointer certification3 relative group bg-[#000] overflow-hidden w-[100%] ring-[0.5px] ring-[#4d4d4d] h-[195px] rounded-[10px] flex items-center justify-center">
                        <div className=' absolute transition-transform duration-500 group-hover:translate-y-0  translate-y-[200%] flex flex-col items-center justify-center'>
                                <Image alt="" src={Certificate4} className='h-[100%] w-[100%]'  />
                            </div>
                            <div className=' transition-transform duration-500 group-hover:scale-0  flex flex-col px-[20px]'>
                                <p>TensorFlow for Deep Learning Bootcamp</p>
                                <p className='text-[15px]'>Udemy</p>
                                <p className='text-[14px] text-gray-400'>Date: July 31, 2024</p>
                                <p className='text-[14px] text-gray-300 '>Instructors: Andrei Neagoie, Daniel Bourke</p>
                            </div>
                        </div>

                        <div className="cursor-pointer certification2 relative group bg-[#000] overflow-hidden w-[100%] ring-[0.5px] ring-[#4d4d4d] h-[195px] rounded-[10px] flex items-center justify-center">
                        <div className=' absolute transition-transform duration-500 group-hover:translate-y-0  translate-y-[200%] flex flex-col items-center justify-center'>
                                <Image alt="" src={Certificate5} className='h-[100%] w-[100%]'  />
                            </div>
                            <div className=' transition-transform duration-500 group-hover:scale-0  flex flex-col px-[20px]'>
                                <p>Complete NodeJS Developer (GraphQL, MongoDB & more)</p>
                                <p className='text-[15px]'>Udemy</p>
                                <p className='text-[14px] text-gray-400'>Date: March 07, 2025</p>
                                <p className='text-[14px] text-gray-300 '>Instructors: Andrei Neagoie, Adam Odziemkowski</p>
                            </div>
                        </div>

                        

                        <div className="cursor-pointer certification3 relative group bg-[#000] overflow-hidden w-[100%] ring-[0.5px] ring-[#4d4d4d] h-[195px] rounded-[10px] flex items-center justify-center">
                        <div className=' absolute transition-transform duration-500 group-hover:translate-y-0  translate-y-[200%] flex flex-col items-center justify-center'>
                                <Image alt="" src={Certificate7} className='h-[100%] w-[100%]'  />
                            </div>
                            <div className=' transition-transform duration-500 group-hover:scale-0  flex flex-col px-[20px]'>
                                <p>React Native - The Practical Guide [2024]</p>
                                <p className='text-[15px]'>Udemy</p>
                                <p className='text-[14px] text-gray-400'>Date: June 12, 2024</p>
                                <p className='text-[14px] text-gray-300 '>Instructors: Maximilian Schwarzmuller</p>
                            </div>
                        </div>

                        

                        
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Certification;