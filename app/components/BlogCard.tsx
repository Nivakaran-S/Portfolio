

interface BlogCardProps {
    text: string;
    text1: string;
    onClick: () => void;
}

const BlogCard: React.FC<BlogCardProps> = ({ text, text1, onClick }) => {
    return (
        <div className="bg-[#4b4b4d] hover:scale-[107%] transition-transform duration-500 ring-[0.5px] ring-[#4b4b4d] text-[15.27px] cursor-pointer h-[300px] sm:h-[340px] w-[250px] flex flex-col rounded-[20px]" onClick={onClick}>
            <div className="sm:h-[61.80%] h-[55%] bg-[#373435] rounded-t-[20px] flex items-center justify-center">
                <p className="py-[5px] pr-[7px]">{text}</p>
            </div>
            <div className="  flex flex-col py-[5px] px-[13px] h-[45%] sm:h-[38.2%] rounded-b-[20px] bg-[#101010]">
                <p className="text-[20px]">{text1}</p>
                <p className="text-[11px] text-gray-400 leading-[15px]">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sunt ipsum blanditiis dicta soluta inventore odio ad, nihil aliquid delectus autem labore nulla! Laudantium maxime ab, asperiores cupiditate ex enim non.</p>
            </div>
        </div>
    );
}

export default BlogCard;