'use client';

import Navbar from '../components/Navbar';
import VideoItem from '../components/VideoItem';

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
          {videos.map((video, index) => (
            <VideoItem key={video.videoId} video={video} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
} 