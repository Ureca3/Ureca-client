"use client"
import React from 'react';
import sorry from '@/assets/images/mooner/sorry.png';
import Image from 'next/image';
import { Button } from '../button';
import { useRouter } from 'next/navigation';

export const ErrorComponent = () => {
    const router=useRouter();
    return (
        <div className='w-screen h-screen flex flex-col items-center justify-center'>
            <Image src={sorry} alt="sorry" width={183}/>
            <p className='font-gowun text-2xl mt-10'>요청하신 페이지를 찾을 수 없습니다.</p>
            <Button variant={'solid'}
            tone={'primary'}
            size={'m'}
            children={"뒤로가기"} className='mt-5'
            onClick={()=>{
                router.back();
            }}/>
        </div>
    );
}; 