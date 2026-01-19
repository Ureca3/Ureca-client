import type { ChatProps } from '@/types/chat/dto';

export const defaultChats: ChatProps[] = [
  {
    message_id: 1,
    type: 'other',
    text: '안녕하세요! LG U+ 상담에 함께 할 무너입니다! 무엇을 도와드릴까요?',
    time: new Date(),
    keywords: [
      { keyword_id: 101, next_message_id: 1, text: '가입/변경', img: '📄' },
      { keyword_id: 102, next_message_id: 2, text: '요금/결제', img: '💳' },
      { keyword_id: 103, next_message_id: 3, text: '해외/로밍', img: '🌏' },
      { keyword_id: 104, next_message_id: 4, text: '이용/장애', img: '🚨' },
      { keyword_id: 105, next_message_id: 5, text: '분실/보안', img: '🔒' },
      { keyword_id: 106, next_message_id: 6, text: '기타/문의', img: '💬' },
    ],
  },
  {
    message_id: 2,
    type: 'other',
    text: '요금제 추천을 원하시는군요! 어떤 사용 패턴이신가요?',
    time: new Date(),
    keywords: [
      {
        keyword_id: 201,
        next_message_id: 6,
        text: '데이터 많이 사용',
        img: '📶',
      },
      {
        keyword_id: 202,
        next_message_id: 6,
        text: '통화 위주',
        img: '📞',
      },
    ],
  },
  {
    message_id: 3,
    type: 'other',
    text: '위약금은 약정 기간과 사용 기간에 따라 달라집니다. 어떤 정보가 필요하신가요?',
    time: new Date(),
    keywords: [
      {
        keyword_id: 301,
        next_message_id: 7,
        text: '위약금 계산 방법',
        img: '🧮',
      },
    ],
  },
  {
    message_id: 4,
    type: 'other',
    text: '기기 변경 시 다양한 할인 혜택이 제공됩니다.',
    time: new Date(),
    keywords: [
      {
        keyword_id: 401,
        next_message_id: 8,
        text: '혜택 자세히 보기',
        img: '🎁',
      },
    ],
  },
  {
    message_id: 5,
    type: 'other',
    text: '인터넷 상품 상담입니다. 어떤 서비스를 찾고 계신가요?',
    time: new Date(),
    keywords: [
      {
        keyword_id: 501,
        next_message_id: 9,
        text: '인터넷 신규 가입',
        img: '🌐',
      },
      {
        keyword_id: 502,
        next_message_id: 9,
        text: '인터넷 요금 문의',
        img: '💡',
      },
    ],
  },
  {
    message_id: 6,
    type: 'other',
    text: '고객님께는 데이터 무제한 요금제를 추천드립니다 👍',
    time: new Date(),
    keywords: null,
  },

  {
    message_id: 7,
    type: 'other',
    text: '위약금은 약정 할인 반환금 기준으로 계산됩니다.',
    time: new Date(),
    keywords: null,
  },

  {
    message_id: 8,
    type: 'other',
    text: '기기 변경 시 최대 30% 할인 혜택을 받으실 수 있습니다.',
    time: new Date(),
    keywords: null,
  },
  {
    message_id: 9,
    type: 'other',
    text: '인터넷 상품 상담이 완료되었습니다. 감사합니다 😊',
    time: new Date(),
    keywords: null,
  },
];
