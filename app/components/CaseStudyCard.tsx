

interface CaseStudyProps {
    text: string;
    text1: string;
}

const CaseStudyCard: React.FC<CaseStudyProps> = ({ text, text1 }) => {
    return (
        <div className="h-[350px] hover:scale-[105%] transition duration-300 ease-in-out    flex flex-row items-center justify-center cursor-pointer ring-[#5F5F62] ring-[1.5px] rounded-[20px] w-[100%] bg-[#373435]" >
            <div className="hidden sm:flex  w-[40%] h-[100%] rounded-l-[20px] ">

            </div>
            <div className=" sm:w-[60%] px-[30px] sm:px-[20px] h-[100%] bg-[#101010] rounded-[20px] sm:rounded-r-[20px] flex flex-col items-center justify-center">
                <p className="text-[30px] sm:text-[23px]">{text1}</p>
                <p className="text-[15px] mt-[10px] sm:mt-[0px] leading-[19px] ">Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi non itaque officia eligendi sed at veniam eos quod tempora  Lorem ipsum dolor, sit amet consectetur adipisicing elit. Earum beatae ut repellendus maxime!</p>
            </div>
        </div>
    );
}

export default CaseStudyCard;