import React, { useState, Suspense, lazy } from 'react';
import Starfield from './components/Starfield';
import Aurora from './components/Aurora';
import BackgroundDecor from './components/BackgroundDecor';
import Moon from './components/Moon';
import Clouds from './components/Clouds';
import Danmaku from './components/Danmaku';
import MainContent from './components/MainContent';
import Footer from './components/Footer';

const Modals = lazy(() => import('./components/Modals'));
const ContextMenu = lazy(() => import('./components/ContextMenu'));

function App() {
  const [activeModal, setActiveModal] = useState(null);
  const [showDanmaku, setShowDanmaku] = useState(true);

  const handleOpenModal = (id) => {
    setActiveModal(id);
  };

  const handleCloseModal = () => {
    setActiveModal(null);
  };

  return (
    <>
      <div className="background-layer"></div>
      <Starfield />
      <Aurora />
      <BackgroundDecor />
      <Moon />
      <Clouds />
      <Danmaku show={showDanmaku} />
      
      <MainContent onOpenModal={handleOpenModal} />
      <Footer />
      
      <Suspense fallback={null}>
        <Modals activeId={activeModal} onClose={handleCloseModal} />
        
        <ContextMenu 
          onOpenModal={handleOpenModal} 
          showDanmaku={showDanmaku} 
          toggleDanmaku={() => setShowDanmaku(!showDanmaku)} 
        />
      </Suspense>
    </>
  );
}

export default App;
