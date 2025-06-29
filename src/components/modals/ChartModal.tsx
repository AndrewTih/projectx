import React from 'react';
import styled from 'styled-components';
import { COLORS, RADII, slideUp } from '../../styles/GlobalStyle';

const ChartModalOverlay = styled.div`
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

const ChartModalStyled = styled.div`
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

const ChartModalTitle = styled.div`
  color: ${COLORS.white};
  font-size: 22px;
  font-weight: 700;
  margin-bottom: 18px;
  text-align: center;
`;

const ChartSVGWrapper = styled.div`
  width: 320px;
  height: 180px;
  position: relative;
  box-sizing: border-box;
`;

const ChartModalText = styled.div`
  color: ${COLORS.text};
  font-size: 16px;
  margin-top: 18px;
  text-align: center;
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
  margin-top: 24px;
  cursor: pointer;
  box-shadow: none;
  letter-spacing: -0.5px;
  transition: background 0.15s, color 0.15s;
  &:active {
    background: ${COLORS.main};
    color: ${COLORS.darkText};
  }
`;

interface ChartModalProps {
  isOpen: boolean;
  onClose: () => void;
  triggerVibration: () => void;
  chartData: number[];
  dataMin: number;
  dataRange: number;
}

export const ChartModal: React.FC<ChartModalProps> = ({ isOpen, onClose, triggerVibration, chartData, dataMin, dataRange }) => {
  if (!isOpen) return null;
  return (
    <ChartModalOverlay onClick={() => { triggerVibration(); onClose(); }}>
      <ChartModalStyled onClick={e => e.stopPropagation()}>
        <ChartModalTitle>Detailed chart</ChartModalTitle>
        <ChartSVGWrapper>
          <svg
            width="100%"
            height="100%"
            viewBox={`0 0 320 180`}
            preserveAspectRatio="none"
          >
            {[...Array(6)].map((_, i) => (
              <line
                key={i}
                x1="0"
                y1={(i + 1) * (180 / 7)}
                x2={320}
                y2={(i + 1) * (180 / 7)}
                stroke={COLORS.chartGrid}
                strokeWidth="0.5"
              />
            ))}
            <polyline
              fill="none"
              stroke={COLORS.chartLine}
              strokeWidth="3"
              points={chartData.map((v, idx) => {
                const x = 10 + (idx / (chartData.length - 1)) * (320 - 20);
                const y = 180 - ((v - dataMin) / dataRange) * (180 - 20) - 10;
                return `${x},${y}`;
              }).join(' ')}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {chartData.map((v, idx) => {
              const x = 10 + (idx / (chartData.length - 1)) * (320 - 20);
              const y = 180 - ((v - dataMin) / dataRange) * (180 - 20) - 10;
              return (
                <circle
                  key={idx}
                  cx={x}
                  cy={y}
                  r="4.5"
                  fill={COLORS.chartPoint}
                  stroke={COLORS.chartLine}
                  strokeWidth="2"
                />
              );
            })}
          </svg>
        </ChartSVGWrapper>
        <ChartModalText>Detailed chart for the week. Here you can add any explanations or analytics.</ChartModalText>
        <CloseButton onClick={() => { triggerVibration(); onClose(); }}>Close</CloseButton>
      </ChartModalStyled>
    </ChartModalOverlay>
  );
}; 