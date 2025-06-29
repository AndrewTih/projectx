import React from 'react';
import styled from 'styled-components';
import { COLORS, RADII, SHADOWS } from '../../styles/GlobalStyle';

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

const LongBlock = styled(BaseBlock)`
  width: 342px; /* 206 + 120 + 16 */
  height: 80px;
  margin-top: 16px;
`;

const EventsNewsText = styled.div`
  color: ${COLORS.main};
  font-size: 20px;
  font-weight: 700;
  font-family: 'Helvetica Rounded', Arial, sans-serif;
  text-align: center;
  width: 100%;
`;

interface ActionBlocksProps {
  onInfoClick: () => void;
}

export const ActionBlocks: React.FC<ActionBlocksProps> = ({ onInfoClick }) => {
  return (
    <LongBlock onClick={onInfoClick}>
      <EventsNewsText>Events and news</EventsNewsText>
    </LongBlock>
  );
}; 