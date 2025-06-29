import { useState } from 'react';

export const useModal = () => {
  const [isMarketModalOpen, setMarketModalOpen] = useState(false);
  const [isChartModalOpen, setChartModalOpen] = useState(false);
  const [isInfoModalOpen, setInfoModalOpen] = useState(false);

  const openModal = (type: 'market' | 'chart' | 'info') => {
    switch (type) {
      case 'market':
        setMarketModalOpen(true);
        break;
      case 'chart':
        setChartModalOpen(true);
        break;
      case 'info':
        setInfoModalOpen(true);
        break;
    }
  };

  const closeModal = (type: 'market' | 'chart' | 'info') => {
    switch (type) {
      case 'market':
        setMarketModalOpen(false);
        break;
      case 'chart':
        setChartModalOpen(false);
        break;
      case 'info':
        setInfoModalOpen(false);
        break;
    }
  };

  return {
    isMarketModalOpen,
    isChartModalOpen,
    isInfoModalOpen,
    openModal,
    closeModal,
  };
}; 