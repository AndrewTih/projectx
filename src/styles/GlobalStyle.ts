import { createGlobalStyle, keyframes } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Helvetica Rounded', Arial, sans-serif;
    background: #000;
  }
`;

export default GlobalStyle;

export const COLORS = {
  main: '#fef102',
  background: '#1b1b1b',
  text: '#b8b8b8',
  border: '#fff',
  blockBorder: '#fef102',
  black: '#000',
  darkGray: '#111',
  mediumGray: '#2a2a2a',
  lightGray: '#a0a0a0',
  white: '#fff',
  darkText: '#181818',
  separator: '#333',
  buttonHover: '#fec401',
  chartGrid: '#444',
  chartLine: '#FEF102',
  chartPoint: '#1B1B1B',
};

export const RADII = {
  block: '20px',
  button: '8px',
  modal: '24px',
  circle: '50%',
};

export const SHADOWS = {
  block: '0 0 12px rgba(254, 241, 2, 0.5)',
  nav: '0px -2px 4px -1px rgba(0, 0, 0, 0.2), 0px -4px 5px 0px rgba(0, 0, 0, 0.14), 0px -1px 10px 0px rgba(0, 0, 0, 0.12)',
  centerButton: '0 0 16px 4px #fef102, 0 2px 16px #000',
  centerButtonInactive: '0 2px 8px #000',
};

export const slideUp = keyframes`
  from {
    transform: translateY(80px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

export const scaleUp = keyframes`
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(5);
  }
`;

export const flashIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

export const flashOut = keyframes`
  from { opacity: 1; }
  to { opacity: 0; }
`;

export const ripple = keyframes`
  from {
    transform: translate(-50%, -50%) scale(0);
    opacity: 0.3;
  }
  to {
    transform: translate(-50%, -50%) scale(4);
    opacity: 0;
  }
`;

export const GRADIENTS = {
  joinButton: `
    radial-gradient(
      86.21% 86.23% at 13.79% 47.83%,
      #fef102 0%,
      #fec401 21.4%,
      #ff9000 45.67%,
      #fef102 87.02%
    )
  `,
}; 