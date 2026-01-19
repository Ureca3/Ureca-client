export type ChatType = 'me' | 'other';
export interface KeywordProps {
  keyword_id: number;
  next_message_id: number;
  text: string;
  img: string;
}
export interface ChatProps {
  message_id: number;
  type: ChatType;
  text: string;
  time: Date;
  keywords: KeywordProps[] | null;
}
