'use client';

import PortfolioCard from "./PortfolioCard";
import PrimaryBtn from "./PrimaryBtn";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { StaticImageData } from "next/image";
import Newspaper from '../images/news.jpeg';
import { Project } from "../portfolio/types";

interface PortfolioProps {
  onPortfolioCard1Click: (project: Project) => (e: React.MouseEvent<HTMLDivElement>) => void;
}

const Portfolio = ({ onPortfolioCard1Click }: PortfolioProps) => {
  const [portfolio, setPortfolio] = useState<Project[]>([]);
  const [categories, setCategories] = useState<{ _id: string; title: string }[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://portfolio-backend-new-2.vercel.app';

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const categoriesResponse = await axios.get<{ _id: string; title: string }[]>(`${API_BASE_URL}/projectCategory`, { withCredentials: true });
        setCategories(categoriesResponse.data);

        const portfolioResponse = await axios.get<Project[]>(`${API_BASE_URL}/projects`, { withCredentials: true });
        setPortfolio(portfolioResponse.data);
        console.log('Portfolio list:', portfolioResponse.data);
      } catch (error: any) {
        const errorMessage = error.response?.data?.message || 'Failed to load portfolio or categories.';
        setError(errorMessage);
        console.error("Error fetching portfolio data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      import('scrollreveal').then((ScrollReveal) => {
        const sr = ScrollReveal.default();
        categories.forEach((_, index) => {
          sr.reveal(`.portfolio${index + 1}`, {
            origin: 'bottom',
            distance: '20px',
            duration: 800,
            delay: 200 + index * 200,
            easing: 'ease-in-out',
            reset: false,
          });
        });
      });
    }
  }, [categories]);


  const normalizeTechStack = (techStack: string | string[] | null | undefined): string[] => {
    if (!techStack) return ['', '', '', '', '', ''];
    if (Array.isArray(techStack)) return [...techStack, ...Array(6 - techStack.length).fill('')];
    return [techStack, '', '', '', '', ''];
  };

  const isValidUrl = (url: string | null | undefined): url is string => {
    if (!url || typeof url !== 'string' || url.trim() === '') return false;
    try {
      new URL(url);
      return true;
    } catch {
      console.warn(`Invalid URL detected in Portfolio: ${url}`);
      return false;
    }
  };

  const onAllPortfolioClick = () => {
    router.push('/portfolio');
  };

  return (
    <div className="bg-[#000] min-h-[120vh] py-[50px] w-screen flex items-center justify-center">
      <div className="w-[80%] mt-[40px] flex flex-col">
        <div className="portfolio1 leading-[42px] md:leading-[65px] text-center">
                    <p className="text-[45px] md:text-[60px] bg-gradient-to-t from-[#433D3A] via-[#C6C4C3] font-bold to-[#CAC8C6] bg-clip-text text-transparent">Explore the</p>
                    <p className="text-[40px] sm:text-[50px] md:text-[60px] bg-gradient-to-t from-[#433D3A] via-[#C6C4C3] font-bold to-[#CAC8C6] bg-clip-text text-transparent">Development Journey</p>
                </div>

        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg flex items-center mt-6">
            <svg className="h-5 w-5 text-red-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l-1.293-1.293a1 1 0 00-1.414 1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
          </div>
        ) : categories.length === 0 ? (
          <p className="text-gray-500 italic text-center mt-6">No categories found.</p>
        ) : (
          categories.map((category, catIndex) => (
            <div key={category._id} className="mt-[40px]">
              <p className={`portfolio${catIndex + 2} mb-[20px] font-bold text-[33px] sm:text-[45px]`}>{category.title}</p>
              <div className={`portfolio${catIndex + 2} flex items-center justify-center`}>
                <div className="grid w-[95%] sm:w-[95%] md:w-[85%] grid-cols-1 md:grid-cols-2 gap-[20px] sm:gap-[30px]">
                  {portfolio
                    .filter(project => project.projectCategory === category._id)
                    .slice(0, 2)
                    .map((project) => {
                      const techs = normalizeTechStack(project.techStack);
                      return (
                        <PortfolioCard
                          key={project._id}
                          onClick={onPortfolioCard1Click(project)} // Closure returns correct function
                          lang1={techs[0] || ''}
                          lang2={techs[1] || ''}
                          lang3={techs[2] || ''}
                          lang4={techs[3] || ''}
                          lang5={techs[4] || ''}
                          lang6={techs[5] || ''}
                          text={project.title}
                          text2={project.projectOverview}
                          imageUrl={isValidUrl(project.images?.imageUrl1) ? project.images?.imageUrl1 : Newspaper}
                        />
                      );
                    })}
                </div>
              </div>
            </div>
          ))
        )}

        <div className="flex portfolio4 items-center justify-center mt-[40px]">
          <PrimaryBtn text="More Projects" onClick={onAllPortfolioClick} />
        </div>
      </div>
    </div>
  );
};

export default Portfolio;