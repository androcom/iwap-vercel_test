// src/components/string/ProgressBar.tsx
'use client';

import { useRef } from 'react';
import { useDrag } from '@use-gesture/react';

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
  onSeek: (step: number) => void;
}

export default function ProgressBar({
  currentStep,
  totalSteps,
  onSeek,
}: ProgressBarProps) {
  const barRef = useRef<HTMLDivElement>(null);

  const bind = useDrag(({ down, xy: [x], tap }) => {
    if (!barRef.current) return;
    const { left, width } = barRef.current.getBoundingClientRect();
    const progress = Math.max(0, Math.min(1, (x - left) / width));
    const targetStep = Math.round(progress * (totalSteps - 1));

    if (down || tap) {
      onSeek(targetStep);
    }
  });

  if (totalSteps <= 1) return null;
  
  const progressPercent = totalSteps > 1 ? (currentStep / (totalSteps - 1)) * 100 : 0;

  return (
    <div
      ref={barRef}
      {...bind()}
      className="relative w-full h-8 flex items-center cursor-pointer touch-none"
    >
      <div className="relative w-full h-2">
        {/* 바 배경 */}
        <div className="w-full h-full bg-gray-600 rounded-full"></div>
        
        {/* 채워진 진행 상태 */}
        <div
          className="absolute top-0 left-0 h-full bg-white rounded-full"
          style={{ width: `${progressPercent}%` }}
        ></div>

        {/* 핸들 */}
        <div 
          className="absolute -top-1 w-1 h-4 bg-white pointer-events-none z-20 rounded-full"
          style={{ 
            left: `${progressPercent}%`,
            transform: `translateX(-50%)`
          }}
        />
      </div>
    </div>
  );
}