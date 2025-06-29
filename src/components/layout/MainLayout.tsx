import React from 'react';
import styled from 'styled-components';
import fon from '../../assets/fon.png';

const Wrapper = styled.div<{ isVisible: boolean }>`
  min-height: 100vh;
  width: 100vw;
  background: url(${fon}) center/cover no-repeat;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  position: relative;
  opacity: ${props => (props.isVisible ? 1 : 0)};
  transition: opacity 0.5s ease-in;
`;

const MainContent = styled.div`
  flex: 1 1 auto;
  min-height: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: max(110px, calc(90px + env(safe-area-inset-bottom, 0)));
  overflow-y: auto;
`;

interface MainLayoutProps {
  children: React.ReactNode;
  isVisible: boolean;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children, isVisible }) => {
  return (
    <Wrapper isVisible={isVisible}>
      <MainContent>{children}</MainContent>
    </Wrapper>
  );
}; 