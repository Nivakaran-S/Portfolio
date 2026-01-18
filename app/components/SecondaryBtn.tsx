import React from "react";
import { motion } from "framer-motion";

interface SecondaryBtnProps {
    text: string;
    onClick: () => void;
}

const SecondaryBtn: React.FC<SecondaryBtnProps> = ({ text, onClick }) => {
    return (
        <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0px 0px 15px rgba(255, 255, 255, 0.1)" }}
            whileTap={{ scale: 0.98 }}
            className="bg-[#4b4b4d] hover:bg-[#5a5a5c] transition-colors duration-300 text-[15.27px] cursor-pointer flex flex-row items-center px-[20px] py-[8px] rounded border-0"
            onClick={onClick}
            aria-label={text}
        >
            <span>{text}</span>
        </motion.button>
    );
}

export default SecondaryBtn;