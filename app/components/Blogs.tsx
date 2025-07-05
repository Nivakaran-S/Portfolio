'use client'
import BlogCard from "./BlogCard";
import PrimaryBtn from "./PrimaryBtn";
import React, {useEffect} from "react";
import { useRouter } from "next/navigation";



const Blogs = () => {

    useEffect(() => {
        if(typeof window !== 'undefined'){
            import('scrollreveal').then((ScrollReveal) => { 
                ScrollReveal.default().reveal('.blogs1', {
                origin: 'bottom',
                distance: '20px',
                duration: 800,
                delay: 200,
                easing: 'ease-in-out',
                reset: false
            })
        })
        }
    }, [])

    useEffect(() => {
        if(typeof window !== 'undefined'){
            import('scrollreveal').then((ScrollReveal) => { 
                ScrollReveal.default().reveal('.blogs2', {
                origin: 'right',
                distance: '20px',
                duration: 800,
                delay: 400,
                easing: 'ease-in-out',
                reset: false
            })
        })
        }
    }, [])

    useEffect(() => {
        if(typeof window !== 'undefined'){
            import('scrollreveal').then((ScrollReveal) => { 
                ScrollReveal.default().reveal('.blogs3', {
                origin: 'left',
                distance: '20px',
                duration: 800,
                delay: 600,
                easing: 'ease-in-out',
                reset: false
            })
        })
        }
    }, [])

    useEffect(() => {
        if(typeof window !== 'undefined'){
            import('scrollreveal').then((ScrollReveal) => { 
                ScrollReveal.default().reveal('.blogs4', {
                origin: 'bottom',
                distance: '20px',
                duration: 800,
                delay: 800,
                easing: 'ease-in-out',
                reset: false
            })
        })
        }
    }, [])

    const onBlog1Click = () => {
        console.log("Blog 1 clicked")
    }

    const onAllBlogsClick = () => {
        Router.push('/blogs')

    }

    const Router = useRouter()

    return(
        <div className="bg-[#000] h-[120vh] w-screen flex items-center justify-center">
            <div className="w-[90%] mt-[40px] flex  flex-col">
                <div className="leading-[50px] sm:leading-[64px] blogs1 text-center">
                    <p className="text-[44px] sm:text-[55px] bg-gradient-to-t from-[#433D3A] via-[#C6C4C3] font-bold to-[#CAC8C6] bg-clip-text text-transparent">Stay Updated</p>
                    <p className="text-[40px] sm:text-[55px] bg-gradient-to-t from-[#433D3A] via-[#C6C4C3] font-bold to-[#CAC8C6] bg-clip-text text-transparent">with Latest Insights</p>
                </div>
                <div className="grid gap-[18px] grid-cols-1 sm:flex flex-row items-center justify-center sm:space-x-[20px] mt-[30px]">
                    <div className="blogs2 flex flex-row items-center justify-center space-x-[5px] sm:space-x-[20px]">
                        <BlogCard text="Blog 1" text1="Blog Title" onClick={onBlog1Click}/>
                        <BlogCard text="Blog 1" text1="Blog Title" onClick={onBlog1Click}/>
                    </div>
                    <div className="blogs3 flex flex-row items-center justify-center space-x-[5px] sm:space-x-[20px]">
                        <BlogCard text="Blog 1" text1=" Blog Title" onClick={onBlog1Click}/>
                        <BlogCard text="Blog 1" text1="Blog Title" onClick={onBlog1Click}/>
                    </div>
                    
                    
                </div>
                <div className="flex blogs4 items-center justify-center mt-[20px]">
                    <PrimaryBtn text="More Blogs" onClick={onAllBlogsClick} />
                </div>
            </div>
        </div>
    )
}

export default Blogs;