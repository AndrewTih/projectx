import React from 'react';
import styled from 'styled-components';
import { COLORS, RADII, SHADOWS } from '../../styles/GlobalStyle';
import { useChartData } from '../../hooks/useChartData';

const ChartBlock = styled.button`
  width: 342px;
  height: 103px;
  padding: 16px;
  justify-content: center;
  align-items: center;
  margin-top: 16px;
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

const ChartSVGWrapper = styled.div`
  width: calc(100% - 32px);
  height: calc(100% - 32px);
  position: relative;
  box-sizing: border-box;
`;

interface ChartBlockProps {
  onClick: () => void;
}

export const ChartBlockComponent: React.FC<ChartBlockProps> = ({ onClick }) => {
  const { points, circles, svgHeight, svgWidth } = useChartData();

  return (
    <ChartBlock onClick={onClick}>
      <ChartSVGWrapper>
        <svg
          width="100%"
          height="100%"
          viewBox={`0 0 ${svgWidth} ${svgHeight}`}
          preserveAspectRatio="none"
        >
          {[...Array(3)].map((_, i) => (
            <line
              key={i}
              x1="0"
              y1={(i + 1) * (svgHeight / 4)}
              x2={svgWidth}
              y2={(i + 1) * (svgHeight / 4)}
              stroke={COLORS.chartGrid}
              strokeWidth="0.5"
            />
          ))}
          <polyline
            fill="none"
            stroke={COLORS.chartLine}
            strokeWidth="3"
            points={points}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {circles.map((c, i) => (
            <circle
              key={i}
              cx={c.x}
              cy={c.y}
              r="3.5"
              fill={COLORS.chartPoint}
              stroke={COLORS.chartLine}
              strokeWidth="2"
            />
          ))}
        </svg>
      </ChartSVGWrapper>
    </ChartBlock>
  );
}; 