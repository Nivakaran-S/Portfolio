'use client'
import PrimaryBtn from "./PrimaryBtn";
import PlayIcon from "../images/playIcon.png"
import Image from "next/image";
import {useState} from "react";

interface ContactModelProps {
    onContactClick: () => void;

  }

const Contact : React.FC<ContactModelProps> = ({onContactClick}) => {
    const [onMessageSuccess, setOnMessageSuccess] = useState<boolean>(false)

    
    return(
        <div className="bg-[#000] pb-[80px] pt-[60px] sm:h-[100vh] flex items-center justify-center w-screen">
            <div className="w-[75%] flex flex-row items-center justify-center">
                <div className=" sm:w-[60%]">
                    <div className="w-[100%] flex sm:hidden py-[20px] items-center justify-center">
                        <Image src={PlayIcon} alt="" height={200} />
                    </div>
                    <div className=" text-[40px] leading-[44px] md:text-[60px] md:leading-[65px]">
                        <p>Let's Talk About <span className="text-[#96989A]">Your</span> </p>
                        <p className="text-[#96989A]">Next Project</p>
                    </div>
                    
                    <div className="mt-[10px] sm:w-[75%] text-[15.27px]">
                        <p>We'd love to hear from you whether it's a 
                            project inquiry, feedback, or just a friendly
                            hello, don't hesitate to reach out: Let's 
                            create something amazing
                        </p>

                        <div className="mt-[20px]">
                            <PrimaryBtn text="Get In Touch" onClick={onContactClick}/>
                        </div>
                    </div>
                </div>
                <div className="w-[40%] hidden sm:flex items-center justify-center">
                    <Image src={PlayIcon} alt="" height={400} />
                </div>
            </div>
                
        </div>
    )
}

export default Contact;