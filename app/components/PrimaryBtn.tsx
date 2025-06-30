
import React from "react";
import rightArrow from '../images/rightArrow.png';
import Image from "next/image";

interface PrimaryBtnProps {
    text: string;
    onClick: () => void;
}


const PrimaryBtn: React.FC<PrimaryBtnProps> = ({ text, onClick }) => {
    return (
        <div className="bg-[#4b4b4d] hover:scale-[108%] transition-transform duration-500 text-[15.27px] cursor-pointer w-fit flex flex-row items-center justify-between pl-[20px]  rounded-full" onClick={onClick}>
            <p className="py-[8px] pr-[10px]">{text}</p>
            <div className=" rounded-full px-[4px] flex items-center justify-center w-[35px] h-[35px] mr-[3px] bg-blue-500">
                <Image alt="" src={rightArrow} height={28}/>
            </div>
        </div>
    );
}

export default PrimaryBtn;