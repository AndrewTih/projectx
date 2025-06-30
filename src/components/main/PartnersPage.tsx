import React, { useState } from 'react';
import styled from 'styled-components';
import { COLORS } from '../../styles/GlobalStyle';
import splitIcon from '../../assets/split.png';
import palaceIcon from '../../assets/palace.jpg';
import { useVibration } from '../../hooks/useVibration';
import { TODAY_EARNINGS } from '../../constants/chartData';
import { FiCopy } from 'react-icons/fi';

const TON_TO_USD = 2.5;

const PARTNERS = [
  {
    name: 'Split.tg',
    icon: splitIcon,
    old_ref_percent: 5,
    new_ref_percent: 10,
    earned: 123.45,
    referrals: 12,
    description: 'Split.tg — сервис для коллективных покупок и управления финансами в Telegram.',
    refLink: 'https://split.tg/ref123',
  },
  {
    name: 'PalaceNFT',
    icon: palaceIcon,
    old_ref_percent: 5,
    new_ref_percent: 7,
    earned: 54.32,
    referrals: 8,
    description: 'PalaceNFT — NFT-маркетплейс с уникальными коллекциями и бонусами для партнеров.',
    refLink: 'https://palacenft.com/ref456',
  }
];

const PageBg = styled.div`
  min-height: 100vh;
  width: 100vw;
  background: ${COLORS.background};
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0;
`;

const Content = styled.div`
  width: 100%;
  max-width: 420px;
  margin: 0 auto;
  padding: 0 0 24px 0;
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
`;

const TotalBlock = styled.div`
  width: 100%;
  padding: 24px 0 12px 0;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  border-bottom: 3px solid ${COLORS.main};
`;

const TotalTitle = styled.div`
  color: ${COLORS.white};
  font-size: 22px;
  font-weight: 800;
  margin-bottom: 8px;
  padding-left: 20px;
`;

const TotalTon = styled.div`
  color: ${COLORS.main};
  font-size: 32px;
  font-weight: 700;
  margin-bottom: 2px;
  padding-left: 20px;
`;

const TotalUsd = styled.div`
  color: ${COLORS.text};
  font-size: 15px;
  margin-bottom: 12px;
  padding-left: 20px;
`;

const TodayEarnings = styled.div`
  color: ${COLORS.white};
  font-size: 15px;
  font-weight: 700;
  margin-bottom: 0;
  padding-left: 20px;
`;

const WithdrawButton = styled.button`
  width: calc(100% - 40px);
  margin: 14px 20px 0 20px;
  height: 44px;
  background: ${COLORS.main};
  color: ${COLORS.darkText};
  font-size: 16px;
  font-weight: 700;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.15s;
  &:active {
    background: ${COLORS.buttonHover};
  }
`;

const OldPercent = styled.span`
  text-decoration: line-through;
  color: #888;
  font-size: 13px;
  margin-right: 2px;
`;

const NewPercent = styled.span`
  color: ${COLORS.main};
  font-weight: 700;
  font-size: 15px;
`;

const PartnersList = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-top: 0;
  overflow-y: auto;
`;

const PartnerRow = styled.div<{expanded?: boolean}>`
  display: flex;
  align-items: center;
  padding: 18px 0 14px 0;
  position: relative;
  cursor: pointer;
  border-bottom: none;
  &::after {
    content: '';
    display: block;
    position: absolute;
    left: 10px;
    right: 10px;
    bottom: 0;
    height: 1.5px;
    background: ${({ expanded }) => expanded ? COLORS.separator : COLORS.main};
    border-radius: 2px;
    transition: background 0.25s;
  }
`;

const PartnerIcon = styled.img`
  width: 38px;
  height: 38px;
  border-radius: 8px;
  background: ${COLORS.main};
  object-fit: cover;
  margin-right: 14px;
  margin-left: 20px;
`;

const PartnerInfo = styled.div`
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  min-width: 0;
`;

const PartnerName = styled.div`
  color: ${COLORS.white};
  font-size: 16px;
  font-weight: 700;
  margin-bottom: 2px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const PartnerBonus = styled.div`
  color: ${COLORS.main};
  font-size: 13px;
  font-weight: 600;
  margin-bottom: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const PartnerStats = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin-left: 16px;
  min-width: 90px;
  margin-right: 20px;
`;

const PartnerEarned = styled.div`
  color: ${COLORS.white};
  font-size: 16px;
  font-weight: 700;
  margin-bottom: 2px;
`;

const PartnerReferrals = styled.div`
  color: ${COLORS.text};
  font-size: 12px;
`;

const DetailsButton = styled.button<{active?: boolean}>`
  margin-top: 8px;
  padding: 6px 16px;
  background: ${({ active }) => active ? COLORS.buttonHover : COLORS.main};
  color: ${COLORS.darkText};
  font-size: 14px;
  font-weight: 700;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.15s;
  &:active {
    background: ${COLORS.buttonHover};
  }
`;

const SlideDown = styled.div<{open: boolean}>`
  overflow: hidden;
  max-height: ${({ open }) => (open ? '200px' : '0')};
  opacity: ${({ open }) => (open ? 1 : 0)};
  transition: max-height 0.35s cubic-bezier(0.4, 0.0, 0.2, 1), opacity 0.25s;
  background: ${COLORS.background};
`;

const DescriptionBlock = styled.div`
  padding: 16px 20px 8px 72px;
  color: ${COLORS.text};
  font-size: 14px;
`;

const RefRow = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  background: none;
  padding: 0 20px 0 72px;
  box-sizing: border-box;
  margin-bottom: 10px;
`;

const RefLink = styled.span`
  color: ${COLORS.main};
  font-size: 14px;
  word-break: break-all;
  flex: 1;
  font-weight: 700;
`;

const CopyIcon = styled.button`
  background: none;
  border: none;
  color: ${COLORS.main};
  cursor: pointer;
  margin-left: 10px;
  font-size: 18px;
  display: flex;
  align-items: center;
  padding: 0;
`;

const LightDivider = styled.div`
  width: 100%;
  height: 1.5px;
  background: none;
  position: relative;
  margin: 8px 0 0 0;
  &::after {
    content: '';
    display: block;
    position: absolute;
    left: 10px;
    right: 10px;
    top: 0;
    height: 1.5px;
    background: ${COLORS.main};
    border-radius: 2px;
  }
`;

export const PartnersPage: React.FC = () => {
  const { triggerVibration } = useVibration();
  const [expanded, setExpanded] = useState<number | null>(null);
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);
  const totalTon = PARTNERS.reduce((sum, app) => sum + app.earned, 0);
  const totalUsd = totalTon * TON_TO_USD;
  const todayTon = (TODAY_EARNINGS / TON_TO_USD);

  const handleDetails = (idx: number) => {
    setExpanded(expanded === idx ? null : idx);
  };

  const handleCopy = (refLink: string, idx: number) => {
    navigator.clipboard.writeText(refLink);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 1200);
  };

  return (
    <PageBg>
      <Content>
        <TotalBlock>
          <TotalTitle>Total earned</TotalTitle>
          <TotalTon>{totalTon} TON</TotalTon>
          <TotalUsd>≈ ${totalUsd.toFixed(2)}</TotalUsd>
          <TodayEarnings>Today: +{todayTon.toFixed(2)} TON (${TODAY_EARNINGS} USDT)</TodayEarnings>
          <WithdrawButton onClick={() => triggerVibration()}>Withdraw</WithdrawButton>
        </TotalBlock>
        <PartnersList>
          {PARTNERS.map((app, idx) => (
            <React.Fragment key={app.name}>
              <PartnerRow expanded={expanded === idx}>
                <PartnerIcon src={app.icon} alt={app.name} />
                <PartnerInfo>
                  <PartnerName>{app.name}</PartnerName>
                  <PartnerBonus>
                    Ref: (<OldPercent>{app.old_ref_percent}%</OldPercent><NewPercent>{app.new_ref_percent}%</NewPercent>)
                  </PartnerBonus>
                </PartnerInfo>
                <PartnerStats>
                  <PartnerEarned>{app.earned} TON</PartnerEarned>
                  <PartnerReferrals>{app.referrals} referrals</PartnerReferrals>
                  <DetailsButton active={expanded === idx} onClick={e => { e.stopPropagation(); handleDetails(idx); triggerVibration(); }}>{expanded === idx ? 'Close' : 'Details'}</DetailsButton>
                </PartnerStats>
              </PartnerRow>
              <SlideDown open={expanded === idx}>
                <DescriptionBlock>{app.description}</DescriptionBlock>
                <RefRow>
                  <RefLink>{app.refLink}</RefLink>
                  <CopyIcon onClick={() => handleCopy(app.refLink, idx)} title="Copy">
                    <FiCopy />
                    {copiedIdx === idx && <span style={{marginLeft: 6, fontSize: 13, color: COLORS.text}}>Copied!</span>}
                  </CopyIcon>
                </RefRow>
                <LightDivider />
              </SlideDown>
            </React.Fragment>
          ))}
        </PartnersList>
      </Content>
    </PageBg>
  );
}; 