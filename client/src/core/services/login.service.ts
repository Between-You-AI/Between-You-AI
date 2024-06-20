import { clientAxiosInstance } from '../config';
import { LoginResponse } from '../types';
import { LoginDto } from '../validations';

export const loginApi = async (loginDto: LoginDto): Promise<LoginResponse> => {
  const res = await clientAxiosInstance.post('/auth/login', loginDto);
  return res.data;
};
