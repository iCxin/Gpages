import React, { useEffect, useState, useMemo } from 'react';

const BackgroundDecor = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' });
  };

  // Define floating symbols
  const symbols = useMemo(() => [
    '{ }', '< />', '&&', '||', '=>', 'func', 'const', 'return', 
    '#!', '01', 'npm', 'git', 'sudo', 'div', 'try', 'catch', 
    'if', 'for', 'while', 'await', 'import', 'export', 'class'
  ], []);

  // Generate random config for symbols
  const symbolConfig = useMemo(() => {
    return symbols.map((sym) => ({
      sym,
      left: Math.random() * 90 + 5, // 5% to 95% width
      top: Math.random() * 80 + 10, // 10% to 90% height
      delay: Math.random() * 5,
      duration: Math.random() * 10 + 15, // 15-25s duration
      size: Math.random() * 1 + 0.8, // 0.8rem to 1.8rem
      depth: Math.random() // 0 to 1 for parallax/blur
    }));
  }, [symbols]);

  return (
    <div className="background-decor">
      {/* Giant Background Clock */}
      <div className="bg-clock">
        {formatTime(time)}
      </div>
      
      {/* Floating Code Symbols */}
      <div className="bg-symbols">
        {symbolConfig.map((item, i) => (
            <span 
              key={i} 
              className="bg-symbol" 
              style={{
                left: `${item.left}%`,
                top: `${item.top}%`,
                fontSize: `${item.size}rem`,
                animationDelay: `${item.delay}s`,
                animationDuration: `${item.duration}s`,
                // Deeper items are more blurred and transparent
                opacity: 0.03 + item.depth * 0.1, 
                filter: `blur(${(1 - item.depth) * 3}px)`, 
                zIndex: Math.round(item.depth * 10)
              }}
            >
              {item.sym}
            </span>
        ))}
      </div>
    </div>
  );
};

export default BackgroundDecor;
