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

const StakingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding: 32px 20px;
`;

const StakingCard = styled.div`
  background: ${COLORS.background};
  border: 2px solid ${COLORS.blockBorder};
  border-radius: 12px;
  padding: 24px;
  width: 100%;
  max-width: 320px;
  text-align: center;
`;

const StakingTitle = styled.h2`
  color: ${COLORS.main};
  font-size: 20px;
  margin-bottom: 16px;
`;

const StakingDescription = styled.p`
  color: ${COLORS.text};
  font-size: 14px;
  line-height: 1.5;
`;

export const StakingPage: React.FC = () => {
  return (
    <StakingContainer>
      <StakingCard>
        <StakingTitle>Staking</StakingTitle>
        <StakingDescription>
          Stake your NFT here.
        </StakingDescription>
      </StakingCard>
    </StakingContainer>
  );
}; 