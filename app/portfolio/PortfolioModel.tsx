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
    <div
      ref={scrollRef}
      className={`custom-scrollbar scrollbar-thin bg-[#101010] ring-[1.5px] ring-[#373435] lg:rounded-[20px] md:rounded-[10px] text-white h-[95vh] w-[85vw] overflow-y-scroll overflow-x-hidden z-20 transform transition-transform duration-500 ease-in-out ${
        onPortfolioClick ? 'scale-100 opacity-100' : 'scale-95 opacity-0 pointer-events-none'
      }`}
    >
      <div className="flex px-[75px] flex-col space-y-[20px] items-center justify-center">
        <div>
            <p className="text-[40px] text-center sm:text-[50px] md:text-[60px] bg-gradient-to-t from-[#433D3A] via-[#C6C4C3] font-bold to-[#CAC8C6] bg-clip-text text-transparent p-6">
            Project Overview
            </p>

            {/* Modal content */}
            <div className="flex   w-[100%] flex-row items-center justify-center space-x-[20px]">
            <div className="bg-[#1D1D1D] ring-[1px] ring-gray-600 w-[50%] h-[350px] rounded-[10px] flex items-center justify-center" />
            <div className="w-[50%] space-y-2 text-sm leading-relaxed">
                <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Temporibus similique quasi nesciunt cupiditate dolor quidem! At, modi doloribus? Totam necessitatibus tempora quidem perspiciatis, placeat odit aliquam labore dicta odio? Quos!</p>
                <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Temporibus similique quasi nesciunt cupiditate dolor quidem! At, modi doloribus? Totam necessitatibus tempora quidem perspiciatis, placeat odit aliquam labore dicta odio? Quos!</p>
                <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Temporibus similique quasi nesciunt cupiditate dolor quidem! At, modi doloribus? Totam necessitatibus tempora quidem perspiciatis, placeat odit aliquam labore dicta odio? Quos!</p>
                <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Temporibus similique quasi nesciunt cupiditate dolor quidem! At, modi doloribus? Totam necessitatibus tempora quidem perspiciatis, placeat odit aliquam labore dicta odio? Quos!</p>
            </div>
            </div>
        </div>
        <div>
            <p className="text-[40px] text-center sm:text-[50px] md:text-[60px] bg-gradient-to-t from-[#433D3A] via-[#C6C4C3] font-bold to-[#CAC8C6] bg-clip-text text-transparent p-6">
            The Problem
            </p>

            {/* Modal content */}
            <div className="flex   w-[100%] flex-row items-center justify-center space-x-[20px]">
            
            <div className="w-[50%] space-y-2 text-sm leading-relaxed">
                <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Temporibus similique quasi nesciunt cupiditate dolor quidem! At, modi doloribus? Totam necessitatibus tempora quidem perspiciatis, placeat odit aliquam labore dicta odio? Quos!</p>
                <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Temporibus similique quasi nesciunt cupiditate dolor quidem! At, modi doloribus? Totam necessitatibus tempora quidem perspiciatis, placeat odit aliquam labore dicta odio? Quos!</p>
                <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Temporibus similique quasi nesciunt cupiditate dolor quidem! At, modi doloribus? Totam necessitatibus tempora quidem perspiciatis, placeat odit aliquam labore dicta odio? Quos!</p>
                <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Temporibus similique quasi nesciunt cupiditate dolor quidem! At, modi doloribus? Totam necessitatibus tempora quidem perspiciatis, placeat odit aliquam labore dicta odio? Quos!</p>
            </div>
            <div className="bg-[#1D1D1D] ring-[1px] ring-gray-600 w-[50%] h-[350px] rounded-[10px] flex items-center justify-center" />
            </div>
        </div>
        <div>
            <p className="text-[40px] text-center sm:text-[50px] md:text-[60px] bg-gradient-to-t from-[#433D3A] via-[#C6C4C3] font-bold to-[#CAC8C6] bg-clip-text text-transparent p-6">
            Tech Stack
            </p>

            {/* Modal content */}
            <div className="flex   w-[100%] flex-row items-center justify-center space-x-[20px]">
            
            <div className="w-[100%] text-center space-y-2 text-sm leading-relaxed">
                <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Temporibus similique quasi nesciunt cupiditate dolor quidem! At, modi doloribus? Totam necessitatibus tempora quidem perspiciatis, placeat odit aliquam labore dicta odio? Quos!</p>
                <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Temporibus similique quasi nesciunt cupiditate dolor quidem! At, modi doloribus? Totam necessitatibus tempora quidem perspiciatis, placeat odit aliquam labore dicta odio? Quos!</p>
                <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Temporibus similique quasi nesciunt cupiditate dolor quidem! At, modi doloribus? Totam necessitatibus tempora quidem perspiciatis, placeat odit aliquam labore dicta odio? Quos!</p>
                <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Temporibus similique quasi nesciunt cupiditate dolor quidem! At, modi doloribus? Totam necessitatibus tempora quidem perspiciatis, placeat odit aliquam labore dicta odio? Quos!</p>
            </div>
            
            </div>
        </div>
        <div>
            <p className="text-[40px] text-center sm:text-[50px] md:text-[60px] bg-gradient-to-t from-[#433D3A] via-[#C6C4C3] font-bold to-[#CAC8C6] bg-clip-text text-transparent p-6">
            The Solution
            </p>

            {/* Modal content */}
            <div className="flex   w-[100%] flex-row items-center justify-center space-x-[20px]">
            <div className="bg-[#1D1D1D] ring-[1px] ring-gray-600 w-[50%] h-[350px] rounded-[10px] flex items-center justify-center" />
            <div className="w-[50%] space-y-2 text-sm leading-relaxed">
                <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Temporibus similique quasi nesciunt cupiditate dolor quidem! At, modi doloribus? Totam necessitatibus tempora quidem perspiciatis, placeat odit aliquam labore dicta odio? Quos!</p>
                <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Temporibus similique quasi nesciunt cupiditate dolor quidem! At, modi doloribus? Totam necessitatibus tempora quidem perspiciatis, placeat odit aliquam labore dicta odio? Quos!</p>
                <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Temporibus similique quasi nesciunt cupiditate dolor quidem! At, modi doloribus? Totam necessitatibus tempora quidem perspiciatis, placeat odit aliquam labore dicta odio? Quos!</p>
                <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Temporibus similique quasi nesciunt cupiditate dolor quidem! At, modi doloribus? Totam necessitatibus tempora quidem perspiciatis, placeat odit aliquam labore dicta odio? Quos!</p>
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
  );
};

export default PortfolioModel;
