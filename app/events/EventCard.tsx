
import Image, { StaticImageData } from "next/image"
import Event from '../event-images/1734452535217.jpeg'

interface EventCardProps {
  event: {
    id: number;
    type: string;
    title: string;
    image: StaticImageData;
    description: string;
    date: string;
    location: string;
    role: string;
  };
}

const EventCard: React.FC<EventCardProps> = ({ event }) => {
    return(
        <div >
            <div className="bg-[#101010] relative group cursor-pointer hover:ring-[1px] hover:scale-[105%] transition-transform duration-500  ring-[0.5px] ring-[#808080] rounded-[20px] w-[380px] h-[520px]">
                <div className="h-[61.8%] overflow-hidden rounded-t-[20px]">
                    <Image src={event.image} className="h-[100%] w-[100%] object-cover" alt=""/>
                </div>
               <div className="h-[38.2%] py-[15px] rounded-b-[20px] bg-[#1D1D1D] ">
                    <div className="flex px-[20px] text-[14px] flex-row justify-between items-center ">
                        <div className="flex space-x-[2px] items-center justify-center flex-row">
                        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 0C7.03 0 3 4.03 3 9c0 5.25 9 15 9 15s9-9.75 9-15c0-4.97-4.03-9-9-9zm0 12a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"/>
                        </svg>
                        <p>{event.location}</p>
                        </div>
                        <div className="flex items-center justify-center space-x-[2px] flex-row">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M7 3a1 1 0 0 0-1 1v1H5a2 2 0 0 0-2 2v14a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V7a2 2 0 0 0-2-2h-1V4a1 1 0 0 0-2 0v1H8V4a1 1 0 0 0-1-1zm0 4h10v2H7V7zm2 4h2v2H9v-2zm4 0h2v2h-2v-2zm-4 4h2v2H9v-2zm4 0h2v2h-2v-2z"/>
                        </svg>
                        <p>{event.date}</p>
                        </div>
                    </div>

                    <p className="px-[20px] text-[25px]">{event.title}</p>
                    <div className="mx-[20px] mt-[0px] bg-white w-fit text-black text-[12px] px-[12px] py-[2px] rounded-full">
                        <p>{event.role}</p>
                    </div>
                    <p className="mt-[5px] text-[13px] line-clamp-4 px-[20px]">{event.description}</p>

                    {/* Description with animation */}
                    <div className="px-[20px] flex flex-col overflow-hidden  justify-center absolute top-0 bg-[#1D1D1D] py-[20px] h-[100%] w-[100%] rounded-[20px] text-[13px]  opacity-0 max-h-0  transition-all duration-500 group-hover:opacity-100 group-hover:max-h-[100%]">
                        <div className="flex  text-[14px] flex-row justify-between items-center ">
                            <div className="flex space-x-[2px] items-center justify-center flex-row">
                            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 0C7.03 0 3 4.03 3 9c0 5.25 9 15 9 15s9-9.75 9-15c0-4.97-4.03-9-9-9zm0 12a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"/>
                            </svg>
                            <p>{event.location}</p>
                            </div>
                            <div className="flex items-center justify-center space-x-[2px] flex-row">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M7 3a1 1 0 0 0-1 1v1H5a2 2 0 0 0-2 2v14a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V7a2 2 0 0 0-2-2h-1V4a1 1 0 0 0-2 0v1H8V4a1 1 0 0 0-1-1zm0 4h10v2H7V7zm2 4h2v2H9v-2zm4 0h2v2h-2v-2zm-4 4h2v2H9v-2zm4 0h2v2h-2v-2z"/>
                            </svg>
                            <p>{event.date}</p>
                            </div>
                        </div>
                        <p className=" text-[25px]">{event.title}</p>
                        <div className=" bg-white w-fit text-black text-[12px] px-[12px] py-[2px] rounded-full">
                            <p>{event.role}</p>
                        </div>
                        <p className="mt-[10px]">{event.description}</p>
                    </div>
                    </div>

            </div>
        </div>
    )
}

export default EventCard;