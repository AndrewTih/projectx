import React, { useState } from 'react';
import styled from 'styled-components';
import { COLORS, RADII, SHADOWS } from '../../styles/GlobalStyle';
import { APPS } from '../../constants/profileData';
import { useVibration } from '../../hooks/useVibration';
import { TOTAL_EARNINGS, TODAY_EARNINGS } from '../../constants/chartData';

const TON_TO_USD = 2.5; // захардкоженный курс для примера

const PartnersWrapper = styled.div`
  width: 100%;
  max-width: 420px;
  margin: 0 auto;
  padding: 32px 0 0 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1 1 auto;
  min-height: 0;
  overflow-y: auto;
`;

const TotalEarningsCard = styled.div`
  background: ${COLORS.background};
  border-radius: ${RADII.block};
  border: 2px solid ${COLORS.blockBorder};
  box-shadow: ${SHADOWS.block};
  padding: 24px 20px;
  margin-bottom: 28px;
  width: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TotalEarningsTitle = styled.div`
  color: ${COLORS.white};
  font-size: 16px;
  font-weight: 700;
  margin-bottom: 8px;
  text-align: center;
`;

const TotalEarningsAmount = styled.div`
  color: ${COLORS.main};
  font-size: 28px;
  font-weight: 700;
  text-align: center;
`;

const TotalEarningsAmountUsd = styled.div`
  color: ${COLORS.text};
  font-size: 16px;
  margin-top: 2px;
  text-align: center;
`;

const TodayEarnings = styled.div`
  color: ${COLORS.text};
  font-size: 15px;
  margin-bottom: 18px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TodayTon = styled.span`
  color: ${COLORS.main};
  font-size: 16px;
  font-weight: 700;
`;

const TodayUsd = styled.span`
  color: ${COLORS.text};
  font-size: 14px;
`;

const WithdrawButton = styled.button`
  width: 100%;
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

const AppList = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const AppCard = styled.div<{ active?: boolean; expanded?: boolean }>`
  background: ${COLORS.background};
  border-radius: ${RADII.block};
  border: 2px solid ${({ active }) => (active ? COLORS.main : COLORS.blockBorder)};
  box-shadow: ${({ active }) => (active ? SHADOWS.block : 'none')};
  padding: 16px 18px;
  color: #fff;
  font-family: 'Helvetica Rounded', Arial, sans-serif;
  cursor: pointer;
  transition: border 0.18s, box-shadow 0.18s;
`;

const AppHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const AppIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 8px;
  background: ${COLORS.main};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  font-weight: 700;
  color: ${COLORS.darkText};
  flex-shrink: 0;
`;

const AppTitle = styled.div`
  font-size: 16px;
  font-weight: 700;
  flex: 1;
`;

const AppBonus = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 14px;
  color: ${COLORS.text};
  margin-left: auto;
  white-space: nowrap;
`;

const OldPercent = styled.span`
  text-decoration: line-through;
  color: #888;
  font-size: 13px;
`;

const NewPercent = styled.span`
  color: ${COLORS.main};
  font-weight: 700;
  font-size: 15px;
`;

const BonusLabel = styled.span`
  color: ${COLORS.text};
  font-size: 12px;
  margin-right: 2px;
`;

const AppExpandIcon = styled.div<{ expanded?: boolean }>`
  width: 0;
  height: 0;
  border-left: 6px solid transparent;
  border-right: 6px solid transparent;
  border-top: 8px solid ${COLORS.text};
  transition: transform 0.2s;
  transform: ${({ expanded }) => (expanded ? 'rotate(180deg)' : 'rotate(0deg)')};
  margin-top: 2px;
`;

const AppDescription = styled.div`
  color: ${COLORS.text};
  font-size: 14px;
  margin: 0 0 18px 0;
  text-align: center;
`;

const AppDetails = styled.div<{ expanded?: boolean }>`
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px solid ${COLORS.separator};
  display: ${({ expanded }) => (expanded ? 'block' : 'none')};
`;

const AppRefLink = styled.div`
  font-size: 13px;
  color: ${COLORS.main};
  word-break: break-all;
  margin-bottom: 8px;
  padding: 8px 10px;
  background: ${COLORS.darkText};
  border-radius: 6px;
  border: 1px solid ${COLORS.separator};
`;

const AppStats = styled.div`
  font-size: 14px;
  color: ${COLORS.text};
  display: flex;
  justify-content: space-between;
  gap: 16px;
`;

const AppStat = styled.div`
  text-align: center;
  flex: 1;
`;

const AppStatValue = styled.div`
  color: ${COLORS.white};
  font-weight: 700;
  font-size: 16px;
  margin-bottom: 2px;
`;

const AppStatLabel = styled.div`
  font-size: 12px;
  color: ${COLORS.text};
`;

export const PartnersPage: React.FC = () => {
  const [activeApp, setActiveApp] = useState(0);
  const [expandedApps, setExpandedApps] = useState<number[]>([]);
  const { triggerVibration } = useVibration();

  const toggleAppExpansion = (idx: number) => {
    setExpandedApps(prev => 
      prev.includes(idx) 
        ? prev.filter(i => i !== idx)
        : [...prev, idx]
    );
  };

  // Тотал в TON и $
  const totalTon = APPS.reduce((sum, app) => sum + app.earned, 0);
  const totalUsd = totalTon * TON_TO_USD;
  const todayTon = (TODAY_EARNINGS / TON_TO_USD);

  return (
    <PartnersWrapper>
      <TotalEarningsCard>
        <TotalEarningsTitle>Total earned</TotalEarningsTitle>
        <TotalEarningsAmount>{totalTon} TON</TotalEarningsAmount>
        <TotalEarningsAmountUsd>${totalUsd.toFixed(2)}</TotalEarningsAmountUsd>
        <TodayEarnings>
          <TodayTon>Today: +{todayTon.toFixed(2)} TON</TodayTon>
          <TodayUsd>(${TODAY_EARNINGS} USDT)</TodayUsd>
        </TodayEarnings>
        <WithdrawButton onClick={() => triggerVibration()}>Withdraw</WithdrawButton>
      </TotalEarningsCard>
      <AppList>
        {APPS.map((app, idx) => (
          <AppCard key={app.name} active={activeApp === idx} expanded={expandedApps.includes(idx)} onClick={() => toggleAppExpansion(idx)}>
            <AppHeader>
              <AppIcon>{app.icon}</AppIcon>
              <AppTitle>{app.name}</AppTitle>
              <AppBonus>
                <BonusLabel>Реф. %:</BonusLabel>
                <OldPercent>{app.old_ref_percent}%</OldPercent>
                <NewPercent>{app.new_ref_percent}%</NewPercent>
              </AppBonus>
              <AppExpandIcon expanded={expandedApps.includes(idx)} />
            </AppHeader>
            <AppDescription>{app.description}</AppDescription>
            <AppDetails expanded={expandedApps.includes(idx)}>
              <AppRefLink>{app.refLink}</AppRefLink>
              <AppStats>
                <AppStat>
                  <AppStatValue>{app.referrals}</AppStatValue>
                  <AppStatLabel>Referrals</AppStatLabel>
                </AppStat>
                <AppStat>
                  <AppStatValue>{app.earned} TON</AppStatValue>
                  <AppStatLabel>Earnings</AppStatLabel>
                </AppStat>
              </AppStats>
            </AppDetails>
          </AppCard>
        ))}
      </AppList>
    </PartnersWrapper>
  );
}; 