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


const Blogs = () => {
    const [showContactModel, setShowContactModel] = useState(false);
    const [navSelection, setNavSelection] = useState('Blogs');
    const [showMessageSuccess, setShowMessageSuccess] = useState(false);
    
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

      const onBlog1Click = () => {
        router.push('/blogs/blog1')
      }

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
              <div className="w-[100vw]  text-center leading-[63px] sm:leading-[70px] h-[100%]">
                <p className=" text-[40px] sm:text-[50px] md:text-[60px] aboutText4 aboutTitle1 bg-gradient-to-t from-[#433D3A] via-[#C6C4C3]  to-[#CAC8C6] bg-clip-text text-transparent">Look Into</p>
                <p className=" text-[49px] sm:text-[75px] px-[20px] md:text-[80px] aboutTitle2 bg-gradient-to-t from-[#433D3A] via-[#C6C4C3] font-[600] to-[#CAC8C6] bg-clip-text text-transparent" >Blogs & Insights</p>
              </div>
              <div className="w-[100%] md:w-[50%] text-center h-[10px] sm:h-[160px]">

              </div>
              
              <div className="w-[100%]  md:w-[50%] text-center ">
                <p className=" aboutTitle3">Welcome to my digital journal, a space where I share my thoughts, experiences, and learnings from the world of technology.</p>
              </div>
            </div>



            <div className=" min-h-[120vh] py-[10vh] w-screen flex items-center justify-center">
                <div className="  flex  flex-col">
                    <div className="leading-[55px] sm:leading-[64px] blogs1 text-center">
                        <p className="text-[45px] sm:text-[55px] bg-gradient-to-t from-[#433D3A] via-[#C6C4C3] font-bold to-[#CAC8C6] bg-clip-text text-transparent">Stay Updated</p>
                        <p className="text-[45px] sm:text-[55px] bg-gradient-to-t from-[#433D3A] via-[#C6C4C3] font-bold to-[#CAC8C6] bg-clip-text text-transparent">with Latest Insights</p>
                    </div>
                    <div className="flex items-center justify-center">
                      <div className="grid grid-cols-2  sm:grid-cols-4 gap-[10px] mt-[30px]">
                          
                            <BlogCard text="Blog 1" text1="Blog Title Blog Title" onClick={onBlog1Click}/>
                            <BlogCard text="Blog 1" text1="Blog Title Blog Title" onClick={onBlog1Click}/>
                          
                            <BlogCard text="Blog 1" text1=" Blog Title Blog Title" onClick={onBlog1Click}/>
                            <BlogCard text="Blog 1" text1="Blog Title Blog Title" onClick={onBlog1Click}/>

                            <BlogCard text="Blog 1" text1="Blog Title Blog Title" onClick={onBlog1Click}/>
                            <BlogCard text="Blog 1" text1="Blog Title Blog Title" onClick={onBlog1Click}/>
                          
                            <BlogCard text="Blog 1" text1=" Blog Title Blog Title" onClick={onBlog1Click}/>
                            <BlogCard text="Blog 1" text1="Blog Title Blog Title" onClick={onBlog1Click}/>
                            
                          
                          
                          
                      </div>
                    </div>
                    <div className="flex flex-row items-center justify-center space-x-[20px] mt-[30px]">
                        <div className="w-[96%]">
                            <p className="text-[50px] font-bold">Case Studies</p>
                            <div className="grid px-[15px] sm:grid-cols-2 gap-[20px] items-center justify-center space-x-[20px] mt-[30px]">
                                
                                <CaseStudyCard text1="Case study title 01" text="test" />
                                <CaseStudyCard  text1="Case study title 02" text=""/>
                            </div>
                        </div>
                    </div>
                    
                </div>
            </div>
            <Top/>
            <Max/>
            <Contact onContactClick={onContactClick}/>
            <Footer/>
            {showMessageSuccess && <div className="bg-[#101010] z-[40] w-[250px] fixed text-[13px] mb-[20px] ml-[30px] px-[20px] py-[20px] ring-white ring-[0.5px] rounded-[10px] text-white absolute left-0 bottom-0">
        <p>Message saved successfully. Will get back to you soon:)</p>
      </div>}
        </div>
    )
}

export default Blogs