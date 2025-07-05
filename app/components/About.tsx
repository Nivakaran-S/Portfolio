'use client'

import PrimaryBtn from "./PrimaryBtn";
import SecondaryBtn from "./SecondaryBtn";
import React, {useEffect, useRef, useState} from "react";
import { useRouter } from "next/navigation";

const About = () => {

    const [count, setCount] = useState(0);
    const [isVisible, setIsVisible] = useState(false);
    const targetCount = 9;
    const counterRef = useRef(null);

    const [experience, setExperience] = useState(0);
    const targetExperience = 2;
    const router = useRouter();
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.1 }
        );

        if (counterRef.current) {
            observer.observe(counterRef.current);
        }

        return () => {
            if (counterRef.current) {
                observer.unobserve(counterRef.current);
            }
        }
    }, [])

    useEffect(() => {
        if(isVisible && count < targetCount) {
            const interval = setInterval(() => {
                setCount((prev) => prev + 1);
            }, 1000);

            return () => clearInterval(interval);
            
        }
    }, [isVisible, count])

    useEffect(() => {
        if(isVisible && experience < targetExperience) {
            const interval = setInterval(() => {
                setExperience((prev) => prev + 1);
            }, 1000);

            return () => clearInterval(interval);
            
        }
    }, [isVisible, experience])

    useEffect(() => {
            if(typeof window !== 'undefined'){
                import('scrollreveal').then((ScrollReveal) => { 
                    ScrollReveal.default().reveal('.about1', {
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
                    ScrollReveal.default().reveal('.about2', {
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
                    ScrollReveal.default().reveal('.about3', {
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
                    ScrollReveal.default().reveal('.about4', {
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

    const onLearnMoreClick = () => {
        router.push('/about')
        
    }

    const onDownloadResumeClick = () => {
        console.log("Download resume clicked")
    }


    return(
        <div ref={counterRef} className="bg-[#101010]  min-h-[110vh] w-screen flex flex-col items-center py-[115px] ">
            <div className="w-[80%]  flex  flex-col   ">
                <div className="about1 text-[40px] leading-[40px]">
                    <p className="text-[24.72px] ">Turning Ideas into Intelligent</p>
                    <p className="text-[35px] sm:text-[40px]">Scalable, and Impactful Digital Solutions</p>
                </div>
                <div className="w-[60%] mt-[10px]">
                    <p className="about2  w-[170%] sm:text-left text-[15.27px]">I'm currently pursuing a B.Sc in Information Technology, at 
                        Sri Lanka Institute of Information Technology(SLIIT). I am passionate about data science,
                        software engineering, and AI, constantly exploring innovative solutions and building Impactful
                        solutions.
                    </p>
                    <div className="flex about3 flex-row space-x-[20px] w-[350px] mt-[20px]">
                        <SecondaryBtn text="Download Resume" onClick={onDownloadResumeClick}/>
                        <PrimaryBtn text="Learn more" onClick={onLearnMoreClick}  />
                    </div>
                </div>
                <div className="about4 flex flex-row justify-center space-x-[40px] sm:space-x-[80px] mt-[75px]">
                    <div className="text-center flex leading-[155px] flex-col items-center">
                        <p className="text-[140px] sm:text-[169.43px] bg-gradient-to-t from-[#433D3A] via-[#C6C4C3] font-bold to-[#CAC8C6] bg-clip-text text-transparent">{count}+</p>
                        <div className="text-[24.72px] leading-[30px] w-[50%] text-center  ">
                            <p>Projects Completed</p>
                        </div>
                    </div>
                    <div className="text-center flex leading-[155px] flex-col items-center">
                        <p className="text-[140px] sm:text-[169.43px] bg-gradient-to-t from-[#433D3A] via-[#C6C4C3] font-bold to-[#CAC8C6] bg-clip-text text-transparent">{experience}+</p>
                        <div className="text-[24.72px] leading-[30px] w-[60%] text-center  ">
                            <p>Years Experience</p>
                        </div>
                    </div>
                </div>
                
            </div>
        </div>
    )
}

export default About;