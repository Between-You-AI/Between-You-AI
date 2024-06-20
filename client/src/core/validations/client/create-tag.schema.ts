import * as yup from 'yup';

export const createLabelTagSchema = yup.object({
  tag: yup.string().required('Tag name is required.'),
  storageType: yup.string().required('Storage type is required.'),
  minQuantity: yup.number().required('Minimum Quantity is required'),
  maxQuantity: yup
    .number()
    .min(
      yup.ref('minQuantity'),
      'Maximum Quantity must be greater than Minimum Quantity'
    ),
  currentQuantity: yup.number().required('Current Quantity is required.'),
  MaterialNumber: yup.string().required('Material Number is required.'),
});

export type CreateLabelTagSchemaDto = yup.InferType<
  typeof createLabelTagSchema
>;
