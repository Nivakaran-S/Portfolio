'use client';

import Image from "next/image";
import NewsPaper from '../images/news.jpeg';

interface MiniProjectProps {
  title: string;
  description: string;
  imageUrl: string;
  githubUrl: string;
  demoUrl: string;
  category: string;
}

const MiniProject: React.FC<MiniProjectProps> = ({ title, description, imageUrl, githubUrl, demoUrl, category }) => {
  return (
    <div className="hover:scale-[108%] relative  transition-transform duration-500 w-[190px] sm:w-[220px] rounded-[15px] bg-black ring-[#808080] ring-[1px] cursor-pointer h-[320px]">
      <div className="flex items-center justify-center bg-[#373435] rounded-[15px] h-[100%]">
        <Image
          className="h-[100%]  w-[100%] rounded-[15px] object-cover"
          alt={title}
          src={imageUrl || NewsPaper}
          width={220}
          height={160}
          onError={(e) => { e.currentTarget.src = NewsPaper.src; }}
        />
        <div className="flex flex-col ring-[0.8px] ring-[#808080] absolute h-[250px] rounded-[10px] sm:rounded-[10px] bottom-0  bg-[#1D1D1D] w-[195px] sm:w-[220px] px-[10px] justify-between py-[10px]">
            <div className="h-[100%] w-[100%] ">
            <p className="leading-[23px]  text-[20px] pb-[3px] font-bold ">{title}</p>
            
            <p className="text-[12px] leading-[15.5px] line-clamp-6  mt-[2px]">{description}</p>
            </div>
            <div className="flex justify-between space-x-[13px] text-[10px] text-blue-400">
            <a href={githubUrl} target="_blank" rel="noopener noreferrer" className="hover:bg-black text-white ring-[#808080] ring-[0.5px] bg-[#101010] flex items-center justify-center text-[15px] w-[50%] rounded-[10px]">GitHub</a>
            <a href={demoUrl} target="_blank" rel="noopener noreferrer" className="hover:bg-black text-white ring-[#808080] ring-[0.5px] bg-[#101010] py-2 px-3 flex items-center justify-center text-[15px] w-[50%] rounded-[10px]">Demo</a>
            </div>
        </div>
      </div>
      
    </div>
  );
};

export default MiniProject;