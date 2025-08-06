'use client';

import React, { useEffect, useRef } from 'react';
import './style.css';
import Image from 'next/image';
import placeholderImage from '../images/news.jpeg'; // Fallback image (StaticImport)
import { Project } from './types'; // Import shared Project type

// Fix: Make the interface match what's being passed from the parent
interface PortfolioModelProps {
  onPortfolioClick: boolean;        // REQUIRED (no ? mark)
  resetPortfolioClick: () => void;  // REQUIRED (no ? mark)
  setOnPortfolioClick: React.Dispatch<React.SetStateAction<boolean>>; // REQUIRED (no ? mark)
  project: Project | null;          // REQUIRED
}

const PortfolioModel: React.FC<PortfolioModelProps> = ({
  onPortfolioClick,
  resetPortfolioClick,
  setOnPortfolioClick,
  project,
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

  // Validate URL
  const isValidUrl = (url: string | undefined): url is string => {
    if (!url || typeof url !== 'string' || url.trim() === '') return false;
    try {
      new URL(url);
      return true;
    } catch {
      console.warn(`Invalid URL detected: ${url}`);
      return false;
    }
  };

  // Get available images with validation
  const images = project?.images
    ? [
        project.images.imageUrl1,
        project.images.imageUrl2,
        project.images.imageUrl3,
      ].map(url => (isValidUrl(url) ? url : placeholderImage)) // Use placeholderImage (StaticImport) for invalid URLs
    : [placeholderImage, placeholderImage, placeholderImage]; // Fallback for no images

  // Log images for debugging
  useEffect(() => {
    if (project?.images) {
      console.log('Project images:', {
        imageUrl1: project.images.imageUrl1,
        imageUrl2: project.images.imageUrl2,
        imageUrl3: project.images.imageUrl3,
      });
    }
  }, [project]);

  // Normalize techStack for display
  const techStackDisplay = typeof project?.techStack === 'string'
    ? project.techStack
    : Array.isArray(project?.techStack)
    ? project.techStack.join(', ')
    : 'No tech stack provided';

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
                  src={images[0]}
                  alt={project?.title || 'Project Image'}
                  className="w-full h-full object-cover transition-transform duration-500 rounded-[10px]"
                  width={500}
                  height={350}
                  placeholder="blur"
                  blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGUrGwU6AAAAABJRU5ErkJggg=="
                />
                <p className="text-[40px] text-[#101010] absolute text-center sm:text-[50px] md:text-[70px] font-bold p-6">
                  {project?.title || 'Project Title'}
                </p>
              </div>
              <div className="w-[40%] h-full space-y-[20px]">
                {[1, 2].map((i) => (
                  <div
                    key={i}
                    className="bg-[#1D1D1D] ring-[1px] ring-gray-600 w-full h-[280px] rounded-[10px] flex items-center justify-center"
                  >
                    <Image
                      src={images[i]}
                      alt={`Project Image ${i}`}
                      className="w-full h-full object-cover transition-transform duration-500 rounded-[10px]"
                      width={500}
                      height={350}
                      placeholder="blur"
                      blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGUrGwU6AAAAABJRU5ErkJggg=="
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sections */}
          {[
            { title: 'Project Overview', content: project?.projectOverview },
            { title: 'The Problem', content: project?.problem },
            { title: 'Tech Stack', content: techStackDisplay, textOnly: true },
            { title: 'The Solution', content: project?.solution },
          ].map(({ title, content, textOnly = false }, index) => (
            <div key={title}>
              <p className="text-[40px] text-center sm:text-[50px] md:text-[60px] bg-gradient-to-t from-[#433D3A] via-[#C6C4C3] font-bold to-[#CAC8C6] bg-clip-text text-transparent p-6">
                {title}
              </p>
              <div className="flex w-full flex-row items-center justify-center space-x-[20px]">
                {!textOnly && index % 2 === 0 && (
                  <div className="bg-[#1D1D1D] ring-[1px] ring-gray-600 w-[50%] h-[350px] rounded-[10px] flex items-center justify-center">
                    <Image
                      src={images[index + 1] || placeholderImage}
                      alt={`${title} Image`}
                      className="w-full h-full object-cover transition-transform duration-500 rounded-[10px]"
                      width={500}
                      height={350}
                      placeholder="blur"
                      blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGUrGwU6AAAAABJRU5ErkJggg=="
                    />
                  </div>
                )}
                <div className={`${textOnly ? 'w-full' : 'w-[50%]'} space-y-2 text-sm leading-relaxed text-white`}>
                  <p>{content || `No ${title.toLowerCase()} provided.`}</p>
                </div>
                {!textOnly && index % 2 !== 0 && (
                  <div className="bg-[#1D1D1D] ring-[1px] ring-gray-600 w-[50%] h-[350px] rounded-[10px] flex items-center justify-center">
                    <Image
                      src={images[index + 1] || placeholderImage}
                      alt={`${title} Image`}
                      className="w-full h-full object-cover transition-transform duration-500 rounded-[10px]"
                      width={500}
                      height={350}
                      placeholder="blur"
                      blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGUrGwU6AAAAABJRU5ErkJggg=="
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