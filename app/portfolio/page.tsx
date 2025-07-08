'use client'
import Navigation from "../components/Navigation"
import { useState, useEffect } from "react";
import Footer from "../components/Footer";
import ContactModel from "../components/ContactModel";
import Contact from "../components/Contact";
import PortfolioCard from "../components/PortfolioCard";
import PrimaryBtn from "../components/PrimaryBtn";
import Top from "../components/Top";
import Max from "../components/Max";


const Portfolio = () => {
    const [showContactModel, setShowContactModel] = useState(false);
    const [navSelection, setNavSelection] = useState('Portfolio');
     const [showMessageSuccess, setShowMessageSuccess] = useState(false);
    
       const onMessageSuccess = () => {
        setShowMessageSuccess(true);
        setTimeout(() => {
          setShowMessageSuccess(false);
        }, 3000);
      };

    useEffect(() => {
        if(typeof window !== 'undefined'){
            import('scrollreveal').then((ScrollReveal) => { 
                ScrollReveal.default().reveal('.portfolioTitle1', {
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
              ScrollReveal.default().reveal('.portfolioTitle2', {
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
            ScrollReveal.default().reveal('.portfolioTitle3', {
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

    
      const onContactClick = () => {
        setShowContactModel(!showContactModel);
      }

      const onPortfolioCard1Click = () => {
        console.log("Portfolio Card 1 Clicked")
      }

      useEffect(() => {
    if (typeof window !== 'undefined') {
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
    if (typeof window !== 'undefined') {
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
    if (typeof window !== 'undefined') {
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
    if (typeof window !== 'undefined') {
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
    if (typeof window !== 'undefined') {
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


    return(
        <div className="flex w-[100vw] overflow-x-hidden flex-col">
            <Navigation navSelection={navSelection} onContactClick={onContactClick}/>
            <ContactModel onMessageSuccess={onMessageSuccess} showContactModel={showContactModel} onContactClick={onContactClick}/>
            <div className="text-white bg-[url('./images/heroBackground6.png')] bg-contain bg-no-repeat bg-center  sm:space-y-[30px] bg-[#000] px-[10vw] flex flex-col items-center justify-center sm:pt-[20vh] min-h-[100vh]">
              <div className="w-[100vw]  text-center leading-[71px] sm:leading-[90px] h-[100%]">
                <p className=" text-[40px] sm:text-[50px] md:text-[60px] aboutText4 aboutTitle1 bg-gradient-to-t from-[#433D3A] via-[#C6C4C3]  to-[#CAC8C6] bg-clip-text text-transparent">Explore</p>
                <p className=" text-[65px] sm:text-[75px] md:text-[80px] aboutTitle2 bg-gradient-to-t from-[#433D3A] via-[#C6C4C3] font-[600] to-[#CAC8C6] bg-clip-text text-transparent" >My Projects</p>
              </div>
              
              <div className="w-[100%] md:w-[50%] text-center h-[10px] sm:h-[160px]">

              </div>

              <div className="w-[100%]  md:w-[50%] text-center ">
                <p className=" aboutTitle3">Welcome to a showcase of my work, a curated collection of projects that reflect my passion for building smart, user-focused, and scalable digital solutions.</p>
              </div>
            </div>
            <div className=" py-[15vh] min-h-[200vh] flex items-center justify-center w-screen ">

            <div className="w-[95%] sm:w-[80%] ">
                <div className=" portfolio1 leading-[40px] md:leading-[60px] text-center">
                    <p className="text-[45px]  md:text-[60px] bg-gradient-to-t from-[#433D3A] via-[#C6C4C3] font-bold to-[#CAC8C6] bg-clip-text text-transparent">Explore the</p>
                    <p className="text-[35px] sm:text-[50px] md:text-[60px] bg-gradient-to-t from-[#433D3A] via-[#C6C4C3] font-bold to-[#CAC8C6] bg-clip-text text-transparent">Development Journey</p>
                </div>
                <p className="mt-[30px] aboutTitle3">Please click on any project to explore a detailed overview.</p>

                <p className=" portfolio2 text-[30px] sm:text-[40px] mt-[40px]">Software Engineering</p>
                <div className=" portfolio3 mt-[30px] flex md:flex-row flex-col space-y-[40px]  md:space-y-[0px] md:space-x-[20px] items-center justify-center">
                    <PortfolioCard lang1="Python" lang2="Next.js" lang3="Node.js" lang4="MongoDB" lang5="Express.js" lang6="Docker" text2="This project is a full-stack news web application built using the MENN (MongoDB, Express.js, Next.js, Node.js) stack. It features a dual-interface system, where regular users can browse, search, and bookmark news, while admins have a dedicated panel to manage news articles, categories, and user permissions. The integrated LLM chatbot provides real-time news summeries, making articles easier to digest and enhance user experience." text="News Web App" onClick={onPortfolioCard1Click}/>
                    <PortfolioCard lang1="Python" lang2="MongoDB" lang3="Next.js" lang4="Node.js" lang5="Express.js" lang6="Docker" text2="This project is a sustainable food resale platform built with MongoDB, Express.js, React, and Node.js, designed to reduce food waste by connecting businesses with surplus food to budget-conscious consumers. The app includes real-time inventory tracking, dynamic pricing based on expiry dates, and secure payment processing via Stripe." text="EcoHarvest" onClick={onPortfolioCard1Click}/>
                   
                </div>
                <div className=" portfolio3 mt-[30px] flex md:flex-row flex-col space-y-[40px]  md:space-y-[0px] md:space-x-[20px] items-center justify-center">
                    <PortfolioCard lang1="Python" lang2="Next.js" lang3="Node.js" lang4="MongoDB" lang5="Express.js" lang6="Docker" text2="This dynamic full-stack portfolio platform, built with MongoDB, Express.js, Next.js, and Node.js, serves as both a professional showcase and a content management system. Featuring an admin dashboard for easy blog updates, and a responsive UI with dark/light mode, it demonstrates my expertise in modern web development while providing an interactive experience for visitors. The app leverages Next.js for SEO-friendly performance and includes automated GitHub integration." text="Portfolio" onClick={onPortfolioCard1Click}/>
                    <PortfolioCard lang1="Python" lang2="MongoDB" lang3="Next.js" lang4="Node.js" lang5="Express.js" lang6="Docker" text2="A robust online examination system developed with Java, featuring automated grading, anti-cheating proctoring tools, and role-based access control for admins, teachers, and students." text="Java Examination System" onClick={onPortfolioCard1Click}/>
                   
                </div>
                <div className=" portfolio3 mt-[30px] flex md:flex-row flex-col space-y-[40px]  md:space-y-[0px] md:space-x-[20px] items-center justify-center">
                    <PortfolioCard lang1="Python" lang2="Next.js" lang3="Node.js" lang4="MongoDB" lang5="Express.js" lang6="Docker" text2="An intuitive personal finance manager for Android, built with Kotlin, offering expense tracking, budget alerts, and interactive financial dashboards. The app syncs data across devices using Firebase" text="Finance Tracker App" onClick={onPortfolioCard1Click}/>
                    <PortfolioCard lang1="Python" lang2="MongoDB" lang3="Next.js" lang4="Node.js" lang5="Express.js" lang6="Docker" text2="A cross-platform grocery e-commerce app developed with React Native" text="Selvah: Mobile App" onClick={onPortfolioCard1Click}/>
                   
                </div>
                <p className=" portfolio3 text-[33px] text-center md:text-[30px]  mt-[40px]">Mini Projects</p>
                <div className=" portfolio3 mt-[30px] grid grid-cols-2 gap-[10px] sm:flex md:flex-row flex-col sm:space-y-[40px] md:space-y-[0px] md:space-x-[20px] items-center justify-center">
                        <div className="hover:scale-[108%] transition-transform duration-500  w-[190px] sm:w-[220px] rounded-[15px] bg-black ring-[#373435] ring-[1px] cursor-pointer h-[320px]">
                            <div className="flex items-center justify-center bg-[#373435] rounded-t-[15px] h-[50%]">

                            </div>
                            <div className="flex flex-col h-[50%] rounded-b-[15px] bg-[#101010] w-full px-[15px] justify-center">
                                <p className="leading-[25px]">Project Title Project Title Project Title</p>
                                <div className="text-[10px] ">
                                    <p>Lorem ipsum dolor! Perspiciatis officia sit nemo error necessitatibus, cupiditate magnam numquam! Fugiat, reprehenderit placeat? Neque animi officia minus praesentium?</p>
                                </div>
                            </div>
                        </div>
                        <div className="hover:scale-[108%] transition-transform duration-500 w-[190px] sm:w-[220px] sm:w-[220px] rounded-[15px] bg-black ring-[#373435] ring-[1px] cursor-pointer h-[320px]">
                            <div className="flex items-center justify-center bg-[#373435] rounded-t-[15px] h-[50%]">

                            </div>
                            <div className="flex flex-col h-[50%] rounded-b-[15px] bg-[#101010] w-full px-[15px] justify-center">
                                <p className="leading-[25px]">Project Title Project Title Project Title</p>
                                <div className="text-[10px] ">
                                    <p>Lorem ipsum dolor! Perspiciatis officia sit nemo error necessitatibus, cupiditate magnam numquam! Fugiat, reprehenderit placeat? Neque animi officia minus praesentium?</p>
                                </div>
                            </div>
                        </div>  
                        <div className="hover:scale-[108%] transition-transform duration-500 w-[190px] sm:w-[220px] rounded-[15px] bg-black ring-[#373435] ring-[1px] cursor-pointer h-[320px]">
                            <div className="flex items-center justify-center bg-[#373435] rounded-t-[15px] h-[50%]">

                            </div>
                            <div className="flex flex-col h-[50%] rounded-b-[15px] bg-[#101010] w-full px-[15px] justify-center">
                                <p className="leading-[25px]">Project Title Project Title Project Title</p>
                                <div className="text-[10px] ">
                                    <p>Lorem ipsum dolor! Perspiciatis officia sit nemo error necessitatibus, cupiditate magnam numquam! Fugiat, reprehenderit placeat? Neque animi officia minus praesentium?</p>
                                </div>
                            </div>
                        </div> 
                        <div className="hover:scale-[108%] transition-transform duration-500 w-[190px] sm:w-[220px] rounded-[15px] bg-black ring-[#373435] ring-[1px] cursor-pointer h-[320px]">
                            <div className="flex items-center justify-center bg-[#373435] rounded-t-[15px] h-[50%]">

                            </div>
                            <div className="flex flex-col h-[50%] rounded-b-[15px] bg-[#101010] w-full px-[15px] justify-center">
                                <p className="leading-[25px]">Project Title Project Title Project Title</p>
                                <div className="text-[10px] ">
                                    <p>Lorem ipsum dolor! Perspiciatis officia sit nemo error necessitatibus, cupiditate magnam numquam! Fugiat, reprehenderit placeat? Neque animi officia minus praesentium?</p>
                                </div>
                            </div>
                        </div> 
                    </div>
                <p className=" portfolio3 text-[33px] md:text-[40px] mt-[40px]">Data Science</p>
                <div className=" portfolio3 mt-[30px] flex md:flex-row flex-col space-y-[40px] md:space-y-[0px] md:space-x-[20px] items-center justify-center">
                    <PortfolioCard lang1="Django" lang2="Matplotlib" lang3="Tensorflow" lang4="Pandas" lang5="" lang6="" text2="This AI-powered hybrid recommendation system is designed to provide personalized book and movie suggestions by intelligently combining collaborative filterinng (user-based preferences) and content-based filtering. Built with Python Flask for the backend and frontend, by leveraging Machine Learning and Natural Language Processing techniques. " text="Book / Movie Recommendation System" onClick={onPortfolioCard1Click}/>
                    <PortfolioCard lang1="FastApi" lang2="Matplotlib" lang3="Tensorflow" lang4="Pandas" lang5="" lang6="" text2="This project focuses on predicting stock prices using Machine Learning & Deep Learning models. The goal is to analyze historical stock market data, identify trends, and forecast future stock prices with high accuracy. The model can be used by traders and investors to make data-driven investment decisions." text="Stock Market Prediction" onClick={onPortfolioCard1Click}/>
                    
                </div>
                <div className=" portfolio3 mt-[30px] flex md:flex-row flex-col space-y-[40px] md:space-y-[0px] md:space-x-[20px] items-center justify-center">
                    <PortfolioCard lang1="Django" lang2="Matplotlib" lang3="Tensorflow" lang4="Pandas" lang5="" lang6="" text2="An ensemble model (XGBoost + Isolation Forest) trained to identify fraudulent financial transactions with 0.95 precision, preventing an estimated $250K+ in losses for simulated datasets." text="Fraud Detection in Transactions" onClick={onPortfolioCard1Click}/>
                    <PortfolioCard lang1="FastApi" lang2="Matplotlib" lang3="Tensorflow" lang4="Pandas" lang5="" lang6="" text2="A time-series forecasting model (SARIMA) that predicts package delivery ETAs with 90% accuracy using traffic and weather data, reducing late deliveries by 30% for logistics partners." text="Delivery Time Prediction (Last-Mile ETA)" onClick={onPortfolioCard1Click}/>
                    
                </div>
                  <div className=" portfolio3 mt-[30px] flex md:flex-row flex-col space-y-[40px] md:space-y-[0px] md:space-x-[20px] items-center justify-center">
                    <PortfolioCard lang1="Django" lang2="Matplotlib" lang3="Tensorflow" lang4="Pandas" lang5="" lang6="" text2="A demand prediction system (Facebook Prophet) that minimizes retail stockouts by forecasting inventory needs at specific locations, cutting lost sales by 20% in pilot deployments." text="Inventory Stock-Out" onClick={onPortfolioCard1Click}/>
                   <PortfolioCard lang1="Django" lang2="Matplotlib" lang3="Tensorflow" lang4="Pandas" lang5="" lang6="" text2="A machine learning-powered pricing optimization system that automatically adjusts product prices in real-time based on demand, competitor pricing, inventory levels, and customer behavior. Built for e-commerce platforms, this engine uses reinforcement learning (RL) and predictive modeling to maximize revenue while staying competitive." text="Dynamic Pricing Enging for E-Commerce" onClick={onPortfolioCard1Click}/>
                   
                </div>
                
                <p className=" portfolio3 text-[33px] text-center md:text-[30px]  mt-[40px]">Mini Projects</p>
                <div className=" portfolio3 mt-[30px] grid grid-cols-2 gap-[10px] sm:flex md:flex-row flex-col sm:space-y-[40px] md:space-y-[0px] md:space-x-[20px] items-center justify-center">
                        <div className="hover:scale-[108%] transition-transform duration-500  w-[190px] sm:w-[220px] rounded-[15px] bg-black ring-[#373435] ring-[1px] cursor-pointer h-[320px]">
                            <div className="flex items-center justify-center bg-[#373435] rounded-t-[15px] h-[50%]">

                            </div>
                            <div className="flex flex-col h-[50%] rounded-b-[15px] bg-[#101010] w-full px-[15px] justify-center">
                                <p className="leading-[25px]">Project Title Project Title Project Title</p>
                                <div className="text-[10px] ">
                                    <p>Lorem ipsum dolor! Perspiciatis officia sit nemo error necessitatibus, cupiditate magnam numquam! Fugiat, reprehenderit placeat? Neque animi officia minus praesentium?</p>
                                </div>
                            </div>
                        </div>
                        <div className="hover:scale-[108%] transition-transform duration-500 w-[190px] sm:w-[220px] sm:w-[220px] rounded-[15px] bg-black ring-[#373435] ring-[1px] cursor-pointer h-[320px]">
                            <div className="flex items-center justify-center bg-[#373435] rounded-t-[15px] h-[50%]">

                            </div>
                            <div className="flex flex-col h-[50%] rounded-b-[15px] bg-[#101010] w-full px-[15px] justify-center">
                                <p className="leading-[25px]">Project Title Project Title Project Title</p>
                                <div className="text-[10px] ">
                                    <p>Lorem ipsum dolor! Perspiciatis officia sit nemo error necessitatibus, cupiditate magnam numquam! Fugiat, reprehenderit placeat? Neque animi officia minus praesentium?</p>
                                </div>
                            </div>
                        </div>  
                        <div className="hover:scale-[108%] transition-transform duration-500 w-[190px] sm:w-[220px] rounded-[15px] bg-black ring-[#373435] ring-[1px] cursor-pointer h-[320px]">
                            <div className="flex items-center justify-center bg-[#373435] rounded-t-[15px] h-[50%]">

                            </div>
                            <div className="flex flex-col h-[50%] rounded-b-[15px] bg-[#101010] w-full px-[15px] justify-center">
                                <p className="leading-[25px]">Project Title Project Title Project Title</p>
                                <div className="text-[10px] ">
                                    <p>Lorem ipsum dolor! Perspiciatis officia sit nemo error necessitatibus, cupiditate magnam numquam! Fugiat, reprehenderit placeat? Neque animi officia minus praesentium?</p>
                                </div>
                            </div>
                        </div> 
                        <div className="hover:scale-[108%] transition-transform duration-500 w-[190px] sm:w-[220px] rounded-[15px] bg-black ring-[#373435] ring-[1px] cursor-pointer h-[320px]">
                            <div className="flex items-center justify-center bg-[#373435] rounded-t-[15px] h-[50%]">

                            </div>
                            <div className="flex flex-col h-[50%] rounded-b-[15px] bg-[#101010] w-full px-[15px] justify-center">
                                <p className="leading-[25px]">Project Title Project Title Project Title</p>
                                <div className="text-[10px] ">
                                    <p>Lorem ipsum dolor! Perspiciatis officia sit nemo error necessitatibus, cupiditate magnam numquam! Fugiat, reprehenderit placeat? Neque animi officia minus praesentium?</p>
                                </div>
                            </div>
                        </div> 
                    </div>
                <p className=" portfolio3 text-[33px] md:text-[40px] mt-[40px]">Computer Vision</p>
               <div className=" portfolio3 mt-[30px] flex md:flex-row flex-col space-y-[40px] md:space-y-[0px] md:space-x-[20px] items-center justify-center">
                    <PortfolioCard lang1="Django" lang2="Matplotlib" lang3="Tensorflow" lang4="Pandas" lang5="" lang6="" text2="A real-time sign language translation tool powered by a hybrid CNN-LSTM model, achieving 92% accuracy in converting ASL/ISL gestures to text. Deployed via Flask, the system serves as an assistive tool for the hearing-impaired community." text="AI Sign Language Interpretater" onClick={onPortfolioCard1Click}/>
                    <PortfolioCard lang1="FastApi" lang2="Matplotlib" lang3="Tensorflow" lang4="Pandas" lang5="" lang6="" text2="A multi-modal AI system that analyzes chest X-rays (DenseNet) and EKGs (1D-CNN) to detect conditions like pneumonia and arrhythmia, achieving 94% AUC. Includes Grad-CAM visualizations to explain predictions to medical professionals." text="Disease Diagnosis Assistant" onClick={onPortfolioCard1Click}/>
                    
                </div>
                <div className=" portfolio3 mt-[30px] flex md:flex-row flex-col space-y-[40px] md:space-y-[0px] md:space-x-[20px] items-center justify-center">
                    <PortfolioCard lang1="Django" lang2="Matplotlib" lang3="Tensorflow" lang4="Pandas" lang5="" lang6="" text2="A deep learning model (ResNet50) trained on the Food-101 dataset to classify food images into 101 categories with 88% accuracy. The system integrates with nutrition APIs to estimate calorie content from user-uploaded meal photos." text="Food Image Classification" onClick={onPortfolioCard1Click}/>
                    <PortfolioCard lang1="FastApi" lang2="Matplotlib" lang3="Tensorflow" lang4="Pandas" lang5="" lang6="" text2="A transformer-based model (LipNet) trained to transcribe silent speech from video clips, achieving 80% word-level accuracy on the LRW dataset. Potential applications include security and assistive technology." text="Lip Reading from Silent Videos" onClick={onPortfolioCard1Click}/>
                    
                </div>
                <div className=" portfolio3 mt-[30px] flex md:flex-row flex-col space-y-[40px] md:space-y-[0px] md:space-x-[20px] items-center justify-center">
                    <PortfolioCard lang1="Django" lang2="Matplotlib" lang3="Tensorflow" lang4="Pandas" lang5="" lang6="" text2="A real-time AI system that detects PPE violations (missing hardhats/vests) and hazardous zone intrusions at construction sites using CCTV feeds. Achieves 94% accuracy with edge-optimized models, reducing workplace accidents by 40% in pilot deployments. Features automated alerts and compliance reporting." text="Real-Time Construction Site Safety Monitor" onClick={onPortfolioCard1Click}/>
                    <PortfolioCard lang1="Django" lang2="Matplotlib" lang3="Tensorflow" lang4="Pandas" lang5="" lang6="" text2="An intelligent traffic enforcement solution that identifies red-light running, speeding, and unregistered vehicles in real-time. Processes 50+ camera feeds simultaneously with 92% accuracy, generating evidence packages for law enforcement. Pilot implementation reduced intersection accidents by 35%." text="Real-Time Traffic Violation System" onClick={onPortfolioCard1Click}/>
                    
                </div>
                <p className=" portfolio3 text-[33px] text-center md:text-[30px]  mt-[40px]">Mini Projects</p>
                <div className=" portfolio3 mt-[30px] grid grid-cols-2 gap-[10px] sm:flex md:flex-row flex-col sm:space-y-[40px] md:space-y-[0px] md:space-x-[20px] items-center justify-center">
                        <div className="hover:scale-[108%] transition-transform duration-500  w-[190px] sm:w-[220px] rounded-[15px] bg-black ring-[#373435] ring-[1px] cursor-pointer h-[320px]">
                            <div className="flex items-center justify-center bg-[#373435] rounded-t-[15px] h-[50%]">

                            </div>
                            <div className="flex flex-col h-[50%] rounded-b-[15px] bg-[#101010] w-full px-[15px] justify-center">
                                <p className="leading-[25px]">Project Title Project Title Project Title</p>
                                <div className="text-[10px] ">
                                    <p>Lorem ipsum dolor! Perspiciatis officia sit nemo error necessitatibus, cupiditate magnam numquam! Fugiat, reprehenderit placeat? Neque animi officia minus praesentium?</p>
                                </div>
                            </div>
                        </div>
                        <div className="hover:scale-[108%] transition-transform duration-500 w-[190px] sm:w-[220px] sm:w-[220px] rounded-[15px] bg-black ring-[#373435] ring-[1px] cursor-pointer h-[320px]">
                            <div className="flex items-center justify-center bg-[#373435] rounded-t-[15px] h-[50%]">

                            </div>
                            <div className="flex flex-col h-[50%] rounded-b-[15px] bg-[#101010] w-full px-[15px] justify-center">
                                <p className="leading-[25px]">Project Title Project Title Project Title</p>
                                <div className="text-[10px] ">
                                    <p>Lorem ipsum dolor! Perspiciatis officia sit nemo error necessitatibus, cupiditate magnam numquam! Fugiat, reprehenderit placeat? Neque animi officia minus praesentium?</p>
                                </div>
                            </div>
                        </div>  
                        <div className="hover:scale-[108%] transition-transform duration-500 w-[190px] sm:w-[220px] rounded-[15px] bg-black ring-[#373435] ring-[1px] cursor-pointer h-[320px]">
                            <div className="flex items-center justify-center bg-[#373435] rounded-t-[15px] h-[50%]">

                            </div>
                            <div className="flex flex-col h-[50%] rounded-b-[15px] bg-[#101010] w-full px-[15px] justify-center">
                                <p className="leading-[25px]">Project Title Project Title Project Title</p>
                                <div className="text-[10px] ">
                                    <p>Lorem ipsum dolor! Perspiciatis officia sit nemo error necessitatibus, cupiditate magnam numquam! Fugiat, reprehenderit placeat? Neque animi officia minus praesentium?</p>
                                </div>
                            </div>
                        </div> 
                        <div className="hover:scale-[108%] transition-transform duration-500 w-[190px] sm:w-[220px] rounded-[15px] bg-black ring-[#373435] ring-[1px] cursor-pointer h-[320px]">
                            <div className="flex items-center justify-center bg-[#373435] rounded-t-[15px] h-[50%]">

                            </div>
                            <div className="flex flex-col h-[50%] rounded-b-[15px] bg-[#101010] w-full px-[15px] justify-center">
                                <p className="leading-[25px]">Project Title Project Title Project Title</p>
                                <div className="text-[10px] ">
                                    <p>Lorem ipsum dolor! Perspiciatis officia sit nemo error necessitatibus, cupiditate magnam numquam! Fugiat, reprehenderit placeat? Neque animi officia minus praesentium?</p>
                                </div>
                            </div>
                        </div> 
                    </div>
                <p className=" portfolio3 text-[33px] md:text-[40px] mt-[40px]">AI Agents</p>
               <div className=" portfolio3 mt-[30px] flex md:flex-row flex-col space-y-[40px] md:space-y-[0px] md:space-x-[20px] items-center justify-center">
                    <PortfolioCard lang1="Django" lang2="Matplotlib" lang3="Tensorflow" lang4="Pandas" lang5="" lang6="" text2="An AI that responds to user queries using text, images or voice in real-time" text="Autonomous Customer Support Agent" onClick={onPortfolioCard1Click}/>
                    <PortfolioCard lang1="FastApi" lang2="Matplotlib" lang3="Tensorflow" lang4="Pandas" lang5="" lang6="" text2="Agent that collects symptoms, interprets radiology reports (e.g., X-rays), suggest actions or raise alarms" text="Medical Diagnosis + Assistant Agent" onClick={onPortfolioCard1Click}/>
                    
                </div>
                <p className=" portfolio3 text-[33px] text-center md:text-[30px]  mt-[40px]">Mini Projects</p>
                <div className=" portfolio3 mt-[30px] grid grid-cols-2 gap-[10px] sm:flex md:flex-row flex-col sm:space-y-[40px] md:space-y-[0px] md:space-x-[20px] items-center justify-center">
                        <div className="hover:scale-[108%] transition-transform duration-500  w-[190px] sm:w-[220px] rounded-[15px] bg-black ring-[#373435] ring-[1px] cursor-pointer h-[320px]">
                            <div className="flex items-center justify-center bg-[#373435] rounded-t-[15px] h-[50%]">

                            </div>
                            <div className="flex flex-col h-[50%] rounded-b-[15px] bg-[#101010] w-full px-[15px] justify-center">
                                <p className="leading-[25px]">Project Title Project Title Project Title</p>
                                <div className="text-[10px] ">
                                    <p>Lorem ipsum dolor! Perspiciatis officia sit nemo error necessitatibus, cupiditate magnam numquam! Fugiat, reprehenderit placeat? Neque animi officia minus praesentium?</p>
                                </div>
                            </div>
                        </div>
                        <div className="hover:scale-[108%] transition-transform duration-500 w-[190px] sm:w-[220px] sm:w-[220px] rounded-[15px] bg-black ring-[#373435] ring-[1px] cursor-pointer h-[320px]">
                            <div className="flex items-center justify-center bg-[#373435] rounded-t-[15px] h-[50%]">

                            </div>
                            <div className="flex flex-col h-[50%] rounded-b-[15px] bg-[#101010] w-full px-[15px] justify-center">
                                <p className="leading-[25px]">Project Title Project Title Project Title</p>
                                <div className="text-[10px] ">
                                    <p>Lorem ipsum dolor! Perspiciatis officia sit nemo error necessitatibus, cupiditate magnam numquam! Fugiat, reprehenderit placeat? Neque animi officia minus praesentium?</p>
                                </div>
                            </div>
                        </div>  
                        <div className="hover:scale-[108%] transition-transform duration-500 w-[190px] sm:w-[220px] rounded-[15px] bg-black ring-[#373435] ring-[1px] cursor-pointer h-[320px]">
                            <div className="flex items-center justify-center bg-[#373435] rounded-t-[15px] h-[50%]">

                            </div>
                            <div className="flex flex-col h-[50%] rounded-b-[15px] bg-[#101010] w-full px-[15px] justify-center">
                                <p className="leading-[25px]">Project Title Project Title Project Title</p>
                                <div className="text-[10px] ">
                                    <p>Lorem ipsum dolor! Perspiciatis officia sit nemo error necessitatibus, cupiditate magnam numquam! Fugiat, reprehenderit placeat? Neque animi officia minus praesentium?</p>
                                </div>
                            </div>
                        </div> 
                        <div className="hover:scale-[108%] transition-transform duration-500 w-[190px] sm:w-[220px] rounded-[15px] bg-black ring-[#373435] ring-[1px] cursor-pointer h-[320px]">
                            <div className="flex items-center justify-center bg-[#373435] rounded-t-[15px] h-[50%]">

                            </div>
                            <div className="flex flex-col h-[50%] rounded-b-[15px] bg-[#101010] w-full px-[15px] justify-center">
                                <p className="leading-[25px]">Project Title Project Title Project Title</p>
                                <div className="text-[10px] ">
                                    <p>Lorem ipsum dolor! Perspiciatis officia sit nemo error necessitatibus, cupiditate magnam numquam! Fugiat, reprehenderit placeat? Neque animi officia minus praesentium?</p>
                                </div>
                            </div>
                        </div> 
                    </div>
                
               

            </div>
        </div>
        <Top/>
        <Max/>
            <Contact onContactClick={onContactClick}/>
            <Footer/>
        </div>
    )
}

export default Portfolio