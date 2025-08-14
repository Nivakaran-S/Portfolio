import Image from "next/image";
import News from '../images/news.jpeg'

interface CaseStudyProps {
    text: string;
    text1: string;
    imageUrl:string;
    onClick: (e: React.MouseEvent<HTMLDivElement>) => void;
}


const CaseStudyCard: React.FC<CaseStudyProps> = ({ text, text1, imageUrl, onClick }) => {
    return (
        <div onClick={onClick} className="h-[350px] hover:ring-[1.6px] hover:ring-gray-300 hover:scale-[105%] transition duration-300 ease-in-out    flex flex-row items-center justify-center cursor-pointer ring-[#5F5F62] ring-[1.5px] rounded-[20px] w-[450px] bg-[#373435]" >
            <div className="hidden sm:flex  w-[40%] h-[100%] rounded-l-[20px] ">
                <Image 
                    src={imageUrl || News} 
                    alt="Project Image" 
                    className="w-full h-full object-cover transition-transform duration-500  rounded-l-[20px]" 
                    width={500}
                    height={350}
                />
            </div>
            <div className=" sm:w-[60%] px-[30px] sm:px-[20px] h-[100%] bg-[#101010] rounded-[20px] sm:rounded-[0px] sm:rounded-r-[20px] flex flex-col items-center justify-center">
                <p className="text-[30px] sm:text-[23px]">{text1}</p>
                <p className="text-[15px] mt-[10px] sm:mt-[0px] leading-[19px] ">{text}</p>
            </div>
        </div>
    );
}

export default CaseStudyCard;