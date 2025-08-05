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
    
    const API_BASE_URL = "https://portfolio-backend-new-2.vercel.app";

    const onMessageSuccess = () => {
        setShowMessageSuccess(true);
        setTimeout(() => {
          setShowMessageSuccess(false);
        }, 3000);
    };
    
    const onContactClick = () => {
        setShowContactModel(!showContactModel);
    }
    
    const router = useRouter();

    const onBlogClick = (blog: BlogPost) => {
        router.push(`blogs/blogpage?_id=${encodeURIComponent(blog._id || '')}`);
    }

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
            setDataEngineeringBlogs(blogs.filter((blog: BlogPost) => blog.blogsCategory === "Data Engineering"));
            setBehindScenesBlogs(blogs.filter((blog: BlogPost) => blog.blogsCategory === "Behind the Scenes"));
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
                })
            })
        }
    }, [])

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
                })
            })
        }
    }, [])

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
                })
            })
        }
    }, [])

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
                })
            })
        }
    }, [])

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
                })
            })
        }
    }, [])

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
                })
            })
        }
    }, [])

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
                })
            })
        }
    }, [])

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
                })
            })
        }
    }, [])

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
                })
            })
        }
    }, [])

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
                })
            })
        }
    }, [])

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
                })
            })
        }
    }, [])

    const [onPortfolioClick, setOnPortfolioClick] = useState(false)

    return(
        <div className="flex text-white w-[100vw] overflow-x-hidden flex-col">
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
                                <div className="grid w-[95%] sm:w-[100%] grid-cols-2 md:grid-cols-4 gap-[20px] sm:gap-[20px]">
                                    {dataScienceBlogs.slice(0, 4).map((blog) => (
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
                                <div className="grid w-[95%] sm:w-[100%] grid-cols-2 md:grid-cols-4 gap-[20px] sm:gap-[20px]">
                                    {computerVisionBlogs.slice(0, 4).map((blog) => (
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
                                <div className="grid w-[95%] sm:w-[100%] grid-cols-2 md:grid-cols-4 gap-[20px] sm:gap-[20px]">
                                    {generativeAIBlogs.slice(0, 4).map((blog) => (
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
                                <div className="grid w-[95%] sm:w-[100%] grid-cols-2 md:grid-cols-4 gap-[20px] sm:gap-[20px]">
                                    {agenticAIBlogs.slice(0, 4).map((blog) => (
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
                                <div className="grid w-[95%] sm:w-[100%] grid-cols-2 md:grid-cols-4 gap-[20px] sm:gap-[20px]">
                                    {dataEngineeringBlogs.slice(0, 4).map((blog) => (
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
                                <div className="grid w-[95%] sm:w-[100%] grid-cols-2 md:grid-cols-4 gap-[20px] sm:gap-[20px]">
                                    {behindScenesBlogs.slice(0, 4).map((blog) => (
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

                    <div className="w-[95%] sm:w-[80%] flex items-center justify-center">
                        <div className="flex flex-row items-center justify-center space-x-[20px] mt-[30px]">
                            <div className="w-[96%]">
                                <p className="text-[40px] ml-[10px] sm:text-[50px] blogs3 font-bold">Case Studies</p>
                                <div className="grid blogs2 px-[15px] md:px-[85px] md:grid-cols-2 gap-[25px] sm:gap-[30px] items-center justify-center space-x-[20px] mt-[30px]">
                                    <CaseStudyCard onClick={() => setOnPortfolioClick(true)} text1="Case study title 01" text="test" />
                                    <CaseStudyCard onClick={() => setOnPortfolioClick(true)} text1="Case study title 02" text="" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div
                    className={`fixed top-0 left-0 z-[9999] h-[100vh] w-[100vw] flex flex-col items-center justify-center
                    transition-opacity duration-500 ease-in-out
                    ${onPortfolioClick ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}
                    `}
                >
                    <div
                        onClick={() => setOnPortfolioClick(false)}
                        className={`bg-[#101010] h-full w-full opacity-50 transition-opacity duration-500 ease-in-out
                        ${onPortfolioClick ? 'opacity-60' : 'opacity-0 pointer-events-none'}
                        `}
                    ></div>
                    <div
                        className={`absolute lg:rounded-[20px] md:rounded-[10px] text-white bg-[#101010] ring-[1.5px] ring-[#373435] h-[95vh] w-[85vw] z-20
                        transform transition-transform duration-500 ease-in-out
                        ${onPortfolioClick ? 'scale-100 opacity-100' : 'scale-95 opacity-0 pointer-events-none'}
                        `}
                    >
                        <div className="flex flex-row items-center justify-center">
                            <p className="text-[40px] sm:text-[50px] md:text-[60px] bg-gradient-to-t from-[#433D3A] via-[#C6C4C3] font-bold to-[#CAC8C6] bg-clip-text text-transparent p-6">
                                Case Overview
                            </p>
                            <button
                                className="cursor-pointer absolute right-0 top-0 pr-[40px] pt-[30px] text-[20px] font-semibold"
                                onClick={() => setOnPortfolioClick(false)}
                                aria-label="Close modal"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <Top/>
            <Contact onContactClick={onContactClick}/>
            <Footer/>
            {showMessageSuccess && (
                <div className="bg-[#101010] z-[40] w-[250px] fixed text-[13px] mb-[20px] ml-[30px] px-[20px] py-[20px] ring-white ring-[0.5px] rounded-[10px] text-white absolute left-0 bottom-0">
                    <p>Message saved successfully. Will get back to you soon:)</p>
                </div>
            )}
        </div>
    )
}

export default Blogs