import * as yup from 'yup';
export const minMaxUpdateSchema = yup.object({
  minQuantity: yup.number(),
  maxQuantity: yup.number(),
  id: yup.number(),
});

export const updateTableConfigurationsSchema = yup.object({
  values: yup.array().of(minMaxUpdateSchema),
});

export type MinMaxUpdateSchemaDto = yup.InferType<typeof minMaxUpdateSchema>;

export type UpdateTableConfigurationsSchemaDto = yup.InferType<
  typeof updateTableConfigurationsSchema
>;
