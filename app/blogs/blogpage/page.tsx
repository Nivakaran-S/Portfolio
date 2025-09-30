'use client';
import Contact from "@/app/components/Contact";
import ContactModel from "@/app/components/ContactModel";
import Footer from "@/app/components/Footer";
import Max from "@/app/components/Max";
import Navigation from "@/app/components/Navigation";
import StarBackground from "@/app/components/StarBackground";
import Top from "@/app/components/Top";
import { useSearchParams } from "next/navigation";
import React, { useState, useEffect, Suspense } from 'react';
import axios from 'axios';
import Image from "next/image";
import DOMPurify from 'dompurify';
import Blogs from "@/app/components/Blogs";

interface Blog {
  _id: string;
  title: string;
  subtitle: string;
  content: string;
  blogsCategory: string;
  imageUrl: string;
  createdAt: string;
}

const BlogContent = () => {
  const [showContactModel, setShowContactModel] = useState(false);
  const [navSelection] = useState('Blogs');
  const [showMessageSuccess, setShowMessageSuccess] = useState(false);
  const [blog, setBlog] = useState<Blog | null>(null);
  const [error, setError] = useState<string | null>(null);
  const searchParams = useSearchParams();

  const API_BASE_URL = "https://portfolio-backend-new-2.vercel.app";

  const onMessageSuccess = () => {
    setShowMessageSuccess(true);
    setTimeout(() => setShowMessageSuccess(false), 3000);
  };

  const onContactClick = () => {
    setShowContactModel(!showContactModel);
  };

  const safeDecode = (param: string | null, fallback: string = ''): string => {
    if (!param || param === 'undefined' || param === 'null') return fallback;
    try {
      return decodeURIComponent(param.replace(/\+/g, ' '));
    } catch {
      return fallback;
    }
  };

  useEffect(() => {
    const id = safeDecode(searchParams.get('_id'), '');
    if (!id || id.length < 10) {
      setError('Invalid blog ID.');
      return;
    }

    const fetchBlog = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/blogs/${id}`);
        const data = res.data;

        setBlog({
          _id: id,
          title: data.title || 'Untitled Blog',
          subtitle: data.subtitle || 'No description available.',
          content: data.content || '<p>No content available.</p>',
          blogsCategory: data.blogsCategory || 'Uncategorized',
          imageUrl: data.imageUrl || '',
          createdAt: data.createdAt || '',
        });
      } catch (err) {
        setError('Failed to load blog content. Please try again later.');
      }
    };

    fetchBlog();
  }, [searchParams]);

  const sanitizedContent = blog?.content ? DOMPurify.sanitize(blog.content) : '';
  const categories = blog?.blogsCategory?.split(',').map(cat => cat.trim()) || ['Uncategorized'];

  return (
    <div className="w-[100%] overflow-x-hidden ">
      <Navigation navSelection={navSelection} onContactClick={onContactClick} />
      <ContactModel onMessageSuccess={onMessageSuccess} showContactModel={showContactModel} onContactClick={onContactClick} />

      {/* Hero Section */}
      <div>
        <StarBackground />
        <div className="min-h-[80vh]  2xl:min-h-[100vh] lg:min-h-[100vh] xl:min-h-[100vh]  sm:min-h-[100vh] flex items-end justify-center px-4 pb-[20px] sm:px-6 lg:px-8">
          <div className="w-full 2xl:w-[1200px] max-w-6xl flex flex-col justify-end py-10 sm:py-7">
            <h1 className="text-3xl sm:text-4xl md:text-xl lg:text-6xl w-full sm:w-[90%] lg:leading-[67px] text-white font-bold">
              {blog?.title || 'Loading...'}
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-500 w-full sm:w-[80%] mt-4 sm:mt-2">
              {blog?.subtitle || 'Loading...'}
            </p>
            <div className="flex flex-row flex-wrap gap-4 sm:gap-6 ml-2 sm:ml-4 mt-6 sm:mt-8 w-full sm:w-[60%] lg:w-[60%]">
              {categories.map((category, index) => (
                <div key={index} className="bg-white text-black px-4 py-1.5 rounded text-sm sm:text-base">
                  <p>15 mins</p>
                </div>
              ))}
              <div className="ring-1 ring-white text-white px-4 py-1.5 rounded text-sm sm:text-base">
                <p>{blog?.createdAt ? new Date(blog.createdAt).toLocaleDateString() : 'Unknown date'}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="min-h-screen bg-[#101010] flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-5xl flex flex-col lg:flex-row justify-between py-10 sm:py-16 lg:py-21 gap-8">
          
          <div className="w-full 2xl:w-[1200px] lg:w-[100%] text-[#A19F9F] flex flex-col px-4 sm:px-8">
            {error && <p className="text-red-500">{error}</p>}
            {blog?.imageUrl && (
              <Image
                height={600}
                width={1000}
                quality={100}
                src={blog.imageUrl}
                alt={blog.title}
                className="h-64 sm:h-80 md:h-96 rounded-2xl my-6 object-cover"
              />
            )}
            {blog && (
              <div
                className="text-sm  sm:text-[20px] space-y-[20px] text-white leading-[25px] sm:leading-[30px] [p]:mb-4 [p:last-child]:mb-0"
                dangerouslySetInnerHTML={{ __html: sanitizedContent }}
              />
            )}
          </div>
          
        </div>
      </div>
      <Blogs/>
      <Contact onContactClick={onContactClick} />
      <Footer />
      <Top />

      {showMessageSuccess && (
        <div className="bg-[#101010] z-40 w-64 sm:w-72 fixed text-xs sm:text-sm mb-6 ml-4 sm:ml-6 px-4 sm:px-6 py-4 sm:py-6 ring-1 ring-white rounded-lg text-white left-0 bottom-0">
          <p>Message saved successfully. Will get back to you soon :)</p>
        </div>
      )}
    </div>
  );
};

const BlogPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BlogContent />
    </Suspense>
  );
};

export default BlogPage;
