'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';

const Navbar = () => {
  const pathname = usePathname();

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Graphic Portfolios', path: '/photos' },
    { name: 'Video Portfolios', path: '/videos' },
    { name: 'About me', path: '/about' },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 w-full bg-white/90 backdrop-blur-md shadow-sm z-50"
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="text-2xl font-bold gradient-text">
          Alex's Portfolio
          </Link>
          <div className="flex space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className={`relative px-3 py-2 transition-colors accent-border ${
                  pathname === item.path 
                    ? 'text-purple-600 font-medium' 
                    : 'text-gray-600 hover:text-purple-500'
                }`}
              >
                {pathname === item.path && (
                  <motion.div
                    layoutId="navbar-indicator"
                    className="absolute -bottom-0.5 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-500 via-yellow-400 to-blue-500"
                    transition={{ duration: 0.3 }}
                  />
                )}
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar; 