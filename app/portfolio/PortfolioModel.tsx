'use client';

import React, { useEffect, useRef } from 'react';
import './style.css';
import Image from 'next/image';
import placeholderImage from '../images/news.jpeg';
import { Project } from './types';

// Tech stack logo mapping
const techStackLogos: Record<string, string> = {
  'python': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
  'pandas': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg',
  'node.js': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
  'nodejs': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
  'react': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
  'javascript': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
  'typescript': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg',
  'html': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg',
  'css': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg',
  'next.js': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg',
  'nextjs': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg',
  'django': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg',
  'flask': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg',
  'mongodb': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg',
  'postgresql': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg',
  'mysql': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg',
  'git': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg',
  'docker': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg',
  'aws': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original.svg',
  'azure': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg',
  'firebase': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg',
  'graphql': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/graphql/graphql-plain.svg',
  'redux': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg',
  'tailwind': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg',
  'tailwindcss': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg',
  'sass': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sass/sass-original.svg',
  'express': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg',
  'nestjs': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nestjs/nestjs-plain.svg',
  'java': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg',
  'c++': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg',
  'c#': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg',
  'kotlin': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kotlin/kotlin-original.svg',
  'swift': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/swift/swift-original.svg',
  'android': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/android/android-original.svg',
  'ios': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/apple/apple-original.svg',
  'linux': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg',
  'windows': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/windows8/windows8-original.svg',
};

interface PortfolioModelProps {
  onPortfolioClick: boolean;
  resetPortfolioClick: () => void;
  setOnPortfolioClick: React.Dispatch<React.SetStateAction<boolean>>;
  project: Project | null;
}

const PortfolioModel: React.FC<PortfolioModelProps> = ({
  onPortfolioClick,
  resetPortfolioClick,
  setOnPortfolioClick,
  project,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  // Scroll to top when modal opens
  useEffect(() => {
    if (onPortfolioClick && modalRef.current) {
      // Scroll the modal container to top
      modalRef.current.scrollTo(0, 0);
      
      // Also scroll window to top for good measure
      
    }
  }, [onPortfolioClick]);

  // Scroll lock effect
  useEffect(() => {
    if (onPortfolioClick) {
      // Store current scroll position
      const scrollY = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';

      return () => {
        // Restore scroll position when modal closes
        const scrollY = document.body.style.top;
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        window.scrollTo(0, parseInt(scrollY || '0') * -1);
      };
    }
  }, [onPortfolioClick]);

  // Validate URL (unchanged)
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

  // Get available images with validation (unchanged)
  const images = project?.images
    ? [
        project.images.imageUrl1,
        project.images.imageUrl2,
        project.images.imageUrl3,
      ].map(url => (isValidUrl(url) ? url : placeholderImage))
    : [placeholderImage, placeholderImage, placeholderImage];

  // Process tech stack for logo display (unchanged)
  const getTechStackLogos = () => {
    if (!project?.techStack) return [];
    
    let techItems: string[] = [];
    
    if (typeof project.techStack[0] === 'string') {
      techItems = project.techStack[0]
        .split(', ')
        .map(item => item.trim().toLowerCase())
        .filter(item => item.length > 0);
    } else if (Array.isArray(project.techStack)) {
      techItems = project.techStack
        .map(item => typeof item === 'string' ? item.trim().toLowerCase() : '')
        .filter(item => item.length > 0);
    }
    
    return techItems.map(tech => ({
      name: tech,
      logo: techStackLogos[tech] || null
    }));
  };

  const handleLinkClick = (e: React.MouseEvent<HTMLDivElement>, url: string | undefined) => {
    e.stopPropagation();
    if (url && isValidUrl(url)) {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  const techStackItems = getTechStackLogos();

  return (
    <div 
      ref={modalRef}
      className="fixed flex custom-scrollbar flex-col overflow-y-auto h-[100vh] sm:py-[2vh] sm:py-[5vh] inset-0 z-[50] items-center justify-start"
    >
      {/* Backdrop */}
      <div
        onClick={resetPortfolioClick}
        className={`fixed top-0 left-0 w-full h-screen bg-[#101010] transition-opacity duration-500 ease-in-out ${
          onPortfolioClick ? 'opacity-60' : 'opacity-0 pointer-events-none'
        }`}
      />

      {/* Modal Container */}
      <div
        className={`custom-scrollbar bg-[#101010] overflow-x-hidden sm:overflow-x-visible ring-[1.5px] sm:rounded-[30px] ring-[#373435] lg:rounded-[20px] md:rounded-[10px] text-white w-[100vw] 2xl:w-[1200px] sm:w-[85vw] z-20 transform transition-transform duration-500 ease-in-out ${
          onPortfolioClick
            ? 'scale-100 opacity-100'
            : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Rest of the modal content remains unchanged */}
        <div className="relative flex px-[25px] sm:px-[75px] w-full flex-col space-y-[20px] sm:space-y-[20px] py-[30px] items-center justify-center">
          {/* Close Button */}
          <button
          className="absolute cursor-pointer top-4 right-4 z-30 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm shadow-lg flex items-center justify-center hover:bg-white transition-colors duration-200"
          onClick={resetPortfolioClick}
          aria-label="Close modal"
        >
          <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

          {/* Top Section */}
          <div className="w-[100%] ">
            <div className="flex w-[100%] flex-col lg:flex-row items-center justify-center pt-[50px] lg:space-x-[20px]">
              <div className="sm:bg-[#1D1D1D]  sm:ring-[1px] ring-gray-600 w-[100%] lg:w-[60%] h-[400px] lg:h-[580px] md:h-[580px] rounded-[10px] flex items-center justify-center relative">
                <p className="text-[40px] text-[#FFFF] leading-[50px] lg:leading-[70px] md:leading-[70px] absolute text-center lg:text-[50px] md:text-[60px] font-bold px-[50px]">
                  {project?.title || 'Project Title'}
                </p>
                <div className='absolute  space-x-[20px] flex flex-row bottom-[10%]'>
                  <div onClick={(e) => handleLinkClick(e, project?.githubLink)} className='bg-[#000000] space-x-[6px] flex flex-row items-center justify-center hover:bg-[#ffff] hover:text-black hover:ring-black hover:ring-[0.5px] px-[20px] ring-[1px] ring-[#808080] hover:ring-gray-400 rounded-[10px] cursor-pointer py-[8px]'>
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                  <p>View Code</p>
                  </div>
                  <div onClick={(e) => handleLinkClick(e, project?.demoLink)} className='bg-[#000000] space-x-[4px] flex flex-row items-center justify-center hover:bg-[#ffff] hover:text-black hover:ring-black hover:ring-[0.5px] px-[20px] ring-[1px] ring-[#808080] hover:ring-gray-400 rounded-[10px] cursor-pointer py-[8px]'>
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  <p>Live Demo</p>
                  
                  </div>
                </div>
              </div>
              <div className="w-[40%] hidden lg:flex flex-col h-full space-y-[20px]">
                {[1, 2].map((i) => (
                  <div
                    key={i}
                    className="bg-[#1D1D1D] ring-[1px] ring-gray-600  sm:w-full h-[280px] rounded-[10px] flex items-center justify-center"
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
            { title: 'The Solution', content: project?.solution },
          ].map(({ title, content }, index) => (
            <div className='space-y-[10px] w-[100vw] px-[40px] py-[40px]  ring-[0.5px] ring-gray-500 sm:ring-[0px] sm:rounded-[0px] sm:py-[0px] sm:px-[0px] sm:w-[100%] sm:bg-[#101010] bg-[#1D1D1D]' key={title}>
              <p className="text-[45px] leading-[53px] mb-[20px] lg:leading-[auto] text-center lg:text-[50px] md:text-[60px] bg-gradient-to-t from-[#433D3A] via-[#C6C4C3] font-bold to-[#CAC8C6] bg-clip-text text-transparent lg:p-6">
                {title} 
              </p>
              <div className="flex w-full flex-col lg:flex-row items-center justify-center lg:space-x-[20px]">
                {index % 2 === 0 && (
                  <div className="bg-[#1D1D1D] ring-[1px] ring-gray-600 lg:w-[50%] h-[350px] rounded-[10px] flex items-center justify-center">
                    <Image
                      src={images[index] || placeholderImage}
                      alt={`${title} Image`}
                      className="w-full h-full object-cover transition-transform duration-500 rounded-[10px]"
                      width={500}
                      height={350}
                      placeholder="blur"
                      blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGUrGwU6AAAAABJRU5ErkJggg=="
                    />
                  </div>
                )}
                <div className={`lg:w-[50%] my-[20px] lg:my-[0px] space-y-2 leading-relaxed text-white`}>
                  <p>{content || `No ${title.toLowerCase()} provided.`}</p>
                </div>
                {index % 2 !== 0 && (
                  <div className="bg-[#1D1D1D] ring-[1px] ring-gray-600 lg:w-[50%] h-[350px] rounded-[10px] flex items-center justify-center">
                    <Image
                      src={images[index-1] || placeholderImage}
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

          {/* Tech Stack Section */}
          <div className="w-full">
            <p className="text-[40px] text-center lg:text-[50px] md:text-[60px] bg-gradient-to-t from-[#433D3A] via-[#C6C4C3] font-bold to-[#CAC8C6] bg-clip-text text-transparent p-6">
              Tech Stack
            </p>
            <div className="flex flex-wrap justify-center gap-6 p-6 w-full">
              {techStackItems.length > 0 ? (
                techStackItems.map((item, index) => (
                  <div key={index} className="flex flex-col items-center w-24">
                    <div className="w-20 h-20 bg-[#1D1D1D] ring-[1px] ring-gray-600 rounded-lg flex items-center justify-center p-2 hover:scale-110 transition-transform duration-200">
                      {item.logo ? (
                        <Image
                          src={item.logo}
                          alt={item.name}
                          width={64}
                          height={64}
                          className="object-contain w-full h-full"
                          unoptimized
                        />
                      ) : (
                        <span className="text-xs text-center text-white">{item.name}</span>
                      )}
                    </div>
                    <span className="mt-2 text-sm text-white capitalize text-center">
                      {item.name.replace('.js', '')}
                    </span>
                  </div>
                ))
              ) : (
                <p className="text-white">No tech stack provided</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioModel;