import React from 'react';
import styled from 'styled-components';
import Lottie from 'lottie-react';
import evilAnim from '../assets/evil_anim.json';
import { COLORS } from '../styles/GlobalStyle';

interface LockedScreenProps {
  onClick?: () => void;
}

const Wrapper = styled.div`
  min-height: 100vh;
  height: 100vh;
  width: 100vw;
  background: ${COLORS.black};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Title = styled.div`
  color: ${COLORS.white};
  font-family: 'Helvetica Rounded', Arial, sans-serif;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  letter-spacing: -0.48px;
  margin-bottom: 40px;
`;

const AnimationWrapper = styled.div`
  width: 300px;
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 40px;
`;

const BuyButton = styled.button`
  min-width: 254px;
  height: 55px;
  flex-shrink: 0;
  border-radius: 10px;
  background: ${COLORS.main};
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const BuyText = styled.span`
  color: ${COLORS.black};
  font-family: 'Helvetica Rounded', Arial, sans-serif;
  font-size: 18px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  letter-spacing: -0.48px;
`;

const LockedScreen: React.FC<LockedScreenProps> = ({ onClick }) => {
  return (
    <Wrapper>
      <Title>You have no Not Cap.</Title>
      <AnimationWrapper>
        <Lottie animationData={evilAnim} loop={true} style={{ width: 260, height: 260 }} />
      </AnimationWrapper>
      <BuyButton onClick={onClick}>
        <BuyText>Buy here!</BuyText>
      </BuyButton>
    </Wrapper>
  );
};

export default LockedScreen; 