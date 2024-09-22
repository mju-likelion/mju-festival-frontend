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

export interface WeatherForecast {
  fcstTime: string;
  SKY: string;
  T1H: string;
  PTY: string;
}

export interface GroupedWeatherData {
  fcstTime: string;
  category: string;
  fcstValue: string;
}
