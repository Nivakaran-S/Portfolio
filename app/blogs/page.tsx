'use client'
import Navigation from "../components/Navigation"
import { useState, useEffect } from "react";
import Footer from "../components/Footer";
import ContactModel from "../components/ContactModel";
import Contact from "../components/Contact";
import BlogCard from "../components/BlogCard";
import PrimaryBtn from "../components/PrimaryBtn";
import { useRouter } from "next/navigation";
import Top from "../components/Top";
import Max from "../components/Max";
import CaseStudyCard from "../components/CaseStudyCard";
import StarBackground from "../components/StarBackground";
import axios from "axios";
import Portfolio from "../components/Portfolio";
import PortfolioModel from "../portfolio/PortfolioModel";
import { Project } from "../portfolio/types";
import CaseStudyModel from "../components/CaseStudyModel";


interface BlogPost {
  _id: string;
  title: string;
  image: string;
  subtitle: string;
  content: string;
  blogsCategory: string;
  imageUrl: string;
  createdAt: string;
}

interface CaseStudy {
  _id: string;
  title: string;
  overview: string;
  challenge: string;
  challenges: string; 
  demoUrl: string;
  githubUrl: string;
  learnings: string;
  results: string;
  solution: string;
  technologies: string[]; 
  imageUrl: string;
  createdAt: string;

  
}



const Blogs = () => {
    const [showContactModel, setShowContactModel] = useState(false);
    const [navSelection, setNavSelection] = useState('Blogs');
    const [showMessageSuccess, setShowMessageSuccess] = useState(false);
    const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
    const [dataScienceBlogs, setDataScienceBlogs] = useState<BlogPost[]>([]);
    const [computerVisionBlogs, setComputerVisionBlogs] = useState<BlogPost[]>([]);
    const [generativeAIBlogs, setGenerativeAIBlogs] = useState<BlogPost[]>([]);
    const [agenticAIBlogs, setAgenticAIBlogs] = useState<BlogPost[]>([]);
    const [dataEngineeringBlogs, setDataEngineeringBlogs] = useState<BlogPost[]>([]);
    const [behindScenesBlogs, setBehindScenesBlogs] = useState<BlogPost[]>([]);
    const [caseStudies, setCaseStudies] = useState<CaseStudy[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [onPortfolioClick, setOnPortfolioClick] = useState(false);
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const [onCaseStudyClick, setOnCaseStudyClick] = useState(false);
    const [selectedCaseStudy, setSelectedCaseStudy] = useState<CaseStudy | null>(null);
    const [scrollPosition, setScrollPosition] = useState(0);

    useEffect(() => {
        const fetchCaseStudies = async () => {
            try {
                const response = await axios.get(
                    'https://portfolio-backend-new-2.vercel.app/caseStudies'
                );
                setCaseStudies(response.data);
                console.log(response.data)
            } catch (err) {
                setError('Failed to fetch case studies');
                console.error('Error fetching case studies:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchCaseStudies();
    }, []);

    const API_BASE_URL = "https://portfolio-backend-new-2.vercel.app";

    const onMessageSuccess = () => {
        setShowMessageSuccess(true);
        setTimeout(() => {
            setShowMessageSuccess(false);
        }, 3000);
    };
    
    const onContactClick = () => {
        setShowContactModel(!showContactModel);
    };
    
    const router = useRouter();

    const onBlogClick = (blog: BlogPost) => {
        router.push(`blogs/blogpage?_id=${encodeURIComponent(blog._id || '')}`);
    };

    const fetchBlogs = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/blogs`, {
                withCredentials: true,
            });
            const blogs = response.data;
            setBlogPosts(blogs);
            
            // Filter blogs by category
            setDataScienceBlogs(blogs.filter((blog: BlogPost) => blog.blogsCategory === "6890acb003a649d3da0baba4"));
            setComputerVisionBlogs(blogs.filter((blog: BlogPost) => blog.blogsCategory === "688c1add602363e313f55ca2"));
            setGenerativeAIBlogs(blogs.filter((blog: BlogPost) => blog.blogsCategory === "68918e790fe23ef198fc9955"));
            setAgenticAIBlogs(blogs.filter((blog: BlogPost) => blog.blogsCategory === "688c1ae9602363e313f55ca4"));
            setDataEngineeringBlogs(blogs.filter((blog: BlogPost) => blog.blogsCategory === "6890aab8b6f6853a5ed65479"));
            setBehindScenesBlogs(blogs.filter((blog: BlogPost) => blog.blogsCategory === "6891ab75794ad168dc130ef5"));
        } catch (error) {
            console.error("Failed to fetch blogs:", error);
        }
    };

    useEffect(() => {
        fetchBlogs();
    }, []);

    useEffect(() => {
        if(typeof window !== 'undefined'){
            import('scrollreveal').then((ScrollReveal) => { 
                ScrollReveal.default().reveal('.blogs1', {
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
        if(typeof window !== 'undefined'){
            import('scrollreveal').then((ScrollReveal) => { 
                ScrollReveal.default().reveal('.blogs2', {
                    origin: 'right',
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
        if(typeof window !== 'undefined'){
            import('scrollreveal').then((ScrollReveal) => { 
                ScrollReveal.default().reveal('.blogs3', {
                    origin: 'left',
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
        if(typeof window !== 'undefined'){
            import('scrollreveal').then((ScrollReveal) => { 
                ScrollReveal.default().reveal('.blogs4', {
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
        if(typeof window !== 'undefined'){
            import('scrollreveal').then((ScrollReveal) => { 
                ScrollReveal.default().reveal('.blogsTitle1', {
                    origin: 'bottom',
                    distance: '40px',
                    duration: 800,
                    delay: 400,
                    easing: 'ease-in-out',
                    reset: false
                });
            });
        }
    }, []);

    useEffect(() => {
        if(typeof window !== 'undefined'){
            import('scrollreveal').then((ScrollReveal) => { 
                ScrollReveal.default().reveal('.blogsTitle2', {
                    origin: 'bottom',
                    distance: '40px',
                    duration: 800,
                    delay: 600,
                    easing: 'ease-in-out',
                    reset: false
                });
            });
        }
    }, []);

    useEffect(() => {
        if(typeof window !== 'undefined'){
            import('scrollreveal').then((ScrollReveal) => { 
                ScrollReveal.default().reveal('.aboutTitle1', {
                    origin: 'bottom',
                    distance: '40px',
                    duration: 800,
                    delay: 400,
                    easing: 'ease-in-out',
                    reset: false
                });
            });
        }
    }, []);

    useEffect(() => {
        if(typeof window !== 'undefined'){
            import('scrollreveal').then((ScrollReveal) => { 
                ScrollReveal.default().reveal('.aboutTitle2', {
                    origin: 'bottom',
                    distance: '40px',
                    duration: 800,
                    delay: 600,
                    easing: 'ease-in-out',
                    reset: false
                });
            });
        }
    }, []);

    useEffect(() => {
        if(typeof window !== 'undefined'){
            import('scrollreveal').then((ScrollReveal) => { 
                ScrollReveal.default().reveal('.aboutTitle3', {
                    origin: 'bottom',
                    distance: '40px',
                    duration: 800,
                    delay: 800,
                    easing: 'ease-in-out',
                    reset: false
                });
            });
        }
    }, []);

    useEffect(() => {
        if(typeof window !== 'undefined'){
            import('scrollreveal').then((ScrollReveal) => { 
                ScrollReveal.default().reveal('.aboutText4', {
                    origin: 'left',
                    distance: '40px',
                    duration: 800,
                    delay: 400,
                    easing: 'ease-in-out',
                    reset: false
                });
            });
        }
    }, []);

    useEffect(() => {
        if(typeof window !== 'undefined'){
            import('scrollreveal').then((ScrollReveal) => { 
                ScrollReveal.default().reveal('.aboutText5', {
                    origin: 'right',
                    distance: '40px',
                    duration: 800,
                    delay: 400,
                    easing: 'ease-in-out',
                    reset: false
                });
            });
        }
    }, []);

    const onPortfolioCard1Click = (project: Project) => (e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        if (typeof window !== 'undefined') {
            setScrollPosition(window.scrollY);
            setSelectedProject(project);
            setOnPortfolioClick(true);
            document.body.style.position = 'fixed';
            document.body.style.top = `-${window.scrollY}px`;
        }
    };

    const onCaseStudyCardClick = (caseStudy: CaseStudy) => (e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        if (typeof window !== 'undefined') {
            setScrollPosition(window.scrollY);
            setSelectedCaseStudy(caseStudy);
            setOnCaseStudyClick(true);
            //document.body.style.position = 'fixed';
            //document.body.style.top = `-${window.scrollY}px`;
        }
    };

    const resetPortfolioClick = () => {
        if (typeof window !== 'undefined') {
            setOnPortfolioClick(false);
            setSelectedProject(null);
            //document.body.style.position = '';
            //document.body.style.top = '';
            //window.scrollTo(0, scrollPosition);
        }
    };

    const resetCaseStudyClick = () => {
        if (typeof window !== 'undefined') {
            setOnCaseStudyClick(false);
            setSelectedCaseStudy(null);
            //document.body.style.position = '';
            //document.body.style.top = '';
            //window.scrollTo(0, scrollPosition);
        }
    };

    return (
        <div className="flex text-white w-[100%] overflow-x-hidden flex-col">
            <Navigation navSelection={navSelection} onContactClick={onContactClick}/>
            <ContactModel onMessageSuccess={onMessageSuccess} showContactModel={showContactModel} onContactClick={onContactClick}/>
            <div>
                <StarBackground/>
                <div className="text-white bg-contain bg-no-repeat bg-center sm:space-y-[30px] px-[10vw] flex flex-col items-center justify-center sm:pt-[20vh] min-h-[100vh]">
                    <div className="w-[100vw] text-center leading-[63px] sm:leading-[90px] h-[100%]">
                        <p className="text-[40px] sm:text-[50px] md:text-[60px] aboutText4 aboutTitle1 bg-gradient-to-t from-[#433D3A] via-[#C6C4C3] to-[#CAC8C6] bg-clip-text text-transparent">Look Into</p>
                        <p className="text-[49px] sm:text-[75px] px-[20px] md:text-[80px] aboutTitle2 bg-gradient-to-t from-[#433D3A] via-[#C6C4C3] font-[600] to-[#CAC8C6] bg-clip-text text-transparent">Blogs & Insights</p>
                    </div>
                    <div className="w-[100%] md:w-[50%] text-center h-[10px] sm:h-[160px]"></div>
                    <div className="w-[100%] md:w-[50%] text-center">
                        <p className="aboutTitle3">Welcome to my digital journal, a space where I share my thoughts, experiences, and learnings from the world of technology.</p>
                    </div>
                </div>
            </div>

            <div className="min-h-[120vh] bg-[#0A0A0A] py-[10vh] w-screen flex items-center justify-center">
                <div className="flex items-center justify-center flex-col">
                    <div className="leading-[55px] sm:leading-[64px] blogs1 text-center">
                        <p className="text-[45px] sm:text-[55px] bg-gradient-to-t from-[#433D3A] via-[#C6C4C3] font-bold to-[#CAC8C6] bg-clip-text text-transparent">Stay Updated</p>
                        <p className="text-[45px] sm:text-[55px] bg-gradient-to-t from-[#433D3A] via-[#C6C4C3] font-bold to-[#CAC8C6] bg-clip-text text-transparent">with Latest Insights</p>
                    </div>

                    {dataScienceBlogs.length > 0 && (
                        <>
                            <p className="mt-[30px] mb-[20px] blogs3 font-bold text-[35px] sm:text-[45px]">Data Science</p>
                            <div className="flex items-center blogs4 justify-center">
                                <div className="grid w-[95%] sm:w-[100%] grid-cols-2 lg:grid-cols-4 gap-[20px] sm:gap-[20px]">
                                    {dataScienceBlogs.map((blog) => (
                                        <BlogCard
                                            image={blog.imageUrl || null}
                                            key={blog._id}
                                            text={blog.subtitle}
                                            text1={blog.title}
                                            onClick={() => onBlogClick(blog)}
                                        />
                                    ))}
                                </div>
                            </div>
                        </>
                    )}

                    {computerVisionBlogs.length > 0 && (
                        <>
                            <p className="mt-[30px] mb-[20px] blogs3 font-bold text-[35px] sm:text-[45px]">Computer Vision</p>
                            <div className="flex items-center blogs4 justify-center">
                                <div className="grid w-[95%] sm:w-[100%] grid-cols-2 lg:grid-cols-4 gap-[20px] sm:gap-[20px]">
                                    {computerVisionBlogs.map((blog) => (
                                        <BlogCard
                                            image={blog.imageUrl || null}
                                            key={blog._id}
                                            text={blog.subtitle}
                                            text1={blog.title}
                                            onClick={() => onBlogClick(blog)}
                                        />
                                    ))}
                                </div>
                            </div>
                        </>
                    )}

                    {generativeAIBlogs.length > 0 && (
                        <>
                            <p className="mt-[30px] mb-[20px] blogs3 font-bold text-[35px] sm:text-[45px]">Generative AI</p>
                            <div className="flex items-center blogs4 justify-center">
                                <div className="grid w-[95%] sm:w-[100%] grid-cols-2 lg:grid-cols-4 gap-[20px] sm:gap-[20px]">
                                    {generativeAIBlogs.map((blog) => (
                                        <BlogCard
                                            image={blog.imageUrl || null}
                                            key={blog._id}
                                            text={blog.subtitle}
                                            text1={blog.title}
                                            onClick={() => onBlogClick(blog)}
                                        />
                                    ))}
                                </div>
                            </div>
                        </>
                    )}

                    {agenticAIBlogs.length > 0 && (
                        <>
                            <p className="mt-[30px] mb-[20px] blogs3 font-bold text-[35px] sm:text-[45px]">Agentic AI</p>
                            <div className="flex items-center blogs4 justify-center">
                                <div className="grid w-[95%] sm:w-[100%] grid-cols-2 lg:grid-cols-4 gap-[20px] sm:gap-[20px]">
                                    {agenticAIBlogs.map((blog) => (
                                        <BlogCard
                                            image={blog.imageUrl || null}
                                            key={blog._id}
                                            text={blog.subtitle}
                                            text1={blog.title}
                                            onClick={() => onBlogClick(blog)}
                                        />
                                    ))}
                                </div>
                            </div>
                        </>
                    )}

                    {dataEngineeringBlogs.length > 0 && (
                        <>
                            <p className="mt-[30px] mb-[20px] blogs3 font-bold text-[35px] sm:text-[45px]">Data Engineering</p>
                            <div className="flex items-center blogs4 justify-center">
                                <div className="grid w-[95%] sm:w-[100%] grid-cols-2 lg:grid-cols-4 gap-[20px] sm:gap-[20px]">
                                    {dataEngineeringBlogs.map((blog) => (
                                        <BlogCard
                                            image={blog.imageUrl || null}
                                            key={blog._id}
                                            text={blog.subtitle}
                                            text1={blog.title}
                                            onClick={() => onBlogClick(blog)}
                                        />
                                    ))}
                                </div>
                            </div>
                        </>
                    )}

                    {behindScenesBlogs.length > 0 && (
                        <>
                            <p className="mt-[30px] mb-[20px] blogs3 font-bold text-[35px] sm:text-[45px]">Behind the Scenes</p>
                            <div className="flex items-center blogs4 justify-center">
                                <div className="grid w-[95%] sm:w-[100%] grid-cols-2 lg:grid-cols-4 gap-[20px] sm:gap-[20px]">
                                    {behindScenesBlogs.map((blog) => (
                                        <BlogCard
                                            image={blog.imageUrl || null}
                                            key={blog._id}
                                            text={blog.subtitle}
                                            text1={blog.title}
                                            onClick={() => onBlogClick(blog)}
                                        />
                                    ))}
                                </div>
                            </div>
                        </>
                    )}

                    <div className="w-[95%] sm:w-[100%] mt-[40px] flex items-center justify-center">
                        <div className="flex flex-col items-center justify-center w-full">
                            <p className="text-[40px] sm:text-[50px]  font-bold w-full text-center">Case Studies</p>
                            <div className="grid  px-[15px] md:px-[85px] lg:grid-cols-2 gap-[25px] sm:gap-[30px] items-center justify-center mt-[30px]">
                                {caseStudies.map((caseStudy) => (
                                    <CaseStudyCard
                                        imageUrl={caseStudy.imageUrl}
                                        key={caseStudy._id}
                                        text1={caseStudy.title}
                                        text={caseStudy.overview}
                                        onClick={onCaseStudyCardClick(caseStudy)}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Top/>
            <Portfolio onPortfolioCard1Click={onPortfolioCard1Click} />
            <Contact onContactClick={onContactClick}/>
            <Footer/>

            {/* Portfolio Modal */}
            <div
                className={`fixed top-0 left-0 z-[10000] h-[100vh] w-[100vw] flex flex-col items-center justify-center bg-black/80 transition-opacity duration-500 ease-in-out ${
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

            {/* Case Study Modal */}
            <div
                className={`fixed top-0 left-0 z-[10000] h-[100vh] w-[100vw] flex flex-col items-center justify-center bg-black/80 transition-opacity duration-500 ease-in-out ${
                onCaseStudyClick ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
                }`}
            >
                <CaseStudyModel
                    resetCaseStudyClick={resetCaseStudyClick}
                    onCaseStudyClick={onCaseStudyClick}
                    setOnCaseStudyClick={setOnCaseStudyClick}
                    caseStudy={selectedCaseStudy}
                />
            </div>

            {showMessageSuccess && (
                <div className="bg-[#101010] z-[40] w-[250px] fixed text-[13px] mb-[20px] ml-[30px] px-[20px] py-[20px] ring-white ring-[0.5px] rounded-[10px] text-white absolute left-0 bottom-0">
                    <p>Message saved successfully. Will get back to you soon:)</p>
                </div>
            )}
        </div>
    );
};

export default Blogs;