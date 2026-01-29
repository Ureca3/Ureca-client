'use client';

import { useState } from 'react';

import { motion } from 'framer-motion';

interface MapFooterProps {
  children: React.ReactNode;
}

const DRAG_THRESHOLD = 30;

export const MapFooter = ({ children }: MapFooterProps) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="fixed right-0 bottom-0 left-0 z-50 rounded-t-2xl bg-white shadow-xl">
      {/* Grab Handle */}
      <motion.div
        drag="y"
        dragConstraints={{ top: 0, bottom: 0 }}
        dragElastic={0}
        dragMomentum={false}
        role="button"
        tabIndex={0}
        aria-expanded={isOpen}
        aria-label={isOpen ? '매장 정보 접기' : '매장 정보 펼치기'}
        onDragEnd={(_, info) => {
          if (info.offset.y > DRAG_THRESHOLD && isOpen) {
            setIsOpen(false);
          }
          if (info.offset.y < -DRAG_THRESHOLD && !isOpen) {
            setIsOpen(true);
          }
        }}
        className="flex w-full touch-none justify-center py-2"
      >
        <div className="h-1 w-10 rounded-full bg-gray-400" />
      </motion.div>

      {/* Content */}
      <motion.div
        animate={{
          maxHeight: isOpen ? '40vh' : 0,
          opacity: isOpen ? 1 : 0,
        }}
        transition={{ duration: 0.25, ease: 'easeInOut' }}
        className="overflow-hidden pb-4"
      >
        {children}
      </motion.div>
    </div>
  );
};
