
'use client';

import PortfolioCard from "./PortfolioCard";
import PrimaryBtn from "./PrimaryBtn";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

// Define props interface
interface PortfolioProps {
    onPortfolioCard1Click: (e: React.MouseEvent<HTMLDivElement>) => void;
}

// Define project interface (based on assumed API response)
interface Project {
    _id: string;
    title: string;
    projectOverview: string;
    techStack: string | string[];
    images?: { imageUrl1?: string };
    projectCategory: string;
}

const Portfolio = ({ onPortfolioCard1Click }: PortfolioProps) => {
    const [portfolio, setPortfolio] = React.useState<Project[]>([]);
    const [onPortfolioClick, setOnPortfolioClick] = useState(false);
    const [scrollPosition, setScrollPosition] = useState(0);

    const router = useRouter();

    useEffect(() => {
        (async () => {
            try {
                const response = await axios.get('https://new-portfolio-backend-roan.vercel.app/project');
                setPortfolio(response.data);
                console.log('Portfolio list', response.data);
            } catch (error) {
                console.error("Error fetching portfolio data:", error);
            }
        })();
    }, []);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            import('scrollreveal').then((ScrollReveal) => {
                ScrollReveal.default().reveal('.portfolio1', { origin: 'bottom', distance: '20px', duration: 800, delay: 200, easing: 'ease-in-out', reset: false });
                ScrollReveal.default().reveal('.portfolio2', { origin: 'bottom', distance: '20px', duration: 800, delay: 400, easing: 'ease-in-out', reset: false });
                ScrollReveal.default().reveal('.portfolio3', { origin: 'bottom', distance: '20px', duration: 800, delay: 600, easing: 'ease-in-out', reset: false });
                ScrollReveal.default().reveal('.portfolio4', { origin: 'bottom', distance: '20px', duration: 800, delay: 800, easing: 'ease-in-out', reset: false });
                ScrollReveal.default().reveal('.portfolio5', { origin: 'bottom', distance: '20px', duration: 800, delay: 1000, easing: 'ease-in-out', reset: false });
                ScrollReveal.default().reveal('.portfolio6', { origin: 'bottom', distance: '20px', duration: 800, delay: 1200, easing: 'ease-in-out', reset: false });
            });
        }
    }, []);

    const onMoreProjectsClick = () => {
        router.push('/portfolio');
    };

    // Normalize tech stack to ensure 6 items
    const normalizeTechStack = (techStack: Project['techStack']): string[] => {
        if (typeof techStack === 'string') {
            return techStack.split(', ').filter(Boolean).slice(0, 6).concat(Array(6).fill('')).slice(0, 6);
        } else if (Array.isArray(techStack)) {
            return techStack.slice(0, 6).concat(Array(6).fill('')).slice(0, 6);
        }
        return ['', '', '', '', '', ''];
    };

    // Validate URL
    const isValidUrl = (url: string | undefined | null): url is string => {
        if (!url || typeof url !== 'string' || url.trim() === '') return false;
        try {
            new URL(url);
            return true;
        } catch {
            console.warn(`Invalid URL detected in Portfolio: ${url}`);
            return false;
        }
    };

    // Define categories
    const categories = ['Software Engineering', 'Data Science', 'Computer Vision'];

    return (
        <div className={`bg-[#000] py-[10vh] min-h-[200vh] z-[45] flex items-center justify-center w-screen ${onPortfolioClick ? 'fixed overflow-hidden' : ''}`}>
            <div className="w-[80%]">
                <div className="portfolio1 leading-[42px] md:leading-[60px] text-center">
                    <p className="text-[45px] md:text-[60px] bg-gradient-to-t from-[#433D3A] via-[#C6C4C3] font-bold to-[#CAC8C6] bg-clip-text text-transparent">Explore the</p>
                    <p className="text-[40px] sm:text-[50px] md:text-[60px] bg-gradient-to-t from-[#433D3A] via-[#C6C4C3] font-bold to-[#CAC8C6] bg-clip-text text-transparent">Development Journey</p>
                </div>

                {/* Software Engineering Section */}
                <p className="mt-[30px] portfolio2 mb-[20px] blogs3 font-bold text-[33px] sm:text-[45px]">Software Engineering</p>
                <div className="portfolio3 mt-[30px] flex md:flex-row flex-col space-y-[40px] md:space-y-[0px] md:space-x-[20px] items-center justify-center">
                    {portfolio
                        .filter(project => project.projectCategory === 'Software Engineering' || getCategoryTitle(project.projectCategory) === 'Software Engineering')
                        .slice(0, 2)
                        .map((project) => {
                            const techs = normalizeTechStack(project.techStack);
                            return (
                                <PortfolioCard
                                    key={project._id}
                                    onClick={onPortfolioCard1Click}
                                    lang1={techs[0]}
                                    lang2={techs[1]}
                                    lang3={techs[2]}
                                    lang4={techs[3]}
                                    lang5={techs[4]}
                                    lang6={techs[5]}
                                    text={project.title}
                                    text2={project.projectOverview}
                                    imageUrl={isValidUrl(project.images?.imageUrl1) ? project.images?.imageUrl1 : '/news.jpeg'}
                                />
                            );
                        })}
                </div>

                {/* Data Science Section */}
                <p className="mt-[40px] portfolio3 mb-[20px] blogs3 font-bold text-[33px] sm:text-[45px]">Data Science</p>
                <div className="portfolio3 mt-[30px] flex md:flex-row flex-col space-y-[40px] md:space-y-[0px] md:space-x-[20px] items-center justify-center">
                    {portfolio
                        .filter(project => project.projectCategory === 'Data Science' || getCategoryTitle(project.projectCategory) === 'Data Science')
                        .slice(0, 2)
                        .map((project) => {
                            const techs = normalizeTechStack(project.techStack);
                            return (
                                <PortfolioCard
                                    key={project._id}
                                    onClick={onPortfolioCard1Click}
                                    lang1={techs[0]}
                                    lang2={techs[1]}
                                    lang3={techs[2]}
                                    lang4={techs[3]}
                                    lang5={techs[4]}
                                    lang6={techs[5]}
                                    text={project.title}
                                    text2={project.projectOverview}
                                    imageUrl={isValidUrl(project.images?.imageUrl1) ? project.images?.imageUrl1 : '/news.jpeg'}
                                />
                            );
                        })}
                </div>

                {/* Computer Vision Section */}
                <p className="mt-[40px] portfolio3 mb-[20px] blogs3 font-bold text-[33px] sm:text-[45px]">Computer Vision</p>
                <div className="portfolio3 mt-[30px] flex md:flex-row flex-col space-y-[40px] md:space-y-[0px] md:space-x-[20px] items-center justify-center">
                    {portfolio
                        .filter(project => project.projectCategory === 'Computer Vision' || getCategoryTitle(project.projectCategory) === 'Computer Vision')
                        .slice(0, 2)
                        .map((project) => {
                            const techs = normalizeTechStack(project.techStack);
                            return (
                                <PortfolioCard
                                    key={project._id}
                                    onClick={onPortfolioCard1Click}
                                    lang1={techs[0]}
                                    lang2={techs[1]}
                                    lang3={techs[2]}
                                    lang4={techs[3]}
                                    lang5={techs[4]}
                                    lang6={techs[5]}
                                    text={project.title}
                                    text2={project.projectOverview}
                                    imageUrl={isValidUrl(project.images?.imageUrl1) ? project.images?.imageUrl1 : '/news.jpeg'}
                                />
                            );
                        })}
                </div>

                <div className="portfolio5 flex items-center justify-center mt-[30px]">
                    <PrimaryBtn text="More Projects" onClick={onMoreProjectsClick} />
                </div>
            </div>
        </div>
    );
};

// Helper to map category IDs to titles (adjust based on API response)
const getCategoryTitle = (categoryId: string): string => {
    const categoryMap: { [key: string]: string } = {
        // Example mapping; update based on actual API category IDs
        'category_id_1': 'Software Engineering',
        'category_id_2': 'Data Science',
        'category_id_3': 'Computer Vision',
    };
    return categoryMap[categoryId] || categoryId;
};

export default Portfolio;
