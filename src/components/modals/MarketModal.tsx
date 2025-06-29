import React from 'react';
import styled from 'styled-components';
import palaceImg from '../../assets/palace.jpg';
import mrktImg from '../../assets/mrkt.jpg';
import harborImg from '../../assets/harbor.jpg';
import { COLORS, RADII, SHADOWS, slideUp } from '../../styles/GlobalStyle';

const MarketModalOverlay = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  background: rgba(0,0,0,0.7);
  z-index: 200;
  display: flex;
  align-items: flex-end;
  justify-content: center;
`;

const MarketModalStyled = styled.div`
  width: 100%;
  max-width: 420px;
  background: ${COLORS.darkGray};
  border-radius: ${RADII.modal} ${RADII.modal} 0 0;
  border: none;
  box-shadow: none;
  padding: 32px 20px 24px 20px;
  padding-bottom: max(44px, env(safe-area-inset-bottom, 0));
  display: flex;
  flex-direction: column;
  align-items: stretch;
  animation: ${slideUp} 0.6s ease both;
`;

const MarketList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 18px;
`;

const MarketItem = styled.a`
  display: flex;
  align-items: center;
  background: ${COLORS.background};
  border-radius: ${RADII.block};
  border: 1.5px solid ${COLORS.blockBorder};
  box-shadow: ${SHADOWS.block};
  padding: 16px 18px;
  text-decoration: none;
  color: ${COLORS.white};
  font-family: 'Helvetica Rounded', Arial, sans-serif;
  font-size: 18px;
  font-weight: 700;
  transition: background 0.15s;
  &:hover {
    background: ${COLORS.mediumGray};
    border-color: ${COLORS.blockBorder};
    color: ${COLORS.white};
  }
`;

const MarketIcon = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 18px;
  background: ${COLORS.darkGray};
  object-fit: cover;
  border: 1.5px solid ${COLORS.blockBorder};
`;

const CloseButton = styled.button`
  width: 100%;
  height: 54px;
  background: ${COLORS.main};
  color: ${COLORS.darkText};
  font-size: 20px;
  font-family: 'Helvetica Rounded', Arial, sans-serif;
  font-weight: 700;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  box-shadow: none;
  letter-spacing: -0.5px;
  transition: background 0.15s, color 0.15s;
  &:active {
    background: ${COLORS.main};
    color: ${COLORS.darkText};
  }
`;

interface MarketModalProps {
  isOpen: boolean;
  onClose: () => void;
  triggerVibration: () => void;
}

export const MarketModal: React.FC<MarketModalProps> = ({ isOpen, onClose, triggerVibration }) => {
  if (!isOpen) return null;
  return (
    <MarketModalOverlay onClick={() => { triggerVibration(); onClose(); }}>
      <MarketModalStyled onClick={e => e.stopPropagation()}>
        <MarketList>
          <MarketItem href="https://palacenft.example.com" target="_blank" rel="noopener noreferrer" onClick={e => { triggerVibration(); }}>
            <MarketIcon src={palaceImg} alt="PalaceNFT" /> PalaceNFT
          </MarketItem>
          <MarketItem href="https://mrkt.example.com" target="_blank" rel="noopener noreferrer" onClick={e => { triggerVibration(); }}>
            <MarketIcon src={mrktImg} alt="MRKT" /> MRKT
          </MarketItem>
          <MarketItem href="https://harbor.example.com" target="_blank" rel="noopener noreferrer" onClick={e => { triggerVibration(); }}>
            <MarketIcon src={harborImg} alt="Harbor Market" /> Harbor Market
          </MarketItem>
        </MarketList>
        <CloseButton onClick={() => { triggerVibration(); onClose(); }}>Close</CloseButton>
      </MarketModalStyled>
    </MarketModalOverlay>
  );
}; 