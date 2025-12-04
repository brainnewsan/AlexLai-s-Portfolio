'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface Video {
  videoId: string;
  title: string;
  description: string;
}

interface VideoItemProps {
  video: Video;
  index: number;
}

export default function VideoItem({ video, index }: VideoItemProps) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.2 }}
      className="bg-white rounded-lg shadow-lg overflow-hidden"
    >
      <div className="relative aspect-video">
        <iframe src={`https://www.youtube.com/embed/${video.videoId}`} title={video.title} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen className="absolute top-0 left-0 w-full h-full" />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-800">{video.title}</h3>
      </div>
    </motion.div>
  );
}