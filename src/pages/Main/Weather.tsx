import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getWeather } from '../../api/weather';
import { ReactComponent as DayCloud } from '../../assets/icons/weather_day_cloud.svg';
import { ReactComponent as DayRainy } from '../../assets/icons/weather_day_rainy.svg';
import { ReactComponent as DaySunny } from '../../assets/icons/weather_day_sunny.svg';
import { ReactComponent as Error } from '../../assets/icons/weather_error.svg';
import { ReactComponent as NightCloud } from '../../assets/icons/weather_night_cloud.svg';
import { ReactComponent as NightMoon } from '../../assets/icons/weather_night_moon.svg';
import { ReactComponent as NightRainy } from '../../assets/icons/weather_night_rainy.svg';
import { GroupedWeatherData, WeatherForecast } from '../../types';

const Weather = () => {
  const [forecasts, setForecasts] = useState<WeatherForecast[]>([]);
  const [forecastsError, setForecastsError] = useState<string | null>(null);

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
      setForecastsError(null);
    } catch (error) {
      setForecastsError('날씨 정보를 불러오지 못했습니다.');
    }
  };

  // 오전 오후 시간 포맷팅 함수
  const formatTime = (fcstTime: string): string => {
    const hours = parseInt(fcstTime.slice(0, 2), 10);
    const suffix = hours < 12 ? '오전' : '오후';
    const formattedHour = hours % 12 || 12;
    return `${suffix} ${formattedHour}시`;
  };

  const isDayTime = (fcstTime: string) => {
    const hours = parseInt(fcstTime.slice(0, 2), 10);
    // 낮 기준 06:30 ~ 18:00
    return (
      hours >= 6 &&
      (hours < 18 || (hours === 18 && parseInt(fcstTime.slice(2), 10) === 0))
    );
  };

  // 날씨에 따라 아이콘 선택
  const getWeatherIcon = (PTY: string, SKY: string, fcstTime: string) => {
    const dayTime = isDayTime(fcstTime);

    switch (true) {
      case PTY === '1' || PTY === '2':
        return dayTime ? <DayRainy /> : <NightRainy />;
      case SKY === '1':
        return dayTime ? <DaySunny /> : <NightMoon />;
      case SKY === '3' || SKY === '4':
        return dayTime ? <DayCloud /> : <NightCloud />;
      default:
        return <Error />;
    }
  };

  useEffect(() => {
    fetchWeather();
  }, []);

  // 날씨 데이터를 불러오지 못했을 때 UI
  if (forecastsError) {
    return (
      <Wrapper>
        <TempLayout>
          <ErrorMessage>{forecastsError}</ErrorMessage>
        </TempLayout>
      </Wrapper>
    );
  }

  // 정상 처리 UI
  return (
    <Wrapper>
      {forecasts.map((forecast) => (
        <CardLayout key={forecast.fcstTime}>
          <Time>{formatTime(forecast.fcstTime)}</Time>
          <Icon>
            {getWeatherIcon(forecast.PTY, forecast.SKY, forecast.fcstTime)}
          </Icon>
          <Temperature>{forecast.T1H}°</Temperature>
        </CardLayout>
      ))}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  height: 50px;
  padding: 0 20px;
  margin: 42px 0 3px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CardLayout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3px;
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

const TempLayout = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const ErrorMessage = styled.p`
  color: ${({ theme }) => theme.colors.black50};
  ${({ theme }) => theme.typographies.callout};
`;

export default Weather;
