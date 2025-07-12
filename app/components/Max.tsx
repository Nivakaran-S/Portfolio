'use client';
import { useState } from "react";
import Image from "next/image";
import Send from '../images/send.png';
import axios from 'axios'
import {useRef, useEffect} from 'react';
import {v4 as uuidv4} from 'uuid'
import { AnyARecord } from "dns";
import './Max.css'

type Message = {
    type: 'sender' | 'receiver';
    content: string;
    timestamp: number;
};

const Max = () => {
    const [max, setMax] = useState(false);
    const [messageSubmitted, setMessageSubmitted] = useState(false)
    
    const [message, setMessage] = useState('')
    const [messageCollection, setMessageCollection] = useState<Message[]>([])
    const scrollContainerRef = useRef<HTMLDivElement | null>(null)
    
    const [typing, setTyping] = useState(true)
    const [sessionId, setSessionId] = useState('');

    useEffect(() => {
        let storedSessionId = localStorage.getItem('sessionId')
        console.log(storedSessionId)

        if(!storedSessionId) {
            storedSessionId = uuidv4();
            localStorage.setItem('sessionId', storedSessionId || '')
            setSessionId(storedSessionId)
            console.log(storedSessionId)
            

        } else {
            setSessionId(storedSessionId)
        }
    }, [])

    const fetchData = async () => {
        console.log("sessionID", sessionId)
        console.log(message)
        if(!sessionId || !message) return;

        console.log("Session ID:", sessionId)

        const payload = {session_id: sessionId, question: message}

        try {
            const response = await axios.post("https://nivakaran-max.hf.space/ask",
                payload,
                {
                    headers: {
                        "Content-Type" : "application/json"
                    },
                    timeout: 20000
                }
            )

            console.log("API Response: ", response);

            const answer = response.data?.answer || "No response receieved"
            console.log("Answer: ", answer)

            setMessageCollection((prevMessages) => [
                ...prevMessages,
                {type: "receiver", content: answer, timestamp: Date.now()}
            ])

            setTyping(false)

        } catch(err) {
            console.error("Error invoking API: ", err)
        }

    }

    useEffect(() => {
        if(scrollContainerRef.current) {
            scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight;
        }
    }, [messageCollection])

    const onMessageSubmit = (msg: any) => {
        console.log("Messs", msg)
        if (msg.trim()) {
            fetchData();
            console.log("Message sent", msg)

            setMessageSubmitted(true);
            
            setMessageCollection((prevMessages) => 
                [...prevMessages, 
                {type: 'sender', content: msg, timestamp: Date.now()}
            ])
            
            setTyping(true)
            setMessage('');

        }
    }

    const handleKeyDown = (e: any) => {
        if(e.key === "Enter") {
            e.preventDefault()
            onMessageSubmit(e.target.value);
        }
    }

    const handleMax = () => {
        setMax(!max);
    }

    const onMaxFalseClick = () => {
        setMax(false);
    }
    
    return (
        <div className={`${max? 'h-[100vh] w-[100vw]' : '' } fixed z-[9999] text-black bottom-[0px] right-[0px]  `}>
            <div 
            onClick={onMaxFalseClick} 
            className={`absolute top-0 left-0  w-screen h-screen bg-black transition-opacity duration-500 opacity-40  ${max ? 'flex' : ' hidden'}`}></div>
            <div onClick={handleMax} className={`${max ? ' translate-y-[100px] ' : 'translate-y-[0px] delay-300'} select-none transition-transform duration-500 ease-in-out absolute bottom-[20px] right-[30px] flex items-center justify-center w-fit bg-[#373435] ring-[0.5px] ring-[#727376] rounded-full ring-[0.5px]  cursor-pointer px-[30px] py-[5px]  `}>
                <p className="select-none text-white text-[20px]">Max</p>
            </div>

            <div className={`${max ? 'scale-[100%] delay-200' : 'scale-0' } custom-scrollbar absolute bottom-[20px] right-[30px] origin-bottom-right transition-transform duration-500 ease-in-out flex flex-col bg-[#373435] ring-[0.5px] ring-[#727376] h-[580px] w-[400px] rounded-[10px] ring-[0.5px] justify-center mt-[5px]`}>
                <div className="w-[100%]  select-none  px-[20px] bg-[#000000] text-white flex flex-row justify-between rounded-t-[10px] py-[10px] h-fit items-center">
                    <div>
                        <p className="text-[20px]">Max</p>
                    </div>
                    <div onClick={handleMax} className="cursor-pointer">
                        <p>Close</p>
                    </div>
                </div>

                
                {messageSubmitted ?
                        <div
                            className="flex-1 overflow-y-auto py-4 ring-[1px] ring-[#373435] px-5 bg-[#101010]  scrollbar scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-gray-800"
                            ref={scrollContainerRef}
                            >
                            <div className="flex justify-center mt-[5px]">
                                <div className="bg-[#8f8f8f] text-[12px] px-[8px] py-[2px] rounded-[5px] border-[1px] border-gray-500 box-shadow-lg w-fit"  >
                                    <p className="text-gray-800 ">Today</p>
                                </div>
                            </div>
                            {messageCollection
                            .sort((a, b) => a.timestamp - b.timestamp) // Sort messages by timestamp
                            .map((msg, index) => (
                                <div className={`${msg.type === 'sender' ? 'justify-end' : 'justify-start'} flex `} key={index}>
                                    <div 
                                    className={`${msg.type === 'sender' ? 'border-[1px] border-[#1D1D1D] self-end bg-[#808080] text-black' : 'border-[1px]  border-gray-500 self-start bg-white text-black '} flex  box-shadow-lg max-w-[60%] text-left mt-[10px] mx-[10px] rounded-[5px] py-[5px] px-[13px] text-[14px] `}
                                        
                                    
                                    >
                                        {msg.content}
                                    </div>
                                </div>
                            ))}
                            {typing==true?
                            <div className="flex h-[80px] justify-start mb-3 px-5">
                                <div className=" rounded-lg p-3 flex items-center">
                                <span className="loader"></span>
                                </div>
                            </div>
                            : null}
                            
                        </div>
                        :
                        <div className='h-[430px] ring-[1px] ring-[#373435] flex flex-col justify-center  items-center bg-[#101010] '>
                            <div className="mx-[30px] text-gray-300 px-[10px]  my-[20px] text-center">
                                <p className="  text-[15px]" >Hello! I’m Max, an AI-powered assistant created by Nivakaran.</p>
                            
                                <p className="text-[15px]">I’m here to guide you through Nivakaran’s projects and answer any questions you have along the way. Let’s explore together!</p>
                            </div>
                        </div>}


                
                <div className="w-[100%] ring-[1px] ring-[#373435] relative rounded-b-[10px] p-[10px] h-[130px] bg-[#000000]">
                    <textarea onKeyDown={handleKeyDown} onChange={(e) => setMessage(e.target.value)} value={message} className="w-[100%] focus:outline-none h-[100%] leading-[19px] rounded-[5px] bg-[#101010] text-black py-[5px] px-[8px] bg-white resize-none" placeholder="Ask Max"></textarea>
                    <div onClick={() => onMessageSubmit(message)} className="w-[70px] ring-[0.5px] ring-[0.5px] ring-[#727376] cursor-pointer hover:bg-black absolute top-[5px] right-[-20px] h-[70px] rounded-full bg-[#373435] flex items-center justify-center cursor-pointer mt-[10px]">
                        <Image alt="" className="ml-[7px]" src={Send} height={35}  />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Max;