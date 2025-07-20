'use client';

import React, { useEffect, useRef } from 'react';
import './style.css';

interface ScrollContainerProps {
  onPortfolioClick?: boolean;
  setOnPortfolioClick?: (value: boolean) => void;
}

const PortfolioModel: React.FC<ScrollContainerProps> = ({
  onPortfolioClick,
  setOnPortfolioClick,
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let timeout: NodeJS.Timeout;

    const handleScroll = () => {
      scrollContainer.classList.add('scrolling');
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        scrollContainer.classList.remove('scrolling');
      }, 1000);
    };

    scrollContainer.addEventListener('scroll', handleScroll);
    return () => scrollContainer.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed flex custom-scrollbar flex-col overflow-y-auto h-[100vh] py-[5vh] inset-0 z-[9999] items-center justify-start">
      {/* Backdrop */}
      <div
        onClick={() => setOnPortfolioClick?.(false)}
        className={`absolute top-0 left-0 h-[380%] w-full  bg-[#101010] transition-opacity duration-500 ease-in-out ${
          onPortfolioClick ? 'opacity-60' : 'opacity-0 pointer-events-none'
        }`}
      ></div>

      {/* Modal Container */}
      <div
        ref={scrollRef}
        className={`custom-scrollbar bg-[#101010] ring-[1.5px] ring-[#373435] lg:rounded-[20px] md:rounded-[10px] text-white w-[85vw] z-20 transform transition-transform duration-500 ease-in-out ${
          onPortfolioClick
            ? 'scale-100 opacity-100'
            : ' opacity-0 pointer-events-none'
        }`}
      >
        <div className="relative flex px-[75px] w-[100%] flex-col space-y-[20px] py-[30px] items-center justify-center">
          <div className='w-[100%]'>
            
            <div className="flex w-[100%] flex-row items-center justify-center pt-[50px] space-x-[20px]">
              <div className="bg-[#1D1D1D] ring-[1px] ring-gray-600 w-[60%] h-[580px] rounded-[10px] flex items-center justify-center" >
                <p className="text-[40px] text-center sm:text-[50px] md:text-[60px] bg-gradient-to-t from-[#433D3A] via-[#C6C4C3] font-bold to-[#CAC8C6] bg-clip-text text-transparent p-6">
                    News Web App
                </p>
              </div>
              <div className='w-[40%] h-[100%] space-y-[20px]'>
                <div className="bg-[#1D1D1D] ring-[1px] ring-gray-600 w-[100%]  h-[280px] rounded-[10px] flex items-center justify-center" />
                <div className="bg-[#1D1D1D] ring-[1px] ring-gray-600 w-[100%] h-[280px] rounded-[10px] flex items-center justify-center" />
              </div>
            </div>
          </div>
          {/* Project Overview Section */}
          <div>
            <p className="text-[40px] text-center sm:text-[50px] md:text-[60px] bg-gradient-to-t from-[#433D3A] via-[#C6C4C3] font-bold to-[#CAC8C6] bg-clip-text text-transparent p-6">
              Project Overview
            </p>
            <div className="flex w-[100%] flex-row items-center justify-center space-x-[20px]">
              <div className="bg-[#1D1D1D] ring-[1px] ring-gray-600 w-[50%] h-[350px] rounded-[10px] flex items-center justify-center" />
              <div className="w-[50%] space-y-2 text-sm leading-relaxed">
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum praesentium placeat labore, vitae voluptate tempora aspernatur dolorem voluptatum id reprehenderit maxime expedita molestiae ea. Placeat id praesentium minima maiores quae?</p>
                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Id facilis provident eum, est enim exercitationem doloremque, iure iusto ducimus similique omnis porro. Quis illum doloremque tempora ex, cum molestias mollitia.</p>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis fugiat autem ullam, saepe explicabo odio quam et maiores impedit deserunt placeat voluptatibus praesentium. Alias aspernatur at voluptas nihil mollitia harum.</p>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni, at eum? Porro odio illum delectus perspiciatis esse quod hic. Doloribus dignissimos neque, voluptatem nesciunt possimus praesentium error magni consectetur tenetur!</p>
              </div>
            </div>
          </div>

          {/* The Problem Section */}
          <div>
            <p className="text-[40px] text-center sm:text-[50px] md:text-[60px] bg-gradient-to-t from-[#433D3A] via-[#C6C4C3] font-bold to-[#CAC8C6] bg-clip-text text-transparent p-6">
              The Problem
            </p>
            <div className="flex w-[100%] flex-row items-center justify-center space-x-[20px]">
              <div className="w-[50%]  space-y-2 text-sm leading-relaxed">
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum praesentium placeat labore, vitae voluptate tempora aspernatur dolorem voluptatum id reprehenderit maxime expedita molestiae ea. Placeat id praesentium minima maiores quae?</p>
                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Id facilis provident eum, est enim exercitationem doloremque, iure iusto ducimus similique omnis porro. Quis illum doloremque tempora ex, cum molestias mollitia.</p>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis fugiat autem ullam, saepe explicabo odio quam et maiores impedit deserunt placeat voluptatibus praesentium. Alias aspernatur at voluptas nihil mollitia harum.</p>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni, at eum? Porro odio illum delectus perspiciatis esse quod hic. Doloribus dignissimos neque, voluptatem nesciunt possimus praesentium error magni consectetur tenetur!</p>
              </div>
              <div className="bg-[#1D1D1D] ring-[1px] ring-gray-600 w-[50%] h-[350px] rounded-[10px] flex items-center justify-center" />
            </div>
          </div>

          {/* Tech Stack Section */}
          <div>
            <p className="text-[40px] text-center sm:text-[50px] md:text-[60px] bg-gradient-to-t from-[#433D3A] via-[#C6C4C3] font-bold to-[#CAC8C6] bg-clip-text text-transparent p-6">
              Tech Stack
            </p>
            <div className="flex w-[100%] flex-row items-center justify-center space-x-[20px]">
              <div className="w-[50%] text-center space-y-2 text-sm leading-relaxed">
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum praesentium placeat labore, vitae voluptate tempora aspernatur dolorem voluptatum id reprehenderit maxime expedita molestiae ea. Placeat id praesentium minima maiores quae?</p>
                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Id facilis provident eum, est enim exercitationem doloremque, iure iusto ducimus similique omnis porro. Quis illum doloremque tempora ex, cum molestias mollitia.</p>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis fugiat autem ullam, saepe explicabo odio quam et maiores impedit deserunt placeat voluptatibus praesentium. Alias aspernatur at voluptas nihil mollitia harum.</p>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni, at eum? Porro odio illum delectus perspiciatis esse quod hic. Doloribus dignissimos neque, voluptatem nesciunt possimus praesentium error magni consectetur tenetur!</p>
              </div>
            </div>
          </div>

          {/* The Solution Section */}
          <div>
            <p className="text-[40px] text-center sm:text-[50px] md:text-[60px] bg-gradient-to-t from-[#433D3A] via-[#C6C4C3] font-bold to-[#CAC8C6] bg-clip-text text-transparent p-6">
              The Solution
            </p>
            <div className="flex w-[100%] flex-row items-center justify-center space-x-[20px]">
              <div className="bg-[#1D1D1D] ring-[1px] ring-gray-600 w-[50%] h-[350px] rounded-[10px] flex items-center justify-center" />
              <div className="w-[100%]  space-y-2 text-sm leading-relaxed">
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum praesentium placeat labore, vitae voluptate tempor spernatur dolorem voluptatum id reprehenderit maxime expedita molestiae ea. Placeat id praesentium minima maiores quae?</p>
                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Id facilis provident eum, est enim exercitationem doloremque, iure iusto ducimus similique omnis porro. Quis illum doloremque tempora ex, cum molestias mollitia.</p>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis fugiat autem ullam, saepe explicabo odio quam et maiores impedit deserunt placeat voluptatibus praesentium. Alias aspernatur at voluptas nihil mollitia harum.</p>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni, at eum? Porro odio illum delectus perspiciatis esse quod hic. Doloribus dignissimos neque, voluptatem nesciunt possimus praesentium error magni consectetur tenetur!</p>
              </div>
            </div>
          </div>

          {/* Close Button */}
          <button
            className="cursor-pointer absolute right-0 top-0 pr-[40px] pt-[30px] text-[20px] font-semibold"
            onClick={() => setOnPortfolioClick?.(false)}
            aria-label="Close modal"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default PortfolioModel;