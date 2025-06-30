'use client'

import Navigation from "./components/Navigation";
import TopNavigation from "./components/TopNavigation";
import Rooms from "./pages/Rooms";
import Restuarant from "./pages/Restuarant";
import Guests from "./pages/Guests";


import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

import ContactAdmin from "./pages/Contact";
import CaseStudies from "./pages/CaseStudies";
import MiniProjects from "./pages/MiniProjects";

export default function Home() {
  const [navClick, setNavClick] = useState("Portfolio Management");
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const router = useRouter();

      useEffect(() => {
        const fetchCookies = async () => {
        try {
            

            const response = await axios.get(
                "https://new-portfolio-backend-roan.vercel.app/check-cookie",
            { 
                withCredentials: true,
            })
            
            if (response.status === 200) {
                console.log("Cookies are valid");
                router.push('/admin')
            }
            
        } catch (error) {
            console.error("Error fetching cookies:", error);
            router.push('/login')

        } 
    }
        
    fetchCookies()
    
        
    }, [])


  const handleNavClick = (e: React.MouseEvent<HTMLButtonElement | HTMLDivElement>) => {
    setNavClick((e.target as HTMLElement).innerText);
  };

  const renderContent = () => {
    switch (navClick) {
      case "Portfolio Management":
        return <Rooms />;
      case "Blogs Management":
        return <Restuarant />;
      case "Blogs Organization":
        return <Guests />;
      case "Contact":
        return <ContactAdmin/>
      case "Case Studies":
        return <CaseStudies/>;
      case "Mini Projects":
        return <MiniProjects/>;
      
      default:
        return <div>Home Content</div>;
    }
  };

  return (
    <div className="flex flex-row overflow-hidden">
      <Navigation navClick={navClick} handleNavClick={handleNavClick} />
      <div className="w-[100vw]  h-[100vh]">
        <TopNavigation />
        <div className="flex flex-col items-center justify-center ">
          <div className="h-[90vh] w-[100%] overflow-y-scroll">
            {renderContent()}
          </div>
          
        </div>
        
      </div>
    </div>
  );
}
