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
    <section className="w-full flex-shrink-0 px-6">
      <h2>{step.title}</h2>
      <Image src={step.image} alt={step.title} width={300} height={300} priority />
      {/* <Image src={step.image} alt={step.title} fill className="object-contain" /> */}
    </section>
  );
};
