import * as yup from 'yup';

export const loginSchema = yup.object().shape({
  email: yup.string().email().required(),
  passCode: yup.string().required(),
});

export type LoginDto = yup.InferType<typeof loginSchema>;
