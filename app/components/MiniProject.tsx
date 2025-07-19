import Image from "next/image";
import NewsPaper from '../images/news.jpeg'

const MiniProject = () => {
    return (
        <div className="hover:scale-[108%] transition-transform duration-500  w-[190px] sm:w-[220px] rounded-[15px] bg-black ring-[#373435] ring-[1px] cursor-pointer h-[320px]">
                <div className="flex items-center justify-center bg-[#373435] rounded-t-[15px] h-[50%]">
                    <Image className="h-[100%] w-[100%] rounded-t-[15px]" alt="test" src={NewsPaper}/>
                </div>
                <div className="flex flex-col h-[50%] rounded-b-[15px] bg-[#101010] w-full px-[15px] justify-center">
                    <p className="leading-[25px]">Project Title Project Title Project Title</p>
                <div className="text-[10px] ">
                    <p>Lorem ipsum dolor! Perspiciatis officia sit nemo error necessitatibus, cupiditate magnam numquam! Fugiat, reprehenderit placeat? Neque animi officia minus praesentium?</p>
                </div>
            </div>
        </div>
    );
}

export default MiniProject;