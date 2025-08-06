'use client';

import Navigation from "../components/Navigation";
import { useState, useEffect } from "react";
import Footer from "../components/Footer";
import ContactModel from "../components/ContactModel";
import Contact from "../components/Contact";
import PortfolioCard from "../components/PortfolioCard";
import Top from "../components/Top";
import StarBackground from "../components/StarBackground";
import MiniProjectCard from "../components/MiniProject";
import PortfolioModel from "./PortfolioModel";
import axios from 'axios';
import { Project, ProjectCategory, MiniProject } from './types';
import Newspaper from '../images/news.jpeg';

// Define ScrollContainerProps for PortfolioModel
interface ScrollContainerProps {
  resetPortfolioClick: () => void;
  onPortfolioClick: boolean;
  setOnPortfolioClick: React.Dispatch<React.SetStateAction<boolean>>;
  project: Project | null;
}

const Portfolio = () => {
  const [showContactModel, setShowContactModel] = useState(false);
  const [navSelection, setNavSelection] = useState('Portfolio');
  const [showMessageSuccess, setShowMessageSuccess] = useState(false);
  const [onPortfolioClick, setOnPortfolioClick] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [projects, setProjects] = useState<Project[]>([]);
  const [allProjects, setAllProjects] = useState<Project[]>([]);
  const [miniProjects, setMiniProjects] = useState<MiniProject[]>([]);
  const [projectCategories, setProjectCategories] = useState<ProjectCategory[]>([]);
  const [miniProjectCategories, setMiniProjectCategories] = useState<ProjectCategory[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://portfolio-backend-new-2.vercel.app';

  const onMessageSuccess = () => {
    setShowMessageSuccess(true);
    setTimeout(() => {
      setShowMessageSuccess(false);
    }, 3000);
  };

  // Fetch categories, projects, and mini projects
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError('');

        // Fetch project categories
        const categoriesResponse = await axios.get<ProjectCategory[]>(`${API_BASE_URL}/projectCategory`, { withCredentials: true });
        setProjectCategories(categoriesResponse.data);
        console.log('Project Categories:', categoriesResponse.data);

        // Fetch mini project categories
        const miniCategoriesResponse = await axios.get<ProjectCategory[]>(`${API_BASE_URL}/miniProjectCategory`, { withCredentials: true });
        setMiniProjectCategories(miniCategoriesResponse.data);
        console.log('Mini Project Categories:', miniCategoriesResponse.data);

        // Fetch projects
        const projectsResponse = await axios.get<Project[]>(`${API_BASE_URL}/projects`, { withCredentials: true });
        setProjects(projectsResponse.data);
        setAllProjects(projectsResponse.data);
        console.log('Projects:', projectsResponse.data);

        // Fetch mini projects and normalize demoURL to demoUrl
        const miniProjectsResponse = await axios.get<any[]>(`${API_BASE_URL}/miniProjects`, { withCredentials: true });
        const normalizedMiniProjects: MiniProject[] = miniProjectsResponse.data.map(project => ({
          ...project,
          demoUrl: project.demoURL || project.demoUrl || '',
        }));
        setMiniProjects(normalizedMiniProjects);
        console.log('Mini Projects:', normalizedMiniProjects);
      } catch (error: any) {
        setError(error.response?.data?.message || 'Failed to load projects, mini projects, or categories.');
        console.error('Fetch error:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // ScrollReveal effects
  useEffect(() => {
    if (typeof window !== 'undefined') {
      import('scrollreveal').then((ScrollReveal) => {
        ScrollReveal.default().reveal('.portfolioTitle1', { origin: 'left', distance: '40px', duration: 800, delay: 400, easing: 'ease-in-out', reset: false });
        ScrollReveal.default().reveal('.portfolioTitle2', { origin: 'bottom', distance: '40px', duration: 800, delay: 600, easing: 'ease-in-out', reset: false });
        ScrollReveal.default().reveal('.portfolioTitle3', { origin: 'bottom', distance: '40px', duration: 800, delay: 800, easing: 'ease-in-out', reset: false });
        ScrollReveal.default().reveal('.portfolio1', { origin: 'bottom', distance: '20px', duration: 800, delay: 200, easing: 'ease-in-out', reset: false });
        ScrollReveal.default().reveal('.portfolio2', { origin: 'bottom', distance: '20px', duration: 800, delay: 400, easing: 'ease-in-out', reset: false });
        ScrollReveal.default().reveal('.portfolio3', { origin: 'bottom', distance: '20px', duration: 800, delay: 600, easing: 'ease-in-out', reset: false });
        ScrollReveal.default().reveal('.portfolio4', { origin: 'bottom', distance: '20px', duration: 800, delay: 800, easing: 'ease-in-out', reset: false });
        ScrollReveal.default().reveal('.portfolio5', { origin: 'bottom', distance: '20px', duration: 800, delay: 1000, easing: 'ease-in-out', reset: false });
        ScrollReveal.default().reveal('.portfolio6', { origin: 'bottom', distance: '20px', duration: 800, delay: 1200, easing: 'ease-in-out', reset: false });
        ScrollReveal.default().reveal('.aboutTitle1', { origin: 'bottom', distance: '40px', duration: 800, delay: 400, easing: 'ease-in-out', reset: false });
        ScrollReveal.default().reveal('.aboutTitle2', { origin: 'bottom', distance: '40px', duration: 800, delay: 600, easing: 'ease-in-out', reset: false });
        ScrollReveal.default().reveal('.aboutTitle3', { origin: 'bottom', distance: '40px', duration: 800, delay: 800, easing: 'ease-in-out', reset: false });
        ScrollReveal.default().reveal('.aboutText4', { origin: 'left', distance: '40px', duration: 800, delay: 400, easing: 'ease-in-out', reset: false });
        ScrollReveal.default().reveal('.aboutText5', { origin: 'right', distance: '40px', duration: 800, delay: 400, easing: 'ease-in-out', reset: false });
      });
    }
  }, []);

  const onContactClick = () => {
    setShowContactModel(!showContactModel);
  };

  const onPortfolioCardClick = (project: Project) => (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setScrollPosition(window.scrollY);
    setSelectedProject(project);
    setOnPortfolioClick(true);
    document.body.style.position = 'fixed';
    document.body.style.top = `-${window.scrollY}px`;
  };

  const resetPortfolioClick = () => {
    if (typeof window !== 'undefined') {
      setOnPortfolioClick(false);
      setSelectedProject(null);
      document.body.style.position = '';
      document.body.style.top = '';
      window.scrollTo(0, scrollPosition);
    }
  };

  const getCategoryTitle = (categoryId: string): string => {
    const category = projectCategories.find(c => c._id === categoryId) || miniProjectCategories.find(c => c._id === categoryId);
    return category ? category.title : 'Unknown Category';
  };

  const normalizeTechStack = (techStack: Project['techStack']): string[] => {
    if (typeof techStack === 'string') {
      return techStack.split(', ').filter(Boolean).slice(0, 6);
    } else if (Array.isArray(techStack)) {
      return techStack.slice(0, 6);
    }
    return ['', '', '', '', '', ''];
  };

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

  return (
    <div className={`flex text-white w-[100vw] overflow-x-hidden flex-col ${onPortfolioClick ? 'fixed overflow-hidden' : ''}`}>
      <Navigation navSelection={navSelection} onContactClick={onContactClick} />
      <ContactModel onMessageSuccess={onMessageSuccess} showContactModel={showContactModel} onContactClick={onContactClick} />
      <div>
        <StarBackground />
        <div className="text-white bg-contain bg-no-repeat bg-center sm:space-y-[30px] px-[10vw] flex flex-col items-center justify-center sm:pt-[20vh] min-h-[100vh]">
          <div className="w-[100vw] text-center leading-[71px] sm:leading-[90px] h-[100%]">
            <p className="text-[40px] sm:text-[50px] md:text-[60px] aboutText4 aboutTitle1 bg-gradient-to-t from-[#433D3A] via-[#C6C4C3] to-[#CAC8C6] bg-clip-text text-transparent">Explore</p>
            <p className="text-[65px] sm:text-[75px] md:text-[80px] aboutTitle2 bg-gradient-to-t from-[#433D3A] via-[#C6C4C3] font-[600] to-[#CAC8C6] bg-clip-text text-transparent">My Projects</p>
          </div>
          <div className="w-[100%] md:w-[50%] text-center h-[10px] sm:h-[160px]"></div>
          <div className="w-[100%] md:w-[60%] text-center">
            <p className="aboutTitle3">Welcome to a showcase of my work, a curated collection of projects that reflect my passion for building smart, user-focused, and scalable digital solutions.</p>
          </div>
        </div>
      </div>
      <div className="bg-[#101010] py-[15vh] min-h-[200vh] flex items-center justify-center w-screen">
        <div className="w-[93%] sm:w-[80%]">
          <div className="portfolio1 leading-[40px] md:leading-[60px] text-center">
            <p className="text-[45px] md:text-[60px] bg-gradient-to-t from-[#433D3A] via-[#C6C4C3] font-bold to-[#CAC8C6] bg-clip-text text-transparent">Explore the</p>
            <p className="text-[35px] sm:text-[50px] md:text-[60px] bg-gradient-to-t from-[#433D3A] via-[#C6C4C3] font-bold to-[#CAC8C6] bg-clip-text text-transparent">Development Journey</p>
          </div>
          <p className="mt-[30px]">Please click on any project to explore a detailed overview.</p>
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
          ) : projects.length === 0 && miniProjects.length === 0 ? (
            <p className="text-gray-500 italic text-center mt-6">No projects or mini projects found.</p>
          ) : (
            <>
              {/* Software Engineering Section */}
              <div className="mt-[30px] flex flex-col items-center w-[80vw]">
                <p className="portfolio2 w-[70vw] ml-[10px] font-bold text-[35px] sm:text-[45px]">Software Engineering</p>
                {/* Main Projects */}
                <div className="portfolio2 grid gap-[20px] grid-cols-2 place-items-center mt-[30px] md:flex md:flex-row md:space-y-[0px] md:space-x-[20px] items-center justify-center">
                  {projects
                    .filter(project => getCategoryTitle(project.projectCategory) === 'Software Engineering')
                    .slice(0, 2)
                    .map((project) => {
                      const techs = normalizeTechStack(project.techStack);
                      return (
                        <PortfolioCard
                          key={project._id}
                          onClick={onPortfolioCardClick(project)}
                          lang1={techs[0] || ''}
                          lang2={techs[1] || ''}
                          lang3={techs[2] || ''}
                          lang4={techs[3] || ''}
                          lang5={techs[4] || ''}
                          lang6={techs[5] || ''}
                          text={project.title}
                          text2={project.projectOverview}
                          imageUrl={isValidUrl(project.images?.imageUrl1) ? project.images?.imageUrl1 : Newspaper.src}
                        />
                      );
                    })}
                </div>
                {/* Mini Projects */}
                <p className="portfolio2 mt-[30px] text-[33px] text-center md:text-[30px]">Mini Projects</p>
                <div className="portfolio2 mt-[30px] grid grid-cols-2 gap-[10px] sm:grid-cols-4 md:grid-cols-4 lg:flex lg:flex-row lg:space-x-[20px] items-center justify-center">
                  {miniProjects
                    .filter(miniProject => getCategoryTitle(miniProject.miniProjectCategory) === 'Software Engineering')
                    .slice(0, 4)
                    .map((miniProject) => (
                      <MiniProjectCard
                        key={miniProject._id}
                        title={miniProject.title || 'Untitled'}
                        description={miniProject.description || 'No description available'}
                        imageUrl={isValidUrl(miniProject.imageUrl) ? miniProject.imageUrl : Newspaper.src}
                        githubUrl={isValidUrl(miniProject.githubUrl) ? miniProject.githubUrl : '#'}
                        demoUrl={isValidUrl(miniProject.demoUrl) ? miniProject.demoUrl : '#'}
                        category={getCategoryTitle(miniProject.miniProjectCategory)}
                      />
                    ))}
                </div>
              </div>

              {/* Data Science Section */}
              <div className="mt-[30px] flex flex-col items-center w-[80vw]">
                <p className="portfolio3 w-[70vw] ml-[10px] font-bold text-[35px] sm:text-[45px]">Data Science</p>
                {/* Main Projects */}
                <div className="portfolio3 grid gap-[20px] grid-cols-2 place-items-center mt-[30px] md:flex md:flex-row md:space-y-[0px] md:space-x-[20px] items-center justify-center">
                  {projects
                    .filter(project => getCategoryTitle(project.projectCategory) === 'Data Science')
                    .slice(0, 2)
                    .map((project) => {
                      const techs = normalizeTechStack(project.techStack);
                      return (
                        <PortfolioCard
                          key={project._id}
                          onClick={onPortfolioCardClick(project)}
                          lang1={techs[0] || ''}
                          lang2={techs[1] || ''}
                          lang3={techs[2] || ''}
                          lang4={techs[3] || ''}
                          lang5={techs[4] || ''}
                          lang6={techs[5] || ''}
                          text={project.title}
                          text2={project.projectOverview}
                          imageUrl={isValidUrl(project.images?.imageUrl1) ? project.images?.imageUrl1 : Newspaper.src}
                        />
                      );
                    })}
                </div>
                {/* Mini Projects */}
                <p className="portfolio3 mt-[30px] text-[33px] text-center md:text-[30px]">Mini Projects</p>
                <div className="portfolio3 mt-[30px] grid grid-cols-2 gap-[10px] sm:grid-cols-4 md:grid-cols-4 lg:flex lg:flex-row lg:space-x-[20px] items-center justify-center">
                  {miniProjects
                    .filter(miniProject => getCategoryTitle(miniProject.miniProjectCategory) === 'Data Science')
                    .slice(0, 4)
                    .map((miniProject) => (
                      <MiniProjectCard
                        key={miniProject._id}
                        title={miniProject.title || 'Untitled'}
                        description={miniProject.description || 'No description available'}
                        imageUrl={isValidUrl(miniProject.imageUrl) ? miniProject.imageUrl : Newspaper.src}
                        githubUrl={isValidUrl(miniProject.githubUrl) ? miniProject.githubUrl : '#'}
                        demoUrl={isValidUrl(miniProject.demoUrl) ? miniProject.demoUrl : '#'}
                        category={getCategoryTitle(miniProject.miniProjectCategory)}
                      />
                    ))}
                </div>
              </div>

              {/* Computer Vision Section */}
              <div className="mt-[30px] flex flex-col items-center w-[80vw]">
                <p className="portfolio4 w-[70vw] ml-[10px] font-bold text-[35px] sm:text-[45px]">Computer Vision</p>
                {/* Main Projects */}
                <div className="portfolio4 grid gap-[20px] grid-cols-2 place-items-center mt-[30px] md:flex md:flex-row md:space-y-[0px] md:space-x-[20px] items-center justify-center">
                  {projects
                    .filter(project => getCategoryTitle(project.projectCategory) === 'Computer Vision')
                    .slice(0, 2)
                    .map((project) => {
                      const techs = normalizeTechStack(project.techStack);
                      return (
                        <PortfolioCard
                          key={project._id}
                          onClick={onPortfolioCardClick(project)}
                          lang1={techs[0] || ''}
                          lang2={techs[1] || ''}
                          lang3={techs[2] || ''}
                          lang4={techs[3] || ''}
                          lang5={techs[4] || ''}
                          lang6={techs[5] || ''}
                          text={project.title}
                          text2={project.projectOverview}
                          imageUrl={isValidUrl(project.images?.imageUrl1) ? project.images?.imageUrl1 : Newspaper.src}
                        />
                      );
                    })}
                </div>
                {/* Mini Projects */}
                <p className="portfolio4 mt-[30px] text-[33px] text-center md:text-[30px]">Mini Projects</p>
                <div className="portfolio4 mt-[30px] grid grid-cols-2 gap-[10px] sm:grid-cols-4 md:grid-cols-4 lg:flex lg:flex-row lg:space-x-[20px] items-center justify-center">
                  {miniProjects
                    .filter(miniProject => getCategoryTitle(miniProject.miniProjectCategory) === 'Computer Vision')
                    .slice(0, 4)
                    .map((miniProject) => (
                      <MiniProjectCard
                        key={miniProject._id}
                        title={miniProject.title || 'Untitled'}
                        description={miniProject.description || 'No description available'}
                        imageUrl={isValidUrl(miniProject.imageUrl) ? miniProject.imageUrl : Newspaper.src}
                        githubUrl={isValidUrl(miniProject.githubUrl) ? miniProject.githubUrl : '#'}
                        demoUrl={isValidUrl(miniProject.demoUrl) ? miniProject.demoUrl : '#'}
                        category={getCategoryTitle(miniProject.miniProjectCategory)}
                      />
                    ))}
                </div>
              </div>

              {/* Generative AI Section */}
              <div className="mt-[30px] flex flex-col items-center w-[80vw]">
                <p className="portfolio5 w-[70vw] ml-[10px] font-bold text-[35px] sm:text-[45px]">Generative AI</p>
                {/* Main Projects */}
                <div className="portfolio5 grid gap-[20px] grid-cols-2 place-items-center mt-[30px] md:flex md:flex-row md:space-y-[0px] md:space-x-[20px] items-center justify-center">
                  {projects
                    .filter(project => getCategoryTitle(project.projectCategory) === 'Generative AI')
                    .slice(0, 2)
                    .map((project) => {
                      const techs = normalizeTechStack(project.techStack);
                      return (
                        <PortfolioCard
                          key={project._id}
                          onClick={onPortfolioCardClick(project)}
                          lang1={techs[0] || ''}
                          lang2={techs[1] || ''}
                          lang3={techs[2] || ''}
                          lang4={techs[3] || ''}
                          lang5={techs[4] || ''}
                          lang6={techs[5] || ''}
                          text={project.title}
                          text2={project.projectOverview}
                          imageUrl={isValidUrl(project.images?.imageUrl1) ? project.images?.imageUrl1 : Newspaper.src}
                        />
                      );
                    })}
                </div>
                {/* Mini Projects */}
                <p className="portfolio5 mt-[30px] text-[33px] text-center md:text-[30px]">Mini Projects</p>
                <div className="portfolio5 mt-[30px] grid grid-cols-2 gap-[10px] sm:grid-cols-4 md:grid-cols-4 lg:flex lg:flex-row lg:space-x-[20px] items-center justify-center">
                  {miniProjects
                    .filter(miniProject => getCategoryTitle(miniProject.miniProjectCategory) === 'Generative AI')
                    .slice(0, 4)
                    .map((miniProject) => (
                      <MiniProjectCard
                        key={miniProject._id}
                        title={miniProject.title || 'Untitled'}
                        description={miniProject.description || 'No description available'}
                        imageUrl={isValidUrl(miniProject.imageUrl) ? miniProject.imageUrl : Newspaper.src}
                        githubUrl={isValidUrl(miniProject.githubUrl) ? miniProject.githubUrl : '#'}
                        demoUrl={isValidUrl(miniProject.demoUrl) ? miniProject.demoUrl : '#'}
                        category={getCategoryTitle(miniProject.miniProjectCategory)}
                      />
                    ))}
                </div>
              </div>

              {/* Agentic AI Section */}
              <div className="mt-[30px] flex flex-col items-center w-[80vw]">
                <p className="portfolio6 w-[70vw] ml-[10px] font-bold text-[35px] sm:text-[45px]">Agentic AI</p>
                {/* Main Projects */}
                <div className="portfolio6 grid gap-[20px] grid-cols-2 place-items-center mt-[30px] md:flex md:flex-row md:space-y-[0px] md:space-x-[20px] items-center justify-center">
                  {projects
                    .filter(project => getCategoryTitle(project.projectCategory) === 'Agentic AI')
                    .slice(0, 2)
                    .map((project) => {
                      const techs = normalizeTechStack(project.techStack);
                      return (
                        <PortfolioCard
                          key={project._id}
                          onClick={onPortfolioCardClick(project)}
                          lang1={techs[0] || ''}
                          lang2={techs[1] || ''}
                          lang3={techs[2] || ''}
                          lang4={techs[3] || ''}
                          lang5={techs[4] || ''}
                          lang6={techs[5] || ''}
                          text={project.title}
                          text2={project.projectOverview}
                          imageUrl={isValidUrl(project.images?.imageUrl1) ? project.images?.imageUrl1 : Newspaper.src}
                        />
                      );
                    })}
                </div>
                {/* Mini Projects */}
                <p className="portfolio6 mt-[30px] text-[33px] text-center md:text-[30px]">Mini Projects</p>
                <div className="portfolio6 mt-[30px] grid grid-cols-2 gap-[10px] sm:grid-cols-4 md:grid-cols-4 lg:flex lg:flex-row lg:space-x-[20px] items-center justify-center">
                  {miniProjects
                    .filter(miniProject => getCategoryTitle(miniProject.miniProjectCategory) === 'Agentic AI')
                    .slice(0, 4)
                    .map((miniProject) => (
                      <MiniProjectCard
                        key={miniProject._id}
                        title={miniProject.title || 'Untitled'}
                        description={miniProject.description || 'No description available'}
                        imageUrl={isValidUrl(miniProject.imageUrl) ? miniProject.imageUrl : Newspaper.src}
                        githubUrl={isValidUrl(miniProject.githubUrl) ? miniProject.githubUrl : '#'}
                        demoUrl={isValidUrl(miniProject.demoUrl) ? miniProject.demoUrl : '#'}
                        category={getCategoryTitle(miniProject.miniProjectCategory)}
                      />
                    ))}
                </div>
              </div>
            </>
          )}
        </div>
        <div
          className={`fixed top-0 left-0 z-[9999] h-[100vh] w-[100vw] flex flex-col items-center justify-center transition-opacity duration-500 ease-in-out ${
            onPortfolioClick ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
        >
          <PortfolioModel
            resetPortfolioClick={resetPortfolioClick}
            onPortfolioClick={onPortfolioClick}
            setOnPortfolioClick={setOnPortfolioClick}
            project={selectedProject}
          />
        </div>
      </div>
      <Top />
      <Contact onContactClick={onContactClick} />
      <Footer />
    </div>
  );
};

export default Portfolio;
