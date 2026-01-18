'use client';

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Achievement1 from '../certificates/Achievement1.png';

const Achievements = () => {
  return (
    <section aria-labelledby="achievements-heading" className="bg-[#101010] min-h-[60vh] pt-[50px] pb-[70px] w-screen flex justify-center">
      <div className="w-[80%] 2xl:w-[1200px] mt-[40px] flex flex-col">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="leading-[49px] md:leading-[65px] text-center"
        >
          <h2 id="achievements-heading" className="text-[45px] md:text-[60px] bg-gradient-to-t from-[#433D3A] via-[#C6C4C3] font-bold to-[#CAC8C6] bg-clip-text text-transparent">
            Achievements
          </h2>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex items-center justify-center"
          >
            <motion.div
              whileHover={{ scale: 1.05, boxShadow: "0px 0px 20px rgba(217, 205, 187, 0.2)" }}
              className="cursor-pointer relative group bg-[#1D1D1D] overflow-hidden w-[250px] h-[350px] ring-[0.5px] ring-[#4d4d4d] mt-[30px] rounded-[10px] flex items-center justify-center"
            >
              <div className="absolute transition-transform duration-500 group-hover:translate-y-0 translate-y-[200%] flex flex-col items-center justify-center">
                <Image
                  alt="SLIIT Codefest Algothon 2024 Finalist Certificate"
                  src={Achievement1}
                  className="h-[100%] w-[100%]"
                />
              </div>
              <div className="transition-transform duration-500 group-hover:scale-0 flex flex-col px-[20px]">
                <p className="text-[25px] mb-[5px] leading-[30px]">SLIIT Codefest Algothon 2024</p>
                <p>Finalist</p>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Achievements;