'use client';

import React, { useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Certificate1 from '../certificates/UC-0aeb6d1d-dc7b-4ba6-aecf-2cc774b2c29c.jpg';
import Certificate2 from '../certificates/UC-108298ba-2018-4131-b86b-70e6279377e9.jpg';
import Certificate3 from '../certificates/UC-5b27ff0d-fe45-46a9-942c-485d0a13118b.jpg';
import Certificate4 from '../certificates/UC-60242198-5929-47a6-a6c5-718a6e7b121c.jpg';
import Certificate5 from '../certificates/UC-8ba28f0a-d7e2-48dd-882e-87b73fa64021.jpg';
import Certificate6 from '../certificates/UC-da378ead-b16d-407d-b199-9f50a88d90e1.jpg';
import Certificate7 from '../certificates/UC-deb577d6-b72a-4ca6-86fc-b901dd127754.jpg';
import Certificate8 from '../certificates/UC-f40d10df-c93e-4d1e-af98-b8802f58431d.jpg';
import Certificate9 from '../certificates/UC-6c12dce8-1750-4ff2-a4bc-a95f1992f3ea.jpg';
import Certificate10 from '../certificates/UC-435cb559-6d32-4c0b-82ba-92e1d49a7b51.jpg';
import Certificate11 from '../certificates/UC-5e929664-5636-40c0-bebe-9df2ad3a34af.jpg';
import Certificate12 from '../certificates/UC-be4b3936-41fd-41e6-b867-1e358158d79a.jpg';
import Certificate13 from '../certificates/UC-22248617-9b8b-477b-9eed-28815bc63a3e.jpg';

const certifications = [
    { cert: Certificate13, title: "Big Data Engineering Bootcamp with GCP, and Azure Cloud", platform: "Udemy", date: "Jul 23, 2025", instructors: "Krish Naik, Mayank Aggarwal" },
    { cert: Certificate12, title: "Complete Agentic AI Bootcamp with LangGraph and Langchain", platform: "Udemy", date: "Jun 26, 2025", instructors: "Krish Naik" },
    { cert: Certificate6, title: "Complete Generative AI Course With Langchain and Huggingface", platform: "Udemy", date: "Dec 07, 2024", instructors: "Krish Naik" },
    { cert: Certificate9, title: "Complete Data Science, Machine Learning, DL, NLP Bootcamp", platform: "Udemy", date: "May 24, 2025", instructors: "Krish Naik" },
    { cert: Certificate10, title: "Complete Computer Vision Bootcamp With PyTorch & Tensorflow", platform: "Udemy", date: "April 27, 2025", instructors: "Krish Naik, Monal Kumar, Sourangshu Pal" },
    { cert: Certificate8, title: "Complete AI & Machine Learning, Data Science Bootcamp", platform: "Udemy", date: "Feb 28, 2024", instructors: "Andrei Neagoie" },
    { cert: Certificate1, title: "The Complete Web Developer in 2023: Zero to Mastery", platform: "Udemy", date: "Nov 25, 2023", instructors: "Andrei Neagoie" },
    { cert: Certificate11, title: "Complete Web & Mobile Designer in 2023: UI/UX with Figma", platform: "Udemy", date: "Dec 31, 2023", instructors: "Andrei Neagoie, Daniel Schifano" },
    { cert: Certificate2, title: "The Complete Data Structures and Algorithms Course in Python", platform: "Udemy", date: "Jan 12, 2025", instructors: "Elshad Karimov" },
    { cert: Certificate3, title: "Learn Python & Ethical Hacking from Scratch", platform: "Udemy", date: "April 23, 2024", instructors: "Zaid Sabih" },
    { cert: Certificate4, title: "TensorFlow for Deep Learning Bootcamp", platform: "Udemy", date: "July 31, 2024", instructors: "Andrei Neagoie, Daniel Bourke" },
    { cert: Certificate5, title: "Complete NodeJS Developer (GraphQL, MongoDB & more)", platform: "Udemy", date: "March 07, 2025", instructors: "Andrei Neagoie, Adam Odziemkowski" },
    { cert: Certificate7, title: "React Native - The Practical Guide [2024]", platform: "Udemy", date: "June 12, 2024", instructors: "Maximilian Schwarzmuller" },
];

const Certification = () => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5, ease: "easeOut" as const }
        }
    };

    return (
        <section aria-labelledby="certifications-heading" className="bg-[#000000] min-h-[100vh] py-[80px] w-screen flex items-center justify-center">
            <div className="w-[80%] 2xl:w-[1200px] flex flex-col">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="leading-[60px] sm:leading-[70px] text-center"
                >
                    <h2 id="certifications-heading" className="text-[50px] sm:text-[65px] bg-gradient-to-t from-[#433D3A] via-[#C6C4C3] font-bold to-[#CAC8C6] bg-clip-text text-transparent">
                        My Certifications
                    </h2>
                </motion.div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    className="mt-[30px] grid grid-cols-1 place-items-center sm:grid-cols-2 lg:grid-cols-4 gap-[15px] items-center justify-center"
                >
                    {certifications.map((item, index) => (
                        <motion.div
                            key={index}
                            variants={cardVariants}
                            whileHover={{ scale: 1.03 }}
                            className="cursor-pointer relative group bg-[#1D1D1D] overflow-hidden w-[320px] ring-[0.5px] ring-[#4d4d4d] h-[230px] md:h-[210px] md:w-[100%] rounded-[10px] flex items-center justify-center"
                        >
                            <div className="absolute transition-transform duration-500 group-hover:translate-y-0 translate-y-[200%] flex flex-col items-center justify-center">
                                <Image
                                    alt={`${item.platform} Certificate - ${item.title}`}
                                    src={item.cert}
                                    className="h-[100%] w-[100%]"
                                />
                            </div>
                            <div className="transition-transform duration-500 group-hover:scale-0 flex flex-col px-[20px]">
                                <p>{item.title}</p>
                                <p className="text-[15px]">{item.platform}</p>
                                <p className="text-[14px] text-gray-400">Date: {item.date}</p>
                                <p className="text-[14px] text-gray-300">Instructors: {item.instructors}</p>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default Certification;