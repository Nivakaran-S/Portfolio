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
        if(e.key === "Enter" && !e.shiftKey) {
            e.preventDefault()
            onMessageSubmit(e.target.value);
        }
    }

    const handleMax = () => {
        setMax(!max);
        // Prevent body scroll when chat is open on mobile
        if (!max) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }

    const onMaxFalseClick = () => {
        setMax(false);
        document.body.style.overflow = 'unset';
    }

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, []);

    const parseMessageToJSX = (text: string) => {
        const parts = text.split(/(\*\*.*?\*\*)/g); // Split by **text** pattern
        return parts.map((part, index) => {
            if (part.startsWith('**') && part.endsWith('**')) {
                // Remove ** from start and end, and wrap in <strong>
                const boldText = part.slice(2, -2);
                return <strong key={index}>{boldText}</strong>;
            }
            return <span className="flex" key={index}>{part}</span>;
        });
    };
    
    return (
        <div className={`${max? 'h-[100vh] w-[100vw]' : '' } fixed z-[9999] text-black bottom-[0px] right-[0px]`}>
            {/* Backdrop - Mobile optimized */}
            <div 
                onClick={onMaxFalseClick} 
                className={`absolute top-0 left-0 w-screen h-screen bg-black transition-opacity duration-500 opacity-40 ${max ? 'flex' : 'hidden'}`}
            ></div>
            
            {/* Max Button - Mobile responsive positioning */}
            <div 
                onClick={handleMax} 
                className={`${max ? 'translate-y-[100px]' : 'translate-y-[0px] delay-300'} select-none transition-transform duration-500 ease-in-out absolute bottom-[15px] right-[15px] sm:bottom-[20px] sm:right-[30px] flex items-center justify-center w-fit bg-[#373435] ring-[0.5px] ring-[#727376] rounded-full cursor-pointer px-[25px] py-[8px] sm:px-[30px] sm:py-[5px] shadow-lg`}
            >
                <p className="select-none text-white text-[18px] sm:text-[20px] font-medium">Max</p>
            </div>

            {/* Chat Container - Mobile optimized */}
            <div className={`${max ? 'scale-[100%] delay-200' : 'scale-0'} custom-scrollbar absolute bottom-0 right-0 sm:bottom-[20px] sm:right-[30px] origin-bottom-right transition-transform duration-500 ease-in-out flex flex-col bg-[#373435] ring-[0.5px] ring-[#727376] h-[100vh] w-[100vw] sm:h-[580px] sm:w-[400px] sm:rounded-[10px] justify-center`}>
                
                {/* Header - Mobile responsive */}
                <div className="w-[100%] select-none px-[20px] sm:px-[20px] bg-[#000000] text-white flex flex-row justify-between sm:rounded-t-[10px] py-[20px] sm:py-[15px] h-fit items-center border-b border-[#373435] safe-area-top">
                    <div>
                        <p className="text-[24px] sm:text-[20px] font-semibold">Max</p>
                        <p className="text-[12px] sm:text-[11px] text-gray-400">AI Assistant</p>
                    </div>
                    <div onClick={handleMax} className="cursor-pointer bg-[#373435] hover:bg-[#4a4a4a] px-[12px] py-[6px] rounded-[6px] transition-colors">
                        <p className="text-[14px] sm:text-[13px]">Close</p>
                    </div>
                </div>

                {/* Messages Container - Mobile optimized scrolling */}
                {messageSubmitted ? (
                    <div
                        className="flex flex-col flex-1 overflow-y-auto py-4 ring-[1px] ring-[#373435] px-3 sm:px-5 bg-[#101010] scrollbar scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-gray-800 safe-area-content"
                        ref={scrollContainerRef}
                        style={{ 
                            WebkitOverflowScrolling: 'touch', // Smooth scrolling on iOS
                            overscrollBehavior: 'contain' // Prevent page scroll when scrolling chat
                        }}
                    >
                        <div className="flex justify-center mt-[5px] mb-[10px]">
                            <div className="bg-[#8f8f8f] text-[11px] sm:text-[12px] px-[10px] py-[3px] rounded-[5px] border-[1px] border-gray-500 box-shadow-lg w-fit">
                                <p className="text-gray-800">Today</p>
                            </div>
                        </div>
                        {messageCollection
                            .sort((a, b) => a.timestamp - b.timestamp)
                            .map((msg, index) => (
                                <div className={`${msg.type === 'sender' ? 'justify-end' : 'justify-start'} flex mb-3`} key={index}>
                                    <div
                                        className={`${msg.type === 'sender' 
                                            ? 'border-[1px] border-[#1D1D1D] self-end bg-[#808080] text-black' 
                                            : 'border-[1px] flex-col border-gray-500 self-start bg-white text-black'
                                        } flex box-shadow-lg max-w-[85%] sm:max-w-[80%] text-left rounded-[8px] py-[8px] px-[12px] sm:py-[5px] sm:px-[13px] text-[14px] sm:text-[14px] leading-relaxed`}
                                    >
                                        {parseMessageToJSX(msg.content)}
                                    </div>
                                </div>
                            ))}
                        {typing === true ? (
                            <div className="flex py-[10px] items-center justify-start mb-3">
                                <div className=" rounded-lg p-3 flex justify-center items-center ">
                                    <span className="loader"></span>
                                </div>
                            </div>
                        ) : null}
                    </div>
                ) : (
                    <div className='flex-1 ring-[1px] ring-[#373435] flex flex-col justify-center items-center bg-[#101010] px-4 safe-area-content'>
                        <div className="mx-[20px] sm:mx-[30px] text-gray-300 px-[10px] my-[20px] text-center">
                            <p className="text-[16px] sm:text-[15px] mb-3 leading-relaxed">Hello! I'm Max, an AI-powered assistant created by Nivakaran.</p>
                            <p className="text-[16px] sm:text-[15px] leading-relaxed">I'm here to guide you through Nivakaran's projects and answer any questions you have along the way. Let's explore together!</p>
                        </div>
                    </div>
                )}

                {/* Input Area - Mobile optimized */}
                <div className="w-[100%] ring-[1px] ring-[#373435] relative sm:rounded-b-[10px] py-[15px] px-[15px] sm:py-[10px] sm:px-[10px] bg-[#000000] safe-area-bottom">
                    <div className="relative">
                        <textarea 
                            onKeyDown={handleKeyDown} 
                            onChange={(e) => setMessage(e.target.value)} 
                            value={message} 
                            className="w-[100%] focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[50px] max-h-[120px] sm:min-h-[40px] sm:max-h-[100px] leading-[20px] sm:leading-[19px] rounded-[8px] bg-white text-black py-[12px] px-[12px] sm:py-[8px] sm:px-[8px] resize-none text-[16px] sm:text-[14px] placeholder-gray-500" 
                            placeholder="Ask Max..."
                            rows={2}
                            style={{ fontSize: '16px' }} // Prevents zoom on iOS
                        />
                        <div 
                            onClick={() => onMessageSubmit(message)} 
                            className="absolute top-[8px] right-[8px] sm:top-[5px] sm:right-[5px] w-[45px] h-[45px] sm:w-[40px] sm:h-[40px] ring-[0.5px] ring-[#727376] cursor-pointer hover:bg-[#4a4a4a] rounded-full bg-[#373435] flex items-center justify-center transition-colors shadow-lg"
                        >
                            <Image alt="Send message" className="ml-[2px]" src={Send} height={20} width={20} />
                        </div>
                    </div>
                    
                    {/* Mobile hint text */}
                    <p className="text-[11px] text-gray-500 mt-[8px] text-center sm:hidden">
                        Tap send or press Enter to send message
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Max;