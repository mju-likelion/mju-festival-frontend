import { useEffect } from 'react';
import ReactGA from 'react-ga4';

const useRouteTracker = () => {
  useEffect(() => {
    if (!window.location.href.includes('localhost')) {
      ReactGA.initialize(import.meta.env.VITE_GA_TRACKING_ID, {
        gaOptions: { debug_mode: true },
      });
    }
  }, []);
  return null;
};

export default useRouteTracker;
