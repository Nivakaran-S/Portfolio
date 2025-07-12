
import Image from "next/image";
import Nivakaran from '../images/nivakaranText.png'

import React, {useEffect} from "react";


const Hero = () => {

    useEffect(() => {
        if(typeof window !== 'undefined'){
            import('scrollreveal').then((ScrollReveal) => { 
                ScrollReveal.default().reveal('.hero1', {
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
                ScrollReveal.default().reveal('.hero2', {
                origin: 'bottom',
                distance: '20px',
                duration: 800,
                delay: 500,
                easing: 'ease-in-out',
                reset: false
            })
        })
        }
    }, [])

    useEffect(() => {
        if(typeof window !== 'undefined'){
            import('scrollreveal').then((ScrollReveal) => { 
                ScrollReveal.default().reveal('.hero3', {
                origin: 'bottom',
                distance: '50px',
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
            ScrollReveal.default().reveal('.hero4', {
              duration: 1000,
              delay: 1200,
              easing: 'ease-in-out',
              reset: false,
              opacity: 0, 
            });
          });
        }
      }, []);

       useEffect(() => {
        if (typeof window !== 'undefined') {
          import('scrollreveal').then((ScrollReveal) => {
            ScrollReveal.default().reveal('.hero5', {
              duration: 1000,
              delay: 1400,
              easing: 'ease-in-out',
              reset: false,
              opacity: 0, 
            });
          });
        }
      }, []);

    const onKnowClick = () => {
        document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
    }
    
    return(
        <div className=" bg-[#000] w-[100vw] sm:bg-[url('./images/heroBackground10.png')] bg-contain bg-no-repeat bg-center h-[100vh] flex items-center justify-center">
            <div className="flex pb-[30px] flex-col text-center">
                <p className="hero1">Hello there!</p>
                <p className=" hero2  text-[30px]">This is</p>
                <Image className="hero3 h-[60px] w-[300px] sm:w-[100%] sm:h-[80px]" alt="Nivakaran" src={Nivakaran} />
                <p className="text-[35px] hero4">Developer</p>
                <div className="flex flex-row absolute bottom-[30%] right-[45%] left-[45%] items-center justify-center ">
                   
                    <div onClick={() => onKnowClick()} className="hero4 bg-[#1F120D]  transition-all duration-300 shadow-md hover:shadow-lg ring-[1px] hover:ring-[3px] ring-[#D9CDBB] text-white hover:text-white hover:bg-[#5E3828] px-[25px] py-[8px] rounded-full cursor-pointer">
                        <p>Know More</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Hero;