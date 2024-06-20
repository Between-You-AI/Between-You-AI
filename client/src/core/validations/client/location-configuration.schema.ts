import * as yup from 'yup';
export const locationConfigurationSchema = yup.object({
  StorageLocation: yup.string().required('Plant code is required.'),
  ExportConfiguration: yup
    .string()
    .required('Export configuration is required.'),
});

export type LocationConfigurationSchemaDto = yup.InferType<
  typeof locationConfigurationSchema
>;
