
import Image from "next/image";
import Nivakaran from '../images/nivakaranText.png';
import React from "react";
import StarBackground from "./StarBackground";
import { motion } from "framer-motion";

const Hero = () => {
    const onKnowClick = () => {
        const el = document.getElementById("about");
        if (el) {
            const y = el.getBoundingClientRect().top + window.scrollY;
            window.scrollTo({ top: y, behavior: "smooth" });
        }
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2, // Stagger effect for children
                delayChildren: 0.3,
            },
        },
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { duration: 0.8, ease: "easeOut" },
        },
    };

    const floatingVariant = {
        animate: {
            y: [0, -10, 0],
            transition: {
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
            },
        },
    };

    return (
        <header role="banner" className="w-[100vw] lg:bg-[url('./images/heroBackground10.png')] bg-contain bg-no-repeat bg-center h-[100vh] flex items-center justify-center relative overflow-hidden">
            <StarBackground />
            <motion.div
                className="flex pb-[30px] flex-col text-center z-10"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                <motion.p variants={itemVariants} className="text-[18px] sm:text-[20px] text-gray-300">
                    Hello there!
                </motion.p>
                <motion.p variants={itemVariants} className="text-[30px] sm:text-[40px] font-bold mt-[-5px]">
                    This is
                </motion.p>

                <motion.div variants={itemVariants} className="my-2 flex justify-center">
                    <motion.div variants={floatingVariant} animate="animate">
                        <Image
                            className="h-[60px] w-[300px] sm:w-[500px] sm:h-[100%] object-contain"
                            alt="Nivakaran Shanmugabavan - Full-Stack Developer & Data Scientist"
                            src={Nivakaran}
                            priority
                        />
                    </motion.div>

                </motion.div>

                <motion.h1 variants={itemVariants} className="text-[20px] sm:text-[28px] font-medium tracking-wide text-gray-200">
                    Full-Stack Developer & Data Scientist
                </motion.h1>

                <motion.div
                    variants={itemVariants}
                    className="flex flex-row items-center justify-center mt-8"
                >
                    <motion.div
                        onClick={() => onKnowClick()}
                        whileHover={{ scale: 1.05, boxShadow: "0px 0px 15px rgba(217, 205, 187, 0.5)" }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-[#1F120D] w-[200px] transition-colors duration-300 shadow-md ring-[1px] ring-[#D9CDBB] text-white hover:bg-[#5E3828] px-[25px] py-[10px] rounded-full cursor-pointer"
                    >
                        <div className="w-full text-center font-semibold">Know More</div>
                    </motion.div>
                </motion.div>
            </motion.div>
        </header>
    );
};

export default Hero;
