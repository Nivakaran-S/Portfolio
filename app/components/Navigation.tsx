import { useState } from "react";
import Link from "next/link"; // Replace useRouter with Link
import { MouseEvent } from "react";
import Image from "next/image";
import Menu from '../images/menu.png';
import Logo from '../images/nivakaranLogo3.png';

interface ContactModelProps {
  onContactClick: () => void;
  navSelection: string;
}

const Navigation: React.FC<ContactModelProps> = ({ navSelection, onContactClick }) => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const onMenuClick = (e: MouseEvent<HTMLDivElement>) => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="flex items-center z-[47] fixed top-0 w-[100vw] justify-center">
      <div className="lg:flex hidden flex-row justify-between items-center px-[20px] h-[60px] 2xl:h-[55px] rounded-[8px] ring-[0.5px] ring-[#727376] w-[90vw] mt-[13px] bg-[#373435] text-black">
        <Link href="/" className="cursor-pointer flex flex-row items-center justify-center space-x-[5px] text-[20px] text-white">
          <Image alt="test" src={Logo} height={23} width={38} />
          <p>NivakaranS</p>
        </Link>
        <div className="flex flex-row items-center text-[18.5px] justify-between text-white w-[35%]">
          <Link href="/" className={`${navSelection === 'Home' ? 'text-[#FFD700]' : ''} cursor-pointer hover:text-[#FFD700]`}>
            <p>Home</p>
          </Link>
          <Link href="/about" className={`${navSelection === 'About' ? 'text-[#FFD700]' : ''} cursor-pointer hover:text-[#FFD700]`}>
            <p>About</p>
          </Link>
          <Link href="/services" className={`${navSelection === 'Services' ? 'text-[#FFD700]' : ''} cursor-pointer hover:text-[#FFD700]`}>
            <p>Services</p>
          </Link>
          <Link href="/portfolio" className={`${navSelection === 'Portfolio' ? 'text-[#FFD700]' : ''} cursor-pointer hover:text-[#FFD700]`}>
            <p>Portfolio</p>
          </Link>
          <Link href="/blogs" className={`${navSelection === 'Blogs' ? 'text-[#FFD700]' : ''} cursor-pointer hover:text-[#FFD700]`}>
            <p>Blogs</p>
          </Link>
        </div>
        <div>
          <div onClick={onContactClick} className="cursor-pointer bg-[#4B4B4D] text-white px-[18px] text-[15px] ring-[0.8px] ring-gray-800 py-[7px] rounded-[20px]">
            <p>Let's talk</p>
          </div>
        </div>
      </div>

      <div className="lg:hidden flex flex-row justify-between items-center px-[20px] h-[60px] 2xl:h-[55px] rounded-[8px] ring-[0.5px] ring-[#727376] w-[90vw] mt-[13px] z-[47] bg-[#373435] text-black">
        <div onClick={onMenuClick} className="flex select-none flex-row items-center justify-center cursor-pointer">
          <Image alt="menu" className="select-none" src={Menu} height={23} />
        </div>
        <Link href="/" className="cursor-pointer text-[20px] text-white">
          <p>NivakaranS</p>
        </Link>
        <div>
          <div onClick={onContactClick} className="cursor-pointer bg-[#4B4B4D] text-white px-[18px] text-[15px] ring-[0.8px] ring-gray-800 py-[7px] rounded-[20px]">
            <p>Let's talk</p>
          </div>
        </div>
      </div>
      <div className={`${isMenuOpen ? 'translate-x-0' : 'translate-x-[-100vw]'} duration-500 lg:hidden z-[50] flex flex-row items-center w-[100vw] absolute top-0 left-0 cursor-pointer`}>
        <div className="bg-[#373435] w-[70%] z-[9999] h-[100vh]">
          <div>
            <div className="cursor-pointer text-[30px] flex items-center justify-center pt-[40px] pb-[10px] text-white">
              <p className="text-[35px] bg-gradient-to-t from-[#0000] ring-[0.5px] via-[#C6C4C3] font-bold to-[#CAC8C6] bg-clip-text text-transparent">NivakaranS</p>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center text-[18px] space-y-[5px] mt-[20px]">
            <Link href="/" className={`${navSelection === 'Home' ? 'text-[#FFD700] bg-[#808080] ring-[0.5px] ring-[#101010]' : ''} w-[90%] rounded-[5px] py-[10px] px-[20px] cursor-pointer hover:text-[#FFD700]`}>
              <p>Home</p>
            </Link>
            <Link href="/about" className={`${navSelection === 'About' ? 'text-[#FFD700] bg-[#808080] ring-[0.5px] ring-[#101010]' : ''} w-[90%] rounded-[5px] py-[10px] px-[20px] cursor-pointer hover:text-[#FFD700]`}>
              <p>About</p>
            </Link>
            <Link href="/services" className={`${navSelection === 'Services' ? 'text-[#FFD700] bg-[#808080] ring-[0.5px] ring-[#101010]' : ''} w-[90%] rounded-[5px] py-[10px] px-[20px] cursor-pointer hover:text-[#FFD700]`}>
              <p>Services</p>
            </Link>
            <Link href="/portfolio" className={`${navSelection === 'Portfolio' ? 'text-[#FFD700] bg-[#808080] ring-[0.5px] ring-[#101010]' : ''} w-[90%] rounded-[5px] py-[10px] px-[20px] cursor-pointer hover:text-[#FFD700]`}>
              <p>Portfolio</p>
            </Link>
            <Link href="/blogs" className={`${navSelection === 'Blogs' ? 'text-[#FFD700] bg-[#808080] ring-[0.5px] ring-[#101010]' : ''} w-[90%] rounded-[5px] py-[10px] px-[20px] cursor-pointer hover:text-[#FFD700]`}>
              <p>Blogs</p>
            </Link>
          </div>
        </div>
        <div onClick={onMenuClick} className={`${isMenuOpen ? 'opacity-80 delay-300 duration-500' : 'opacity-0'} md:hidden flex flex-col items-center w-[50%] h-[100vh] justify-center bg-black ring-[0.5px] ring-[#727376]`}></div>
      </div>
    </div>
  );
};

export default Navigation;