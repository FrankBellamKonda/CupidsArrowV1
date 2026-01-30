import React, { useMemo } from 'react';

const HeartBackground: React.FC = () => {
  const hearts = useMemo(() => {
    return Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      size: Math.random() * 20 + 10,
      duration: Math.random() * 10 + 10,
      delay: Math.random() * 10,
      color: Math.random() > 0.5 ? '#fda4af' : '#f9a8d4' // pink-300 or pink-200
    }));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {hearts.map((heart) => (
        <div
          key={heart.id}
          className="heart-bg text-4xl absolute"
          style={{
            left: `${heart.left}%`,
            fontSize: `${heart.size}px`,
            animationDuration: `${heart.duration}s`,
            animationDelay: `${heart.delay}s`,
            color: heart.color,
          }}
        >
          ❤
        </div>
      ))}
    </div>
  );
};

export default HeartBackground;