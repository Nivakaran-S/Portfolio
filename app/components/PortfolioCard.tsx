'use client';

import { useState } from "react";

interface PortfolioCardProps {
    text: string;
    text2: string;
    lang1: string;
    lang2: string;
    lang3: string;
    lang4: string;
    lang5: string;
    lang6: string;
    onClick: () => void;
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
    onClick 
}) => {

    return (
        <div>
            <div
                onClick={onClick} 
                className="bg-[#373435] hover:ring-[1.5px] hover:ring-gray-300 hover:scale-[105%] transition-transform duration-500 text-[15.27px] sm:h-[350px] ring-[1px] ring-[#373435] sm:w-[500px] cursor-pointer flex flex-col sm:flex-row sm:pl-[10px] rounded-[20px]"
            >
                <div className="sm:w-[38.2%] px-[10px] hidden sm:flex items-center justify-center">
                    <div className="flex flex-col">
                        <p>{lang1}</p>
                        <p>{lang2}</p>
                        <p>{lang3}</p>
                        <p>{lang4}</p>
                        <p>{lang5}</p>
                        <p>{lang6}</p>
                    </div>
                </div>

                <div className="rounded-[20px] py-[20px] sm:py-[0px] px-[8px] sm:w-[61.8%] flex flex-col items-center justify-center sm:bg-[#101010]">
                    <p className="py-[5px] text-[24px] leading-[29px] pl-[10px] pr-[7px]">{text}</p>
                    <p className="text-[14px] leading-[19px] px-[10px]">{text2}</p>

                    <div className="sm:w-[38.2%] px-[10px] flex sm:hidden items-center justify-center">
                        <div className="grid grid-cols-3 gap-[10px] pt-[15px] pb-[10px]">
                            <p>{lang1}</p>
                            <p>{lang2}</p>
                            <p>{lang3}</p>
                            <p>{lang4}</p>
                            <p>{lang5}</p>
                            <p>{lang6}</p>
                        </div>
                    </div>

                    <div className="flex flex-row items-center justify-center space-x-[10px] pt-[10px]">
                        <div className="bg-[#000] px-[20px] hover:ring-[0.5px] ring-gray-500 py-[8px] rounded-[20px]">
                            <p>Get code</p>
                        </div>
                        <div className="bg-[#000] px-[25px] py-[8px] hover:ring-[0.5px] ring-gray-500 rounded-[10px]">
                            <p>View Demo</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PortfolioCard;
