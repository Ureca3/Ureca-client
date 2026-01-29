import React, { useEffect, useRef, useState } from 'react';

import type { ILocalAudioTrack } from 'agora-rtc-sdk-ng';

interface Props {
  localAudioTrack: ILocalAudioTrack | null | undefined;
  barColor?: string;
}

export const AgoraFrequencyVisualizer: React.FC<Props> = ({
  localAudioTrack,
  barColor = '#f12b95',
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const animationRef = useRef<number>(0);
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 0,
  );

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (!localAudioTrack) return;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const mediaStreamTrack = localAudioTrack.getMediaStreamTrack();
    const source = audioContext.createMediaStreamSource(new MediaStream([mediaStreamTrack]));
    const analyser = audioContext.createAnalyser();

    analyser.fftSize = 512;
    analyser.smoothingTimeConstant = 0.7;
    source.connect(analyser);

    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    const bars = new Float32Array(512).fill(0);

    const render = () => {
      const canvas = canvasRef.current;
      const container = containerRef.current;
      if (!canvas || !container) return;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      canvas.width = windowWidth;
      canvas.height = container.clientHeight;

      analyser.getByteFrequencyData(dataArray);
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const spacing = 2;
      const barWidth = 3;
      const drawCount = Math.floor(canvas.width / (barWidth + spacing));

      const gradient = ctx.createLinearGradient(0, canvas.height, 0, 0);
      gradient.addColorStop(0, barColor);
      gradient.addColorStop(1, '#f9a3cf');

      for (let i = 0; i < drawCount; i++) {
        const ratio = i / drawCount;
        const index = Math.floor(Math.pow(ratio, 1.2) * (bufferLength * 0.35));
        const rawValue = dataArray[index];

        const boost = 1 + ratio * 1.5;
        const targetHeight = (rawValue / 255) * canvas.height * boost * 0.9;

        const reaction = 0.2 + Math.sin(i * 0.1) * 0.1;
        bars[i] = bars[i] * (1 - reaction) + targetHeight * reaction;

        const h = Math.max(2, bars[i]);
        const x = i * (barWidth + spacing);
        const y = canvas.height - h;
        const radius = barWidth / 2;

        ctx.fillStyle = gradient;
        if (typeof ctx.roundRect === 'function' && radius > 0) {
          ctx.beginPath();
          ctx.roundRect(x, y, barWidth, h, [radius, radius, 0, 0]);
          ctx.fill();
        } else {
          ctx.fillRect(x, y, barWidth, h);
        }
      }

      animationRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      if (audioContext.state !== 'closed') audioContext.close();
    };
  }, [localAudioTrack, windowWidth, barColor]);

  return (
    <div
      ref={containerRef}
      className="relative right-1/2 left-1/2 -mr-[50vw] -ml-[50vw] flex h-20 w-[95vw] items-center overflow-hidden bg-transparent"
    >
      <canvas ref={canvasRef} className="block h-full w-full" />
    </div>
  );
};
