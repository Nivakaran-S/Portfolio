

interface CaseStudyProps {
    text: string;
    text1: string;
}

const CaseStudyCard: React.FC<CaseStudyProps> = ({ text, text1 }) => {
    return (
        <div className="h-[350px] hover:scale-[105%] transition duration-300 ease-in-out    flex flex-row items-center justify-center cursor-pointer ring-[#5F5F62] ring-[1.5px] rounded-[20px] w-[100%] bg-[#373435]" >
            <div className="w-[40%] h-[100%] rounded-l-[20px] ">

            </div>
            <div className="w-[60%] px-[20px] h-[100%] bg-[#101010] rounded-r-[20px] flex flex-col items-center justify-center">
                <p className="text-[23px]">{text1}</p>
                <p className="text-[15px] leading-[19px] ">Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi non itaque officia eligendi sed at veniam eos quod tempora  Lorem ipsum dolor, sit amet consectetur adipisicing elit. Earum beatae ut repellendus maxime excepturi suscipit. Recusandae ex culpa animi deleniti, quisquam voluptatem est aliquid suscipit, esse quaerat impedit? Officiis, tenetur!</p>
            </div>
        </div>
    );
}

export default CaseStudyCard;