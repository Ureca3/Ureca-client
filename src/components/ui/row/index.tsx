import ForwardIcon from '@/assets/icons/mypage/forward.svg';

interface Props {
  children: React.ReactNode;
  onClick: () => void;
}

export const Row = ({ children, onClick }: Props) => {
  return (
    <button className="flex w-full flex-row items-center bg-white p-2" onClick={onClick}>
      {children}
      <div className="ml-auto">
        <ForwardIcon width="24px" height="24px" />
      </div>
    </button>
  );
};
