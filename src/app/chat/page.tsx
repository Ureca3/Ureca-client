import { Chat } from '@/components/chating/Chat';
import React from 'react';

type ChatType = "me" | "other";
interface ChatProps {
  type: ChatType;
  text: string;
  time: Date;
}
const mockChats:ChatProps[] = [
  { type: "me", text: "안녕하세요!", time: new Date("2026-01-13T10:00:00") },
  { type: "other", text: "안녕하세요! 반가워요 😄", time: new Date("2026-01-13T10:01:00") },
  { type: "me", text: "오늘 날씨 진짜 좋네요 🌞", time: new Date("2026-01-13T10:02:30") },
  { type: "other", text: "맞아요! 산책 가고 싶어요.", time: new Date("2026-01-13T10:03:00") },
  { type: "me", text: "그럼 점심 먹고 산책 갈까요?", time: new Date("2026-01-13T10:04:15") },
  { type: "other", text: "좋아요! 어디서 만날까요?", time: new Date("2026-01-13T10:05:00") },
];

const page = () => {
    return (
        <div className='w-screen h-screen flex flex-col'>
            <div className='bg-third-100 mx-[14px] my-[11px] px-[24px] py-[12px] text-center break-keep break-words border-r-4'>
                우리의 상담원은 고객님의 도움을 위해 최선을 다하는 
                누군가의 소중한 가족입니다. 
                따뜻한 말 한마디가 다정한 관계를 만듭니다.
            </div>
            {
                mockChats.map((i)=>
                <Chat type={i.type} text={i.text} time={i.time}/>
                )
            }
        </div>
    );
};

export default page;