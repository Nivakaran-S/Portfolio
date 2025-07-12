'use client'

import Navigation from "./components/Navigation";
import Hero from "./components/Hero";
import About from "./components/About";
import Portfolio from "./components/Portfolio";
import Services from "./components/Services";
import Blogs from "./components/Blogs";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Top from "./components/Top";
import ContactModel from "./components/ContactModel";
import React, {useState} from "react";
import Certification from "./components/Certification";
import Max from "./components/Max";
import Loader from "./components/Loader";

export default function Home() {
  const [showContactModel, setShowContactModel] = useState(false);
  const [navSelection, setNavSelection] = useState('Home');
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

  const [loading, setLoading] = useState(false);

  const handleClick = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(true);
      // window.location.href = '/next'; // Replace with real navigation
    }, 2500);
  };


 

  return (
    <div className="flex w-[100vw] overflow-x-hidden flex-col">
    
      <Navigation navSelection={navSelection} onContactClick={onContactClick}/>
      <ContactModel onMessageSuccess={onMessageSuccess} showContactModel={showContactModel} onContactClick={onContactClick}/>
      <Hero/>
      <Top/>
      <About/>
      <Portfolio/>
      <Services/>
      <Blogs/>
      <Certification/>
      <Max/>
      <Contact onContactClick={onContactClick}/>
      <Footer/>
      
      {showMessageSuccess && <div className="bg-[#101010] z-[40] w-[250px] fixed text-[13px] mb-[20px] ml-[30px] px-[20px] py-[20px] ring-white ring-[0.5px] rounded-[10px] text-white absolute left-0 bottom-0">
        <p>Message saved successfully. Will get back to you soon:)</p>
      </div>}
      <Loader active={loading}/>
    </div>
  );
}
