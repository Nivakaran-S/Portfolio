import Image from "next/image";
import News from '../images/news.jpeg'
import DOMPurify from 'dompurify';

interface CaseStudyProps {
    text: string;
    text1: string;
    imageUrl:string;
    onClick: (e: React.MouseEvent<HTMLDivElement>) => void;
}


const CaseStudyCard: React.FC<CaseStudyProps> = ({ text, text1, imageUrl, onClick }) => {

    const sanitizedOverview = text ? DOMPurify.sanitize(text) : '';

    return (
        <div onClick={onClick} className="h-[350px]  relative hover:ring-[1.6px] hover:ring-gray-300 hover:scale-[105%] transition duration-300 ease-in-out    flex flex-row items-center  cursor-pointer ring-[#5F5F62] ring-[1.5px] rounded-[20px] w-[98%] sm:w-[450px] bg-[#373435]" >
            <div className="hidden sm:flex absolute w-[100%] h-[100%] rounded-[20px] ">
                <Image 
                    src={imageUrl || News} 
                    alt="Project Image" 
                    className="w-full h-full object-cover transition-transform duration-500  rounded-[20px]" 
                    width={500}
                    height={350}
                />
            </div>
            <div className=" sm:w-[70%] z-[9] px-[30px] sm:px-[20px] h-[100%] bg-[#101010] rounded-[20px] ring-[1.5px] ring-[#808080]  sm:rounded-r-[20px] flex flex-col  justify-center">
                <p className="text-[35px] leading-[34.5px] sm:leading-[33px] sm:mb-[10px] sm:text-[30px]">{text1}</p>
                
                { 
                <div
                    className="text-[15px] px-[20px] sm:px-[0px] mt-[10px] sm:mt-[0px] leading-[19px]"
                    dangerouslySetInnerHTML={{ __html: sanitizedOverview }}
                />
                }
            </div>
        </div>
    );
}

export default CaseStudyCard;