'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Image, { StaticImageData } from 'next/image';
import Link from 'next/link';

interface Item {
  type: 'image' | 'video';
  src?: string;
  thumbnailSrc?: string;
  videoUrl?: string;
  title: string;
  description: string;
  link: string;
}

interface PortfolioItemProps {
  item: Item;
  index: number;
}

import { useState, useEffect } from 'react';

export default function PortfolioItem({ item, index }: PortfolioItemProps) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [currentSrc, setCurrentSrc] = useState<string | StaticImageData | undefined>(item.src);

  useEffect(() => {
    setCurrentSrc(item.src);
  }, [item.src]);

  const handleImageError = () => {
    if (currentSrc && typeof currentSrc === 'string' && currentSrc.includes('maxresdefault.jpg')) {
      const videoId = currentSrc.split('/')[4];
      if (videoId) {
        // 降級到一定存在且為 16:9 的 mqdefault，以避免黑邊
        setCurrentSrc(`https://img.youtube.com/vi/${videoId}/mqdefault.jpg`);
      }
    }
  };

  return (
    <Link href={item.link}>
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: index * 0.2 }}
        className="group relative aspect-square bg-white rounded-lg shadow-lg overflow-hidden transform transition-transform hover:scale-[1.02]"
      >
        {currentSrc ? (
          <>
            <AnimatePresence>
              <motion.div
                key={item.src} // 當圖片 src 改變時，觸發重新渲染和動畫
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8, ease: 'easeInOut' }}
                className="absolute inset-0"
              >
                <Image 
                  src={currentSrc} 
                  alt={item.title} 
                  fill 
                  className="object-cover" 
                  priority={index === 0}
                  onError={handleImageError}
                />
              </motion.div>
            </AnimatePresence>
            {/* 漸變遮罩和文字保持在圖片之上 */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent pointer-events-none" />
            <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
              <h3 className="text-white text-2xl font-bold mb-2 drop-shadow-lg">{item.title}</h3>
              <p className="text-white/90 text-base drop-shadow-lg">{item.description}</p>
            </div>
          </>
        ) : (
        <div className="flex flex-col justify-end h-full p-6 bg-gray-200">
          <h3 className="text-gray-800 text-2xl font-bold mb-2">{item.title}</h3>
          <p className="text-gray-600 text-base">{item.description}</p>
        </div>
        )}
      </motion.div>
    </Link>
  );
}