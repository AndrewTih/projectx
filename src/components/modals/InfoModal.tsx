import React from 'react';
import styled from 'styled-components';
import { COLORS, RADII, slideUp } from '../../styles/GlobalStyle';

const InfoModalOverlay = styled.div`
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

const InfoModalStyled = styled.div`
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
  align-items: center;
  animation: ${slideUp} 0.6s ease both;
`;

const InfoModalTitle = styled.div`
  color: ${COLORS.white};
  font-size: 22px;
  font-weight: 700;
  margin-bottom: 18px;
  text-align: center;
`;

const InfoModalText = styled.div`
  color: ${COLORS.text};
  font-size: 16px;
  margin-bottom: 24px;
  text-align: center;
  line-height: 1.5;
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

interface InfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  triggerVibration: () => void;
}

export const InfoModal: React.FC<InfoModalProps> = ({ isOpen, onClose, triggerVibration }) => {
  if (!isOpen) return null;
  return (
    <InfoModalOverlay onClick={() => { triggerVibration(); onClose(); }}>
      <InfoModalStyled onClick={e => e.stopPropagation()}>
        <InfoModalTitle>No events yet</InfoModalTitle>
        <InfoModalText>No events yet</InfoModalText>
        <CloseButton onClick={() => { triggerVibration(); onClose(); }}>Close</CloseButton>
      </InfoModalStyled>
    </InfoModalOverlay>
  );
}; 