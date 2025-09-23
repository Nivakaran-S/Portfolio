import { useState, useEffect } from "react";
import Link from "next/link";
import { MouseEvent } from "react";
import Image from "next/image";
import Menu from "../images/menu.png";
import Logo from "../images/nivakaranLogo3.png";

interface ContactModelProps {
  onContactClick: () => void;
  navSelection: string;
}

const Navigation: React.FC<ContactModelProps> = ({
  navSelection,
  onContactClick,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [showNav, setShowNav] = useState<boolean>(true);
  const [lastScrollY, setLastScrollY] = useState<number>(0);

  const onMenuClick = (e: MouseEvent<HTMLDivElement>) => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Handle scroll direction
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY && window.scrollY > 50) {
        // scrolling down and past a threshold -> hide nav
        setShowNav(false);
      } else {
        // scrolling up -> show nav
        setShowNav(true);
      }
      setLastScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (isMenuOpen && window.innerWidth < 1024) {
        setIsMenuOpen(false);
      }
    };

    // Add event listener for clicks
    document.addEventListener("click", handleClickOutside as any);
    return () => {
      document.removeEventListener("click", handleClickOutside as any);
    };
  }, [isMenuOpen]);

  // Prevent body scroll when menu is open on mobile
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  return (
    <div
      className={`flex  items-center z-[47] fixed top-0 w-[100%] justify-center transform transition-transform duration-500
      ${showNav ? "translate-y-0" : "-translate-y-full"}`}
    >
      {/* Desktop Navbar */}
      <div className="lg:flex hidden flex-row justify-between  items-center px-[20px] h-[60px] 2xl:h-[55px] rounded-[8px] ring-[0.5px] ring-[#727376] w-[90vw] mt-[13px] bg-[#373435] text-black">
        <Link
          href="/"
          className="cursor-pointer flex flex-row items-center justify-center space-x-[5px] text-[20px] text-white"
          aria-label="Nivakaran S. - Home"
        >
          <Image alt="Nivakaran S. Logo" src={Logo} height={23} width={38} />
          <p>NivakaranS</p>
        </Link>
        
        <nav role="navigation" aria-label="Main navigation">
          <div className="flex flex-row space-x-[50px] items-center text-[18.5px] justify-between text-white w-[35%]">
            <Link
              href="/"
              className={`${
                navSelection === "Home" ? "text-[#FFD700]" : ""
              } cursor-pointer hover:text-[#FFD700] transition-colors`}
              aria-current={navSelection === "Home" ? "page" : undefined}
            >
              <p>Home</p>
            </Link>
            <Link
              href="/about"
              className={`${
                navSelection === "About" ? "text-[#FFD700]" : ""
              } cursor-pointer hover:text-[#FFD700] transition-colors`}
              aria-current={navSelection === "About" ? "page" : undefined}
            >
              <p>About</p>
            </Link>
            <Link
              href="/services"
              className={`${
                navSelection === "Services" ? "text-[#FFD700]" : ""
              } cursor-pointer hover:text-[#FFD700] transition-colors`}
              aria-current={navSelection === "Services" ? "page" : undefined}
            >
              <p>Services</p>
            </Link>
            <Link
              href="/portfolio"
              className={`${
                navSelection === "Portfolio" ? "text-[#FFD700]" : ""
              } cursor-pointer hover:text-[#FFD700] transition-colors`}
              aria-current={navSelection === "Portfolio" ? "page" : undefined}
            >
              <p>Portfolio</p>
            </Link>
            <Link
              href="/blogs"
              className={`${
                navSelection === "Blogs" ? "text-[#FFD700]" : ""
              } cursor-pointer hover:text-[#FFD700] transition-colors`}
              aria-current={navSelection === "Blogs" ? "page" : undefined}
            >
              <p>Blogs</p>
            </Link>
          </div>
        </nav>
        
        <div>
          <button
            onClick={onContactClick}
            className="cursor-pointer bg-[#4B4B4D] text-white px-[18px] text-[15px] ring-[0.8px] ring-[#1D1D1D] hover:bg-[#5a5a5c] transition-colors py-[7px] rounded-[20px]"
            aria-label="Open contact form"
          >
            Let&apos;s talk
          </button>
        </div>
      </div>

      {/* Mobile Navbar */}
      <div className="lg:hidden flex flex-row justify-between items-center px-[20px] h-[60px] 2xl:h-[55px] rounded-[8px] ring-[0.5px] ring-[#727376] w-[90vw] mt-[13px] z-[47] bg-[#373435] text-black">
        <div
          onClick={onMenuClick}
          className="flex select-none flex-row items-center justify-center cursor-pointer"
          aria-label="Toggle mobile menu"
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              setIsMenuOpen(!isMenuOpen);
            }
          }}
        >
          <Image alt="Mobile menu toggle" className="select-none" src={Menu} height={23} width={23} />
        </div>
        <Link href="/" className="cursor-pointer text-[20px] text-white" aria-label="Nivakaran S. - Home">
          <p>NivakaranS</p>
        </Link>
        <div>
          <button
            onClick={onContactClick}
            className="cursor-pointer bg-[#4B4B4D] text-white px-[18px] text-[15px] ring-[0.8px] ring-gray-800 py-[7px] rounded-[20px] hover:bg-[#5a5a5c] transition-colors"
            aria-label="Open contact form"
          >
            Let&apos;s talk
          </button>
        </div>
      </div>

      {/* Mobile Menu Slide */}
      <div
        className={`${
          isMenuOpen ? "translate-x-0" : "translate-x-[-100vw]"
        } duration-500 lg:hidden z-50 flex flex-row items-center w-full absolute top-0 left-0 cursor-pointer`}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation menu"
      >
        <div className="bg-[#373435] border-r-[1px] w-[70%] z-50 h-screen fixed top-0">
          <div>
            <div className="cursor-pointer  text-[30px] flex flex-col items-center justify-center pt-[40px] pb-[10px] text-white">
              <Image alt="Nivakaran S. Logo" src={Logo} height={25} width={60} />
              <p className="text-[45px] bg-gradient-to-t from-transparent via-[#C6C4C3] font-bold to-[#CAC8C6] bg-clip-text text-transparent">
                NivakaranS
              </p>
            </div>
          </div>
          
          <nav role="navigation" aria-label="Mobile navigation">
            <div className="flex flex-col items-center justify-center text-[18px] space-y-[5px] mt-[20px]">
              <Link
                href="/"
                className={`${
                  navSelection === "Home"
                    ? "text-[#FFD700] bg-[#808080] ring-[0.5px] ring-[#101010]"
                    : "text-white"
                } w-[90%] rounded-[5px] py-[10px] px-[20px] cursor-pointer hover:text-[#FFD700] transition-colors`}
                onClick={() => setIsMenuOpen(false)}
                aria-current={navSelection === "Home" ? "page" : undefined}
              >
                <p>Home</p>
              </Link>
              <Link
                href="/about"
                className={`${
                  navSelection === "About"
                    ? "text-[#FFD700] bg-[#808080] ring-[0.5px] ring-[#101010]"
                    : "text-white"
                } w-[90%] rounded-[5px] py-[10px] px-[20px] cursor-pointer hover:text-[#FFD700] transition-colors`}
                onClick={() => setIsMenuOpen(false)}
                aria-current={navSelection === "About" ? "page" : undefined}
              >
                <p>About</p>
              </Link>
              <Link
                href="/services"
                className={`${
                  navSelection === "Services"
                    ? "text-[#FFD700] bg-[#808080] ring-[0.5px] ring-[#101010]"
                    : "text-white"
                } w-[90%] rounded-[5px] py-[10px] px-[20px] cursor-pointer hover:text-[#FFD700] transition-colors`}
                onClick={() => setIsMenuOpen(false)}
                aria-current={navSelection === "Services" ? "page" : undefined}
              >
                <p>Services</p>
              </Link>
              <Link
                href="/portfolio"
                className={`${
                  navSelection === "Portfolio"
                    ? "text-[#FFD700] bg-[#808080] ring-[0.5px] ring-[#101010]"
                    : "text-white"
                } w-[90%] rounded-[5px] py-[10px] px-[20px] cursor-pointer hover:text-[#FFD700] transition-colors`}
                onClick={() => setIsMenuOpen(false)}
                aria-current={navSelection === "Portfolio" ? "page" : undefined}
              >
                <p>Portfolio</p>
              </Link>
              <Link
                href="/blogs"
                className={`${
                  navSelection === "Blogs"
                    ? "text-[#FFD700] bg-[#808080] ring-[0.5px] ring-[#101010]"
                    : "text-white"
                } w-[90%] rounded-[5px] py-[10px] px-[20px] cursor-pointer hover:text-[#FFD700] transition-colors`}
                onClick={() => setIsMenuOpen(false)}
                aria-current={navSelection === "Blogs" ? "page" : undefined}
              >
                <p>Blogs</p>
              </Link>
            </div>
          </nav>
        </div>
        <div
          onClick={() => setIsMenuOpen(false)}
          className={`${
            isMenuOpen ? "opacity-80 delay-300 duration-500" : "opacity-0"
          } flex w-[30%] h-screen justify-center bg-black bg-opacity-50`}
          aria-label="Close mobile menu"
        ></div>
      </div>
    </div>
  );
};

export default Navigation;