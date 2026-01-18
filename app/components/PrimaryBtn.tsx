
import React from "react";
import rightArrow from '../images/rightArrow.png';
import Image from "next/image";
import { motion } from "framer-motion";

interface PrimaryBtnProps {
    text: string;
    onClick: () => void;
}


const PrimaryBtn: React.FC<PrimaryBtnProps> = ({ text, onClick }) => {
    return (
        <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0px 0px 20px rgba(217, 205, 187, 0.3)" }}
            whileTap={{ scale: 0.98 }}
            className="bg-[#4b4b4d] hover:bg-[#5a5a5c] transition-colors duration-300 text-[15.27px] cursor-pointer w-fit flex flex-row items-center justify-between pl-[20px] rounded-full border-0"
            onClick={onClick}
            aria-label={text}
        >
            <span className="py-[8px] pr-[10px]">{text}</span>
            <div className="rounded-full px-[4px] flex items-center justify-center w-[35px] h-[35px] mr-[3px] bg-blue-500">
                <Image alt="" src={rightArrow} height={28} />
            </div>
        </motion.button>
    );
}

export default PrimaryBtn;