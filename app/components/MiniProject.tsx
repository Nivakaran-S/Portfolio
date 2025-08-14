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
    <div className="hover:scale-[108%] transition-transform duration-500 w-[190px] sm:w-[220px] rounded-[15px] bg-black ring-[#373435] ring-[1px] cursor-pointer h-[320px]">
      <div className="flex items-center justify-center bg-[#373435] rounded-[15px] h-[100%]">
        <Image
          className="h-[100%]  w-[100%] rounded-[15px] object-cover"
          alt={title}
          src={imageUrl || NewsPaper}
          width={220}
          height={160}
          onError={(e) => { e.currentTarget.src = NewsPaper.src; }}
        />
        <div className="flex flex-col absolute h-[230px] rounded-[10px] sm:rounded-[0px] bg-[#1D1D1D] w-[200px] sm:w-[220px] px-[10px] justify-between py-[10px]">
            <div className="h-[100%] w-[100%] ">
            <p className="leading-[23px]  text-[18px] ">{title}</p>
            
            <p className="text-[12px] leading-[15.5px] line-clamp-6 mt-[2px]">{description}</p>
            </div>
            <div className="flex justify-between space-x-[13px] text-[10px] text-blue-400">
            <a href={githubUrl} target="_blank" rel="noopener noreferrer" className="hover:bg-black bg-[#101010] flex items-center justify-center text-[15px] w-[50%] rounded-[10px]">GitHub</a>
            <a href={demoUrl} target="_blank" rel="noopener noreferrer" className="hover:bg-black bg-[#101010] py-2 px-3 flex items-center justify-center text-[15px] w-[50%] rounded-[10px]">Demo</a>
            </div>
        </div>
      </div>
      
    </div>
  );
};

export default MiniProject;