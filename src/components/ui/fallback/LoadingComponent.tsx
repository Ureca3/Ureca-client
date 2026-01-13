import Image from 'next/image';
import React from 'react';
import wink from '@/assets/images/mooner/wink.png'
import '@/styles/animation.css'

export const LoadingComponent = () => {
    return (
        <div className='w-screen h-screen flex flex-col items-center justify-center'>
            <Image src={wink} alt='wink' width={227}/>
            <div className="flex justify-center items-center space-x-4 mt-10">
                <span className="w-4 h-4 bg-gray rounded-full animate-(--animate-bounce-color)" style={{ animationDelay: '0s' }}></span>
                <span className="w-4 h-4 bg-gray rounded-full animate-(--animate-bounce-color)" style={{ animationDelay: '0.2s' }}></span>
                <span className="w-4 h-4 bg-gray rounded-full animate-(--animate-bounce-color)" style={{ animationDelay: '0.4s' }}></span>
            </div>
        </div>
    );
};