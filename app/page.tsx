'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import { useEffect, useMemo, useState } from 'react';
import PortfolioItem from './components/PortfolioItem';

interface Item {
  type: 'image' | 'video';
  src?: string;
  thumbnailSrc?: string;
  videoUrl?: string;
  title: string;
  description: string;
  link: string;
}

const items: Item[] = [
  {
    type: 'image',
    src: '/images/trump_usa.jpg',
    title: 'Graphic Portfolios',
    description: 'A collection of my visual design work, from branding to digital art.',
    link: '/photos',
  },
  {
    type: 'image',
    src: '/images/trade_policy.jpg',
    title: 'Video Portfolios',
    description: 'Explore a range of video projects, showcasing storytelling and editing skills.',
    link: '/videos',
  },
  {
    type: 'image',
    src: '/images/energy_policy.jpg',
    title: 'About me',
    description: 'Learn more about my background, creative process, and what drives me.',
    link: '/about',
  },
];

export default function Home() {
  const FADE_DURATION_SECONDS = 1.2;
  const DWELL_MS = 3000; 
  const INTERVAL_MS = DWELL_MS + FADE_DURATION_SECONDS * 2 * 1000;

  const greetings: string[] = useMemo(
    () => [
      '你好',
      'Hello',
      'Bonjour',
      'Hola',
      'Ciao',
      'Hallo',
      'Olá',
      'Привет',
      'こんにちは',
      '안녕하세요',
      'Xin chào',
      'สวัสดี',
    ],
    []
  );

  const [greetingIndex, setGreetingIndex] = useState(0);

  useEffect(() => {
    const timerId = setInterval(() => {
      setGreetingIndex((prev) => (prev + 1) % greetings.length);
    }, INTERVAL_MS);
    return () => clearInterval(timerId);
  }, [greetings.length, INTERVAL_MS]);

  const sentenceVariant = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.06,
        delayChildren: 0.2,
      },
    },
  };

  const letterVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { ease: 'easeOut', duration: 0.4 },
    },
  };

  return (
    <div className="relative min-h-[100svh]">
      <Navbar />

      {/* ✅ 全頁固定漸變背景，z-0 確保可見 */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="fixed inset-0 z-0 bg-gradient-to-r from-purple-100 via-yellow-50 to-blue-100 opacity-40 pointer-events-none"
      />

      {/* 內容層 z-10 */}
      <div className="relative z-10 pt-16">
        <div className="container mx-auto px-4 pt-12 pb-20">
          <div className="relative">
            <h2 className="text-2xl text-center mb-8 text-gray-700 flex justify-center items-center h-8" aria-live="polite">
              <AnimatePresence mode="wait">
                <motion.div
                  key={greetings[greetingIndex]}
                  variants={sentenceVariant}
                  initial="hidden"
                  animate="visible"
                  exit={{ opacity: 0, transition: { duration: 0.5 } }}
                  className="flex"
                >
                  {greetings[greetingIndex].split('').map((char, index) => (
                    <motion.span key={`${char}-${index}`} variants={letterVariant}>
                      {char}
                    </motion.span>
                  ))}
                </motion.div>
              </AnimatePresence>
            </h2>

            <h1 className="text-4xl md:text-5xl font-bold text-center mb-4 text-gray-800">
              Alex&apos;s Portfolio
            </h1>

            <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
              A Multimedia Designer
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative">
            {items.map((item, index) => {
              return (
                // The key is now on the PortfolioItem component
                <PortfolioItem key={item.title} item={item} index={index} />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
