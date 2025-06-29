import React, { useRef, useCallback, useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import Lottie from 'lottie-react';
import skvazina from '../assets/skvazina.png';
import coolAnim from '../assets/cool_anim.json';
import dira from '../assets/dira.png';
import { COLORS, scaleUp, flashIn, flashOut } from '../styles/GlobalStyle';

const AnimationBg = styled.div<{ isFading: boolean; blackBg: boolean }>`
  min-height: 100vh;
  height: 100vh;
  width: 100vw;
  background: ${({ blackBg }) => blackBg ? COLORS.black : `url(${skvazina}) center/cover no-repeat`};
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  opacity: ${props => props.isFading ? 0 : 1};
  transition: opacity 0.5s ease-in-out;
`;

const DiraImg = styled.img<{ animate: boolean }>`
  width: 100px;
  height: auto;
  display: block;
  user-select: none;
  pointer-events: none;
  transition: transform 1.2s cubic-bezier(0.4, 0, 0.2, 1);
  ${({ animate }) => animate && css`
    animation: ${scaleUp} 1.2s cubic-bezier(0.4, 0, 0.2, 1) forwards;
  `}
`;

const WhiteFlash = styled.div<{ phase: 'none' | 'in' | 'hold' | 'out' }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: ${COLORS.border};
  opacity: 0;
  pointer-events: none;
  z-index: 10;
  ${({ phase }) => phase === 'in' && css`
    animation: ${flashIn} 0.7s 0.3s cubic-bezier(0.4, 0, 0.2, 1) forwards;
  `}
  ${({ phase }) => phase === 'hold' && css`
    opacity: 1;
    transition: none;
  `}
  ${({ phase }) => phase === 'out' && css`
    animation: ${flashOut} 0.7s cubic-bezier(0.4, 0, 0.2, 1) forwards;
    opacity: 1;
  `}
`;

interface UnlockedScreenProps {
  onComplete: () => void;
  fromFlash?: boolean;
}

const UnlockedScreen: React.FC<UnlockedScreenProps> = ({ onComplete, fromFlash }) => {
  const lottieRef = useRef<any>(null);
  const [isFading, setIsFading] = useState(false);
  const [showKeyhole, setShowKeyhole] = useState(!!fromFlash);
  const [animateKeyhole, setAnimateKeyhole] = useState(false);
  const [flashPhase, setFlashPhase] = useState<'none' | 'in' | 'hold' | 'out'>('none');
  const [showLottie, setShowLottie] = useState(!fromFlash);
  const [blackBg, setBlackBg] = useState(!!fromFlash);

  useEffect(() => {
    console.log('UnlockedScreen useEffect triggered, fromFlash:', fromFlash);
    
    if (fromFlash) {
      console.log('Starting flash sequence');
      setAnimateKeyhole(true);
      setTimeout(() => {
        console.log('Starting flash in');
        setFlashPhase('in');
      }, 100);
      setTimeout(() => {
        console.log('Flash hold');
        setFlashPhase('hold');
      }, 800);
      setTimeout(() => {
        console.log('Ending flash, showing Lottie');
        setShowKeyhole(false);
        setBlackBg(false);
        setShowLottie(true);
        setFlashPhase('out');
        setTimeout(() => {
          console.log('Flash out complete, starting Lottie');
          setFlashPhase('none');
          setTimeout(() => {
            console.log('Playing Lottie animation');
            if (lottieRef.current) {
              lottieRef.current.play();
            } else {
              console.error('Lottie ref is null');
            }
          }, 50);
        }, 700);
      }, 1200);
    } else {
      console.log('Direct Lottie play');
      setTimeout(() => {
        if (lottieRef.current) {
          lottieRef.current.play();
        } else {
          console.error('Lottie ref is null on direct play');
        }
      }, 100);
    }
  }, [fromFlash]);

  const handleComplete = useCallback(() => {
    console.log('Lottie animation completed');
    setIsFading(true);
    setTimeout(onComplete, 1000);
  }, [onComplete]);

  const handleLottieError = useCallback((error: any) => {
    console.error('Lottie animation error:', error);
    // Fallback: если анимация не работает, просто завершаем экран
    setTimeout(() => {
      handleComplete();
    }, 2000);
  }, []);

  const handleLottieLoad = useCallback(() => {
    console.log('Lottie animation loaded successfully');
    // Проверяем, что анимация готова к воспроизведению
    if (lottieRef.current) {
      console.log('Lottie ref is available, animation ready');
    }
  }, []);

  const handleLottiePlay = useCallback(() => {
    console.log('Lottie animation started playing');
  }, []);

  return (
    <AnimationBg isFading={isFading} blackBg={blackBg}>
      {showKeyhole && <DiraImg src={dira} alt="keyhole" draggable={false} animate={animateKeyhole} />}
      <WhiteFlash phase={flashPhase} />
      {showLottie && (
        <div style={{ position: 'relative', zIndex: 5 }}>
          <Lottie
            lottieRef={lottieRef}
            animationData={coolAnim}
            loop={false}
            style={{ width: 260, height: 260 }}
            onComplete={handleComplete}
            onError={handleLottieError}
            onLoad={handleLottieLoad}
            onPlay={handleLottiePlay}
            autoplay={false}
          />
        </div>
      )}
    </AnimationBg>
  );
};

export default UnlockedScreen;