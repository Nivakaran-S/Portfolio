



interface SecondaryBtnProps {
    text: string;
    onClick: () => void;
}0

const SecondaryBtn: React.FC<SecondaryBtnProps> = ({ text, onClick }) => {
    return (
        <div className="bg-[#4b4b4d] hover:scale-[108%] transition-transform duration-500 text-[15.27px] cursor-pointer  flex flex-row items-center px-[20px]  rounded" onClick={onClick}>
            <p className=" ">{text}</p>
            
        </div>
    );
}

export default SecondaryBtn;