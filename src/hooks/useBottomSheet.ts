import { useRef, useState } from 'react';
import { MIN_Y, MAX_Y } from '../components/QrBottomSheet/BottomSheetOption';

const useBottomSheet = () => {
  const sheet = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    if (!sheet.current) {
      return;
    }

    if (isOpen) {
      sheet.current.style.setProperty('transform', 'translateY(0)');
    } else {
      sheet.current.style.setProperty(
        'transform',
        `translateY(${MIN_Y - MAX_Y}px)`
      );
    }
    setIsOpen((prev) => !prev);
  };

  return { sheet, handleClick };
};

export default useBottomSheet;
