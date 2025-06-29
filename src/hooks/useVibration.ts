export const useVibration = () => {
  const triggerVibration = (duration = 30) => {
    if (typeof window !== 'undefined' && navigator.vibrate) {
      navigator.vibrate(duration);
    }
  };

  return { triggerVibration };
}; 