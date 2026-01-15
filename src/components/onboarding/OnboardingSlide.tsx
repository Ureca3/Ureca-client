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
    <section className="w-full shrink-0 px-6">
      <div className="bg-primary-100 mx-auto w-full max-w-sm rounded-3xl p-6 shadow-md">
        <h2>{step.title}</h2>
        <Image src={step.image} alt={step.title} width={300} height={300} />
        {/* <Image src={step.image} alt={step.title} fill className="object-contain" /> */}
      </div>
    </section>
  );
};
