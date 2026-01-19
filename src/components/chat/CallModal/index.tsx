'use client';
import React from 'react';
import { useDispatch } from 'react-redux';

import Phone from '@/assets/images/chat/phone.svg';
import { Button } from '@/components/ui/button';
import { closeModal } from '@/store/slices/ModalSlice';
import type { ChatProps } from '@/types/chat/dto';

export const CallModal = ({ content }: { content: ChatProps[] }) => {
  const dispatch = useDispatch();

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="bg-primary-500 flex h-14.5 w-14.5 items-center justify-center rounded-[20px]">
        <Phone />
      </div>
      <p className="mt-4 text-[20px] leading-5 font-bold">상담사 연결</p>
      <div className="text-gray mt-3 flex flex-col items-center justify-center text-[14px] font-medium">
        <span>전화 상담으로 연결해드릴까요?</span>
        <span>현재까지의 상담 내용이 상담사에게 전달됩니다.</span>
      </div>

      <div className="bg-gray-light mt-4 w-72 rounded-[20px] px-7 py-3.5">
        <p className="text-gray-dark text-[13px] font-semibold">전달될 상담 내용</p>
        <ul className="text-[13px] font-semibold text-black">
          {content.map((i, idx) => (
            <li key={idx}>
              <span className="text-primary-500">&nbsp;&nbsp;• </span>
              {i.text}
            </li>
          ))}
        </ul>
      </div>
      <span className="mt-3.5 text-[13px] font-semibold">
        <span className="text-green-500">• </span>
        <span>예상 대기 시간:</span>
        <span>약 1분</span>
      </span>
      <div className="mt-3.5 flex gap-3">
        <Button
          variant={'outline'}
          tone={'secondary'}
          size={'m'}
          onClick={() => dispatch(closeModal())}
          className="border-gray! text-gray! w-32.75"
        >
          취소
        </Button>
        <Button variant={'solid'} tone={'primary'} size={'m'} className="w-32.75">
          연결하기
        </Button>
      </div>
    </div>
  );
};
