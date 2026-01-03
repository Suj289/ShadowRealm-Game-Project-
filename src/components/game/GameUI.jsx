import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Key } from 'lucide-react';

export default function GameUI({ playerStats, currentLocation, message }) {
  const hpPercent = (playerStats.hp / playerStats.maxHp) * 100;
  
  return (
    <div className="fixed top-0 left-0 right-0 z-50 p-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-black/70 backdrop-blur-sm rounded-xl p-4 border border-gray-700">
          <div className="flex items-center justify-between gap-4">
            {/* Location */}
            <div className="flex items-center gap-3">
              <div 
                className="w-4 h-4 rounded-full shadow-lg"
                style={{ backgroundColor: currentLocation.color }}
              />
              <span className="text-white font-bold text-lg">{currentLocation.name}</span>
            </div>
            
            {/* Stats */}
            <div className="flex items-center gap-6">
              {/* HP Bar */}
              <div className="flex items-center gap-2">
                <Heart className="w-5 h-5 text-red-500" fill="#ef4444" />
                <div className="w-32 h-4 bg-gray-800 rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-gradient-to-r from-red-600 to-red-400"
                    initial={{ width: '100%' }}
                    animate={{ width: `${hpPercent}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
                <span className="text-white text-sm font-mono w-16">
                  {playerStats.hp}/{playerStats.maxHp}
                </span>
              </div>
              
              {/* Keys */}
              <div className="flex items-center gap-2 bg-yellow-900/50 px-3 py-1 rounded-lg">
                <Key className="w-5 h-5 text-yellow-500" />
                <span className="text-yellow-400 font-bold text-lg">{playerStats.keys}</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Message */}
        <AnimatePresence>
          {message && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mt-4 text-center"
            >
              <div className="inline-block bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2 rounded-full font-bold shadow-lg">
                {message}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}