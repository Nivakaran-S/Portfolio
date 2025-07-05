
import React, { useEffect } from 'react';


const Services = () => {

    useEffect(() => {
        if(typeof window !== 'undefined'){
            import('scrollreveal').then((ScrollReveal) => { 
                ScrollReveal.default().reveal('.services1', {
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
                ScrollReveal.default().reveal('.services2', {
                origin: 'right',
                distance: '50px',
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
                ScrollReveal.default().reveal('.services3', {
                origin: 'left',
                distance: '50px',
                duration: 800,
                delay: 600,
                easing: 'ease-in-out',
                reset: false
            })
        })
        }
    }, [])

    return(
        <div className="bg-[#101010] min-h-[100vh] py-[80px] w-screen flex items-center justify-center">
            <div className="w-[80%]  flex flex-col ">
                <p className="text-[40px] leading-[48px] services1 bg-gradient-to-t from-[#433D3A] via-[#C6C4C3] to-[#CAC8C6] bg-clip-text text-transparent">Discover the Services Provided</p>

                <div className="flex flex-col md:flex-row items-center justify-center space-y-[30px] md:space-y-[0px] md:space-x-[70px] mt-[30px]">
                    <div className=" services2 space-y-[20px] flex flex-col items-center justify-center">
                        <div className="bg-[#000] w-[340px] sm:w-[400px] ring-[0.5px] ring-[#4d4d4d] h-[90px] rounded-[15px] flex items-center justify-center">
                            <p className="text-[25px]">UI/UX Designing</p>
                        </div>
                        <div className="bg-[#000] w-[340px] sm:w-[400px] ring-[0.5px] ring-[#4d4d4d] h-[90px] rounded-[15px] flex items-center justify-center">
                            <p className="text-[25px]">Web App Development</p>
                        </div>
                        <div className="bg-[#000] w-[340px] sm:w-[400px] ring-[0.5px] ring-[#4d4d4d] h-[90px] rounded-[15px] flex items-center justify-center">
                            <p className="text-[21px] text-center leading-[30px] w-[80%]">Custom Software Development</p>
                        </div>
                    </div>
                    <div className=" services3 space-y-[20px] flex flex-col items-center justify-center">
                        <div className="bg-[#000] w-[340px] sm:w-[400px] ring-[0.5px] ring-[#4d4d4d] h-[90px] rounded-[15px] flex items-center justify-center">
                            <p className="text-[25px]">Mobile App Development</p>
                        </div>
                        <div className="bg-[#000] w-[340px] sm:w-[400px] ring-[0.5px] ring-[#4d4d4d] h-[90px] rounded-[15px] flex items-center justify-center">
                            <p className="text-[21px] text-center leading-[30px] w-[80%]">Data Analysis & Visualization</p>
                        </div>
                        <div className="bg-[#000] w-[340px] sm:w-[400px] ring-[0.5px] ring-[#4d4d4d] h-[90px] rounded-[15px] flex items-center justify-center">
                            <p className="text-[21px] text-center leading-[30px] w-[80%]">Machine Learning & AI Model Development</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Services;