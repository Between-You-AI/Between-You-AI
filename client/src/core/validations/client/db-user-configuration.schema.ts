import * as yup from 'yup';
export const dbUserSchemaConfiguration = yup.object({
  User: yup.string().required('Db user is required.'),
  Password: yup.string().required('Db password is required.'),
});

export type DbUserConfigurationDto = yup.InferType<
  typeof dbUserSchemaConfiguration
>;
