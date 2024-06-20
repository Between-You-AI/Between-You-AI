import { clientAxiosInstance } from '../config';
import { PlantConfigModel } from '../models';
import { PassCodeFormSchemaDto } from '../validations';

export const updatePlantConfig = async (
  plantConfig: { key: string; value: any }[]
) => {
  const { data } = await clientAxiosInstance.put('/configuration', plantConfig);
  return data;
};

export const getPlantConfig = async (): Promise<PlantConfigModel> => {
  const { data } = await clientAxiosInstance.get('/configuration');
  return data;
};

export const updatePassCode = async (passCode: PassCodeFormSchemaDto) => {
  const { data } = await clientAxiosInstance.put(
    '/configuration/passCode',
    passCode
  );
  return data;
};
