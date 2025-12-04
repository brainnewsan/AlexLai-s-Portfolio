'use client';

import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';

export default function About() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="container mx-auto px-4 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-12">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-4xl font-bold mb-4 text-gray-800"
            >
              About Me
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-xl text-gray-600 mb-8"
            >
              一個多媒體設計師
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="prose prose-lg mx-auto text-gray-600"
          >
            <p className="mb-6">我是一個專注於政策分析和研究的專業人士，致力於為大眾提供深入、客觀的政策解讀和分析。</p>
            <p className="mb-6">透過結合數據分析、案例研究和專家見解，我為讀者提供全面的政策影響評估，幫助大家更好地理解政策變化對經濟、社會的影響。</p>
            <p>我的研究領域包括但不限於：國際貿易政策、能源政策、金融監管、房地產政策等重要議題。</p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
} 