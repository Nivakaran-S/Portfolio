'use client'

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

// Tech stack icons - using CDN URLs for simplicity
const skills = [
    { name: 'React', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
    { name: 'Next.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg' },
    { name: 'TypeScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg' },
    { name: 'Python', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
    { name: 'Node.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
    { name: 'TensorFlow', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg' },
    { name: 'MongoDB', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg' },
    { name: 'PostgreSQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg' },
];

const SkillsGrid = () => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2,
            },
        },
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { duration: 0.5 },
        },
    };

    return (
        <section aria-labelledby="skills-heading" className="bg-[#0a0a0a] py-[60px] w-screen flex items-center justify-center">
            <div className="w-[90%] sm:w-[80%] 2xl:w-[1200px] flex flex-col items-center">
                <motion.h2
                    id="skills-heading"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-[30px] sm:text-[40px] font-bold bg-gradient-to-t from-[#B0B0B0] via-[#E0E0E0] to-[#FFFFFF] bg-clip-text text-transparent mb-[40px]"
                >
                    Tech Stack
                </motion.h2>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    className="grid grid-cols-4 sm:grid-cols-4 md:grid-cols-8 gap-[20px] sm:gap-[30px]"
                >
                    {skills.map((skill) => (
                        <motion.div
                            key={skill.name}
                            variants={itemVariants}
                            whileHover={{ scale: 1.1, y: -5 }}
                            className="flex flex-col items-center justify-center p-[15px] bg-[#101010] rounded-[12px] border border-[#2a2a2a] hover:border-[#4d4d4d] transition-colors cursor-default"
                        >
                            <Image
                                src={skill.icon}
                                alt={skill.name}
                                width={40}
                                height={40}
                                className="mb-[8px]"
                                unoptimized
                            />
                            <span className="text-[11px] sm:text-[12px] text-gray-400 text-center">{skill.name}</span>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default SkillsGrid;
