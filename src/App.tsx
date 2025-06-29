import React, { useState } from 'react';
import GlobalStyle from './styles/GlobalStyle';
import FirstScreen from './pages/FirstScreen';
import UnlockedScreen from './pages/UnlockedScreen';
import MainScreen from './pages/MainScreen';
import LockedScreen from './pages/LockedScreen';

const App: React.FC = () => {
  const [page, setPage] = useState<'splash' | 'anim' | 'main' | 'refer'>('splash');
  const [wasFlash, setWasFlash] = useState(false);
  const [clickCount, setClickCount] = useState(0);

  const handleSplashClick = (fromFlash?: boolean) => {
    setWasFlash(!!fromFlash);
    setClickCount((prev) => {
      const next = prev + 1;
      if (next === 1) {
        setPage('refer');
      } else if (next === 2) {
        setPage('splash');
      } else if (next === 3) {
        setPage('anim');
      }
      return next;
    });
  };

  const handleReferClick = () => {
    setPage('splash');
  };

  return (
    <>
      <GlobalStyle />
      {page === 'splash' && (
        <FirstScreen onClick={handleSplashClick} />
      )}
      {page === 'anim' && (
        <UnlockedScreen onComplete={() => setPage('main')} fromFlash={wasFlash} />
      )}
      {page === 'main' && (
        <MainScreen />
      )}
      {page === 'refer' && (
        <LockedScreen onClick={handleReferClick} />
      )}
    </>
  );
};

export default App; 