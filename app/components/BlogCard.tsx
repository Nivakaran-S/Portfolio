import Newspaper from '../images/news.jpeg'
import Image from 'next/image';

interface BlogCardProps {
    text: string;
    image: string | null;
    text1: string;
    onClick: () => void;
}

const BlogCard: React.FC<BlogCardProps> = ({ text, image, text1, onClick }) => {
    return (
        <div className="bg-[#4b4b4d] relative hover:scale-[107%] transition-transform duration-500 ring-[0.5px] ring-[#4b4b4d] text-[15.27px] cursor-pointer h-[270px] sm:h-[360px] w-[180px] sm:w-[230px] flex flex-col rounded-[10px] sm:rounded-[20px]" onClick={onClick}>
            <div className="sm:h-[61.80%] h-[100%] bg-[#373435] rounded-[10px] sm:rounded-b-[0px] sm:rounded-t-[20px]  sm:flex items-center justify-center overflow-hidden">
                {image && (
                    <Image
                        src={image}
                        alt="blog image"
                        width={230}
                        height={140}
                        quality={90}
                        className="w-full hover:scale-[110%] animation-transitioni duration-500 h-full object-cover rounded-[15px]  sm:rounded-b-[0px] sm:rounded-t-[20px]"
                    />
                )}
            </div>

            <div className="absolute top-0 inset-0 backdrop-blur-sm bg-black/30 sm:relative  flex flex-col items-center justify-center  py-[13px] px-[13px] h-[100%] sm:h-[38.2%] rounded-b-[20px] rounded-t-[20px] sm:rounded-t-[0px] opacity-[0.8] sm:bg-[#101010]">
                <p className="text-[20px]  leading-[24px]">{text1}</p>

            </div>
        </div>
    );
}

export default BlogCard;