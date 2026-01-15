import Image from 'next/image';

interface OnboardingStep {
  title: string;
  image: string;
}

interface Props {
  step: OnboardingStep;
}

export const OnboardingSlide = ({ step }: Props) => {
  return (
    <section className="flex w-full shrink-0 justify-center">
      {/* 카드 */}
      <div className="bg-primary-100 flex h-96 w-full max-w-sm flex-col justify-evenly rounded-3xl p-6 shadow-md">
        {/* 텍스트 영역 */}
        <h2 className="mt-4 text-center text-2xl font-bold whitespace-pre-line text-black">
          {step.title}
        </h2>

        {/* 이미지 영역 (고정 높이) */}
        <div className="relative h-64 w-full">
          <Image src={step.image} alt={step.title} fill className="object-contain" priority />
        </div>
      </div>
    </section>
  );
};
