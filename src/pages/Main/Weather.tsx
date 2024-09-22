import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getWeather } from '../../api/weather';
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
          T1H: '',
        };
      }

      if (forecast.category === 'SKY') {
        groupedForecasts[key].SKY = forecast.fcstValue || '';
      } else if (forecast.category === 'T1H') {
        groupedForecasts[key].T1H = forecast.fcstValue || '';
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

  useEffect(() => {
    fetchWeather();
  }, []);

  return (
    <Wrapper>
      {forecasts.map((forecast) => (
        <CardLayout key={forecast.fcstTime}>
          <Time>{forecast.fcstTime}</Time>
          <Sunny />
          <Temperature>{forecast.T1H}°</Temperature>
        </CardLayout>
      ))}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid blue;
  padding: 0 30px;
  margin: 42px 0 3px 0;
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

const Temperature = styled.p`
  ${({ theme }) => theme.typographies.caption2};
  color: ${({ theme }) => theme.colors.text900};
`;

export default Weather;
