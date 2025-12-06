import React, { useState, Suspense, lazy } from 'react';
import Starfield from './components/Starfield';
import Aurora from './components/Aurora';
import BackgroundDecor from './components/BackgroundDecor';
import Moon from './components/Moon';
import Clouds from './components/Clouds';
import Danmaku from './components/Danmaku';
import MainContent from './components/MainContent';
import Footer from './components/Footer';

const ContextMenu = lazy(() => import('./components/ContextMenu'));

function App() {
  const [showDanmaku, setShowDanmaku] = useState(true);

  return (
    <>
      <div className="background-layer"></div>
      <Starfield />
      <Aurora />
      <BackgroundDecor />
      <Moon />
      <Clouds />
      <Danmaku show={showDanmaku} />
      
      <MainContent />
      <Footer />
      
      <Suspense fallback={null}>
        <ContextMenu 
          showDanmaku={showDanmaku} 
          toggleDanmaku={() => setShowDanmaku(!showDanmaku)} 
        />
      </Suspense>
    </>
  );
}

export default App;
