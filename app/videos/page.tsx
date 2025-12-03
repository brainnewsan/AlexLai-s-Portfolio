'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Navbar from '../components/Navbar';

const videos = [
  {
    videoId: 'kMAGDwlb7xA',
    title: '中美貿易政策分析',
    description: '深入探討中美貿易關係現狀與未來發展趨勢'
  },
  {
    videoId: 'FjZB7iIsB6s',
    title: '特朗普政策影響評估',
    description: '全面分析特朗普時期政策對經濟金融的影響'
  }
];

export default function Videos() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="container mx-auto px-4 py-24">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {videos.map((video, index) => {
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
                className="bg-white rounded-lg shadow-lg overflow-hidden"
              >
                <div className="relative aspect-video">
                  <iframe
                    src={`https://www.youtube.com/embed/${video.videoId}`}
                    title={video.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute top-0 left-0 w-full h-full"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800">{video.title}</h3>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
} 