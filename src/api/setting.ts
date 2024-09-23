import { Axios } from './Axios';

export const deleteUser = async (token: string) => {
  await Axios.delete(`/auth/users/withdraw`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
