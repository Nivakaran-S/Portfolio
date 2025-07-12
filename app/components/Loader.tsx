import React from 'react';
import './Loader.css';

type LoaderProps = {
  active: boolean;
};



const Loader: React.FC<{ active: boolean }> = ({ active }) => {
    const loadingMessages = [
        "Connecting to the Matrix...",
        "Tuning neural frequencies...",
        ];

    const randomMessage = loadingMessages[Math.floor(Math.random() *loadingMessages.length)];

    return (
        <div id="loaderOverlay" className={active ? 'active' : ''}>
        <div className='flex items-center justify-center flex-col space-y-[50px]'>
            <div className="pulse-loader" />
            <p className='text-[30px] select-none bg-gradient-to-t from-[#433D3A] via-[#C6C4C3] font-bold to-[#CAC8C6] bg-clip-text text-transparent' >
            {randomMessage}
            </p>
        </div>
        </div>
    );
};


export default Loader;
