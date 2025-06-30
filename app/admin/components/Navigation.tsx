'use client'

import React from "react"

type NavigationProps = {
  handleNavClick: (e: React.MouseEvent<HTMLDivElement>) => void;
  navClick: string;
};

const Navigation: React.FC<NavigationProps> = ({ handleNavClick, navClick }) => {
    
    return(
        <div>
            <div className="bg-[#101010] border-r-[1px] w-[17vw]  border-gray-400 flex flex-col justify-between text-black py-[15px]  h-[100vh]">
                <div>
                    <div className="pb-[15px] rounded-[px]  px-[30px]">
                        <p className="text-[30px] text-white font-bold">NivakaranS</p>
                    </div>
                    {/* <div className="bg-black h-[1px] "></div> */}
                    <div className=" h-[100%]">
                        
                        <div onClick={handleNavClick} className={`${navClick == 'Guests' ? 'bg-gray-200' : 'hover:bg-gray-500'} text-gray-300 cursor-pointer py-[5px]`} >
                            <div className={`${navClick == 'Portfolio Management' ? 'border-l-4 ' : 'ml-[14px]' } border-gray-600 ml-[10px] py-[5px] px-[25px]`}>
                                <p>Portfolio Management</p>
                            </div>
                        </div>
                        <div onClick={handleNavClick} className={`${navClick == 'Rooms' ? 'bg-gray-200' : 'hover:bg-gray-500'} text-gray-300 cursor-pointer py-[5px]`} >
                            <div className={`${navClick == 'Blogs Organization' ? 'border-l-4 ' : 'ml-[14px]' }   border-gray-600 ml-[10px] py-[5px] px-[25px]`}>
                                <p>Blogs Organization </p>
                            </div>
                        </div>
                        <div onClick={handleNavClick} className={`${navClick == 'CaseStudies' ? 'bg-gray-200' : 'hover:bg-gray-500'} text-gray-300 cursor-pointer py-[5px]`} >
                            <div className={`${navClick == 'Case Studies' ? 'border-l-4 ' : 'ml-[14px]' }   border-gray-600 ml-[10px] py-[5px] px-[25px]`}>
                                <p>Case Studies</p>
                            </div>
                        </div>
                        <div onClick={handleNavClick} className={`${navClick == 'MiniProjects' ? 'bg-gray-200' : 'hover:bg-gray-500'} text-gray-300 cursor-pointer py-[5px]`} >
                            <div className={`${navClick == 'Mini Projects' ? 'border-l-4 ' : 'ml-[14px]' }   border-gray-600 ml-[10px] py-[5px] px-[25px]`}>
                                <p>Mini Projects</p>
                            </div>
                        </div>

                        <div onClick={handleNavClick} className={`${navClick == 'Contactt' ? 'bg-gray-200' : 'hover:bg-gray-500'} text-gray-300 cursor-pointer py-[5px]`} >
                            <div className={`${navClick == 'Contact' ? 'border-l-4 ' : 'ml-[14px]' }   border-gray-600 ml-[10px] py-[5px] px-[25px]`}>
                                <p>Contact</p>
                            </div>
                        </div>
                        
                        
                        
                       
                        
                
                    </div>
                </div>
              
            </div>
        </div>
    )
}

export default Navigation