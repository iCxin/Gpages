import React, { useEffect, useRef, useState } from 'react';
import { config } from '../data';

const ContextMenu = ({ onOpenModal, showDanmaku, toggleDanmaku }) => {
  const [visible, setVisible] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const menuRef = useRef(null);

  useEffect(() => {
    const handleContextMenu = (e) => {
      e.preventDefault();
      let x = e.clientX;
      let y = e.clientY;
      
      // Boundary check (180x120 is approx size from legacy code)
      if (x + 180 > window.innerWidth) x -= 180;
      if (y + 120 > window.innerHeight) y -= 120;
      
      setPosition({ x, y });
      setVisible(true);
    };

    const handleClick = () => {
      setVisible(false);
    };

    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('click', handleClick);
    };
  }, []);

  return (
    <div 
      className={`context-menu ${visible ? 'visible' : ''}`} 
      id="context-menu"
      ref={menuRef}
      style={{ left: position.x, top: position.y }}
    >
      <div className="menu-item" onClick={() => toggleDanmaku()}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
           {showDanmaku ? (
             <>
               <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
               <line x1="1" y1="1" x2="23" y2="23"></line>
             </>
           ) : (
             <>
               <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
               <circle cx="12" cy="12" r="3"></circle>
             </>
           )}
        </svg>
        {showDanmaku ? '关闭弹幕' : '开启弹幕'}
      </div>
      <div className="menu-item" onClick={() => window.location.reload()}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="23 4 23 10 17 10"></polyline>
          <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"></path>
        </svg>
        刷新页面
      </div>
    </div>
  );
};

export default ContextMenu;
