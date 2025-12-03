'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useInView } from 'react-intersection-observer';
import Navbar from '../components/Navbar';

// 模擬數據，實際使用時需要替換為真實數據
const photos = [
  {
    src: '/images/trump_usa.jpg',
    title: '特朗普政策影響',
    description: '減稅政策與金融服務改革分析'
  },
  {
    src: '/images/trade_policy.jpg',
    title: '對華貿易政策',
    description: '貿易戰影響與中國因應對策'
  },
  {
    src: '/images/energy_policy.jpg',
    title: '化石燃料和傳統能源',
    description: '能源政策與環境影響評估'
  }
];

export default function Photos() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="container mx-auto px-4 py-24">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {photos.map((photo, index) => {
            const [ref, inView] = useInView({
              triggerOnce: true,
              threshold: 0.1,
            });

            return (
              <motion.div
                key={index}
                ref={ref}
                initial={{ opacity: 0, y: 50 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="group relative aspect-square bg-white rounded-lg shadow-lg overflow-hidden"
              >
                <Image
                  src={photo.src}
                  alt={photo.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-6">
                  <h3 className="text-white text-xl font-bold mb-4">{photo.title}</h3>
                  <p className="text-white text-center">{photo.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
} 