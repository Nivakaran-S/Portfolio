'use client';

import React, { useEffect, useRef } from 'react';
import './style.css';
import News from '../images/news.jpeg';
import Image from 'next/image';

interface ScrollContainerProps {
  onPortfolioClick?: boolean;
  resetPortfolioClick?: () => void;
  setOnPortfolioClick?: (value: boolean) => void;
}

const PortfolioModel: React.FC<ScrollContainerProps> = ({
  onPortfolioClick = false,
  resetPortfolioClick = () => {},
  setOnPortfolioClick = () => {},
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

  // Scroll lock effect
  useEffect(() => {
    if (onPortfolioClick) {
      const scrollY = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';

      return () => {
        const y = document.body.style.top;
        document.body.style.position = '';
        document.body.style.top = '';
        window.scrollTo(0, parseInt(y || '0') * -1);
      };
    }
  }, [onPortfolioClick]);

  return (
    <div className="fixed flex custom-scrollbar flex-col overflow-y-auto h-[100vh] py-[5vh] inset-0 z-[50] items-center justify-start">
      {/* Backdrop */}
      <div
        onClick={() => {
          resetPortfolioClick();
        }}
        className={`absolute top-0 left-0 h-[380%] w-full bg-[#101010] transition-opacity duration-500 ease-in-out ${
          onPortfolioClick ? 'opacity-60' : 'opacity-0 pointer-events-none'
        }`}
      />

      {/* Modal Container */}
      <div
        ref={scrollRef}
        className={`custom-scrollbar bg-[#101010] ring-[1.5px] ring-[#373435] lg:rounded-[20px] md:rounded-[10px] text-white w-[85vw] z-20 transform transition-transform duration-500 ease-in-out ${
          onPortfolioClick
            ? 'scale-100 opacity-100'
            : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="relative flex px-[75px] w-full flex-col space-y-[20px] py-[30px] items-center justify-center">
          {/* Close Button */}
          <button
            className="cursor-pointer absolute right-0 top-0 pr-[40px] pt-[30px] text-[20px] font-semibold"
            onClick={() => {
              resetPortfolioClick();
            }}
            aria-label="Close modal"
          >
            Close
          </button>

          {/* Top Section */}
          <div className="w-full">
            <div className="flex w-full flex-row items-center justify-center pt-[50px] space-x-[20px]">
              <div className="bg-[#1D1D1D] ring-[1px] ring-gray-600 w-[60%] h-[580px] rounded-[10px] flex items-center justify-center relative">
                <Image
                  src={News}
                  alt="Project Image"
                  className="w-full h-full object-cover transition-transform duration-500 rounded-[10px]"
                  width={500}
                  height={350}
                />
                <p className="text-[40px] text-[#101010] absolute text-center sm:text-[50px] md:text-[70px] font-bold p-6">
                  News Web App
                </p>
              </div>
              <div className="w-[40%] h-full space-y-[20px]">
                {[1, 2].map((i) => (
                  <div
                    key={i}
                    className="bg-[#1D1D1D] ring-[1px] ring-gray-600 w-full h-[280px] rounded-[10px] flex items-center justify-center"
                  >
                    <Image
                      src={News}
                      alt="Project Image"
                      className="w-full h-full object-cover transition-transform duration-500 rounded-[10px]"
                      width={500}
                      height={350}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sections */}
          {[
            { title: 'Project Overview', imageLeft: true },
            { title: 'The Problem', imageLeft: false },
            { title: 'Tech Stack', imageLeft: false, textOnly: true },
            { title: 'The Solution', imageLeft: true }
          ].map(({ title, imageLeft, textOnly = false }) => (
            <div key={title}>
              <p className="text-[40px] text-center sm:text-[50px] md:text-[60px] bg-gradient-to-t from-[#433D3A] via-[#C6C4C3] font-bold to-[#CAC8C6] bg-clip-text text-transparent p-6">
                {title}
              </p>
              <div className="flex w-full flex-row items-center justify-center space-x-[20px]">
                {imageLeft && !textOnly && (
                  <div className="bg-[#1D1D1D] ring-[1px] ring-gray-600 w-[50%] h-[350px] rounded-[10px] flex items-center justify-center">
                    <Image
                      src={News}
                      alt="Project Image"
                      className="w-full h-full object-cover transition-transform duration-500 rounded-[10px]"
                      width={500}
                      height={350}
                    />
                  </div>
                )}
                <div className={`${textOnly ? 'w-full' : 'w-[50%]'} space-y-2 text-sm leading-relaxed text-white`}>
                  {[...Array(4)].map((_, idx) => (
                    <p key={idx}>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum praesentium
                      placeat labore, vitae voluptate tempora aspernatur dolorem voluptatum id
                      reprehenderit maxime expedita molestiae ea.
                    </p>
                  ))}
                </div>
                {!imageLeft && !textOnly && (
                  <div className="bg-[#1D1D1D] ring-[1px] ring-gray-600 w-[50%] h-[350px] rounded-[10px] flex items-center justify-center">
                    <Image
                      src={News}
                      alt="Project Image"
                      className="w-full h-full object-cover transition-transform duration-500 rounded-[10px]"
                      width={500}
                      height={350}
                    />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PortfolioModel;
