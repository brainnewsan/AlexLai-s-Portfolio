'use client';

import Navbar from '../components/Navbar';
import PhotoItem from '../components/PhotoItem';

const photos = [
  {
    src: '/images/Proj-1/trump_usa.jpg',
    title: '特朗普政策影響',
    description: '減稅政策與金融服務改革分析'
  },
  {
    src: '/images/Proj-1/trade_policy.jpg',
    title: '對華貿易政策',
    description: '貿易戰影響與中國因應對策'
  },
  {
    src: '/images/Proj-1/energy_policy.jpg',
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
          {photos.map((photo, index) => (
            <PhotoItem key={photo.title} photo={photo} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
}