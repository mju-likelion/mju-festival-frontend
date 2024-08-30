import { useEffect } from 'react';

const usePreventRefresh = () => {
  const preventClose = (e: BeforeUnloadEvent) => {
    e.preventDefault();
    // e.returnValue = ''; // chrome 설정 시 필요
  };

  useEffect(() => {
    (() => {
      window.addEventListener('beforeunload', preventClose);
    })();

    return () => {
      window.removeEventListener('beforeunload', preventClose);
    };
  }, []);
};

export default usePreventRefresh;
