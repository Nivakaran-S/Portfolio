



import Image from "next/image";
import Up from '../images/upIcon.png'


const Top = () => {
    const onTopClick = () => {
        window.scrollTo({top: 0, behavior: 'smooth'});
    }
    return (
        <div className="fixed z-[999] bottom-[80px] right-[50px] text-[15.27px] cursor-pointer w-fit flex flex-row rounded" onClick={onTopClick}>
            
            <div className=" rounded h-[50px] w-[50px] px-[8px] flex items-center justify-center bg-[#fff] ring-[0.5px] ring-[#727376]">
                <Image alt="up" src={Up} className="mt-[5px]" height={60}/>
            </div>
        </div>
    );
}

export default Top;