import React, { useState, useEffect } from 'react';
import { MainLayout } from '../components/layout/MainLayout';
import { BottomNavigation } from '../components/layout/BottomNavigation';
import { MainPage } from '../components/main/MainPage';
import { PartnersPage } from '../components/main/PartnersPage';
import { StakingPage } from '../components/main/StakingPage';
import { PortfolioPage } from '../components/main/PortfolioPage';
import { ChartBlockComponent } from '../components/blocks/ChartBlock';
import { ActionBlocks } from '../components/blocks/ActionBlocks';
import { MarketModal } from '../components/modals/MarketModal';
import { ChartModal } from '../components/modals/ChartModal';
import { InfoModal } from '../components/modals/InfoModal';
import { useModal } from '../hooks/useModal';
import { useVibration } from '../hooks/useVibration';
import { TabName, RippleState } from '../types/navigation';
import { CHART_DATA } from '../constants/chartData';

const MainScreen: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabName>('main');
  const [isVisible, setIsVisible] = useState(false);
  const [rippleState, setRippleState] = useState<RippleState>({ staking: false, portfolio: false });
  const { isMarketModalOpen, isChartModalOpen, isInfoModalOpen, openModal, closeModal } = useModal();
  const { triggerVibration } = useVibration();

  // Анимация появления при монтировании компонента
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const handleTabChange = (tab: TabName) => {
    setActiveTab(tab);
  };

  const handleRipple = (tab: 'staking' | 'portfolio') => {
    setRippleState(prev => ({ ...prev, [tab]: true }));
    setTimeout(() => {
      setRippleState(prev => ({ ...prev, [tab]: false }));
    }, 900);
  };

  const dataMin = Math.min(...CHART_DATA);
  const dataMax = Math.max(...CHART_DATA);
  const dataRange = dataMax - dataMin;

  const renderContent = () => {
    switch (activeTab) {
      case 'main':
        return (
          <>
            <MainPage onDomClick={() => { triggerVibration(); openModal('market'); }} />
            <ChartBlockComponent onClick={() => { triggerVibration(); openModal('chart'); }} />
            <ActionBlocks onInfoClick={() => { triggerVibration(); openModal('info'); }} />
          </>
        );
      case 'partners':
        return <PartnersPage />;
      case 'staking':
        return <StakingPage />;
      case 'portfolio':
        return <PortfolioPage />;
      default:
        return null;
    }
  };

  return (
    <MainLayout isVisible={isVisible}>
      {renderContent()}
      <BottomNavigation
        activeTab={activeTab}
        onTabChange={handleTabChange}
        rippleState={rippleState}
        onRipple={handleRipple}
      />
      <MarketModal isOpen={isMarketModalOpen} onClose={() => closeModal('market')} triggerVibration={triggerVibration} />
      <ChartModal isOpen={isChartModalOpen} onClose={() => closeModal('chart')} triggerVibration={triggerVibration} chartData={CHART_DATA} dataMin={dataMin} dataRange={dataRange} />
      <InfoModal isOpen={isInfoModalOpen} onClose={() => closeModal('info')} triggerVibration={triggerVibration} />
    </MainLayout>
  );
};

export default MainScreen;
