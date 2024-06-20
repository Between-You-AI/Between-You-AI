import * as yup from 'yup';
export const tagsFilterSchema = yup.object({
  id: yup.string(),
  tagName: yup.string(),
  MaterialNumber: yup.string(),
  storageType: yup.string(),
});

export type TagsFilterDto = yup.InferType<typeof tagsFilterSchema>;
