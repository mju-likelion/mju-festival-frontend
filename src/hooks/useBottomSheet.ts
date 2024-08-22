import { useRef, useState, useEffect } from 'react';
import { MIN_Y, MAX_Y } from '../components/QrBottomSheet/BottomSheetOption';

const useBottomSheet = () => {
  const sheet = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  // 클릭 핸들러 함수
  const handleClick = () => {
    if (sheet.current) {
      if (isOpen) {
        sheet.current.style.setProperty('transform', 'translateY(0)');
      } else {
        sheet.current.style.setProperty(
          'transform',
          `translateY(${MIN_Y - MAX_Y}px)`
        );
      }
      setIsOpen((prev) => !prev);
    }
  };

  // 이벤트 리스너를 추가합니다.
  useEffect(() => {
    const sheetElement = sheet.current;

    if (sheetElement) {
      sheetElement.addEventListener('click', handleClick);
    }

    // 클린업 함수로 이벤트 리스너를 제거합니다.
    return () => {
      if (sheetElement) {
        sheetElement.removeEventListener('click', handleClick);
      }
    };
  }, [isOpen]); // 의존성 배열에 isOpen 추가

  return { sheet };
};

export default useBottomSheet;
