export type MainButtonBgImg =
  | 'map'
  | 'booth'
  | 'timetable'
  | 'notice'
  | 'lostItem';

export interface ButtonProps {
  bgimg: MainButtonBgImg;
  type: 'button' | 'submit' | 'reset';
  onClick: () => void;
  children: React.ReactNode;
}
