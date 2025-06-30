

import React from "react"

import Image from "next/image"
import Bed from '../images/aii.jpg'
import axios from "axios"
import { useEffect, useState } from "react"



const Restuarant = () => {
    const [title, setTitle] = useState<string>('')
    const [description, setDescription] = useState<string>('')
    const [content, setContent] = useState<string>('')
    const [imageLink, setImageLink] = useState<string>('')
    const [topics, setTopics] = useState<any>([])
    const [topic, setTopic] = useState<string>('')

    const handleAddTopic = () => {
        if (topic) {
            setTopics([...topics, topic])
            setTopic('')
        }
    }

    const handleCreateBlog = async () => {
        try {
            const response = await axios.post('https://new-portfolio-backend-roan.vercel.app/blog', {
                title,
                description,
                content,
                imageLink,
                topics
            })
            console.log('Blog created successfully')
        } catch (error) {
            console.error("Error creating blog:", error)
        }
    }


    return(
        <div className="flex text-black  flex-row w-full h-full bg-white ">
            
            <div className="flex flex-col px-[20px] py-[20px] overflow-y-scroll h-[90vh]   w-[75%] ">
                <p className="text-[33px]">Blogs</p>
                <div>
                
                    <p>Blog Title</p>
                    <input onChange={(e) => setTitle(e.currentTarget.value)} className="bg-white w-[100%] outline-none py-[5px] rounded-[5px] mt-[5px] ring-gray-600 ring-[0.5px] px-[10px]"/>
                    
                    <p className="mt-[10px]">Blog Description</p>
                    <input onChange={(e) => setDescription(e.currentTarget.value)} className="bg-white w-[100%] outline-none py-[5px] rounded-[5px] mt-[5px] ring-gray-600 ring-[0.5px] px-[10px]"/>
                  

                    <p className="mt-[10px]">Blog topics</p>

                    <div className="flex flex-row space-x-[10px] ml-[10px]">
                        {topics.map((topic: string, index: number) => (
                            <p key={index} className="bg-gray-500 w-fit px-[10px] py-[3px] my-[5px] text-[13px] ring-gray-800 ring-[1px] rounded-[5px]">
                                {topic}
                            </p>
                        ))}
                    </div>
                   
                   
                    <div className="flex flex-row items-center justify-center">
                        <input value={topic} onChange={(e) => setTopic(e.currentTarget.value)} className="bg-white w-[100%] outline-none py-[5px] rounded-[5px] mt-[5px] ring-gray-600 ring-[0.5px] px-[10px]"/>
                        <div onClick={handleAddTopic} className="bg-black cursor-pointer text-white py-[3px] px-[15px] ring-gray-800 ring-[1px] rounded-[5px]  mt-[2px] ml-[8px]">
                            <p>Add</p>
                        </div>
                    </div>
                    <p className="mt-[10px]">Image Link</p>
                    <input onChange={(e) => setImageLink(e.currentTarget.value)} className="bg-white w-[100%] outline-none py-[5px] rounded-[5px] mt-[5px] ring-gray-600 ring-[0.5px] px-[10px]"/>
                        

                    <p className="mt-[10px]">Content</p>
                    <input onChange={(e) => setContent(e.currentTarget.value)}  className="bg-white w-[100%] outline-none py-[5px] rounded-[5px] mt-[5px] ring-gray-600 ring-[0.5px] px-[10px]"/>
                        
                    

                    <div onClick={handleCreateBlog} className="flex flex-row cursor-pointer mt-[20px] ring-[1px] ring-yellow-800 items-center py-[5px] rounded-[5px] justify-center w-[100%] bg-yellow-500 mt-[10px] ">
                        <p>Confirm</p>
                    </div>
                </div>
            </div>
            <div className="flex flex-col bg-gray-300 px-[20px] py-[20px] w-[25%] ">
                <div>
                    <p className="text-[22px]">Add Project Category</p>
                    <div className="mt-[10px] flex flex-col">
                        <p>Project Category Name</p>
                        <input className="bg-white outline-none py-[5px] rounded-[5px] mt-[5px] ring-gray-600 ring-[0.5px] px-[10px]"/>
                        <div   className="flex flex-row  cursor-pointer items-center py-[5px] rounded-[5px] justify-center w-[100%] bg-gray-400 mt-[10px] ">
                            <p>Confirm</p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Restuarant