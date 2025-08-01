'use client'

import React, { useState } from "react";
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
import Certification from "./components/Certification";
import Max from "./components/Max";
import Loader from "./components/Loader";
import PortfolioModel from "./portfolio/PortfolioModel";

export default function Home() {
  const [showContactModel, setShowContactModel] = useState(false);
  const [navSelection, setNavSelection] = useState('Home');
  const [showMessageSuccess, setShowMessageSuccess] = useState(false);
  const [onPortfolioClick, setOnPortfolioClick] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [loading, setLoading] = useState(false);

  const onMessageSuccess = () => {
    setShowMessageSuccess(true);
    setTimeout(() => {
      setShowMessageSuccess(false);
    }, 3000);
  };

  const onContactClick = () => {
    setShowContactModel(!showContactModel);
  };

  const handleClick = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      // Example navigation or next step
      // router.push('/next')
    }, 2500);
  };

  const onPortfolioCard1Click = (e: React.MouseEvent<Element>) => {
    e.preventDefault();
    e.stopPropagation();
    if (typeof window !== 'undefined') {
      setScrollPosition(window.scrollY);
      setOnPortfolioClick(true);
      document.body.style.position = 'fixed';
      document.body.style.top = `-${window.scrollY}px`;
    }
  };

  const resetPortfolioClick = () => {
  if (typeof window !== 'undefined') {
    setOnPortfolioClick(false); // Hide modal or overlay
    document.body.style.position = '';
    document.body.style.top = '';

    const scrollY = scrollPosition; // From your useState
    window.scrollTo(0, scrollY);
  }
};


  return (
    <div className="flex text-white w-[100vw] overflow-x-hidden flex-col">
      <Navigation navSelection={navSelection} onContactClick={onContactClick} />
      <ContactModel
        onMessageSuccess={onMessageSuccess}
        showContactModel={showContactModel}
        onContactClick={onContactClick}
      />
      <Hero />
      <Top />
      <About />
      <Portfolio onPortfolioCard1Click={onPortfolioCard1Click} />
      <Services />
      <Blogs />
      <Certification />
      <Contact onContactClick={onContactClick} />
      <Footer />

      {/* Portfolio Modal */}
      <div
        className={`fixed top-0 left-0 z-[10000] h-[100vh] w-[100vw] flex flex-col items-center justify-center bg-black/80 transition-opacity duration-500 ease-in-out ${
          onPortfolioClick ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <PortfolioModel
          resetPortfolioClick={resetPortfolioClick}
          onPortfolioClick={onPortfolioClick}
          setOnPortfolioClick={setOnPortfolioClick}
        />
      </div>

      {/* Message Toast */}
      {showMessageSuccess && (
        <div className="bg-[#101010] z-[40] w-[250px] fixed text-[13px] mb-[20px] ml-[30px] px-[20px] py-[20px] ring-white ring-[0.5px] rounded-[10px] text-white absolute left-0 bottom-0">
          <p>Message saved successfully. Will get back to you soon :)</p>
        </div>
      )}

      <Loader active={loading} />
    </div>
  );
}
