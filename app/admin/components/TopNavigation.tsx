
import React from "react"
import Image from "next/image"
import Profile from '../images/profile5.png'
import Bell from '../images/bell.png'
import { useRouter } from "next/navigation"

const TopNavigation = () => {

    const router = useRouter()

    const handleLogout = async () => {
        try {
            const response = await fetch('https://new-portfolio-backend-roan.vercel.app/logout', {
                method: 'POST',
                credentials: 'include',
            });

            if (response.ok) {
                console.log('Logout successful');
                router.push('/login')
            } else {
                console.error('Logout failed');
            }
        } catch (error) {
            console.error('Error during logout:', error);
        }
    }




    return(
        <div >
            <div className="w-full text-black h-[10vh] flex items-center justify-between px-[30px] bg-gray-600 ">
                <div className="bg-gray-100  px-[10px] rounded-[50px] flex  flex-row">
                    
                    <div className="my-[5px] bg-gray-300 cursor-pointer flex items-center justify-center rounded-full w-[36px]">
                        <Image alt="" src={Bell} height={20}/>
                    </div>
                    <div className="  leading-[15px] flex  my-[3px] rounded-[30px] px-[10px] flex-row space-x-[5px]  items-center justify-center" >
                        <Image alt="Profile" height={20} width={40} src={Profile}/>
                        <div>
                            <p className="text-[15px]">Nivakaran</p>
                            <p className="text-[10px]">Admin</p>
                        </div>
                    </div>
                </div>
                <div onClick={() => handleLogout()} className="bg-red-600 ring-black ring-[0.5px] cursor-pointer px-[15px] py-[5px] rounded-[5px]">
                    <p>Logout</p>
                </div>
            </div>
        </div>
    )
}

export default TopNavigation