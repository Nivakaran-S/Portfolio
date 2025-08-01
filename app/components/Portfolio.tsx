'use client';

import PortfolioCard from "./PortfolioCard";
import PrimaryBtn from "./PrimaryBtn";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import PortfolioModel from "../portfolio/PortfolioModel";

// ✅ Fix: define props interface
interface PortfolioProps {
    onPortfolioCard1Click: (e: React.MouseEvent<HTMLDivElement>) => void;
}

const Portfolio = ({ onPortfolioCard1Click }: PortfolioProps) => {
    const [portfolio, setPortfolio] = React.useState([]);
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
                ScrollReveal.default().reveal('.portfolio1', {
                    origin: 'bottom',
                    distance: '20px',
                    duration: 800,
                    delay: 200,
                    easing: 'ease-in-out',
                    reset: false
                });
            });
        }
    }, []);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            import('scrollreveal').then((ScrollReveal) => {
                ScrollReveal.default().reveal('.portfolio2', {
                    origin: 'bottom',
                    distance: '20px',
                    duration: 800,
                    delay: 400,
                    easing: 'ease-in-out',
                    reset: false
                });
            });
        }
    }, []);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            import('scrollreveal').then((ScrollReveal) => {
                ScrollReveal.default().reveal('.portfolio3', {
                    origin: 'bottom',
                    distance: '20px',
                    duration: 800,
                    delay: 600,
                    easing: 'ease-in-out',
                    reset: false
                });
            });
        }
    }, []);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            import('scrollreveal').then((ScrollReveal) => {
                ScrollReveal.default().reveal('.portfolio4', {
                    origin: 'bottom',
                    distance: '20px',
                    duration: 800,
                    delay: 800,
                    easing: 'ease-in-out',
                    reset: false
                });
            });
        }
    }, []);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            import('scrollreveal').then((ScrollReveal) => {
                ScrollReveal.default().reveal('.portfolio5', {
                    origin: 'bottom',
                    distance: '20px',
                    duration: 800,
                    delay: 1000,
                    easing: 'ease-in-out',
                    reset: false
                });
            });
        }
    }, []);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            import('scrollreveal').then((ScrollReveal) => {
                ScrollReveal.default().reveal('.portfolio6', {
                    origin: 'bottom',
                    distance: '20px',
                    duration: 800,
                    delay: 1200,
                    easing: 'ease-in-out',
                    reset: false
                });
            });
        }
    }, []);

    const onMoreProjectsClick = () => {
        router.push('/portfolio');
    };

    return (
        <div className={`bg-[#000] py-[10vh] min-h-[200vh] z-[45] flex items-center justify-center w-screen ${onPortfolioClick ? 'fixed overflow-hidden' : ''}`}>
            <div className="w-[80%]">
                <div className="portfolio1 leading-[42px] md:leading-[60px] text-center">
                    <p className="text-[45px] md:text-[60px] bg-gradient-to-t from-[#433D3A] via-[#C6C4C3] font-bold to-[#CAC8C6] bg-clip-text text-transparent">Explore the</p>
                    <p className="text-[40px] sm:text-[50px] md:text-[60px] bg-gradient-to-t from-[#433D3A] via-[#C6C4C3] font-bold to-[#CAC8C6] bg-clip-text text-transparent">Development Journey</p>
                </div>

                <p className="mt-[30px] portfolio2 mb-[20px] blogs3 font-bold text-[33px] sm:text-[45px]">Software Engineering</p>
                <div className="portfolio3 mt-[30px] flex md:flex-row flex-col space-y-[40px] md:space-y-[0px] md:space-x-[20px] items-center justify-center">
                    <PortfolioCard onClick={onPortfolioCard1Click} lang1="Python" lang2="Next.js" lang3="Node.js" lang4="MongoDB" lang5="Express.js" lang6="Docker" text="News Web App" text2="This project is a full-stack news web application built using the MENN (MongoDB, Express.js, Next.js, Node.js) stack. It features a dual-interface system, where regular users can browse, search, and bookmark news, while admins have a dedicated panel to manage news articles, categories, and user permissions. The integrated LLM chatbot provides real-time news summaries, making articles easier to digest and enhance user experience." />
                    <PortfolioCard onClick={onPortfolioCard1Click} lang1="Python" lang2="MongoDB" lang3="Next.js" lang4="Node.js" lang5="Express.js" lang6="Docker" text="EcoHarvest" text2="This project is a sustainable food resale platform built with MongoDB, Express.js, React, and Node.js, designed to reduce food waste by connecting businesses with surplus food to budget-conscious consumers. The app includes real-time inventory tracking, dynamic pricing based on expiry dates, and secure payment processing via Stripe." />
                </div>

                <p className="mt-[40px] portfolio3 mb-[20px] blogs3 font-bold text-[33px] sm:text-[45px]">Data Science</p>
                <div className="portfolio3 mt-[30px] flex md:flex-row flex-col space-y-[40px] md:space-y-[0px] md:space-x-[20px] items-center justify-center">
                    <PortfolioCard onClick={onPortfolioCard1Click} lang1="Django" lang2="Matplotlib" lang3="Tensorflow" lang4="Pandas" lang5="" lang6="" text="Book / Movie Recommendation System" text2="This AI-powered hybrid recommendation system is designed to provide personalized book and movie suggestions by combining collaborative filtering and content-based filtering. Built with Flask and Python." />
                    <PortfolioCard onClick={onPortfolioCard1Click} lang1="FastAPI" lang2="Matplotlib" lang3="Tensorflow" lang4="Pandas" lang5="" lang6="" text="Stock Market Prediction" text2="This project focuses on predicting stock prices using historical data, applying deep learning and traditional ML models for high-accuracy forecasting." />
                </div>

                <p className="mt-[40px] portfolio3 mb-[20px] blogs3 font-bold text-[33px] sm:text-[45px]">Computer Vision</p>
                <div className="portfolio3 mt-[30px] flex md:flex-row flex-col space-y-[40px] md:space-y-[0px] md:space-x-[20px] items-center justify-center">
                    <PortfolioCard onClick={onPortfolioCard1Click} lang1="Django" lang2="Matplotlib" lang3="Tensorflow" lang4="Pandas" lang5="" lang6="" text="AI Sign Language Interpreter" text2="A real-time sign language translation tool using CNN-LSTM models, deployed via Flask, achieving 92% accuracy and improving accessibility for the hearing impaired." />
                    <PortfolioCard onClick={onPortfolioCard1Click} lang1="FastAPI" lang2="Matplotlib" lang3="Tensorflow" lang4="Pandas" lang5="" lang6="" text="Disease Diagnosis Assistant" text2="A hybrid AI system analyzing X-rays and EKGs to detect medical anomalies like pneumonia and arrhythmia, with Grad-CAM visualizations for interpretability." />
                </div>

                <div className="portfolio5 flex items-center justify-center mt-[30px]">
                    <PrimaryBtn text="More Projects" onClick={onMoreProjectsClick} />
                </div>
            </div>
        </div>
    );
};

export default Portfolio;
