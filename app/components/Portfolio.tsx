'use client'
import PortfolioCard from "./PortfolioCard";
import PrimaryBtn from "./PrimaryBtn";
import React, {useState, useEffect} from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

const Portfolio = () => {

    const [portfolio, setPortfolio] = React.useState([])

    useEffect(() => {
        (async () => {
            try {
                const response = await axios.get('https://new-portfolio-backend-roan.vercel.app/project')
                setPortfolio(response.data)
                console.log('Portfolio list', response.data)
            } catch (error) {
                console.error("Error fetching portfolio data:", error)
            }
        })()
    }, [])
    

    useEffect(() => {
        if(typeof window !== 'undefined'){
            import('scrollreveal').then((ScrollReveal) => { 
                ScrollReveal.default().reveal('.portfolio1', {
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
                ScrollReveal.default().reveal('.portfolio2', {
                origin: 'bottom',
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
                ScrollReveal.default().reveal('.portfolio3', {
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
                ScrollReveal.default().reveal('.portfolio4', {
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

    useEffect(() => {
        if(typeof window !== 'undefined'){
            import('scrollreveal').then((ScrollReveal) => { 
                ScrollReveal.default().reveal('.portfolio5', {
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
                ScrollReveal.default().reveal('.portfolio6', {
                origin: 'bottom',
                distance: '20px',
                duration: 800,
                delay: 1200,
                easing: 'ease-in-out',
                reset: false
            })
        })
        }
    }, [])


    const Router = useRouter()

    const onPortfolioCard1Click = () => {
        console.log("Clicked")
    }

    const onMoreProjectsClick = () => {

        Router.push('/portfolio')
    }

    const [onPortfolioClick, setOnPortfolioClick] = useState(false)
    

    return(
        <div className="bg-[#000]  py-[10vh] min-h-[200vh] flex items-center justify-center w-screen ">

            <div className=" w-[80%] ">
                <div className=" portfolio1 leading-[42px] md:leading-[60px] text-center">
                    <p className="text-[45px]  md:text-[60px] bg-gradient-to-t from-[#433D3A] via-[#C6C4C3] font-bold to-[#CAC8C6] bg-clip-text text-transparent">Explore the</p>
                    <p className="text-[40px] sm:text-[50px] md:text-[60px] bg-gradient-to-t from-[#433D3A] via-[#C6C4C3] font-bold to-[#CAC8C6] bg-clip-text text-transparent">Development Journey</p>
                </div>
                <p className="mt-[30px] portfolio2 mb-[20px] blogs3 font-bold text-[33px] sm:text-[45px]">Software Engineering</p>
                <div className=" portfolio3 mt-[30px] flex md:flex-row flex-col space-y-[40px]  md:space-y-[0px] md:space-x-[20px] items-center justify-center">
                    <PortfolioCard onClick={()=>setOnPortfolioClick(true)} lang1="Python" lang2="Next.js" lang3="Node.js" lang4="MongoDB" lang5="Express.js" lang6="Docker" text2="This project is a full-stack news web application built using the MENN (MongoDB, Express.js, Next.js, Node.js) stack. It features a dual-interface system, where regular users can browse, search, and bookmark news, while admins have a dedicated panel to manage news articles, categories, and user permissions. The integrated LLM chatbot provides real-time news summeries, making articles easier to digest and enhance user experience." text="News Web App" />
                    <PortfolioCard onClick={()=>setOnPortfolioClick(true)} lang1="Python" lang2="MongoDB" lang3="Next.js" lang4="Node.js" lang5="Express.js" lang6="Docker" text2="This project is a sustainable food resale platform built with MongoDB, Express.js, React, and Node.js, designed to reduce food waste by connecting businesses with surplus food to budget-conscious consumers. The app includes real-time inventory tracking, dynamic pricing based on expiry dates, and secure payment processing via Stripe." text="EcoHarvest" />
                   
                </div>
                
                
                
                <p className="mt-[40px] portfolio3 mb-[20px] blogs3 font-bold text-[33px] sm:text-[45px]">Data Science</p>
                <div className=" portfolio3 mt-[30px] flex md:flex-row flex-col space-y-[40px] md:space-y-[0px] md:space-x-[20px] items-center justify-center">
                    <PortfolioCard onClick={()=>setOnPortfolioClick(true)} lang1="Django" lang2="Matplotlib" lang3="Tensorflow" lang4="Pandas" lang5="" lang6="" text2="This AI-powered hybrid recommendation system is designed to provide personalized book and movie suggestions by intelligently combining collaborative filterinng (user-based preferences) and content-based filtering. Built with Python Flask for the backend and frontend, by leveraging Machine Learning and Natural Language Processing techniques. " text="Book / Movie Recommendation System" />
                    <PortfolioCard onClick={()=>setOnPortfolioClick(true)} lang1="FastApi" lang2="Matplotlib" lang3="Tensorflow" lang4="Pandas" lang5="" lang6="" text2="This project focuses on predicting stock prices using Machine Learning & Deep Learning models. The goal is to analyze historical stock market data, identify trends, and forecast future stock prices with high accuracy. The model can be used by traders and investors to make data-driven investment decisions." text="Stock Market Prediction" />
                    
                </div>

                
                <p className="mt-[40px] portfolio3 mb-[20px] blogs3 font-bold text-[33px] sm:text-[45px]">Computer Vision</p>
               <div className=" portfolio3 mt-[30px] flex md:flex-row flex-col space-y-[40px] md:space-y-[0px] md:space-x-[20px] items-center justify-center">
                    <PortfolioCard onClick={()=>setOnPortfolioClick(true)} lang1="Django" lang2="Matplotlib" lang3="Tensorflow" lang4="Pandas" lang5="" lang6="" text2="A real-time sign language translation tool powered by a hybrid CNN-LSTM model, achieving 92% accuracy in converting ASL/ISL gestures to text. Deployed via Flask, the system serves as an assistive tool for the hearing-impaired community." text="AI Sign Language Interpretater"/>
                    <PortfolioCard onClick={()=>setOnPortfolioClick(true)} lang1="FastApi" lang2="Matplotlib" lang3="Tensorflow" lang4="Pandas" lang5="" lang6="" text2="A multi-modal AI system that analyzes chest X-rays (DenseNet) and EKGs (1D-CNN) to detect conditions like pneumonia and arrhythmia, achieving 94% AUC. Includes Grad-CAM visualizations to explain predictions to medical professionals." text="Disease Diagnosis Assistant" />
                    
                </div>

                <div  className=" portfolio5 flex items-center justify-center mt-[30px]">
                    <PrimaryBtn text="More Projects" onClick={onMoreProjectsClick}/>
                </div>

            </div>
        <div
  className={`fixed top-0 left-0 z-[9999] h-[100vh] w-[100vw] flex flex-col items-center justify-center
    
    transition-opacity duration-500 ease-in-out
    ${onPortfolioClick ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}
  `}
>
  {/* Backdrop */}
  <div
    onClick={() => setOnPortfolioClick(false)}
    className={`bg-[#101010] h-full w-full opacity-50 transition-opacity duration-500 ease-in-out
      ${onPortfolioClick ? 'opacity-60' : 'opacity-0 pointer-events-none'}
    `}
  ></div>

  {/* Modal content */}
  <div
    className={`absolute lg:rounded-[20px] md:rounded-[10px] text-white bg-[#101010] ring-[1.5px] ring-[#373435]  h-[95vh] w-[85vw] z-20
      transform transition-transform duration-500 ease-in-out
      ${onPortfolioClick ? 'scale-100 opacity-100' : 'scale-95 opacity-0 pointer-events-none'}
    `}
  >
    <div className="flex flex-row items-center justify-center">
        <p className="text-[40px] sm:text-[50px] md:text-[60px] bg-gradient-to-t from-[#433D3A] via-[#C6C4C3] font-bold to-[#CAC8C6] bg-clip-text text-transparent p-6">
        Project Overview
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
    )
}

export default Portfolio;