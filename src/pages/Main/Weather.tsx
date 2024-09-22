import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getWeather } from '../../api/weather';
import { ReactComponent as Cloud } from '../../assets/icons/weather_cloud.svg';
import { ReactComponent as Error } from '../../assets/icons/weather_error.svg';
import { ReactComponent as Rainy } from '../../assets/icons/weather_rainy.svg';
import { ReactComponent as Sunny } from '../../assets/icons/weather_sunny.svg';
import { GroupedWeatherData, WeatherForecast } from '../../types';
import { handleError } from '../../utils/errorUtil';

const Weather = () => {
  const [forecasts, setForecasts] = useState<WeatherForecast[]>([]);

  const groupForecast = (forecasts: GroupedWeatherData[]) => {
    const groupedForecasts: Record<string, WeatherForecast> = {};

    forecasts.forEach((forecast: GroupedWeatherData) => {
      const key = `${forecast.fcstTime}`;

      // 초기화
      if (!groupedForecasts[key]) {
        groupedForecasts[key] = {
          fcstTime: forecast.fcstTime,
          SKY: '',
          PTY: '',
          T1H: '',
        };
      }

      if (forecast.category === 'SKY') {
        groupedForecasts[key].SKY = forecast.fcstValue || '';
      } else if (forecast.category === 'T1H') {
        groupedForecasts[key].T1H = forecast.fcstValue || '';
      } else if (forecast.category === 'PTY') {
        groupedForecasts[key].PTY = forecast.fcstValue || '';
      }
    });
    const resultForecasts = Object.values(groupedForecasts);
    setForecasts(resultForecasts);
  };

  const fetchWeather = async () => {
    try {
      const forecasts = await getWeather();
      groupForecast(forecasts);
    } catch (error) {
      handleError(error as Error);
    }
  };

  // 오전 오후 시간 포맷팅 함수
  const formatTime = (fcstTime: string): string => {
    const hours = parseInt(fcstTime.slice(0, 2), 10);
    const suffix = hours < 12 ? '오전' : '오후';
    const formattedHour = hours % 12 || 12;
    return `${suffix} ${formattedHour}시`;
  };

  // 날씨에 따라 아이콘 선택
  const getWeatherIcon = (PTY: string, SKY: string) => {
    switch (true) {
      case PTY === '1' || PTY === '2':
        return <Rainy />;
      case SKY === '1':
        return <Sunny />;
      case SKY === '3' || SKY === '4':
        return <Cloud />;
      default:
        return <Error />;
    }
  };

  useEffect(() => {
    fetchWeather();
  }, []);

  return (
    <Wrapper>
      {forecasts.map((forecast) => (
        <CardLayout key={forecast.fcstTime}>
          <Time>{formatTime(forecast.fcstTime)}</Time>
          <Icon>{getWeatherIcon(forecast.PTY, forecast.SKY)}</Icon>
          <Temperature>{forecast.T1H}°</Temperature>
        </CardLayout>
      ))}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  height: 50px;
  padding: 0 30px;
  margin: 42px 0 3px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CardLayout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Time = styled.p`
  ${({ theme }) => theme.typographies.caption2};
  color: ${({ theme }) => theme.colors.text900};
`;

const Icon = styled.div`
  display: flex;
  justify-self: center;
  align-items: center;
`;

const Temperature = styled.p`
  ${({ theme }) => theme.typographies.caption2};
  color: ${({ theme }) => theme.colors.text900};
`;

export default Weather;
