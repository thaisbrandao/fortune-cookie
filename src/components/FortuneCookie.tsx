import { useState } from 'react';
import { motion } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useLanguage } from '../contexts/LanguageContext';
import leftCookieImage from 'figma:asset/fb529ab2659b8fc2e54f66b59919a686148e6e99.png';
import rightCookieImage from 'figma:asset/e16b80b89505f2e4a708ea4f386f058044534d60.png';

interface FortuneCookieProps {
  onFortuneReveal: (fortune: string) => void;
}

export function FortuneCookie({ onFortuneReveal }: FortuneCookieProps) {
  const { t } = useLanguage();
  const [isOpened, setIsOpened] = useState(false);

  const handleCookieClick = () => {
    if (!isOpened) {
      const randomFortune = t.fortunes[Math.floor(Math.random() * t.fortunes.length)];
      setIsOpened(true);
      onFortuneReveal(randomFortune);
    }
  };

  const resetCookie = () => {
    setIsOpened(false);
    onFortuneReveal('');
  };

  return (
    <div className="flex flex-col items-center space-y-8">
      <motion.div
        className="relative cursor-pointer"
        onClick={handleCookieClick}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        animate={{ 
          y: isOpened ? 0 : [0, -8, 0],
          rotate: isOpened ? 0 : [0, 2, -2, 0]
        }}
        transition={{ 
          duration: isOpened ? 0.2 : 3,
          repeat: isOpened ? 0 : Infinity,
          repeatType: "reverse",
          ease: "easeInOut"
        }}
      >
        {!isOpened ? (
          /* Realistic Fortune Cookie Image */
          <div className="relative">
            <ImageWithFallback
              src="https://64.media.tumblr.com/e626dc6308160d3e8429bc0a02c714e1/b7fffc789710bf2f-86/s500x750/7d135969703a110edf5037b738a6f281b023b01b.pnj"
              alt="Fortune Cookie"
              className="w-60 h-45 object-contain hover:scale-105 transition-transform duration-300"
              style={{
                filter: 'drop-shadow(0 12px 24px rgba(139, 69, 19, 0.25)) brightness(1.1) contrast(1.05) saturate(1.1)'
              }}
            />
          </div>
        ) : (
          /* Broken Cookie Pieces */
          <motion.div
            className="relative flex items-center justify-center"
            initial={{ scale: 1 }}
            animate={{ scale: 1.05 }}
            transition={{ duration: 0.6 }}
          >
            {/* Left piece */}
            <motion.div
              initial={{ x: 0, rotate: 0, opacity: 1 }}
              animate={{ x: -80, rotate: -10 }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              <img
                src={leftCookieImage}
                alt="Left cookie piece"
                className="w-40 h-auto object-contain"
                style={{
                  filter: "drop-shadow(0 8px 16px rgba(139, 69, 19, 0.3)) brightness(1.1) contrast(1.05) saturate(1.1)"
                }}
              />
            </motion.div>

            {/* Right piece */}
            <motion.div
              initial={{ x: 0, rotate: 0, opacity: 1 }}
              animate={{ x: 80, rotate: 10 }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              <img
                src={rightCookieImage}
                alt="Right cookie piece"
                className="w-40 h-auto object-contain"
                style={{
                  filter: "drop-shadow(0 8px 16px rgba(139, 69, 19, 0.3)) brightness(1.1) contrast(1.05) saturate(1.1)"
                }}
              />
            </motion.div>
          </motion.div>
        )}
      </motion.div>

      {/* Instructions */}
      <div className="text-center space-y-2">
        {!isOpened ? (
          <p className="text-amber-700 opacity-75">{t.clickInstruction}</p>
        ) : (
          <button
            onClick={resetCookie}
            className="text-amber-600 hover:text-amber-800 underline decoration-dotted transition-colors"
          >
            {t.tryAnother}
          </button>
        )}
      </div>
    </div>
  );
}