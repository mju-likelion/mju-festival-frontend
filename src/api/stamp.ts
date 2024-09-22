import { Axios } from './Axios';

export const getStamp = async (token: string) => {
  const { data } = await Axios.get(`/users/my/stamp`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};
