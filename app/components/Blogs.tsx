'use client';

import BlogCard from "./BlogCard";
import PrimaryBtn from "./PrimaryBtn";
import Navigation from "../components/Navigation";
import ContactModel from "../components/ContactModel";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import Top from "../components/Top";
import StarBackground from "../components/StarBackground";
import CaseStudyCard from "../components/CaseStudyCard";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

// Define blog and category interfaces based on API response
interface Blog {
  _id: string;
  title: string;
  subtitle: string;
  content: string;
  imageUrl?: string | null;
  blogsCategory: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface BlogCategory {
  _id: string;
  title: string;
}

const Blogs = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [categories, setCategories] = useState<BlogCategory[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showContactModel, setShowContactModel] = useState(false);
  const [navSelection, setNavSelection] = useState('Blogs');
  const [showMessageSuccess, setShowMessageSuccess] = useState(false);
  const [onPortfolioClick, setOnPortfolioClick] = useState(false);
  const router = useRouter();
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://portfolio-backend-new-2.vercel.app';

  // Fetch blogs and categories
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Fetch categories
        const categoriesResponse = await axios.get<BlogCategory[]>(`${API_BASE_URL}/blogCategory`, { withCredentials: true });
        setCategories(categoriesResponse.data);

        // Fetch blogs
        const blogsResponse = await axios.get<Blog[]>(`${API_BASE_URL}/blogs`, { withCredentials: true });
        setBlogs(blogsResponse.data);
        console.log('Blog list:', blogsResponse.data);
        console.log('Categories:', categoriesResponse.data);
      } catch (error: any) {
        const errorMessage = error.response?.data?.message || 'Failed to load blogs or categories.';
        setError(errorMessage);
        console.error("Error fetching blog data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Apply scrollreveal animations
  useEffect(() => {
        if(typeof window !== 'undefined'){
            import('scrollreveal').then((ScrollReveal) => { 
                ScrollReveal.default().reveal('.blogs1', {
                origin: 'bottom',
                distance: '20px',
                duration: 800,
                delay: 200,
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
                ScrollReveal.default().reveal('.blogs3', {
                origin: 'left',
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
                ScrollReveal.default().reveal('.blogs4', {
                origin: 'bottom',
                distance: '20px',
                duration: 800,
                delay: 800,
                easing: 'ease-in-out',
                reset: false
            })
        })
        }
    }, [])

  const onMessageSuccess = () => {
    setShowMessageSuccess(true);
    setTimeout(() => {
      setShowMessageSuccess(false);
    }, 3000);
  };

  const onContactClick = () => {
    setShowContactModel(!showContactModel);
  };

  const onBlogClick = (blog: Blog) => {
    router.push(`/blogs/blogpage?_id=${encodeURIComponent(blog._id || '')}`);
  };

  const onAllBlogsClick = () => {
    router.push('/blogs');
  };

  // Validate URL
  const isValidUrl = (url: string | null | undefined): url is string => {
    if (!url || typeof url !== 'string' || url.trim() === '') return false;
    try {
      new URL(url);
      return true;
    } catch {
      console.warn(`Invalid URL detected in Blogs: ${url}`);
      return false;
    }
  };

  return (
    <div className="flex border-b-[1px] border-t-[1px] border-white text-white w-[100vw] overflow-x-hidden flex-col">
      

      <div className="min-h-[120vh] 2xl:min-h-[80vh] bg-[#000000] py-[10vh] w-screen flex items-center justify-center">
        <div className="w-[95%] sm:w-[80%] flex items-center justify-center flex-col">
           <div className="leading-[50px] sm:leading-[64px] blogs1 text-center">
                    <p className="text-[44px] sm:text-[55px] bg-gradient-to-t from-[#433D3A] via-[#C6C4C3] font-bold to-[#CAC8C6] bg-clip-text text-transparent">Stay Updated</p>
                    <p className="text-[40px] sm:text-[55px] bg-gradient-to-t from-[#433D3A] via-[#C6C4C3] font-bold to-[#CAC8C6] bg-clip-text text-transparent">with Latest Insights</p>
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
            <div className="flex items-center justify-center h-[50vh] text-white">
              <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-gray-200 border-solid"></div>
            </div>
          ) : categories.length === 0 ? (
            <p className="text-gray-500 italic text-center mt-6">No categories found.</p>
          ) : (
            ((
              <div  className="mt-[30px]">
                <div className={`blogs flex items-center justify-center`}>
                  <div className="grid w-[95%] sm:w-[100%] grid-cols-2 lg:grid-cols-3 lg:grid-cols-4 gap-[20px] sm:gap-[20px]">
                    {blogs
                      .slice(0, 4)
                      .map((blog) => (
                        <BlogCard
                          key={blog._id}
                          image={isValidUrl(blog.imageUrl) ? blog.imageUrl : null}
                          text={blog.subtitle}
                          text1={blog.title}
                          onClick={() => onBlogClick(blog)}
                        />
                      ))}
                  </div>
                </div>
              </div>
            ))
          )}

        

          <div className="flex blogs4 items-center justify-center mt-[30px]">
            <PrimaryBtn text="More Blogs" onClick={onAllBlogsClick} />
          </div>
        </div>

        <div
          className={`fixed top-0 left-0 z-[9999] h-[100vh] w-[100vw] flex flex-col items-center justify-center transition-opacity duration-500 ease-in-out ${
            onPortfolioClick ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
        >
          <div
            onClick={() => setOnPortfolioClick(false)}
            className={`bg-[#101010] h-full w-full opacity-50 transition-opacity duration-500 ease-in-out ${
              onPortfolioClick ? 'opacity-60' : 'opacity-0 pointer-events-none'
            }`}
          ></div>
          <div
            className={`absolute lg:rounded-[20px] md:rounded-[10px] text-white bg-[#101010] ring-[1.5px] ring-[#373435] h-[95vh] w-[85vw] z-20 transform transition-transform duration-500 ease-in-out ${
              onPortfolioClick ? 'scale-100 opacity-100' : 'scale-95 opacity-0 pointer-events-none'
            }`}
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
      {showMessageSuccess && (
        <div className="bg-[#101010] z-[40] w-[250px] fixed text-[13px] mb-[20px] ml-[30px] px-[20px] py-[20px] ring-white ring-[0.5px] rounded-[10px] text-white absolute left-0 bottom-0">
          <p>Message saved successfully. Will get back to you soon:)</p>
        </div>
      )}
    </div>
  );
};

export default Blogs;