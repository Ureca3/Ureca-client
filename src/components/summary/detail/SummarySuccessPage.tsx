import Image from 'next/image';

import SummaryFail from '@/assets/summary/SummaryFail.png';

interface Props {
  summaryId: string;
}

export const SummarySuccessPage = ({ summaryId }: Props) => {
  return (
    <div className="mx-auto flex min-h-[376px] w-[335px] flex-col items-center justify-center rounded-2xl bg-white p-6 shadow-sm">
      <Image src={SummaryFail} alt="요약 실패" width={201} height={223} priority />

      <p className="mt-4 text-sm font-semibold text-[#6E1E3D]">요청을 다시 시도해주세요</p>

      <div className="mt-4 h-6 w-6 animate-spin rounded-full border-2 border-[#6E1E3D] border-t-transparent" />
    </div>
  );
};
