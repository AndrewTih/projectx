import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { ReactComponent as SvetIcon } from '../../assets/svet.svg';
import notMain from '../../assets/not_main.png';
import { ReactComponent as DomIcon } from '../../assets/dom.svg';
import { ReactComponent as SoonIcon } from '../../assets/soon.svg';
import { COLORS, RADII, SHADOWS, GRADIENTS } from '../../styles/GlobalStyle';

const HiText = styled.div`
  color: ${COLORS.text};
  font-family: 'Helvetica Rounded', Arial, sans-serif;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  letter-spacing: -0.48px;
  margin-top: 32px;
  margin-bottom: 24px;
`;

const GlowBlock = styled.div`
  position: relative;
  width: 181px;
  height: 168px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SvetImg = styled(SvetIcon)`
  position: absolute;
  left: 50%;
  top: 50%;
  width: 362px;
  height: 336px;
  transform: translate(-50%, -50%);
  pointer-events: none;
  user-select: none;
  z-index: 1;
`;

const Character = styled.div`
  position: relative;
  width: 103.405px;
  height: 168px;
  flex-shrink: 0;
  aspect-ratio: 103.4 / 168;
  background: url(${notMain}) transparent 50% / cover no-repeat;
  z-index: 2;
`;

const JoinButton = styled.button`
  width: 194px;
  height: 36px;
  flex-shrink: 0;
  border-radius: ${RADII.button};
  border: 0.5px solid ${COLORS.border};
  background: #14110b;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 24px;
  cursor: pointer;
  position: relative;
  z-index: 2;

  &:hover {
    background: ${COLORS.mediumGray};
  }
`;

const JoinText = styled.span`
  font-family: 'Helvetica Rounded', Arial, sans-serif;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  letter-spacing: -0.48px;
  background: ${GRADIENTS.joinButton};
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-fill-color: transparent;
  color: transparent;
`;

const BlocksContainer = styled.div`
  display: flex;
  gap: 16px;
  margin-top: 24px;
`;

const BaseBlock = styled.button`
  height: 125px;
  flex-shrink: 0;
  border-radius: ${RADII.block};
  border: 1px solid ${COLORS.blockBorder};
  background: ${COLORS.background};
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  position: relative;
  overflow: hidden;
  box-shadow: ${SHADOWS.block};

  &:hover {
    background: ${COLORS.mediumGray};
  }
`;

const RectangleBlock = styled(BaseBlock)`
  width: 206px;
  backdrop-filter: blur(10px);
`;

const SquareBlock = styled(BaseBlock)`
  width: 120px;
`;

const SoonText = styled.span`
  color: ${COLORS.white};
  font-family: 'Helvetica Rounded', Arial, sans-serif;
  font-size: 16px;
  font-weight: 700;
  letter-spacing: -0.48px;
  margin-top: 8px;
`;

const PageContent = styled.div`
  color: ${COLORS.white};
  padding: 20px;
  font-size: 24px;
`;

export const MainPage: React.FC<{ onDomClick?: () => void }> = ({ onDomClick }) => {
  const [name, setName] = useState('User');

  useEffect(() => {
    // Получаем initData из Telegram WebApp
    const tg = (window as any).Telegram?.WebApp;
    const initData = tg?.initData || '';
    if (!initData) return;
    fetch('http://localhost:8000/user/me', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ initData }),
    })
      .then(res => res.json())
      .then(data => {
        if (data.first_name || data.last_name) {
          setName(`${data.first_name || ''} ${data.last_name || ''}`.trim());
        } else if (data.username) {
          setName(data.username);
        }
      })
      .catch(() => {});
  }, []);

  return (
    <>
      <HiText>Hi, {name}</HiText>
      <GlowBlock>
        <SvetImg />
        <Character />
      </GlowBlock>
      <JoinButton>
        <JoinText>Join Not Cap Club</JoinText>
      </JoinButton>
      <BlocksContainer>
        <RectangleBlock>
          <SoonIcon />
          <SoonText>SOON</SoonText>
        </RectangleBlock>
        <SquareBlock onClick={onDomClick}>
          <DomIcon />
        </SquareBlock>
      </BlocksContainer>
    </>
  );
}; 