import Image from 'next/image';

import ChevronLeft from '@/assets/onboarding/chevron-left.svg';
import ChevronRight from '@/assets/onboarding/chevron-right.svg';

interface OnboardingStep {
  title: string;
  image: string;
}

interface Props {
  step: OnboardingStep;
  hoverDirection: 'left' | 'right' | null;
}

export const OnboardingSlide = ({ step, hoverDirection }: Props) => {
  return (
    <section className="flex w-full shrink-0 justify-center">
      {/* 카드 */}
      <div className="bg-primary-100 relative flex h-96 w-full max-w-xs flex-col justify-evenly rounded-xl p-6 shadow-md">
        <h2 className="mt-4 text-center text-2xl font-bold whitespace-pre-line text-black">
          {step.title}
        </h2>

        <div className="relative h-64 w-full">
          <Image src={step.image} alt={step.title} fill className="object-contain" priority />
        </div>
        {hoverDirection === 'left' && (
          <ChevronLeft className="text-primary-300 pointer-events-none absolute top-1/2 left-2 -translate-y-1/2 opacity-60" />
        )}
        {hoverDirection === 'right' && (
          <ChevronRight className="text-primary-300 pointer-events-none absolute top-1/2 right-2 -translate-y-1/2 opacity-60" />
        )}
      </div>
    </section>
  );
};
