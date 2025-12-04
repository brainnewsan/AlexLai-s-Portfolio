'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useInView } from 'react-intersection-observer';

interface Photo {
  src: string;
  title: string;
  description: string;
}

interface PhotoItemProps {
  photo: Photo;
  index: number;
}

export default function PhotoItem({ photo, index }: PhotoItemProps) {
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
      className="group relative aspect-square bg-white rounded-lg shadow-lg overflow-hidden transform transition-transform hover:scale-105"
    >
      <Image src={photo.src} alt={photo.title} fill className="object-cover" />
      <div className="absolute inset-0 bg-black bg-opacity-60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-6">
        <h3 className="text-white text-xl font-bold mb-4">{photo.title}</h3>
        <p className="text-white text-center">{photo.description}</p>
      </div>
    </motion.div>
  );
}