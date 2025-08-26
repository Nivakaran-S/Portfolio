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
      ].map(url => (isValidUrl(url) ? url : placeholderImage))
    : [placeholderImage, placeholderImage, placeholderImage];

  // Process tech stack for logo display
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

  console.log(techStackItems)
  return (
    <div className="fixed flex custom-scrollbar flex-col overflow-y-auto h-[100vh] py-[2vh] sm:py-[5vh] inset-0 z-[50] items-center justify-start">
      {/* Backdrop */}
      <div
        onClick={() => {
          resetPortfolioClick();
        }}
        className={`absolute top-0 left-0 h-[340%] w-full bg-[#101010] transition-opacity duration-500 ease-in-out ${
          onPortfolioClick ? 'opacity-60' : 'opacity-0 pointer-events-none'
        }`}
      />

      {/* Modal Container */}
      <div
        ref={scrollRef}
        className={`custom-scrollbar bg-[#101010] ring-[1.5px] rounded-[5px] ring-[#373435] lg:rounded-[20px] md:rounded-[10px] text-white w-[95vw] 2xl:w-[1200px] sm:w-[85vw] z-20 transform transition-transform duration-500 ease-in-out ${
          onPortfolioClick
            ? 'scale-100 opacity-100'
            : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="relative  flex px-[25px] sm:px-[75px] w-full flex-col space-y-[20px] py-[30px] items-center justify-center">
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
          <div className="w-[100%] ">
            <div className="flex w-[100%]  flex-col sm:flex-row items-center justify-center pt-[50px] sm:space-x-[20px]">
              <div className="bg-[#1D1D1D] ring-[1px] ring-gray-600 w-[100%]  sm:w-[60%] h-[400px] sm:h-[580px] rounded-[10px] flex items-center justify-center relative">
                <Image
                  src={images[0]}
                  alt={project?.title || 'Project Image'}
                  className="w-full h-full object-cover transition-transform duration-500 rounded-[10px]"
                  width={500}
                  height={350}
                  placeholder="blur"
                  blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGUrGwU6AAAAABJRU5ErkJggg=="
                />
                <p className="text-[40px] text-white leading-[50px] sm:leading-[70px] absolute text-center sm:text-[50px] md:text-[70px] font-bold p-6">
                  {project?.title || 'Project Title'}
                </p>
                <div className='absolute space-x-[20px] flex flex-row bottom-[20%]'>
                  <div onClick={(e) => handleLinkClick(e, project?.githubLink)} className='bg-[#1D1D1D] hover:bg-[#101010] hover:ring-[1.5px] px-[20px] ring-[1px] ring-[#101010] rounded-[10px] cursor-pointer py-[8px]'>
                    <p>Github Link</p>
                  </div>
                  <div onClick={(e) => handleLinkClick(e, project?.demoLink)} className='bg-[#1D1D1D] px-[20px] ring-[1px] ring-[#101010] rounded-[10px] cursor-pointer py-[8px]'>
                    <p>Demo Link</p>
                  </div>
                </div>
              </div>
              <div className="w-[40%] hidden sm:flex flex-col h-full space-y-[20px]">
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
            { title: 'The Solution', content: project?.solution },
          ].map(({ title, content }, index) => (
            <div className='space-y-[10px]' key={title}>
              <p className="text-[45px] leading-[53px] mb-[20px] sm:leading-[auto] text-center sm:text-[50px] md:text-[60px] bg-gradient-to-t from-[#433D3A] via-[#C6C4C3] font-bold to-[#CAC8C6] bg-clip-text text-transparent  sm:p-6">
                {title} 
              </p>
              <div className="flex w-full flex-col sm:flex-row items-center justify-center sm:space-x-[20px]">
                {index % 2 === 0 && (
                  <div className="bg-[#1D1D1D] ring-[1px] ring-gray-600 sm:w-[50%] h-[350px] rounded-[10px] flex  items-center justify-center">
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
                <div className={`sm:w-[50%] my-[20px] sm:my-[0px] space-y-2 leading-relaxed text-white`}>
                  <p>{content || `No ${title.toLowerCase()} provided.`}</p>
                </div>
                {index % 2 !== 0 && (
                  <div className="bg-[#1D1D1D] ring-[1px] ring-gray-600 sm:w-[50%] h-[350px] rounded-[10px] flex items-center justify-center">
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
            <p className="text-[40px] text-center sm:text-[50px] md:text-[60px] bg-gradient-to-t from-[#433D3A] via-[#C6C4C3] font-bold to-[#CAC8C6] bg-clip-text text-transparent p-6">
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
