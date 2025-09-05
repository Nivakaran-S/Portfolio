'use client';


import React from "react";
import Image from "next/image";
import Certificate13 from '../certificates/UC-22248617-9b8b-477b-9eed-28815bc63a3e.jpg'
import Achievement1 from '../certificates/Achievement1.png'

const Achievements = () => {
  
  
  return (
    <div className="bg-[#101010] min-h-[60vh] pt-[50px] pb-[70px] w-screen flex  justify-center">
      <div className="w-[80%] 2xl:w-[1200px] mt-[40px] flex flex-col">
        <div className=" leading-[49px] md:leading-[65px] text-center">
            <p className="text-[45px] md:text-[60px] bg-gradient-to-t from-[#433D3A] via-[#C6C4C3] font-bold to-[#CAC8C6] bg-clip-text text-transparent">Achievements</p>

            <div>
                <div className="flex items-center justify-center">
                    
                    <div className="cursor-pointer relative group bg-[#1D1D1D] overflow-hidden w-[250px] h-[350px] ring-[0.5px] ring-[#4d4d4d]  mt-[30px] rounded-[10px] flex items-center justify-center">
                            <div className=' absolute transition-transform duration-500 group-hover:translate-y-0  translate-y-[200%] flex flex-col items-center justify-center'>
                                <Image alt="" src={Achievement1} className='h-[100%] w-[100%]'  />
                            </div>
                            <div className=' transition-transform duration-500 group-hover:scale-0  flex flex-col px-[20px]'>
                                <p className="text-[25px] mb-[5px] leading-[30px]">SLIIT Codefest Algothon 2024</p>
                                <p>Finalist</p>
                            </div>
                        </div>
                </div>
            </div>        
        </div>
      </div>
    </div>
  );
};

export default Achievements;