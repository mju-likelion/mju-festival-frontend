import { AxiosWeather } from './Axios';

export const getWeather = async () => {
  const { data } = await AxiosWeather.get('/weather');
  const forecasts = data.response.body.items.item;
  return forecasts;
};
