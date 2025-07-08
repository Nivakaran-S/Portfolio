'use client'
import PrimaryBtn from "./PrimaryBtn";
import { useState } from "react";
import axios from "axios";

interface ContactModelProps {
    onContactClick: () => void;
    showContactModel: boolean;
    onMessageSuccess: () => void;
  }
  
const ContactModel: React.FC<ContactModelProps> = ({ onMessageSuccess, onContactClick, showContactModel }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [title, setTitle] = useState('');
    const [message, setMessage] = useState('')

    const onContactFormSubmit = async () => {
      try {

        const response = await axios.post('https://new-portfolio-backend-roan.vercel.app/contact/', {
            name: name,
            email: email,
            title: title,
            message: message
        });
        console.log(response)

        if (response.status === 200) {
            console.log('Contact form submitted successfully')
        } else {
            console.error('Contact form submission failed')
        }

        onContactClick();
        setEmail('');
        setName('');
        setTitle('');
        setMessage('');
        onMessageSuccess();

      } catch(err) {
        console.log(err)
      }
        
        
        
    }

    return(
        <div
  className={`${
    showContactModel ? 'translate-x-0' : 'translate-x-full'
  } transition-transform z-[9999] ease-in-out duration-700 flex flex-row items-center justify-center absolute fixed z-[100] h-screen w-screen`}
>

  <div
    onClick={onContactClick}
    className={`${
      showContactModel
        ? 'opacity-80 delay-500 duration-700' 
        : 'opacity-0 duration-100' 
    } transition-opacity ease-in-out w-[20%] h-screen bg-black`}
  ></div>


  <div className="w-[80%] h-screen flex justify-center py-2 bg-[#433D3A] transition-transform ease-in-out duration-700">
    <div className="flex flex-col md:flex-row w-[90%] md:justify-between">
      <div>
        <div className="text-[18px] flex md:hidden mt-[15px] mr-[10px] flex justify-end  cursor-pointer" onClick={onContactClick}>
            <p>Close</p>
        </div>
      </div>
      <div className=" w-[100%] md:w-[50%] pt-[50px] md:h-[100%] flex flex-col items-center justify-center">

        <p className="text-[35px] md:text-[45px]  md:leading-[45px] leading-[35px] w-[90%]">Let's Talk About <span className="text-[30px] md:text-[45px] text-[#101010]">Your Next Project</span></p>
        <div className="hidden md:flex ml-[40px]">
          <p className="w-[80%] hidden md:flex md:mt-[5px]" >We'd love to hear from you whether it's a project inquiry, feedback, or just a friendly hello, don't hesitate to reach out: Let's create something amazing.</p>
        </div>
      </div>
      <div className="text-[45px] md:mt-[20px] sm:leading-[50px] w-[100%] md:w-[50%]">
        <div className="text-[18px]  hidden md:flex justify-end  cursor-pointer" onClick={onContactClick}>
            <p>Close</p>
        </div>
        <div className="text-[18px] flex flex-col px-[10px] items-center justify-center h-[100%] sm:h-[100%]">
            <div className="flex mt-[10px] flex-col sm:flex-row items-center justify-center  w-[100%]  sm:space-x-[20px]">
                <div className=" w-[100%] leading-[30px]">
                    <p>Name</p>
                    <input value={name} onChange={(e) => setName(e.target.value)} type="text" className="w-[100%] focus:outline-none px-[13px] h-[40px] bg-[#101010] text-[#96989A] border-[1px] border-[#96989A] rounded-[8px]"/>
                </div>
                <div className="w-[100%] mt-[10px] sm:mt-[0px] leading-[30px]">
                    <p>Email</p>
                    <input value={email} onChange={(e) => setEmail(e.target.value)} type="text" className="w-[100%] focus:outline-none px-[13px] h-[40px] bg-[#101010] text-[#96989A] border-[1px] border-[#96989A] rounded-[8px] "/>
                </div>
            </div>
            <div className="w-[100%] mt-[10px]  ">
                <div className=" leading-[30px] ">
                    <p>Title</p>
                    <input value={title} onChange={(e) => setTitle(e.target.value)} type="text" className="w-[100%] focus:outline-none px-[13px] h-[40px] bg-[#101010] text-[#96989A] border-[1px] border-[#96989A] rounded-[8px] "/>
                </div>
               
            </div>
            <div className="w-[100%]  mt-[10px]">
                <div className="leading-[30px]">
                    <p>Message</p>
                    <textarea value={message} onChange={(e) => setMessage(e.target.value)} className="bg-[#101010] focus:outline-none px-[13px] py-[3px] h-[200px] w-[100%] text-[#96989A] border-[1px] border-[#96989A] rounded-[8px] "/>
                </div>

            </div>
            <div className="leading-[30px]">
                <PrimaryBtn onClick={onContactFormSubmit} text="Submit"/>
            </div>

            
          
            
        </div>
      </div>
    </div>
  </div>
</div>

    )
}

export default ContactModel;