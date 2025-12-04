'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from './components/Navbar';
import { useEffect, useMemo, useState } from 'react';

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
    description: '',
    link: '/photos',
  },
  {
    type: 'image',
    src: '/images/trade_policy.jpg',
    title: 'Video Portfolios',
    description: '',
    link: '/videos',
  },
  {
    type: 'image',
    src: '/images/energy_policy.jpg',
    title: 'About me',
    description: '',
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
            <h2 className="text-2xl text-center mb-8 text-gray-700" aria-live="polite">
              <AnimatePresence mode="wait">
                <motion.span
                  key={greetings[greetingIndex]}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: FADE_DURATION_SECONDS, ease: 'easeInOut' }}
                >
                  {greetings[greetingIndex]}
                </motion.span>
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
              const [ref, inView] = useInView({
                triggerOnce: true,
                threshold: 0.1,
              });

              return (
                <Link href={item.link} key={index}>
                  <motion.div
                    ref={ref}
                    initial={{ opacity: 0, y: 50 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: index * 0.2 }}
                    className="group relative h-[600px] bg-white rounded-lg shadow-lg overflow-hidden transform transition-transform hover:scale-[1.02]"
                  >
                    <div className="absolute inset-0">
                      <Image
                        src={item.src || ''}
                        alt={item.title}
                        fill
                        className="object-cover"
                        priority={index === 0}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent pointer-events-none" />
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
                      <h3 className="text-white text-2xl font-bold mb-2 drop-shadow-lg">
                        {item.title}
                      </h3>
                      <p className="text-white/90 text-base drop-shadow-lg">
                        {item.description}
                      </p>
                    </div>
                  </motion.div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
