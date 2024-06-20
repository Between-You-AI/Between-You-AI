import * as yup from 'yup';

export const plantConfigFormSchema = yup.object({
  PlantCode: yup.string().required('Plant code is required.'),
  WarehouseCode: yup.string().required('Warehouse code is required.'),
  LocationCode: yup.string().required('Location code is required.'),
});

export type PlantConfigFormSchemaDto = yup.InferType<
  typeof plantConfigFormSchema
>;
