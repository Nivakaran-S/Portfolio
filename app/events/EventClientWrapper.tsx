

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
import Blogs from "../components/Blogs";
import EventCard from "./EventCard";
import Event1 from '../event-images/1734452535217.jpeg'
import Event2 from '../event-images/1749062349806.jpeg'
import Event3 from '../event-images/1761047602285.jpeg'
import Event4 from '../event-images/1749062350991.jpeg'
import Event5 from '../event-images/1749062352931.jpeg'
import Event6 from '../event-images/1751913627206.png'
import Event7 from '../event-images/1739442055119.jpeg'
const eventsData = [
  { id: 1, image: Event6, date: "12/08/2024", role: "Participant", location: "Colombo, Sri Lanka", type: "Conference", title: "Google Devfest 2024", description:"Attended Devfest Sri Lanka 2024 organized by GDG, an incredible event packed with innovation and learning. Highlights included Rohan Jayaweera on democratizing human ability, Namrata More and Amey Nerkar on AI-driven payment innovations, Sajeetharan Sinnathurai on Angular efficiency, Thushan Ganegedara on LLM capabilities, Rishiraj Acharya on multimodal search with Gemini Vision and RAG, Dhaminda Siriwardena on responsible AI, and Abhishek Doshi on high-performance Flutter web apps with WASM. A day full of insights, practical knowledge, and connections with brilliant minds in tech!" },
  { id: 2, image: Event7, date: "01/24/2025", role: "Finalist", location: "Colombo, Sri Lanka", type: "Competition", title: "Codefest Algothon 2024", description:"I was thrilled to be a finalist in Algothon 2024, part of CODEFEST 2024 organized by SLIIT, ranking 11th out of nearly 170 teams. The competition tested our skills through multiple challenging rounds, including an algorithm knowledge quiz and solving a complex logistics problem to determine the shortest delivery paths. Working alongside my teammates, Hariswara Sidambaram and Imadh Ifham, was an incredible experience, and I’m grateful to the organizers for providing such an inspiring platform. Participating in Algothon strengthened my abilities in algorithm development, problem-solving, and optimization, leaving me motivated to tackle future challenges." },
  { id: 3, image: Event3, date: "18/10/2025", role: "Finalist" , location: "Colombo, Sri Lanka", type: "Competition", title: "SLIITXtreme 4.0 2025", description:"Participated in SLIIT Xtreme, a 24-hour hackathon held at SLIIT, competing initially with many teams to secure a spot among the top 25 finalists. During the final phase, our team climbed to 6th place on the live leaderboard, with extremely close competition where the top five teams all finished with identical scores. The final official rankings beyond the top three were not disclosed post-judging, but the experience was hugely rewarding in terms of learning, collaboration, and perseverance under intense time pressure. Special thanks to teammates Duwaragie Kugaraj and Zayan Mohamed for their dedication and teamwork. Appreciation also goes to the organizing committee for hosting a well-run event with excellent hospitality. This journey reinforced skills in rapid problem-solving, teamwork, and maintaining composure under tight deadlines, and serves as motivation for future challenges."},
  { id: 4, image: Event4, date: "06/04/2025", role: "Participant", location: "Colombo, Sri Lanka", type: "Conference", title: "iCIIT Conclave 2025", description:"Attended iCIIT Conclave 2025, a day of cutting-edge insights and inspiring discussions on AI, technology, and digital transformation in Sri Lanka. Highlights included Dr. Hans Wijayasuriya on accelerating the digital economy, Prof. Kerstin Bach on interpretable and sustainable AI, Prof. Emanuele Trucco on AI in precision medicine, and sessions on agentic AI, efficient LLM systems, and sustainable AI practices. The conclave offered a deep dive into practical AI applications, scalable solutions, and the future of technology." },
  
];

// Fix: Rename the interface to match what PortfolioModel expects
interface PortfolioModelProps {
  resetPortfolioClick: () => void;
  onPortfolioClick: boolean;
  setOnPortfolioClick: React.Dispatch<React.SetStateAction<boolean>>;
  project: Project | null;
}

const EventsClientWrapper = () => {
  const [showContactModel, setShowContactModel] = useState(false);
  const [navSelection, setNavSelection] = useState('Events');
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
      });
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      import('scrollreveal').then((ScrollReveal) => {
        ScrollReveal.default().reveal('.portfolioTitle2', { origin: 'bottom', distance: '40px', duration: 800, delay: 600, easing: 'ease-in-out', reset: false });
      });
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      import('scrollreveal').then((ScrollReveal) => {
        ScrollReveal.default().reveal('.portfolioTitle3', { origin: 'bottom', distance: '40px', duration: 800, delay: 800, easing: 'ease-in-out', reset: false });
      });
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      import('scrollreveal').then((ScrollReveal) => {
        ScrollReveal.default().reveal('.portfolio1', { origin: 'bottom', distance: '20px', duration: 800, delay: 200, easing: 'ease-in-out', reset: false });
      });
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      import('scrollreveal').then((ScrollReveal) => {
        ScrollReveal.default().reveal('.portfolio2', { origin: 'bottom', distance: '20px', duration: 800, delay: 400, easing: 'ease-in-out', reset: false });
      });
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      import('scrollreveal').then((ScrollReveal) => {
        ScrollReveal.default().reveal('.portfolio3', { origin: 'bottom', distance: '20px', duration: 800, delay: 600, easing: 'ease-in-out', reset: false });
      });
    }
  }, []);


  useEffect(() => {
    if (typeof window !== 'undefined') {
      import('scrollreveal').then((ScrollReveal) => {
        ScrollReveal.default().reveal('.portfolio4', { origin: 'bottom', distance: '20px', duration: 800, delay: 800, easing: 'ease-in-out', reset: false });
      });
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      import('scrollreveal').then((ScrollReveal) => {
        ScrollReveal.default().reveal('.portfolio5', { origin: 'bottom', distance: '20px', duration: 800, delay: 1000, easing: 'ease-in-out', reset: false });
      });
    }
  }, []);


  useEffect(() => {
    if (typeof window !== 'undefined') {
      import('scrollreveal').then((ScrollReveal) => {
        ScrollReveal.default().reveal('.portfolio6', { origin: 'bottom', distance: '20px', duration: 800, delay: 1200, easing: 'ease-in-out', reset: false });
        });
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      import('scrollreveal').then((ScrollReveal) => {
        ScrollReveal.default().reveal('.aboutTitle1', { origin: 'bottom', distance: '40px', duration: 800, delay: 400, easing: 'ease-in-out', reset: false });
        });
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      import('scrollreveal').then((ScrollReveal) => {
        ScrollReveal.default().reveal('.aboutTitle2', { origin: 'bottom', distance: '40px', duration: 800, delay: 600, easing: 'ease-in-out', reset: false });
        });
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      import('scrollreveal').then((ScrollReveal) => {
        ScrollReveal.default().reveal('.aboutTitle3', { origin: 'bottom', distance: '40px', duration: 800, delay: 800, easing: 'ease-in-out', reset: false });
      });
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      import('scrollreveal').then((ScrollReveal) => {
        ScrollReveal.default().reveal('.aboutText4', { origin: 'left', distance: '40px', duration: 800, delay: 400, easing: 'ease-in-out', reset: false });
        
      });
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      import('scrollreveal').then((ScrollReveal) => {
        ScrollReveal.default().reveal('.aboutText5', { origin: 'right', distance: '40px', duration: 800, delay: 400, easing: 'ease-in-out', reset: false });
      });
    }
  }, []);

  const onContactClick = () => {
    setShowContactModel(!showContactModel);
  };

 
  const resetPortfolioClick = () => {
    if (typeof window !== 'undefined') {
      setOnPortfolioClick(false);
      setSelectedProject(null);
      //document.body.style.position = '';
      //document.body.style.top = '';
      //window.scrollTo(0, 0);
    }
  };

  
  const [filter, setFilter] = useState("All");
  
  const [displayedEvents, setDisplayedEvents] = useState(eventsData);
  const [fade, setFade] = useState(false);

  // Filter events based on the selected filter
  const filteredEvents =
    filter === "All"
      ? eventsData
      : eventsData.filter((event) =>
          event.type === (filter === "Competitions" ? "Competition" : filter)
        );



  const handleFilter = (type: string) => {
    setFade(true); // start fade-out
    setTimeout(() => {
      // update displayed events after fade-out
      const newEvents =
        type === "All"
          ? eventsData
          : eventsData.filter(
              (event) =>
                event.type === (type === "Competitions" ? "Competition" : type)
            );
      setDisplayedEvents(newEvents);
      setFilter(type);
      setFade(false); // fade-in
    }, 300); // duration of fade-out
  };

  return (
    <div className={`flex text-white w-[100%] overflow-x-hidden flex-col ${onPortfolioClick ? '' : ''}`}>
      <Navigation navSelection={navSelection} onContactClick={onContactClick} />
      <ContactModel onMessageSuccess={onMessageSuccess} showContactModel={showContactModel} onContactClick={onContactClick} />
      <div className="">
        <StarBackground />
        <div className="text-white bg-contain bg-no-repeat bg-center sm:space-y-[30px] px-[10vw] flex flex-col items-center justify-center sm:pt-[20vh] min-h-[100vh]">
          <div className="w-[100%] text-center leading-[71px] sm:leading-[90px] h-[100%]">
            <p className="text-[40px] sm:text-[50px] md:text-[60px] aboutText4 aboutTitle1 bg-gradient-to-t from-[#433D3A] via-[#C6C4C3] to-[#CAC8C6] bg-clip-text text-transparent">Discover</p>
            <p className="text-[65px] sm:text-[75px] md:text-[80px] aboutTitle2 bg-gradient-to-t from-[#433D3A] via-[#C6C4C3] font-[600] to-[#CAC8C6] bg-clip-text text-transparent">Events & Highlights</p>
          </div>
          <div className="w-[100%] md:w-[50%] text-center h-[10px] sm:h-[160px]"></div>
          <div className="w-[100%] md:w-[60%] text-center">
            <p className="aboutTitle3">Step into a curated collection of events, competitions, and talks that capture my dedication to learning, sharing, and contributing to the tech community.</p>
          </div>
        </div>
      </div>
      <div className="bg-[#101010] min-h-[100vh]  w-[100vw]  overflow-x-hidden py-[15vh]  flex flex-col items-center ">
        
        <div className="w-[93%] flex flex-col items-center  2xl:w-[1200px]  sm:w-[80%]">
          <div className="portfolio1 leading-[50px] sm:leading-[58px]  md:leading-[66px] text-center">
            <p className="text-[45px] md:text-[60px] bg-gradient-to-t from-[#433D3A] via-[#C6C4C3] font-bold to-[#CAC8C6] bg-clip-text text-transparent">Explore the</p>
            <p className="text-[38px] sm:text-[50px] md:text-[60px] bg-gradient-to-t from-[#433D3A] via-[#C6C4C3] font-bold to-[#CAC8C6] bg-clip-text text-transparent">Journey Through Events</p>
          </div>
          
          <div className="flex flex-row items-center space-y-0 space-x-3 bg-[#1D1D1D]  px-4 py-3 rounded-full mt-6 max-w-full">
  {["All", "Conference", "Competitions"].map((type) => (
    <div
      key={type}
      className={`px-5 py-2 cursor-pointer transition-colors duration-200 ${
        filter === type
          ? "bg-[#101010] ring-[0.5px] ring-[#808080] text-white shadow-md"
          : "bg-gray-200 text-gray-600 hover:bg-[#808080] hover:text-black"
      } rounded-full flex-shrink-0`}
      onClick={() => handleFilter(type)}
    >
      <p className="whitespace-nowrap font-medium">{type}</p>
    </div>
  ))}
</div>




      {/* Event Cards with smooth fade */}
      <div
        className={`py-[50px] grid gap-[25px] grid-cols-1 place-items-center lg:grid-cols-2 md:grid-cols-2 xl:grid-cols-3
          transition-opacity duration-300 ${fade ? "opacity-0" : "opacity-100"}`}
      >
        {displayedEvents.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
          
          
          
          
        </div>
        <div
    className={`z-[9999] h-[100vh] w-[100vw] flex flex-col items-start justify-start transition-opacity duration-500 ease-in-out ${
      onPortfolioClick ? 'opacity-100 fixed top-0 left-0' : 'opacity-0 hidden pointer-events-none'
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
      <Blogs/>
      <Top />
      <Contact onContactClick={onContactClick} />
      <Footer />
    </div>
  );
};

export default EventsClientWrapper;