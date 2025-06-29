import React from 'react';
import styled from 'styled-components';
import { COLORS } from '../../styles/GlobalStyle';

const PageContent = styled.div`
  color: ${COLORS.white};
  padding: 20px;
  font-size: 24px;
  text-align: center;
  font-weight: 700;
`;

const PortfolioContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding: 32px 20px;
`;

const PortfolioCard = styled.div`
  background: ${COLORS.background};
  border: 2px solid ${COLORS.blockBorder};
  border-radius: 12px;
  padding: 24px;
  width: 100%;
  max-width: 320px;
  text-align: center;
`;

const PortfolioTitle = styled.h2`
  color: ${COLORS.main};
  font-size: 20px;
  margin-bottom: 16px;
`;

const PortfolioDescription = styled.p`
  color: ${COLORS.text};
  font-size: 14px;
  line-height: 1.5;
`;

export const PortfolioPage: React.FC = () => {
  return (
    <PortfolioContainer>
      <PortfolioCard>
        <PortfolioTitle>Portfolio</PortfolioTitle>
        <PortfolioDescription>
          Here you can see your NFTs.
        </PortfolioDescription>
      </PortfolioCard>
    </PortfolioContainer>
  );
}; 