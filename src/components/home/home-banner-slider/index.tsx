'use client';

import { useEffect, useState } from 'react';
import Image, { type StaticImageData } from 'next/image';
import Link from 'next/link';

interface BannerItem {
  src: StaticImageData;
  alt: string;
  href: string;
}

interface Props {
  items: BannerItem[];
  intervalMs?: number;
}

export const HomeBannerSlider = ({ items, intervalMs = 3500 }: Props) => {
  const [index, setIndex] = useState(0);
  const total = items.length;

  useEffect(() => {
    if (total <= 1) return;
    const id = setInterval(() => {
      setIndex((prev) => (prev + 1) % total);
    }, intervalMs);
    return () => clearInterval(id);
  }, [intervalMs, total]);

  const handlePrev = () => {
    setIndex((prev) => (prev - 1 + total) % total);
  };

  const handleNext = () => {
    setIndex((prev) => (prev + 1) % total);
  };

  if (!items.length) return null;

  return (
    <div className="relative overflow-hidden rounded-2xl shadow-sm">
      <div className="pointer-events-none absolute inset-0 z-10 flex">
        <button
          type="button"
          className="pointer-events-auto h-full w-[45%]"
          onClick={handlePrev}
          aria-label="이전 배너"
        />
        <div className="pointer-events-none h-full w-[10%]" />
        <button
          type="button"
          className="pointer-events-auto h-full w-[45%]"
          onClick={handleNext}
          aria-label="다음 배너"
        />
      </div>

      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {items.map((banner, bannerIndex) => (
          <Link
            key={banner.href}
            href={banner.href}
            className="relative h-[150px] w-full flex-shrink-0"
          >
            <Image
              src={banner.src}
              alt={banner.alt}
              fill
              sizes="(max-width: 640px) 100vw, 360px"
              className="object-cover"
              priority={bannerIndex === 0}
            />
          </Link>
        ))}
      </div>

      <div className="absolute right-0 bottom-3 left-0 z-10 flex items-center justify-center gap-1.5">
        {items.map((_, dotIndex) => (
          <span
            key={`dot-${dotIndex}`}
            className={`h-1.5 w-1.5 rounded-full ${
              dotIndex === index ? 'bg-white' : 'bg-white/50'
            }`}
          />
        ))}
      </div>
    </div>
  );
};
