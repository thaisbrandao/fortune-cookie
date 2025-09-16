import { motion } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useLanguage } from '../contexts/LanguageContext';
import leftCookieImage from 'figma:asset/fb529ab2659b8fc2e54f66b59919a686148e6e99.png';
import rightCookieImage from 'figma:asset/e16b80b89505f2e4a708ea4f386f058044534d60.png';

interface FortuneDisplayProps {
  fortune: string;
  isVisible: boolean;
}

export function FortuneDisplay({ fortune, isVisible }: FortuneDisplayProps) {
  const { t } = useLanguage();
  if (!isVisible || !fortune) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: 1.2, duration: 1.2, ease: "easeOut" }}
      className="max-w-5xl mx-auto flex flex-col items-center justify-center"
    >
      {/* "Today your message is" text centered above everything */}
      <motion.div
        className="mb-12 z-10"
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.6, duration: 1.2, ease: "easeOut" }}
      >
        <p 
          className="text-black text-sm tracking-widest font-normal text-center whitespace-nowrap"
          style={{ 
            fontFamily: 'var(--font-japanese)',
            letterSpacing: '0.15em',
            fontWeight: '300'
          }}
        >
          {t.todayMessage}
        </p>
      </motion.div>

      {/* Container for cookie pieces and emerging paper */}
      <div className="relative flex items-center justify-center w-full">
        
        {/* Left Cookie Piece */}
        <motion.div
          initial={{ x: -80, opacity: 0, rotate: -20 }}
          animate={{ x: -90, opacity: 1, rotate: -12 }}
          transition={{ delay: 1.4, duration: 1.0, ease: "easeOut" }}
          className="absolute left-0 z-30"
        >
          <img
            src={leftCookieImage}
            alt="Left Fortune Cookie Piece"
            className="w-36 h-40 object-contain"
            style={{
              filter: 'drop-shadow(0 6px 16px rgba(139, 69, 19, 0.35)) brightness(1.15) contrast(1.08) saturate(1.15)'
            }}
          />
        </motion.div>

        {/* Right Cookie Piece */}
        <motion.div
          initial={{ x: 80, opacity: 0, rotate: 20 }}
          animate={{ x: 90, opacity: 1, rotate: 12 }}
          transition={{ delay: 1.5, duration: 1.0, ease: "easeOut" }}
          className="absolute right-0 z-30"
        >
          <img
            src={rightCookieImage}
            alt="Right Fortune Cookie Piece"
            className="w-36 h-40 object-contain"
            style={{
              filter: 'drop-shadow(0 6px 16px rgba(139, 69, 19, 0.35)) brightness(1.15) contrast(1.08) saturate(1.15)'
            }}
          />
        </motion.div>

        {/* Refined Paper Slip - emerging from center between cookie pieces */}
        <motion.div
          className="relative z-20"
          initial={{ y: 80, opacity: 0, scale: 0.6, rotate: -2 }}
          animate={{ y: -10, opacity: 1, scale: 1, rotate: 1 }}
          transition={{ delay: 1.8, duration: 1.8, ease: "easeOut" }}
        >
          {/* Clean elegant shadow */}
          <div className="absolute inset-0 rounded-sm transform translate-x-1 translate-y-2 opacity-15 blur-lg"
               style={{ background: 'linear-gradient(145deg, rgba(0, 0, 0, 0.12), rgba(0, 0, 0, 0.06))' }}></div>
          
          {/* Premium paper slip - cleaner, wider and narrower height */}
          <div 
            className="relative transform"
            style={{
              width: '320px',
              minHeight: '90px',
              filter: 'contrast(1.01) brightness(1.02) saturate(1.01)'
            }}
          >
            {/* Clean white paper base */}
            <div
              className="absolute inset-0 rounded-sm"
              style={{
                background: `
                  linear-gradient(180deg, #FFFFFF 0%, #FEFEFE 50%, #FFFFFF 100%)
                `,
                boxShadow: `
                  0 1px 4px rgba(0, 0, 0, 0.06),
                  0 4px 12px rgba(0, 0, 0, 0.03),
                  inset 0 1px 0 rgba(255, 255, 255, 0.98)
                `
              }}
            />
            
            {/* Clean paper content area */}
            <div 
              className="relative p-4"
              style={{
                padding: '16px 24px',
                minHeight: '90px'
              }}
            >

              

              
              {/* Fortune text only - clean Japanese style - perfectly centered */}
              <div className="relative z-10 flex items-center justify-center h-full w-full">
                <p 
                  className="text-gray-800 text-lg leading-relaxed text-center font-medium px-6 max-w-full"
                  style={{ 
                    fontFamily: 'var(--font-cursive)',
                    textShadow: '0 0.5px 1px rgba(0, 0, 0, 0.06)',
                    lineHeight: '1.3',
                    margin: '0 auto'
                  }}
                >
                  "{fortune}"
                </p>
              </div>
            </div>
            
            {/* Minimal paper fold corner */}
            <div 
              className="absolute top-0 right-0"
              style={{
                width: '4px',
                height: '4px',
                background: 'linear-gradient(135deg, #F8F8F8 0%, #F2F2F2 100%)',
                clipPath: 'polygon(0 100%, 100% 0, 100% 100%)',
                transform: 'translate(2px, -2px) rotate(45deg)',
                opacity: 0.4
              }}
            />
          </div>
        </motion.div>

      </div>
    </motion.div>
  );
}