'use client'
import Navigation from "../components/Navigation"
import { useState, useEffect } from "react";
import Footer from "../components/Footer";
import ContactModel from "../components/ContactModel";
import Contact from "../components/Contact";
import Image from "next/image";
import NextImage from '../images/next.png';
import Certification from "../components/Certification";
import GroqImage from '../images/groq.png';
import Langgraph from '../images/python.png';
import KotlinImage from '../images/kotlin.png';
import JavaImage from '../images/java.png';
import JavascriptImage from '../images/javascript.png';
import PostgresqlImage from '../images/postgresql.png';
import FlaskImage from '../images/flask.png';
import FirebaseImage from '../images/firebase2.png';
import GradioImage from '../images/gradio.png';
import GraphqlImage from '../images/graphql.png';
import HuggingFaceImage from '../images/huggingface.png';
import KerasImage from '../images/keras.png';
import MongoDbImage from '../images/mongodb.png';
import MysqlImage from '../images/mysql.png';
import NodeImage from '../images/node.png';
import PytorchImage from '../images/pytorch2.png';
import ReactImage from '../images/react.png';
import ReactNativeImage from '../images/reactNative.png';
import ReduxImage from '../images/redux.png';
import ScikitlearnImage from '../images/scikitlearn.png';
import TensorFlowImage from '../images/tensorflow.png';
import TypescriptImage from '../images/typescript.png';
import DjangoImage from '../images/django.png';
import DockerImage from '../images/docker.png';
import ExpressImage from '../images/express.png';
import MatplotlibImage from '../images/matplotlib2.png';
import RImage from '../images/R.png';
import FigmaImage from '../images/figma.png';
import PhotoshopImage from '../images/photoshop2.png';
import CorelDrawImage from '../images/coreldraw2.png';
import Top from "../components/Top";
import Max from "../components/Max";
import Langchain from '../images/langchain2.png'
import LanggraphImage from '../images/langgraph-logo-png_seeklogo-616429.png'




const Services = () => {
    const [showContactModel, setShowContactModel] = useState(false);
      const [navSelection, setNavSelection] = useState('Services');

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



      
      useEffect(() => {
        if(typeof window !== 'undefined'){
            import('scrollreveal').then((ScrollReveal) => { 
                ScrollReveal.default().reveal('.serviceTitle1', {
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
              ScrollReveal.default().reveal('.serviceTitle2', {
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
            ScrollReveal.default().reveal('.serviceTitle3', {
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
          ScrollReveal.default().reveal('.serviceLeft', {
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
          ScrollReveal.default().reveal('.serviceRight', {
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
              <div className="w-[100vw]  text-center leading-[60px] sm:leading-[70px] h-[100%]">
                <p className=" text-[40px] sm:text-[50px] md:text-[60px] aboutText4 aboutTitle1 bg-gradient-to-t from-[#433D3A] via-[#C6C4C3]  to-[#CAC8C6] bg-clip-text text-transparent">Discover the</p>
                <p className=" text-[65px] sm:text-[75px] md:text-[80px] aboutTitle2 bg-gradient-to-t from-[#433D3A] via-[#C6C4C3] font-[600] to-[#CAC8C6] bg-clip-text text-transparent" >Service Provided</p>
              </div>
              <div className="w-[100%] md:w-[50%] text-center h-[10px] sm:h-[160px]">

              </div>
              <div className="w-[100%]  md:w-[50%] text-center ">
                <p className=" aboutTitle3">Welcome to the heart of what I do.</p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-center px-[10vw] justify-center  min-h-[100vh]">
                <div className="md:w-[60%] mb-[20px] md:mb-[0px] h-[100%]">
                    
                      <p className=" text-[45px] sm:text-[60px] text-center md:text-left serviceRight leading-[50px] sm:leading-[70px] font-[600] bg-gradient-to-t from-[#433D3A] via-[#C6C4C3]  to-[#CAC8C6] bg-clip-text text-transparent">Web Development</p>

                </div>
                <div className="md:w-[60%] serviceLeft flex flex-col items-start h-[100%]">
                  <p className="md:w-[90%]">Crafting responsive, high-performance, and visually striking websites using latest technologies. From landing pages to complex web apps, I build scalable solutions optimized for speed and usability.</p>
                  <div className="md:w-[80%] mt-[20px]">
                    <p>Tools used </p>
                    <div className=" grid grid-cols-5 gap-3 flex-row items-center  space-x-[13px] mt-[10px]">
                      <Image alt="" src={NextImage} height={50} width={50}/>
                      <Image alt="" src={ReactImage} height={50} width={50}/>
                      <Image alt="" src={ReduxImage} height={50} width={50}/>
                      <Image alt="" src={MongoDbImage} height={50} width={50}/>
                      <Image alt="" src={PostgresqlImage} height={50} width={50}/>
                      <Image alt="" src={MysqlImage} height={50} width={50}/>
                      <Image alt="" src={FirebaseImage} height={100} width={100}/>
                      <Image alt="" src={DjangoImage} height={50} width={50}/>
                      <Image alt="" src={FlaskImage} className="bg-white px-[5px] py-[5px] rounded-[5px] " height={80} width={80}/>
                      
                      
                    </div>
                  </div>
                </div>
                
            </div>

            
            
            <div className="flex flex-col md:flex-row items-center px-[10vw] bg-[#000] justify-center  min-h-[100vh]">
                
                <div className="md:w-[60%] serviceLeft flex flex-col items-start h-[100%]">
                  <p className="md:w-[80%]">Delivering sleek, intuitive, and cross-platform mobile experiences. Whether it's iOS, Android, or both, I build mobile apps that users love.</p>
                  <div className="md:w-[80%] mt-[20px]">
                    <p>Tech stack</p>
                    <div className="flex flex-row items-center  space-x-[13px] mt-[10px]">
                      <Image alt="" src={KotlinImage} height={50} width={50}/>
                      <Image alt="" src={ReactNativeImage} height={50} width={50}/>
                      
                      
                    </div>
                  </div>
                </div>
                <div className="md:w-[40%] mt-[20px] mt-[0px] h-[100%]">
                    
                      <p className=" text-[45px] sm:text-[60px] text-center md:text-left serviceRight leading-[50px] sm:leading-[60px] font-[600] bg-gradient-to-t from-[#433D3A] via-[#C6C4C3]  to-[#CAC8C6] bg-clip-text text-transparent">Mobile Application Development</p>

                </div>
            </div>

            <div className="flex flex-col md:flex-row items-center px-[10vw] justify-center  min-h-[100vh]">
                <div className="md:w-[60%] mb-[20px] md:mb-[0px] h-[100%]">
                    
                      <p className=" text-[45px] sm:text-[60px] text-center md:text-left serviceRight leading-[50px] sm:leading-[70px] font-[600] bg-gradient-to-t from-[#433D3A] via-[#C6C4C3]  to-[#CAC8C6] bg-clip-text text-transparent">UI/UX Designing </p>

                </div>
                <div className="md:w-[60%] serviceLeft flex flex-col items-start h-[100%]">
                  <p className="md:w-[90%]">Designing user-first interfaces that are both beautiful and functional. I focus on seamless user experiences, intuitive navigation, and design systems that bring your brand to life.</p>
                  <div className="md:w-[80%] mt-[20px]">
                    <p>Tools used </p>
                    <div className="flex flex-row items-center  space-x-[13px] mt-[10px]">
                      <Image alt="" src={FigmaImage} height={50} width={50}/>
                      <Image alt="" src={PhotoshopImage} height={50} width={50}/>
                      <Image alt="" src={CorelDrawImage} height={50} width={50}/>
                      
                      
                    </div>
                  </div>
                </div>
                
            </div>
            <div className="flex flex-col md:flex-row items-center px-[10vw] bg-[#000] justify-center  min-h-[100vh]">
                
                <div className="md:w-[60%] serviceLeft flex flex-col items-start h-[100%]">
                  <p className="md:w-[80%]">Solving real-world problems with tailor-made software solutions. From internal tools to full scale system, I develop software that fits your workflows and scales with your business.</p>
                  <div className="md:w-[80%] mt-[20px]">
                    <p>Tech stack</p>
                    <div className="flex flex-row items-center  space-x-[13px] mt-[10px]">
                      <Image alt="" src={JavaImage} height={50} width={50}/>
                      <Image alt="" src={Langgraph} height={50} width={50}/>
                      
                      
                    </div>
                  </div>
                </div>
                <div className="md:w-[40%] mt-[20px] mt-[0px] h-[100%]">
                    
                      <p className=" text-[45px] sm:text-[60px] text-center md:text-left serviceRight leading-[50px] sm:leading-[60px] font-[600] bg-gradient-to-t from-[#433D3A] via-[#C6C4C3]  to-[#CAC8C6] bg-clip-text text-transparent">Custom Software Development</p>

                </div>
            </div>
            <div className="flex flex-col md:flex-row items-center px-[10vw] justify-center  min-h-[100vh]">
                <div className="md:w-[60%] mb-[20px] md:mb-[0px] h-[100%]">
                    
                      <p className=" text-[45px] sm:text-[60px] text-center md:text-left serviceRight leading-[50px] sm:leading-[70px] font-[600] bg-gradient-to-t from-[#433D3A] via-[#C6C4C3]  to-[#CAC8C6] bg-clip-text text-transparent">Data Analysis & Visualization</p>

                </div>
                <div className="md:w-[60%] serviceLeft flex flex-col items-start h-[100%]">
                  <p className="md:w-[90%]">Unlocking insights from your data through analysis and compelling visual storytelling. I turn raw numbers into meaningful narratives that guide decision making.</p>
                  <div className="md:w-[80%] mt-[20px]">
                    <p>Tools used </p>
                    <div className="flex flex-row items-center  space-x-[13px] mt-[10px]">
                      <Image alt="" src={ScikitlearnImage} height={50} width={50}/>
                      <Image alt="" src={Langgraph} height={50} width={50}/>
                      <Image alt="" src={MatplotlibImage} height={50} width={50}/>
                      <Image alt="" src={RImage} height={50} width={50}/>
                      
                      
                    </div>
                  </div>
                </div>
                
            </div>

            <div className="flex flex-col md:flex-row items-center px-[10vw] bg-[#000] justify-center  min-h-[100vh]">
                
                <div className="md:w-[60%] serviceLeft flex flex-col items-start h-[100%]">
                  <p className="md:w-[80%]">Designing and training intelligent systems that can learn from data and make predictions or classifications.</p>
                  <p className="md:w-[80%]">Use cases: Recommendation systems, fraud detection, customer segmentation</p>
                  <div className="md:w-[80%] mt-[20px]">
                    <p>Tech stack</p>
                    <div className="grid grid-cols-6 gap-3 sm:flex flex-row items-center  space-x-[13px] mt-[10px]">
                      <Image alt="" src={HuggingFaceImage} height={50} width={50}/>
                      <Image alt="" src={FlaskImage} className="bg-white px-[5px] py-[5px] rounded-[5px] " height={80} width={80}/>
                      <Image alt="" src={DockerImage} height={50} width={50}/>
                      <Image alt="" src={GradioImage} height={50} width={50}/>
                      <Image alt="" src={PytorchImage} height={50} width={50}/>
                      <Image alt="" src={TensorFlowImage} height={50} width={50}/>
                      <Image alt="" src={GradioImage} height={50} width={50}/>
                      
                      
                    </div>
                  </div>
                </div>
                <div className="md:w-[40%] mt-[20px] mt-[0px] h-[100%]">
                    
                      <p className=" text-[46px] sm:text-[60px] text-center md:text-left serviceRight leading-[52px] sm:leading-[66px] font-[600] bg-gradient-to-t from-[#433D3A] via-[#C6C4C3]  to-[#CAC8C6] bg-clip-text text-transparent">Building Machine Learning Models</p>

                </div>
            </div>
            
            <div className="flex flex-col md:flex-row items-center px-[10vw] justify-center  min-h-[100vh]">
                <div className="md:w-[60%]  mb-[20px] md:mb-[0px] h-[100%]">
                    
                      <p className=" text-[45px] sm:text-[60px] text-center md:text-left serviceRight leading-[50px] sm:leading-[70px] font-[600] bg-gradient-to-t from-[#433D3A] via-[#C6C4C3]  to-[#CAC8C6] bg-clip-text text-transparent">AI Agent Development</p>

                </div>
                <div className="md:w-[60%]  serviceLeft flex flex-col items-start h-[100%]">
                  <p className="md:w-[90%]">Developing custom AI agents for workflows with natural language processing, computer vision and conversational agents.</p>
                  <p className="md:w-[80%]">Use cases: Chatbots</p>
                  <div className="md:w-[80%] mt-[20px]">
                    <p>Tools used </p>
                    <div className="flex flex-row items-center  space-x-[13px] mt-[10px]">
                      <Image alt="" src={Langchain} height={80} width={80}/>
                      <Image alt="" src={LanggraphImage} height={100} width={100}/>
                      <Image alt="" src={Langgraph} height={50} width={50}/>
                      
                      
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

export default Services