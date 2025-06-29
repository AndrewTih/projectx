import React from 'react';
import styled, { css } from 'styled-components';
import { COLORS, SHADOWS, ripple } from '../../styles/GlobalStyle';
import { TabName, RippleState } from '../../types/navigation';
import photoico from '../../assets/photoico.jpg';
const MdMonetizationOn = require('react-icons/md').MdMonetizationOn;
const MdShowChart = require('react-icons/md').MdShowChart;
const MdGroup = require('react-icons/md').MdGroup;

const BottomNavPaper = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: ${COLORS.darkGray};
  box-shadow: ${SHADOWS.nav};
  padding-bottom: max(18px, env(safe-area-inset-bottom, 0));
  z-index: 100;
`;

const BottomNav = styled.div`
  display: flex;
  justify-content: space-between;
  height: 60px;
`;

const NavAction = styled.button<{ isActive: boolean }>`
  background: none;
  border: none;
  color: ${({ isActive }) => (isActive ? COLORS.main : COLORS.lightGray)};
  font-family: 'Helvetica Rounded', Arial, sans-serif;
  font-size: 12px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s;
  flex: 1;
  min-width: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  transform: scale(${({ isActive }) => (isActive ? 1.05 : 1)});
  position: relative;
  overflow: hidden;
  isolation: isolate;
  transform: translateZ(0);

  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 100px;
    height: 100px;
    background: ${COLORS.main};
    opacity: 0;
    border-radius: 50%;
    transform: translate(-50%, -50%) scale(0);
  }

  &.is-rippling::after {
    animation: ${ripple} 0.9s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  }

  &:active {
    transform: scale(${({ isActive }) => (isActive ? 1.0 : 0.95)});
  }

  &:disabled {
    opacity: 0.6;
    pointer-events: none;
  }
`;

const CenterNavAction = styled.div`
  position: relative;
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CenterButton = styled.button<{ isActive: boolean }>`
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: url(${photoico}) center/cover no-repeat;
  cursor: pointer;
  position: absolute;
  z-index: 3;
  transition: all 0.2s ease-in-out;

  ${({ isActive }) =>
    isActive
      ? css`
          top: -20px;
          transform: scale(1.12);
          border: 2px solid ${COLORS.main};
          box-shadow: ${SHADOWS.centerButton};
        `
      : css`
          top: -10px;
          transform: scale(1);
          border: 2px solid #23272f;
          box-shadow: ${SHADOWS.centerButtonInactive};
        `}
`;

interface BottomNavigationProps {
  activeTab: TabName;
  onTabChange: (tab: TabName) => void;
  rippleState: RippleState;
  onRipple: (tab: 'staking' | 'portfolio') => void;
}

export const BottomNavigation: React.FC<BottomNavigationProps> = ({
  activeTab,
  onTabChange,
  rippleState,
  onRipple,
}) => {
  const handleNavClick = (tabName: TabName) => {
    if (activeTab !== tabName) {
      if (tabName === 'staking' || tabName === 'portfolio') {
        onRipple(tabName);
      }
    }
    onTabChange(tabName);
  };

  return (
    <BottomNavPaper>
      <BottomNav>
        <NavAction isActive={activeTab === 'staking'} onClick={() => handleNavClick('staking')}>
          Staking
        </NavAction>
        <NavAction 
          isActive={activeTab === 'partners'} 
          onClick={() => handleNavClick('partners')}
        >
          Partners
        </NavAction>
        <CenterNavAction>
          <CenterButton isActive={activeTab === 'main'} onClick={() => onTabChange('main')} />
        </CenterNavAction>
        <NavAction 
          isActive={activeTab === 'portfolio'} 
          onClick={() => handleNavClick('portfolio')}
          className={rippleState.portfolio ? 'is-rippling' : ''}
        >
          Portfolio
        </NavAction>
        <NavAction isActive={activeTab === 'soon'} disabled>
          SOON
        </NavAction>
      </BottomNav>
    </BottomNavPaper>
  );
};