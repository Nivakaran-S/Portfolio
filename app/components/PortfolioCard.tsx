'use client';

import Image from "next/image";
import { StaticImageData } from "next/image"; // Import StaticImageData
import Newspaper from '../images/news.jpeg'; // Fallback image (StaticImageData)

interface PortfolioCardProps<T extends Element = HTMLDivElement> {
  text: string;
  text2: string;
  lang1: string;
  lang2: string;
  lang3: string;
  lang4: string;
  lang5: string;
  lang6: string;
  githubLink: string;
  demoLink: string;
  imageUrl: string | StaticImageData; // Updated to allow StaticImageData
  onClick: (e: React.MouseEvent<HTMLDivElement>) => void;
}

const PortfolioCard: React.FC<PortfolioCardProps> = ({
  text,
  lang1,
  lang2,
  lang3,
  lang4,
  lang5,
  lang6,
  text2,
  githubLink,
  demoLink,
  imageUrl,
  onClick,
}) => {
  // Validate URL if imageUrl is a string
  const isValidUrl = (url: string | StaticImageData): url is string => {
    if (typeof url !== 'string' || url.trim() === '') return false;
    try {
      new URL(url);
      return true;
    } catch {
      console.warn(`Invalid URL detected in PortfolioCard: ${url}`);
      return false;
    }
  };

  // Use Newspaper as fallback if imageUrl is invalid
  const imageSrc = isValidUrl(imageUrl) ? imageUrl : Newspaper;

  const handleLinkClick = (e: React.MouseEvent<HTMLDivElement>, url: string) => {
    e.stopPropagation();
    if (isValidUrl(url)) {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div onClick={onClick} className="w-full max-w-[500px]">
      <div className="bg-[#373435] relative flex  hover:ring-[2px] hover:ring-gray-300 hover:scale-[105%] transition-transform duration-500 text-[15.27px] sm:h-[350px] ring-[1px] ring-[#808080] w-full max-w-[500px] cursor-pointer flex flex-col sm:flex-row rounded-[20px] overflow-hidden">
        {/* Image wrapper for proper scaling */}
        <div className="sm:w-[100%] w-[100%] flex justify-end  h-[400px] sm:h-full overflow-hidden">
          <Image
            src={imageSrc}
            alt="Project Image"
            className="w-[100%] h-full relative z-[10] object-cover transition-transform duration-500 hover:scale-110"
            width={500}
            height={350}
            placeholder="blur"
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGUrGwU6AAAAABJRU5ErkJggg=="
          />
          {/* Text content */}
          <div className=" ring-[#808080] rounded-[20px] ring-[1px]  absolute  z-[19] py-[10px] sm:py-[20px] sm:py-[0px] px-[8px] w-full mt-[80px] sm:mt-[0px] h-[320px] sm:w-[70%] sm:h-[350px] flex flex-col items-center pt-[30px] sm:pt-[0px] sm:justify-center bg-[#101010] sm:bg-[#1D1D1D]">
            <p className=" pb-[5px] sm:py-[5px] text-[30px] sm:text-[28px] text-[#ffff]  text-center leading-[35px] sm:leading-[32px] pl-[10px] pr-[7px]">{text}</p>
            <p className="text-[14px] leading-[19px] line-clamp-6 sm:line-clamp-9 sm:mb-[35px] px-[10px]">{text2}</p>

            <div className="sm:w-[38.2%] hidden sm:flex px-[10px] flex sm:hidden items-center justify-center">
              <div className="grid grid-cols-3 gap-[10px] pt-[15px] pb-[10px]">
                <p>{lang1}</p>
                <p>{lang2}</p>
                <p>{lang3}</p>
                <p>{lang4}</p>
                <p>{lang5}</p>
                <p>{lang6}</p>
              </div>
            </div>

            <div className="flex absolute  bottom-[25px] flex-row items-center justify-center space-x-[10px] pt-[10px]">
              <div
                onClick={(e) => handleLinkClick(e, githubLink)}
                className="bg-[#000] ring-[1px] ring-[#808080] hover:ring-black hover:bg-white hover:text-black flex flex-row items-center justify-center space-x-[5px] px-[20px] py-[8px] hover:ring-[0.5px] ring-gray-500 rounded-[20px] text-white"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
                <p>Get Code</p>
              </div>
              <div
                onClick={(e) => handleLinkClick(e, demoLink)}
                className="bg-[#000] ring-[1px] ring-[#808080] hover:ring-black hover:bg-white hover:text-black flex flex-row items-center justify-center space-x-[5px] px-[15px] py-[8px] hover:ring-[0.5px] ring-gray-500 rounded-[10px] text-white"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>

                <p>View Demo</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioCard;