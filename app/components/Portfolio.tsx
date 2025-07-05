'use client'
import PortfolioCard from "./PortfolioCard";
import PrimaryBtn from "./PrimaryBtn";
import React, {useEffect} from "react";
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
    

    return(
        <div className="bg-[#000] py-[10vh] min-h-[200vh] flex items-center justify-center w-screen ">

            <div className=" w-[80%] ">
                <div className=" portfolio1 leading-[40px] md:leading-[60px] text-center">
                    <p className="text-[45px]  md:text-[60px] bg-gradient-to-t from-[#433D3A] via-[#C6C4C3] font-bold to-[#CAC8C6] bg-clip-text text-transparent">Explore the</p>
                    <p className="text-[35px] sm:text-[50px] md:text-[60px] bg-gradient-to-t from-[#433D3A] via-[#C6C4C3] font-bold to-[#CAC8C6] bg-clip-text text-transparent">Development Journey</p>
                </div>
                <p className=" portfolio2 text-[30px] md:text-[40px] mt-[40px]">Software Engineering</p>
                <div className=" portfolio3 mt-[30px] flex md:flex-row flex-col space-y-[40px]  md:space-y-[0px] md:space-x-[20px] items-center justify-center">
                    <PortfolioCard lang1="Python" lang2="Next.js" lang3="Node.js" lang4="MongoDB" lang5="Express.js" lang6="Docker" text2="This project is a full-stack news web application built using the MENN (MongoDB, Express.js, Next.js, Node.js) stack. It features a dual-interface system, where regular users can browse, search, and bookmark news, while admins have a dedicated panel to manage news articles, categories, and user permissions. The integrated LLM chatbot provides real-time news summeries, making articles easier to digest and enhance user experience." text="News Web App" onClick={onPortfolioCard1Click}/>
                    <PortfolioCard lang1="Python" lang2="MongoDB" lang3="Next.js" lang4="Node.js" lang5="Express.js" lang6="Docker" text2="This project is a sustainable food resale platform built with MongoDB, Express.js, React, and Node.js, designed to reduce food waste by connecting businesses with surplus food to budget-conscious consumers. The app includes real-time inventory tracking, dynamic pricing based on expiry dates, and secure payment processing via Stripe." text="EcoHarvest" onClick={onPortfolioCard1Click}/>
                   
                </div>
                <p className=" portfolio3 text-[30px] md:text-[40px] mt-[40px]">Data Science</p>
                <div className=" portfolio3 mt-[30px] flex md:flex-row flex-col space-y-[40px] md:space-y-[0px] md:space-x-[20px] items-center justify-center">
                    <PortfolioCard lang1="Django" lang2="Matplotlib" lang3="Tensorflow" lang4="Pandas" lang5="" lang6="" text2="This AI-powered hybrid recommendation system is designed to provide personalized book and movie suggestions by intelligently combining collaborative filterinng (user-based preferences) and content-based filtering. Built with Python Flask for the backend and frontend, by leveraging Machine Learning and Natural Language Processing techniques. " text="Book / Movie Recommendation System" onClick={onPortfolioCard1Click}/>
                    <PortfolioCard lang1="FastApi" lang2="Matplotlib" lang3="Tensorflow" lang4="Pandas" lang5="" lang6="" text2="This project focuses on predicting stock prices using Machine Learning & Deep Learning models. The goal is to analyze historical stock market data, identify trends, and forecast future stock prices with high accuracy. The model can be used by traders and investors to make data-driven investment decisions." text="Stock Market Prediction" onClick={onPortfolioCard1Click}/>
                    
                </div>

                <p className=" portfolio3 text-[30px] md:text-[40px] mt-[40px]">Computer Vision</p>
               <div className=" portfolio3 mt-[30px] flex md:flex-row flex-col space-y-[40px] md:space-y-[0px] md:space-x-[20px] items-center justify-center">
                    <PortfolioCard lang1="Django" lang2="Matplotlib" lang3="Tensorflow" lang4="Pandas" lang5="" lang6="" text2="A real-time sign language translation tool powered by a hybrid CNN-LSTM model, achieving 92% accuracy in converting ASL/ISL gestures to text. Deployed via Flask, the system serves as an assistive tool for the hearing-impaired community." text="AI Sign Language Interpretater" onClick={onPortfolioCard1Click}/>
                    <PortfolioCard lang1="FastApi" lang2="Matplotlib" lang3="Tensorflow" lang4="Pandas" lang5="" lang6="" text2="A multi-modal AI system that analyzes chest X-rays (DenseNet) and EKGs (1D-CNN) to detect conditions like pneumonia and arrhythmia, achieving 94% AUC. Includes Grad-CAM visualizations to explain predictions to medical professionals." text="Disease Diagnosis Assistant" onClick={onPortfolioCard1Click}/>
                    
                </div>

                <div  className=" portfolio5 flex items-center justify-center mt-[30px]">
                    <PrimaryBtn text="More Projects" onClick={onMoreProjectsClick}/>
                </div>

            </div>
        </div>
    )
}

export default Portfolio;