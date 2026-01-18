'use client';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';

import Chatting from '@/assets/chat/chatting.svg';
import PhoneIcon from '@/assets/chat/phone.svg';
import UserOcto from '@/assets/chat/user_octo.svg';
import { Chat } from '@/components/chat/Chat';
import { defaultChats } from '@/services/chat/mockupChattingApi.client';
import { openModal } from '@/store/slices/ModalSlice';
import type { KeywordProps } from '@/types/chat/dto';

import { Button } from '../ui/button';

import { CallModal } from './CallModal';

export const ChattingScreen = () => {
  const [chatList, setChatList] = useState(defaultChats);
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const isFirstRender = useRef(true);
  const dispatch = useDispatch();

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: isFirstRender.current ? 'auto' : 'smooth',
    });
    isFirstRender.current = false;
  }, [chatList]);

  const onKeywordClick = (key: KeywordProps) => {
    setChatList([
      ...chatList,
      {
        message_id: 0,
        type: 'me',
        text: key.text,
        time: new Date(),
        keywords: null,
      },
    ]);
    //get next message and set on chat list... api 연결하면?
  };

  return (
    <div className="h-screen flex-1 flex-col overflow-y-auto">
      <div className="bg-secondary-50 text-secondary-400 mx-3.5 my-2.75 rounded-lg px-6 py-3 text-center wrap-break-word break-keep">
        우리의 상담원은 고객님의 도움을 위해 최선을 다하는 누군가의 소중한 가족입니다. 따뜻한 말
        한마디가 다정한 관계를 만듭니다.
      </div>

      <div>
        {chatList.map((i, inx) => (
          <div
            key={inx}
            className={`mx-6 mt-3 flex items-start ${i.type === 'me' ? 'flex-row-reverse' : 'flex-row'}`}
          >
            {i.type === 'me' ? (
              <div className="bg-primary-100 border-white-light flex h-13 w-13 items-center justify-center overflow-hidden rounded-full border shadow-(--shadow-secondary-400-30)">
                <UserOcto />
              </div>
            ) : (
              <div className="bg-primary-100 border-white-light flex h-13 w-13 items-center justify-center overflow-hidden rounded-full border shadow-(--shadow-secondary-400-30)">
                <Chatting />
              </div>
            )}
            <Chat chat={i} onClick={onKeywordClick} />
          </div>
        ))}
      </div>
      <div className="px-5">
        <Button
          variant="solid"
          tone="secondary"
          size="l"
          onClick={() =>
            dispatch(
              openModal({
                type: 'CALL',
                content: <CallModal content={chatList.filter((i) => i.type === 'me')} />,
              }),
            )
          }
          className="bg-secondary-400 hover:bg-secondary-300 text-white-light mb-2 w-full px-5 font-semibold"
        >
          <div className="flex">
            <PhoneIcon className="mr-1" />
            상담사 전화 연결
          </div>
        </Button>
        <Button
          variant="outline"
          tone="secondary"
          size="l"
          className="border-gray mb-2 w-full px-5 font-semibold"
        >
          <div className="text-gray">채팅 상담만 종료</div>
        </Button>
      </div>
      <div ref={bottomRef} />
    </div>
  );
};
