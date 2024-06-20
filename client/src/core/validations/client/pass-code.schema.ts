import * as yup from 'yup';
export const passCodeFormSchema = yup.object({
  newPassCode: yup
    .string()
    .required('Pass code is required.')
    .length(6, 'Pass code must be 6 digits long.'),
});

export type PassCodeFormSchemaDto = yup.InferType<typeof passCodeFormSchema>;
