"use client";
import Navigation from "../components/Navigation";
import { useState, useEffect } from "react";
import Footer from "../components/Footer";
import ContactModel from "../components/ContactModel";
import Contact from "../components/Contact";
import Image from "next/image";
import NextImage from '../images/next.png';
import Certification from "../components/Certification";
import GroqImage from '../images/groq.png';
import PythonImage from '../images/python.png';
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
import LangchainImage from '../images/langchain2.png';
import Seaborn from '../images/logo-tall-lightbg.svg';
import Top from "../components/Top";
import Max from "../components/Max";
import ApacheImage from '../images/Apache_Spark_logo.svg.png'
import HadoopImage from '../images/Hadoop_logo_new.svg.png'
import BentoML from '../images/bentoml.png'
import MlFlow from '../images/39938107.png'
import Kafka from '../images/62a879ec3048e459144d038c.png'
import aws from '../images/aws-color.png'
import gcp from '../images/gcp.png'
import Airflow from '../images/AirflowLogo.png'
import Matplotlib from '../images/matplotlib2.png'
import R from '../images/R.png'
import Tensorboard from '../images/tensorboard.png'
import PySpark from '../images/PySpark-logo-1.jpeg'
import OpenCV from '../images/opencv.png'
import Photoshop from '../images/photoshop2.png'
import Pandas from '../images/Pandas.png'
import Gradio from '../images/gradio.png'
import Figma from '../images/figma.png'
import Coreldraw from '../images/coreldraw2.png'
import Langgraph from '../images/langgraph-logo-png_seeklogo-616429.png'
import CPlus from '../images/images (1).png'
import C from '../images/C_Logo.png'


const About = () => {
  const [showContactModel, setShowContactModel] = useState(false);
  const [navSelection, setNavSelection] = useState("About");
  const [showMessageSuccess, setShowMessageSuccess] = useState(false);
  const [techStack, setTechStack] = useState(1)

  const onMessageSuccess = () => {
    setShowMessageSuccess(true);
    setTimeout(() => {
      setShowMessageSuccess(false);
    }, 3000);
  };

  const onContactClick = () => {
    setShowContactModel(!showContactModel);
  };

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

  return (
    <div className="flex w-[100vw] overflow-x-hidden flex-col">
      <Navigation navSelection={navSelection} onContactClick={onContactClick} />
      <ContactModel onMessageSuccess={onMessageSuccess} showContactModel={showContactModel} onContactClick={onContactClick} />
      <div className="text-white bg-[url('./images/heroBackground6.png')] bg-contain bg-no-repeat bg-center  sm:space-y-[30px] bg-[#000] px-[10vw] flex flex-col items-center justify-center sm:pt-[20vh] min-h-[100vh]">
        <div className="w-[100vw]  text-center leading-[60px] sm:leading-[70px] h-[100%]">
          <p className=" text-[40px] sm:text-[50px] md:text-[60px] aboutText4 aboutTitle1 bg-gradient-to-t from-[#433D3A] via-[#C6C4C3]  to-[#CAC8C6] bg-clip-text text-transparent">About Me</p>
          <p className=" text-[65px] sm:text-[75px] md:text-[80px] aboutTitle2 bg-gradient-to-t from-[#433D3A] via-[#C6C4C3] font-[600] to-[#CAC8C6] bg-clip-text text-transparent" >An Introduction</p>
        </div>
        <div className="w-[100%] md:w-[50%] text-center h-[10px] sm:h-[160px]">

        </div>
        <div className="w-[100%]  md:w-[50%] text-center ">
          <p className=" aboutTitle3">Welcome to the story behind the code. </p>
        </div>
      </div>
      <div className="flex items-center justify-center py-[50px]  min-h-[100vh]">
        <div className="w-[85%] h-[100%] flex flex-col md:flex-row items-center justify-center space-x-[20px] about2">
          <div className="w-[100%] md:w-[50%] h-[100%]  flex flex-col items-center justify-center">
            <p className=" text-[60px] sm:text-[80px] text-center md:text-left aboutText4 bg-gradient-to-t from-[#433D3A] via-[#C6C4C3] font-[600] to-[#CAC8C6] bg-clip-text text-transparent" >About Me</p>
          </div>
          <div className="w-[100%] text-[17px] sm:text-[18px] md:w-[50%] aboutText5 h-[100%] flex flex-col space-y-[20px] items-center justify-center">
            <p>
              Hello! I am Nivakaran, currently pursuing a B.Sc. in Information
              Technology at the Sri Lanka
              Institute of Information Technology (SLIIT). My academic journey
              driven by a passion for exploring the dynamic intersection of data
              science and software engineering.
            </p>

            <p>
              In the words of Steve Jobs, "Stay hungry, stay foolish", I embrace
              a philosophy that encourages perpetual curiosity, a relentless
              pursuit of new knowledge, and a fearless approach to exploring
              uncharted territories. This mindset fuels both my personal growth
              and professional ambitions.
            </p>

            <p>
              Let's join on this exhilarating quest as we navigate the complexities
              of data science and software engineering together. Let's embrace
              curiosity, defy conventions, and forge ahead into a future where
              possibilities are limitless.
            </p>
          </div>
        </div>
      </div>
      <div className="text-white space-y-[30px] bg-[#000] px-[10vw] flex flex-col py-[60px] py-[0px] md:flex-row items-center justify-center  min-h-[50vh]">

        <div className="aboutText4 w-[100%] md:w-[55%] text-[17px] sm:text-[18px] text-center h-[100%]">
          <p>To become a leading force in shaping the future of technology by blending curiosity with creativity. I envision a world where data and software empower people to solve real-world challenges, drive innovation, and unlock boundless possibilities for the generations to come.</p>
        </div>
        <div className=" w-[100%] sm:w-[45%] aboutText5 text-center leading-[60px] md:leading-[70px] h-[100%]">
          <p className="text-[40px] md:text-[50px] bg-gradient-to-t from-[#433D3A] via-[#C6C4C3] font-[600] to-[#CAC8C6] bg-clip-text text-transparent" >The</p>
          <p className=" text-[80px] md:text-[100px] bg-gradient-to-t from-[#433D3A] via-[#C6C4C3] font-[600] to-[#CAC8C6] bg-clip-text text-transparent" >Vision</p>
        </div>
      </div>
      <div className="text-white space-y-[30px]  px-[10vw] flex flex-col py-[50px] md:py-[0px] md:flex-row items-center justify-center  min-h-[50vh]">
        <div className="w-[100%] sm:w-[45%] aboutText4 text-center leading-[50px] md:leading-[70px] h-[100%]">
          <p className="text-[40px] md:text-[50px] bg-gradient-to-t from-[#433D3A] via-[#C6C4C3] font-[600] to-[#CAC8C6] bg-clip-text text-transparent" >The</p>
          <p className="text-[68px] md:text-[100px] bg-gradient-to-t from-[#433D3A] via-[#C6C4C3] font-[600] to-[#CAC8C6] bg-clip-text text-transparent" >Mission</p>
        </div>
        <div className=" w-[100%] text-[17px] sm:text-[18px] md:w-[55%] aboutText5 text-center h-[100%]">
          <p>To leverage the power of data science and software engineering to build intelligent, impactful, and user-centric digital solutions. I strive to continuously learn, innovate, and collaborate, transforming ideas into reality through thoughtful design, clean code, and data-driven insights.</p>
        </div>

      </div>
      <div>
            <div className="text-white  space-y-4 sm:space-y-6 py-6 sm:py-8 bg-[#000] px-4 sm:px-8 md:px-[10vw] flex flex-col items-center justify-center md:h-[100vh] min-h-screen">
                {/* Title Section */}
                <div className="w-full  aboutText4 md:w-3/4 lg:w-1/2 pt-8 sm:pt-50 text-center">
                    <p className="text-5xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold bg-gradient-to-t from-[#433D3A] via-[#C6C4C3] to-[#CAC8C6] bg-clip-text text-transparent ">
                        Tech Stack
                    </p>
                </div>

                {/* Tabs Section */}
                <div className="flex flex-col aboutTitle3 sm:flex-row flex-wrap justify-center gap-3 sm:gap-4 py-4 sm:py-6">
                    <div
                        onClick={() => setTechStack(1)}
                        className={`${
                            techStack === 1 ? 'ring-1 ring-gray-500' : ''
                        } bg-[#101010] text-sm sm:text-base px-4 sm:px-6 py-2 rounded-lg cursor-pointer text-center`}
                    >
                        <p>Core Programming Languages</p>
                    </div>
                    <div
                        onClick={() => setTechStack(2)}
                        className={`${
                            techStack === 2 ? 'ring-1 ring-gray-500' : ''
                        } bg-[#101010] text-sm sm:text-base px-4 sm:px-6 py-2 rounded-lg cursor-pointer text-center`}
                    >
                        <p>Data Science, Machine Learning & AI</p>
                    </div>
                    <div
                        onClick={() => setTechStack(3)}
                        className={`${
                            techStack === 3 ? 'ring-1 ring-gray-500' : ''
                        } bg-[#101010] text-sm sm:text-base px-4 sm:px-6 py-2 rounded-lg cursor-pointer text-center`}
                    >
                        <p>Frontend, Backend & Mobile Development</p>
                    </div>
                    <div
                        onClick={() => setTechStack(4)}
                        className={`${
                            techStack === 4 ? 'ring-1 ring-gray-500' : ''
                        } bg-[#101010] text-sm sm:text-base px-4 sm:px-6 py-2 rounded-lg cursor-pointer text-center`}
                    >
                        <p>Data Engineering & Analytics</p>
                    </div>
                    <div
                        onClick={() => setTechStack(5)}
                        className={`${
                            techStack === 5 ? 'ring-1 ring-gray-500' : ''
                        } bg-[#101010] text-sm sm:text-base px-4 sm:px-6 py-2 rounded-lg cursor-pointer text-center`}
                    >
                        <p>DevOps, Cloud & Developer Tools</p>
                    </div>
                </div>

                {/* Tech Icons Section */}
                <div className="w-full aboutText4 md:w-3/4 lg:w-2/3 text-center  h-[63vh] flex justify-center">
                    <div
                        className={`${
                            techStack === 1 ? 'grid grid-cols-3 h-[40%] sm:h-[100%] py-[30px] sm:py-[0px] sm:pb-[300px] sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3 sm:gap-4' : 'hidden'
                        }`}
                    >
                        <div className="flex flex-col items-center justify-center">
                            <Image src={PythonImage} height={60} width={60} alt="Python" className="sm:h-20 sm:w-20" />
                        </div>
                        <div className="flex flex-col items-center justify-center">
                            <Image src={JavaImage} height={60} width={60} alt="Java" className="sm:h-20 sm:w-20" />
                        </div>
                        <div className="flex flex-col items-center justify-center">
                            <Image src={JavascriptImage} height={60} width={60} alt="JavaScript" className="sm:h-20 sm:w-20" />
                        </div>
                        <div className="flex flex-col items-center justify-center">
                            <Image src={R} height={60} width={60} alt="R" className="sm:h-20 sm:w-20" />
                        </div>
                        <div className="flex flex-col items-center justify-center">
                            <Image src={CPlus} height={80} width={80} alt="C++" className="sm:h-24 sm:w-24" />
                        </div>
                    </div>
                    <div
                        className={`${
                            techStack === 2 ? 'grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 py-[30px] sm:py-[0px] sm:pb-[200px] gap-5 sm:gap-4' : 'hidden'
                        }`}
                    >
                        <div className="flex flex-col items-center justify-center">
                            <Image src={Seaborn} height={60} width={60} alt="Seaborn" className="sm:h-20 sm:w-20" />
                        </div>
                        <div className="flex flex-col items-center justify-center">
                            <Image src={PytorchImage} height={60} width={60} alt="PyTorch" className="sm:h-20 sm:w-50" />
                        </div>
                        <div className="flex flex-col items-center justify-center">
                            <Image src={HuggingFaceImage} height={60} width={60} alt="Hugging Face" className="sm:h-16 sm:w-100" />
                        </div>
                        <div className="flex flex-col items-center justify-center">
                            <Image src={KerasImage} height={60} width={60} alt="Keras" className="sm:h-10 sm:w-40" />
                        </div>
                        <div className="flex flex-col items-center justify-center">
                            <Image src={ScikitlearnImage} height={60} width={60} alt="Scikit-learn" className="sm:h-20 sm:w-25" />
                        </div>
                        <div className="flex flex-col items-center justify-center">
                            <Image src={TensorFlowImage} height={60} width={60} alt="TensorFlow" className="sm:h-20 sm:w-25" />
                        </div>
                        <div className="flex flex-col items-center justify-center">
                            <Image src={LangchainImage} height={60} width={60} alt="LangChain" className="sm:h-30 sm:w-25" />
                        </div>
                        <div className="flex flex-col items-center justify-center">
                            <Image src={Langgraph} height={80} width={80} alt="LangGraph" className="bg-white rounded-lg sm:h-25 sm:w-25" />
                        </div>
                        <div className="flex flex-col items-center justify-center">
                            <Image src={Pandas} height={80} width={80} alt="Pandas" className="sm:h-24 sm:w-24" />
                        </div>
                        <div className="flex flex-col items-center justify-center">
                            <Image src={OpenCV} height={80} width={80} alt="OpenCV" className="sm:h-24 sm:w-24" />
                        </div>
                        <div className="flex flex-col items-center justify-center">
                            <Image src={Matplotlib} height={80} width={80} alt="Matplotlib" className="sm:h-24 sm:w-24" />
                        </div>
                        <div className="flex flex-col items-center justify-center">
                            <Image src={MlFlow} height={80} width={80} alt="MLflow" className="sm:h-24 sm:w-24" />
                        </div>
                        <div className="flex flex-col items-center justify-center">
                            <Image src={Airflow} height={80} width={80} alt="Airflow" className="sm:h-15 sm:w-50" />
                        </div>
                    </div>
                    <div
                        className={`${
                            techStack === 3 ? 'grid py-[30px] grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 py-[30px] sm:py-[0px] sm:pb-[180px] gap-6 sm:gap-4' : 'hidden'
                        }`}
                    >
                        <div className="flex flex-col items-center justify-center">
                            <Image src={NextImage} height={60} width={60} alt="Next.js" className="sm:h-20 sm:w-20" />
                        </div>
                        <div className="flex flex-col items-center justify-center">
                            <Image src={TypescriptImage} height={60} width={60} alt="TypeScript" className="sm:h-20 sm:w-20" />
                        </div>
                        <div className="flex flex-col items-center justify-center">
                            <Image src={DjangoImage} height={60} width={60} alt="Django" className="sm:h-20 sm:w-20" />
                        </div>
                        <div className="flex flex-col items-center justify-center">
                            <Image src={DockerImage} height={60} width={60} alt="Docker" className="sm:h-20 sm:w-20" />
                        </div>
                        <div className="flex flex-col items-center justify-center">
                            <Image src={ReactImage} height={60} width={60} alt="React" className="sm:h-20 sm:w-20" />
                        </div>
                        <div className="flex flex-col items-center justify-center">
                            <Image src={ReactNativeImage} height={60} width={60} alt="React Native" className="sm:h-20 sm:w-20" />
                        </div>
                        <div className="flex flex-col items-center justify-center">
                            <Image src={ReduxImage} height={60} width={60} alt="Redux" className="sm:h-20 sm:w-20" />
                        </div>
                        <div className="flex flex-col items-center justify-center">
                            <Image src={MongoDbImage} height={60} width={60} alt="MongoDB" className="sm:h-20 sm:w-20" />
                        </div>
                        <div className="flex flex-col items-center justify-center">
                            <Image src={MysqlImage} height={60} width={60} alt="MySQL" className="sm:h-20 sm:w-20" />
                        </div>
                        <div className="flex flex-col items-center justify-center">
                            <Image src={NodeImage} height={60} width={60} alt="Node.js" className="sm:h-20 sm:w-20" />
                        </div>
                        <div className="flex flex-col items-center justify-center">
                            <Image src={KotlinImage} height={60} width={60} alt="Kotlin" className="sm:h-20 sm:w-20" />
                        </div>
                        <div className="flex flex-col items-center justify-center">
                            <Image src={PostgresqlImage} height={60} width={60} alt="PostgreSQL" className="sm:h-20 sm:w-20" />
                        </div>
                        <div className="flex flex-col items-center justify-center">
                            <Image src={GradioImage} height={60} width={60} alt="Gradio" className="sm:h-13 sm:w-60" />
                        </div>
                        <div className="flex flex-col items-center justify-center rounded-lg bg-white">
                            <Image src={FlaskImage} height={60} width={60} alt="Flask" className="sm:h-15 sm:w-60" />
                        </div>
                        <div className="flex flex-col items-center justify-center">
                            <Image src={ExpressImage} height={60} width={60} alt="Express" className="sm:h-20 sm:w-20" />
                        </div>
                    </div>
                    <div
                        className={`${
                            techStack === 4 ? 'grid grid-cols-3 h-[40%] sm:h-[100%] py-[30px] sm:py-[0px] sm:pb-[300px] sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3 sm:gap-4' : 'hidden'
                        }`}
                    >
                        <div className="flex flex-col items-center justify-center">
                            <Image src={TensorFlowImage} height={70} width={70} alt="TensorFlow" className="sm:h-22 sm:w-27" />
                        </div>
                        <div className="flex flex-col items-center justify-center">
                            <Image src={ApacheImage} height={75} width={75} alt="Apache" className="sm:h-20 sm:w-30" />
                        </div>
                        <div className="flex flex-col items-center justify-center">
                            <Image src={HadoopImage} height={80} width={80} alt="Hadoop" className="sm:h-18 sm:w-40" />
                        </div>
                        <div className="flex flex-col items-center justify-center">
                            <Image src={Kafka} height={80} width={80} alt="Kafka" className="sm:h-20 sm:w-30" />
                        </div>
                        <div className="flex flex-col items-center justify-center">
                            <Image src={R} height={80} width={80} alt="R" className="sm:h-24 sm:w-20" />
                        </div>
                        <div className="flex flex-col items-center justify-center">
                            <Image src={PySpark} height={80} width={80} alt="PySpark" className="sm:h-24 sm:w-24" />
                        </div>
                    </div>
                    <div
                        className={`${
                            techStack === 5 ? 'grid grid-cols-3 h-[50%] sm:h-[100%] sm:grid-cols-4 py-[30px] sm:py-[0px] sm:pb-[240px] md:grid-cols-5 py-[20px] lg:grid-cols-6 gap-3 sm:gap-4' : 'hidden'
                        }`}
                    >
                        <div className="flex flex-col items-center justify-center">
                            <Image src={GroqImage} height={60} width={60} alt="Groq" className="sm:h-12 sm:w-25" />
                        </div>
                        <div className="flex flex-col items-center justify-center">
                            <Image src={HuggingFaceImage} height={60} width={60} alt="Hugging Face" className="sm:h-15 sm:w-28" />
                        </div>
                        <div className="flex flex-col items-center justify-center">
                            <Image src={FirebaseImage} height={60} width={60} alt="Firebase" className="sm:h-10 sm:w-40" />
                        </div>
                        <div className="flex flex-col items-center justify-center">
                            <Image src={DockerImage} height={60} width={60} alt="Docker" className="sm:h-20 sm:w-20" />
                        </div>
                        <div className="flex flex-col items-center justify-center">
                            <Image src={aws} height={80} width={80} alt="AWS" className="sm:h-24 sm:w-24" />
                        </div>
                        <div className="flex flex-col items-center justify-center">
                            <Image src={gcp} height={80} width={80} alt="GCP" className="sm:h-24 sm:w-24" />
                        </div>
                        <div className="flex flex-col items-center justify-center">
                            <Image src={GradioImage} height={80} width={80} alt="Gradio" className="sm:h-14 sm:w-30" />
                        </div>
                        <div className="flex flex-col items-center justify-center">
                            <Image src={Figma} height={80} width={80} alt="Figma" className="sm:h-24 sm:w-24" />
                        </div>
                        <div className="flex flex-col items-center justify-center">
                            <Image src={Coreldraw} height={80} width={80} alt="CorelDRAW" className="sm:h-24 sm:w-24" />
                        </div>
                        <div className="flex flex-col items-center justify-center">
                            <Image src={Photoshop} height={80} width={80} alt="Photoshop" className="sm:h-24 sm:w-30" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
      <div className="min-h-[100vh] bg-[#101010] flex flex-col items-center justify-center">
        <p className=" text-[70px] md:text-[85px] aboutTitle1 bg-gradient-to-t from-[#433D3A] via-[#C6C4C3] font-[600] to-[#CAC8C6] bg-clip-text text-transparent" >Education</p>
        <div className="flex flex-row  items-center min-h-[60vh] w-[100vw] justify-center">
          <div className=" w-[45%] md:w-[29%] flex text-[17px] sm:text-[18px] leading-[20px] sm:leading-[24px]  flex-col space-y-[90px] ">

            <div className="flex aboutText4 flex-row items-center justify-end  ">


              <div className="bg-[#373435] ring-[0.5px] ring-[#727376]  px-[10px] sm:px-[20px] py-[10px] sm:py-[15px] rounded-[10px] ">
                <p>B.Sc (Hons) in Information Technology</p>
                <p>Sri Lanka Institute of Information Technology (SLIIT)</p>
                <div className="flex flex-col mt-[5px] md:mt-[0px] md:flex-row px-[10px] justify-between">
                  <p className="text-[13px]">2023 - 2027</p>
                  <p className="text-[13px]">Current CGPA: 3.3</p>
                </div>
              </div>
              <div className="w-[40px] bg-white h-[7px]">

              </div>

            </div>

            <div className="flex aboutText4 flex-row items-center  justify-end  ">


              <div className="bg-[#373435] ring-[0.5px] ring-[#727376]  px-[10px] sm:px-[20px] py-[10px] sm:py-[15px] rounded-[10px] ">
                <p>Diploma in Graphic Designing</p>
                <p>IDM Nations Campus</p>
                <div className="flex flex-row px-[10px] justify-between">
                  <p className="text-[13px]">2015</p>
                  <p className="text-[13px]">Distinction</p>
                </div>
              </div>
              <div className="w-[40px] bg-white h-[7px]">

              </div>

            </div>

          </div>
          <div className="bg-white w-[7px] min-h-[70vh] rounded-full">

          </div>
          <div className=" aboutText5 flex items-center w-[45%] md:w-[29%] flex text-[17px] sm:text-[18px] leading-[20px] sm:leading-[24px] justify-cneter flex-row">
            <div className="w-[40px] bg-white h-[7px]">

            </div>

            <div className="bg-[#373435] ring-[0.5px] ring-[#727376]  px-[10px] sm:px-[20px] py-[10px] sm:py-[15px] rounded-[10px] ">
              <p>G.C.E. Advanced Level (Bio stream)</p>
              <p>St.Benedict's College</p>
              <div className="flex flex-row px-[10px] justify-between">
                <p className="text-[13px]">2021(2022)</p>
                <p className="text-[13px]">3C's</p>

              </div>
            </div>

          </div>

        </div>


      </div>

      <div className="text-white bg-[#000] space-y-[30px] py-[80px]  px-[10vw] flex flex-col items-center justify-center min-h-[100vh]">
        <div className="w-[100%] text-center leading-[55px] md:leading-[80px] h-[100%]">
          <p className="text-[55px] md:text-[85px] aboutTitle1 bg-gradient-to-t from-[#433D3A] via-[#C6C4C3] font-[600] to-[#CAC8C6] bg-clip-text text-transparent" >Work Experience</p>
        </div>
        <div className="h-[100%]  md:px-[200px] space-x-[50px] flex flex-row items-center justify-center">


          <div className="flex flex-col  space-y-[30px]  ">
            <div className="flex flex-row  items-center justify-center space-x-[13px] sm:space-x-[20px] ">
              <div className="w-[5px] sm:w-[7px] min-h-[39vh] sm:min-h-[36vh] md:min-h-[27vh] rounded-full bg-white">

              </div>


              <div className="w-[100%] flex flex-col  items-center justify-center aboutTitle2 h-[100%]">


              
                <div className="flex  flex-col sm:flex-row sm:items-center  w-[100%]  sm:space-x-[200px]">
                  <div className="leading-[28px] sm:leading-[30px]">
                    <p className=" text-[23px]  md:text-[23px]">+ Career Break - Self Directed Learning</p>
                    
                  </div>

                  <div className="">
                    <p>2025 January - 2025 July</p>
                  </div>

                </div>
                

                <div className="mt-2 w-[100%]">
                  <p className="text-[17px] md:text-[18px] text-gray-300 font-medium">Highlights</p>
                  <ul className="pl-[18px] text-[16px] mt-[5px] list-disc space-y-[2px] text-gray-200">
                    <li>Completed full stack development, Machine Learning and AI related courses on Udemy (Hands-on projects included)</li>
                    <li>Sharpened problem-solving skills through consistent LeetCode and HackerRank practice</li>
                    <li>Built multiple full-stack portfolio projects to solidify knowledge in React, Node.js, and Python</li>
                  </ul>
                </div>


              </div>
            </div>
            <div className="flex flex-row  items-center justify-center space-x-[13px] sm:space-x-[20px] ">
              <div className="w-[5px] sm:w-[7px] min-h-[71vh] sm:min-h-[53vh] md:min-h-[46vh] rounded-full bg-white">

              </div>


              <div className="w-[100%] flex flex-col  items-center justify-center aboutTitle2 h-[100%]">


                <div className="flex  flex-col sm:flex-row sm:items-center  w-[100%]  sm:space-x-[100px]">
                  <div className="leading-[28px] sm:leading-[30px]">
                    <p className=" text-[23px]  md:text-[23px]">+ Medical Documentation Specialist (Medical Scribe)</p>
                    <p className="text-[18px] md:text-[19px]">Medsource Healthcare LLC</p>
                  </div>

                  <div className="">
                    <p>2022 July - 2024 December</p>
                  </div>

                </div>
                <div>
                  <p className="text-[17px] md:text-[18px] text-gray-300">Responsibilities</p>
                  <ul className="pl-[18px] text-[16px] mt-[5px] list-disc space-y-[2px] text-gray-200">
                    <li>Worked as the primary scribe for a cardiologist, and have worked with multiple providers across multiple specialities, documenting real-time patient encounters, diagnoses, transcriptions and treatment plans.</li>
                    <li>Trained and supervised junior scribes in EHR systems, cardiology-specific terminology, and efficient content capturing protocols.</li>
                    <li>Structured and managed high-volume clinical datasets(e.g., echocardiograms, medications, lab results)</li>
                    <li>Collaborated with doctors to summerize complex medical histories into actionable clinical notes, improving data usability.</li>
                    <li>Optimized clinical workflow by reducing documentation time.</li>
                  </ul>
                </div>

              </div>
            </div>
            <div className="flex flex-row  items-center justify-center space-x-[13px] sm:space-x-[20px] ">
              <div className="w-[5px] sm:w-[7px] min-h-[45vh] sm:min-h-[30vh] rounded-full bg-white">

              </div>


              <div className="w-[100%] flex flex-col  items-center justify-center aboutTitle2 h-[100%]">


                <div className="flex  flex-col sm:flex-row sm:items-center  w-[100%]  sm:space-x-[100px] md:space-x-[300px]">
                  <div className="leading-[28px] sm:leading-[30px]">
                    <p className=" text-[23px]  md:text-[23px]">+ Customer Service Executive</p>
                    <p className="text-[18px] md:text-[19px]">Startek - Commercial bank PLC</p>
                  </div>

                  <div className="">
                    <p>2022 February - 2022 June</p>
                  </div>

                </div>
                <div>
                  <p className="text-[17px] md:text-[18px] text-gray-300">Responsibilities</p>
                  <ul className="pl-[18px] text-[16px] mt-[5px] list-disc space-y-[2px] text-gray-200">
                    <li>Managed high-volume customer interactions, ensuring efficient query resolution and data accuracy.</li>
                    <li>Processed financial transactions and account inquiries, demostrated structured problem-solving and attention to detail.</li>
                    <li>Communicated with the clients to ensure clarity and compliance strengthening analytical documentation skills</li>
                  </ul>
                </div>

              </div>
            </div>


          </div>
        </div>

      </div>
      <Certification />
      <Top />
      <Max />
      <Contact onContactClick={onContactClick} />
      <Footer />
      {showMessageSuccess && <div className="bg-[#101010] z-[40] w-[250px] fixed text-[13px] mb-[20px] ml-[30px] px-[20px] py-[20px] ring-white ring-[0.5px] rounded-[10px] text-white absolute left-0 bottom-0">
        <p>Message saved successfully. Will get back to you soon:)</p>
      </div>}
    </div>
  );
};

export default About;



