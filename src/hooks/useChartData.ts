import { CHART_DATA, CHART_CONFIG } from '../constants/chartData';

export const useChartData = () => {
  const { svgHeight, svgWidth, horizontalPadding, verticalPadding } = CHART_CONFIG;
  
  const dataMin = Math.min(...CHART_DATA);
  const dataMax = Math.max(...CHART_DATA);
  const dataRange = dataMax - dataMin;

  // Проверяем, не выходит ли точка за пределы viewBox
  let minY = Infinity, maxY = -Infinity;
  CHART_DATA.forEach((value) => {
    const y = dataRange === 0 ? svgHeight / 2 : svgHeight - ((value - dataMin) / dataRange) * (svgHeight - verticalPadding * 2) - verticalPadding;
    if (y < minY) minY = y;
    if (y > maxY) maxY = y;
  });
  
  let scale = 1;
  if (minY < verticalPadding || maxY > svgHeight - verticalPadding) {
    const over = Math.max(verticalPadding - minY, maxY - (svgHeight - verticalPadding), 0);
    scale = (svgHeight - verticalPadding * 2 - over) / (svgHeight - verticalPadding * 2);
    if (scale < 0.7) scale = 0.7;
  }

  const points = CHART_DATA
    .map((value, index) => {
      const x = horizontalPadding + (index / (CHART_DATA.length - 1)) * (svgWidth - horizontalPadding * 2);
      const y = dataRange === 0
        ? svgHeight / 2
        : svgHeight - ((value - dataMin) / dataRange) * (svgHeight - verticalPadding * 2) * scale - verticalPadding + (svgHeight * (1 - scale)) / 2;
      return `${x},${y}`;
    })
    .join(' ');

  const circles = CHART_DATA.map((value, index) => {
    const x = horizontalPadding + (index / (CHART_DATA.length - 1)) * (svgWidth - horizontalPadding * 2);
    const y = dataRange === 0
      ? svgHeight / 2
      : svgHeight - ((value - dataMin) / dataRange) * (svgHeight - verticalPadding * 2) * scale - verticalPadding + (svgHeight * (1 - scale)) / 2;
    return { x, y };
  });

  return {
    points,
    circles,
    svgHeight,
    svgWidth,
    dataMin,
    dataMax,
    dataRange,
  };
}; 