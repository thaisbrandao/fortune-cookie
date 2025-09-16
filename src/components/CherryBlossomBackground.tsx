import { motion } from 'motion/react';

interface FloatingPetal {
  id: number;
  x: number;
  y: number;
  delay: number;
  duration: number;
  size: number;
}

export function CherryBlossomBackground() {
  // Generate random floating petals
  const petals: FloatingPetal[] = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: -10,
    delay: Math.random() * 10,
    duration: 15 + Math.random() * 10,
    size: 0.5 + Math.random() * 0.8
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Cherry blossom petals */}
      {petals.map((petal) => (
        <motion.div
          key={petal.id}
          className="absolute"
          style={{
            left: `${petal.x}%`,
            scale: petal.size,
          }}
          initial={{ y: '-10vh', rotate: 0, opacity: 0 }}
          animate={{
            y: '110vh',
            rotate: 360,
            opacity: [0, 1, 1, 0],
            x: [0, 30, -20, 10, 0]
          }}
          transition={{
            duration: petal.duration,
            delay: petal.delay,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          <svg width="20" height="20" viewBox="0 0 20 20">
            <defs>
              <radialGradient id={`petalGradient${petal.id}`} cx="50%" cy="30%">
                <stop offset="0%" stopColor="#FFB6C1" />
                <stop offset="70%" stopColor="#FFC0CB" />
                <stop offset="100%" stopColor="#F8BBD9" />
              </radialGradient>
            </defs>
            <path
              d="M10,2 Q6,6 10,10 Q14,6 10,2 Z M10,10 Q6,14 10,18 Q14,14 10,10 Z"
              fill={`url(#petalGradient${petal.id})`}
              opacity="0.8"
            />
          </svg>
        </motion.div>
      ))}

      {/* Subtle cherry blossom branch silhouettes */}
      <div className="absolute top-10 right-10 opacity-20">
        <svg width="200" height="300" viewBox="0 0 200 300">
          <defs>
            <linearGradient id="branchGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#8B4513" />
              <stop offset="100%" stopColor="#A0522D" />
            </linearGradient>
          </defs>
          <path
            d="M20,280 Q30,250 50,220 Q70,190 80,160 Q90,130 100,100"
            stroke="url(#branchGradient)"
            strokeWidth="4"
            fill="none"
          />
          <path
            d="M80,160 Q110,170 130,160 Q150,150 160,140"
            stroke="url(#branchGradient)"
            strokeWidth="3"
            fill="none"
          />
          <path
            d="M100,100 Q120,90 140,95 Q160,100 170,90"
            stroke="url(#branchGradient)"
            strokeWidth="2"
            fill="none"
          />
        </svg>
      </div>

      <div className="absolute bottom-10 left-10 opacity-15">
        <svg width="150" height="200" viewBox="0 0 150 200">
          <path
            d="M130,180 Q120,150 110,120 Q100,90 90,60 Q80,30 70,10"
            stroke="url(#branchGradient)"
            strokeWidth="3"
            fill="none"
          />
          <path
            d="M110,120 Q90,130 80,120 Q70,110 60,105"
            stroke="url(#branchGradient)"
            strokeWidth="2"
            fill="none"
          />
        </svg>
      </div>
    </div>
  );
}