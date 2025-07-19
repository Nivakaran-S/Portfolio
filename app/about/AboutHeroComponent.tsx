import StarBackground from "../components/StarBackground";


export default function AboutHeroComponent() {
    return(
    <div className="h-[100vh] w-[100vw]">  
        <StarBackground/>
        <div className="text-white  sm:space-y-[30px]  px-[10vw] flex flex-col items-center justify-center sm:pt-[20vh] min-h-[100vh]">
          
          <div className="w-[100vw]  text-center leading-[60px] sm:leading-[70px] h-[100%]">
            <p className=" text-[40px] sm:text-[50px] md:text-[60px] aboutText4 aboutTitle1 bg-gradient-to-t from-[#433D3A] via-[#C6C4C3]  to-[#CAC8C6] bg-clip-text text-transparent">About Me</p>
            <p className=" text-[65px] sm:text-[75px] md:text-[80px] aboutTitle2 bg-gradient-to-t from-[#433D3A] via-[#C6C4C3] font-[600] to-[#CAC8C6] bg-clip-text text-transparent" >An Introduction</p>
          </div>
          <div className="w-[100%] md:w-[50%] text-center h-[10px] sm:h-[160px]">

          </div>
          <div className="w-[100%]  md:w-[50%] text-center ">
            <p className=" aboutTitle3">Welcome to the story behind the code. </p>
          </div>
        </div>
    </div>
    )
}

