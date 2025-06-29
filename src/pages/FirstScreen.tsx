import React from 'react';
import styled from 'styled-components';
import dira from '../assets/dira.png';
import { COLORS } from '../styles/GlobalStyle';

const SplashBg = styled.div`
  min-height: 100vh;
  height: 100vh;
  width: 100vw;
  background: ${COLORS.black};
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
`;

const DiraImg = styled.img`
  width: 100px;
  height: auto;
  display: block;
  user-select: none;
  pointer-events: none;
`;

interface FirstScreenProps {
  onClick: (fromFlash?: boolean) => void;
}

const FirstScreen: React.FC<FirstScreenProps> = ({ onClick }) => {
  return (
    <SplashBg onClick={() => onClick(true)}>
      <DiraImg src={dira} alt="keyhole" draggable={false} />
    </SplashBg>
  );
};

export default FirstScreen; 