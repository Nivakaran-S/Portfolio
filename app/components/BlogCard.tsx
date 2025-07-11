

interface BlogCardProps {
    text: string;
    text1: string;
    onClick: () => void;
}

const BlogCard: React.FC<BlogCardProps> = ({ text, text1, onClick }) => {
    return (
        <div className="bg-[#4b4b4d] hover:scale-[107%] transition-transform duration-500 ring-[0.5px] ring-[#4b4b4d] text-[15.27px] cursor-pointer h-[270px] sm:h-[360px] w-[180px] sm:w-[230px] flex flex-col rounded-[10px] sm:rounded-[20px]" onClick={onClick}>
            <div className="sm:h-[61.80%] h-[55%] bg-[#373435] rounded-t-[20px] hidden sm:flex items-center justify-center">
                <p className="py-[5px] pr-[7px]">{text}</p>
            </div>
            <div className="  flex flex-col justify-center py-[5px] px-[13px] h-[100%] sm:h-[38.2%] rounded-b-[20px] rounded-t-[20px] sm:rounded-t-[0px]  sm:bg-[#101010]">
                <p className="text-[20px]">{text1}</p>
                <p className="text-[11px] text-gray-300 sm:text-gray-400 leading-[15px]">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sunt ipsum blanditiis dicta soluta inventore odio ad, nihil aliquid delectus autem labore nulla! Laudantium maxime ab, asperiores cupiditate ex enim non.</p>
                
            </div>
        </div>
    );
}

export default BlogCard;