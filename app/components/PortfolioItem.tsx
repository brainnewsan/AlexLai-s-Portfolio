'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';
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

export default function PortfolioItem({ item, index }: PortfolioItemProps) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <Link href={item.link}>
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: index * 0.2 }}
        className="group relative h-[600px] bg-white rounded-lg shadow-lg overflow-hidden transform transition-transform hover:scale-[1.02]"
      >
        <div className="absolute inset-0">
          <Image src={item.src || ''} alt={item.title} fill className="object-cover" priority={index === 0} />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent pointer-events-none" />
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
          <h3 className="text-white text-2xl font-bold mb-2 drop-shadow-lg">{item.title}</h3>
          <p className="text-white/90 text-base drop-shadow-lg">{item.description}</p>
        </div>
      </motion.div>
    </Link>
  );
}